#!/usr/bin/env python3
"""
Cào dữ liệu giờ lễ các nhà thờ Công giáo Việt Nam -> public/giole.json

Hai nguồn công khai, cả hai đều trả JSON có cấu trúc nên không phải parse HTML:

  1. giothanhle.net  — WordPress REST API (post type `property`), ~627 nhà thờ.
     Giờ lễ gộp thành 2 nhóm: ngày thường / Chúa Nhật. Có thêm Giáo hạt.
  2. gioleconggiao.com — endpoint `gl_public_list` của theme, ~93 nhà thờ.
     Giờ lễ CHI TIẾT THEO TỪNG THỨ -> chính xác hơn, và phủ 6 giáo phận
     mà nguồn 1 bỏ trống (Bùi Chu, Phát Diệm, Thái Bình, Thanh Hóa, Hà Tĩnh, Vinh).

Chạy:

    python3 scripts/scrape_giole.py

Sau đó vào /admin -> tab "Giờ lễ" -> bấm "Nhập từ giole.json" để đẩy lên Firestore.
"""
import json
import pathlib
import re
import sys
import time
import base64
import collections
import math
import unicodedata
import urllib.parse
import urllib.request

API = "https://giothanhle.net/wp-json/wp/v2"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
OUT = pathlib.Path(__file__).resolve().parent.parent / "public" / "giole.json"

# Tên meta field bị WordPress mã hoá: "fave_" + tên tiếng Việt (ký tự non-ASCII -> hex UTF-8)
META_SUNDAY = "fave_chc3baa-nhe1baadt"          # fave_chúa-nhật
META_WEEKDAY = "fave_ngc3a0y-thc6b0e1bb9dng"    # fave_ngày-thường
META_GENERIC = "fave_gie1bb9d-le1bb85"          # fave_giờ-lễ

TIME_RE = re.compile(r"^([0-2]?\d)\s*[:hg\.]\s*([0-5]\d)$")

# --- Nguồn 3 (chính): giole.vn — app của Văn phòng HĐGM Việt Nam ---
# Trang tỉnh render sẵn TOÀN BỘ nhà thờ của tỉnh kèm giờ lễ + toạ độ, nên chỉ cần
# 1 request/tỉnh. Phần slug trong URL bị bỏ qua, chỉ số id tỉnh có tác dụng.
GIOLEVN_PROVINCE = "https://giole.vn/x.{}/"
GIOLEVN_MAX_ID = 70

# --- Nguồn 2: gioleconggiao.com ---
GCG_AJAX = "https://gioleconggiao.com/wp-content/themes/gio-le-theme/app-gio-le/ajax.php"
DAYS = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chúa Nhật"]

# 27 giáo phận — dùng làm whitelist. Nguồn 2 hay điền nhầm TÊN TỈNH vào ô giáo phận
# (vd "TP. Hồ Chí Minh", "Đồng Nai"), nên phải kiểm tra chứ không tin thẳng.
DIOCESES = [
    "Bà Rịa", "Ban Mê Thuột", "Bắc Ninh", "Bùi Chu", "Cần Thơ", "Đà Lạt", "Đà Nẵng",
    "Hà Nội", "Hà Tĩnh", "Hải Phòng", "Hưng Hóa", "Huế", "Kon Tum", "Lạng Sơn - Cao Bằng",
    "Long Xuyên", "Mỹ Tho", "Nha Trang", "Phan Thiết", "Phát Diệm", "Phú Cường",
    "Quy Nhơn", "Sài Gòn", "Thái Bình", "Thanh Hóa", "Vinh", "Vĩnh Long", "Xuân Lộc",
]
DIOCESE_LOOKUP = {d.lower(): d for d in DIOCESES}


def get(url, tries=3):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r), dict(r.headers)
        except Exception as e:
            if i == tries - 1:
                raise
            print(f"  ! {e} — thử lại ({i + 2}/{tries})", file=sys.stderr)
            time.sleep(2 * (i + 1))


def strip_accents(s):
    """Bỏ dấu tiếng Việt để so tên. đ/Đ không tách được bằng NFD nên thay tay."""
    s = s.replace("đ", "d").replace("Đ", "D")
    return "".join(c for c in unicodedata.normalize("NFD", s) if not unicodedata.combining(c))


def clean(s):
    """
    Gỡ HTML tag/entity, gộp khoảng trắng, chuẩn hoá Unicode về NFC.

    NFC là bắt buộc: các nguồn trộn lẫn ký tự dựng sẵn và ký tự tổ hợp, nên
    "Hà Nội" từ nguồn này khác "Hà Nội" từ nguồn kia dù nhìn y hệt — làm hỏng
    cả khử trùng lẫn gộp nhóm tỉnh.
    """
    import html
    txt = re.sub(r"<[^>]+>", " ", html.unescape(s or ""))
    return unicodedata.normalize("NFC", re.sub(r"\s+", " ", txt)).strip()


def norm_times(raw):
    """['5:00',' 17h30 ', ''] -> ['05:00','17:30'], bỏ giá trị rác, sắp xếp, khử trùng."""
    out = set()
    for v in raw or []:
        m = TIME_RE.match(str(v).strip())
        if m:
            h, mi = int(m.group(1)), m.group(2)
            if 0 <= h <= 23:
                out.add(f"{h:02d}:{mi}")
    return sorted(out)


def fetch_terms(tax):
    """Tải toàn bộ term của 1 taxonomy -> {id: name}."""
    terms, page = {}, 1
    while True:
        data, _ = get(f"{API}/{tax}?per_page=100&page={page}&_fields=id,name")
        if not data:
            break
        for t in data:
            terms[t["id"]] = clean(t["name"])
        if len(data) < 100:
            break
        page += 1
    return terms


def fetch_churches():
    fields = "id,slug,link,title,property_state,property_city,property_meta"
    items, page = [], 1
    while True:
        data, hdr = get(f"{API}/properties?per_page=100&page={page}&_fields={fields}")
        if not isinstance(data, list) or not data:
            break
        items += data
        total = hdr.get("X-WP-TotalPages")
        print(f"  trang {page}/{total or '?'} — {len(items)} nhà thờ")
        if total and page >= int(total):
            break
        if len(data) < 100:
            break
        page += 1
        time.sleep(0.3)
    return items


def norm_diocese(raw, parish_name=""):
    """
    Chuẩn hoá tên giáo phận về đúng 1 trong 27 tên chuẩn (không kèm tiền tố).
    Trả "" nếu không xác định được — thà bỏ trống để admin sửa tay còn hơn đoán sai.
    """
    for cand in (raw or "", parish_name):
        cand = (cand or "").strip()
        # bỏ tiền tố "Giáo phận" rồi thử khớp nguyên chuỗi trước — nếu cắt ở dấu
        # gạch ngang sẽ hỏng tên "Lạng Sơn - Cao Bằng"
        stripped = re.sub(r"^[Gg]iáo\s*[Pp]hận\s+", "", cand).strip().rstrip(".")
        hit = DIOCESE_LOOKUP.get(stripped.lower())
        if hit:
            return hit
        # rồi mới bắt "Giáo phận X" nằm giữa tên nhà thờ
        m = re.search(r"[Gg]iáo\s*[Pp]hận\s+([^,(]+)", cand)
        if m:
            hit = DIOCESE_LOOKUP.get(m.group(1).strip().rstrip(".").lower())
            if hit:
                return hit
    return ""


def norm_province(name):
    """
    Gộp các cách viết khác nhau của cùng một tỉnh: "Tp. Hồ Chí Minh" / "TP. Hồ Chí Minh"
    / "Hồ Chí Minh" -> "Hồ Chí Minh".

    # ponytail: chỉ chuẩn hoá CÁCH VIẾT, không quy đổi tên tỉnh cũ sang tên sau sáp
    # nhập 2025 (Nam Định -> Ninh Bình...). Quy đổi sai sẽ xếp nhà thờ vào nhầm tỉnh,
    # tệ hơn là để dropdown có thêm vài mục tên cũ. Làm khi có bảng ánh xạ chắc chắn.
    """
    n = clean(name)
    n = re.sub(r"^(Tp\.?|TP\.?|Thành phố|Tỉnh)\s+", "", n, flags=re.I)
    return n.strip()


def parse_summary(summary):
    """
    ['Thứ Hai – Thứ Sáu: 05:00 – 18:00', 'Chúa Nhật: 05:00 – 16:30']
        -> {'Thứ Hai': ['05:00','18:00'], ..., 'Chúa Nhật': ['05:00','16:30']}

    Nguồn gộp các ngày giống nhau thành khoảng ("Thứ Hai – Thứ Sáu") — chiếm phần
    lớn dữ liệu ngày thường, nên bắt buộc phải giãn ra.
    """
    by_day = {}
    for line in summary or []:
        label, _, rest = str(line).partition(":")
        times = norm_times(re.split(r"[–—\-,;]", rest))
        if not times:
            continue
        bounds = [d.strip() for d in re.split(r"\s[–—-]\s", label.strip())]
        if len(bounds) == 2 and bounds[0] in DAYS and bounds[1] in DAYS:
            days = DAYS[DAYS.index(bounds[0]):DAYS.index(bounds[1]) + 1]
        elif label.strip() in DAYS:
            days = [label.strip()]
        else:
            continue
        for d in days:
            by_day[d] = times
    return by_day


def _self_check():
    """Kiểm tra nhanh 2 hàm dễ sai nhất. Chạy: python3 scripts/scrape_giole.py --check"""
    got = parse_summary(["Thứ Hai – Thứ Sáu: 05:00 – 18:00", "Chúa Nhật: 5:00 – 16h30"])
    assert got == {d: ["05:00", "18:00"] for d in DAYS[:5]} | {"Chúa Nhật": ["05:00", "16:30"]}, got
    assert parse_summary(["Thứ Bảy: 05:00"]) == {"Thứ Bảy": ["05:00"]}
    assert parse_summary(["Linh tinh: 05:00"]) == {}
    assert parse_summary([]) == {}
    assert norm_times(["25:00", "abc", "9.15", "17h30", ""]) == ["09:15", "17:30"]
    assert norm_diocese("Giáo phận Lạng Sơn - Cao Bằng") == "Lạng Sơn - Cao Bằng"
    assert norm_diocese("Bùi Chu") == "Bùi Chu"
    assert norm_diocese("", "Nhà thờ Đồng Cạn giáo phận Hưng Hóa") == "Hưng Hóa"
    assert norm_diocese("TP. Hồ Chí Minh", "Nhà thờ Bùi Môn") == ""   # tên tỉnh, không phải giáo phận
    print("self-check OK")


def fetch_gioleconggiao():
    """Endpoint trả TOÀN BỘ danh sách trong 1 lần gọi (trang tự phân trang ở client)."""
    payload = base64.b64encode(json.dumps({"province": "", "keyword": ""}).encode()).decode()
    body = urllib.parse.urlencode({"action": "gl_public_list", "payload": payload}).encode()
    req = urllib.request.Request(GCG_AJAX, data=body, headers={
        "User-Agent": UA,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Referer": "https://gioleconggiao.com/nha-tho/",
    })
    with urllib.request.urlopen(req, timeout=60) as r:
        data = json.load(r)
    if not data.get("success"):
        raise RuntimeError("gioleconggiao.com trả về success=false")

    rows = []
    for x in data.get("items", []):
        by_day = parse_summary(x.get("summary"))
        sunday = by_day.get("Chúa Nhật", [])
        # "Ngày thường" = hợp của Thứ Hai..Thứ Bảy, chỉ để lọc/hiển thị gọn;
        # by_day mới là số liệu chính xác của từng thứ.
        weekday = sorted({t for d in DAYS[:6] for t in by_day.get(d, [])})
        if not sunday and not weekday:
            continue
        rows.append({
            "id": f"gcg-{x['id']}",
            "parish": clean(x.get("name")),
            "diocese": norm_diocese(x.get("diocese"), clean(x.get("name"))),
            "deanery": "",
            "province": norm_province(x.get("province")),
            "address": (x.get("address") or "").strip(),
            "weekdayMass": weekday,
            "sundayMass": sunday,
            "byDay": by_day,
            "lat": x.get("lat"),
            "lng": x.get("lng"),
            "source": f"https://gioleconggiao.com/nha-tho/{x['slug']}/",
        })
    return rows


def fetch_giolevn():
    """Quét toàn bộ tỉnh/thành trên giole.vn."""
    card_re = re.compile(
        r'<h5[^>]*>\s*\d+\.\s*(?P<name>.*?)</h5>.*?'
        r'<a href="javascript:mapClick\(\d+\)">(?P<addr>.*?)</a>.*?'
        r'<a href="(?P<url>/[^"]+\.html)">.*?'
        r'<div id="collapse\d+".*?<div class="card-body"[^>]*>(?P<times>.*?)</div>',
        re.S)
    # Chỉ lấy toạ độ TRONG mảng tourStops. Bắt \{lat:..\} trên cả trang sẽ dính
    # thêm `center:` của bản đồ ở đầu file -> lệch toàn bộ toạ độ đi 1 nhà thờ.
    stops_re = re.compile(r"const tourStops\s*=\s*\[(.*?)\n\s*\];", re.S)
    stop_re = re.compile(r"\{\s*lat:\s*(-?[\d.]+),\s*lng:\s*(-?[\d.]+)\s*\}")
    title_re = re.compile(r"<title>\s*Giờ Lễ các Nhà Thờ tại ([^<]*)")

    rows = []
    for pid in range(1, GIOLEVN_MAX_ID + 1):
        try:
            req = urllib.request.Request(GIOLEVN_PROVINCE.format(pid), headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                h = r.read().decode("utf-8", "replace")
        except Exception as e:
            print(f"  ! tỉnh {pid}: {e}", file=sys.stderr)
            continue

        m = title_re.search(h)
        cards = list(card_re.finditer(h))
        if not m or not cards:
            continue
        province = clean(m.group(1))
        # toạ độ nằm trong mảng tourStops của Google Maps, cùng thứ tự với thẻ
        block = stops_re.search(h)
        coords = stop_re.findall(block.group(1)) if block else []
        if len(coords) != len(cards):
            print(f"  ! {province}: {len(cards)} thẻ nhưng {len(coords)} toạ độ -> bỏ toạ độ",
                  file=sys.stderr)
            coords = []
        print(f"  {province}: {len(cards)} nhà thờ")

        for i, c in enumerate(cards):
            weekday, saturday, sunday = parse_giolevn_times(c.group("times"))
            # Giữ cả nhà thờ chưa khai giờ lễ: CSDL của HĐGM có ~1000 mục như vậy,
            # bỏ đi thì danh bạ không còn đủ giáo xứ toàn quốc. Admin điền sau.
            lat, lng = (coords[i] if i < len(coords) else (None, None))
            rows.append({
                "id": "gv-" + c.group("url").rsplit("-", 1)[1].removesuffix(".html"),
                "parish": clean(c.group("name")),
                "diocese": "",          # giole.vn không có trường giáo phận
                "deanery": "",
                "province": norm_province(province),
                "address": clean(c.group("addr")),
                "weekdayMass": weekday,
                "saturdayMass": saturday,
                "sundayMass": sunday,
                "lat": float(lat) if lat else None,
                "lng": float(lng) if lng else None,
                "source": "https://giole.vn" + c.group("url"),
            })
        time.sleep(0.2)
    return rows


def parse_giolevn_times(block):
    """
    Tách khối "Ngày thường: ... Thứ Bảy: ... Chúa Nhật: ..." thành 3 danh sách.
    Nội dung tự do ("Thứ 6: 06h00", "09:30 (tiếng Anh), 16:00") nên chỉ bắt
    các mẫu giờ rồi chuẩn hoá, bỏ phần chữ.
    """
    text = re.sub(r"<[^>]+>", "\n", block)
    text = __import__("html").unescape(text)
    parts = re.split(r"(Ngày thường|Thứ Bảy|Chúa Nhật)\s*:", text)
    buckets = {"Ngày thường": [], "Thứ Bảy": [], "Chúa Nhật": []}
    for i in range(1, len(parts) - 1, 2):
        label = parts[i]
        if label in buckets:
            buckets[label] += re.findall(r"\d{1,2}[hg:.]\d{2}", parts[i + 1])
    return (norm_times(buckets["Ngày thường"]),
            norm_times(buckets["Thứ Bảy"]),
            norm_times(buckets["Chúa Nhật"]))


# --- Nguồn 4: tgpsaigon.net — trang chính thức của TGP Sài Gòn ---
# Đây là nguồn DUY NHẤT tìm được có đủ Giáo phận + Giáo hạt + giờ lễ 7 ngày.
TGPSG_AJAX = "https://tgpsaigon.net/ArchDiocese/LoadMassTime"
TGPSG_DEANERIES = {
    13: "Bình An", 4: "Chí Hoà", 1: "Gia Định", 7: "Gò Vấp", 9: "Hóc Môn",
    12: "Phú Nhuận", 5: "Phú Thọ", 10: "Sài Gòn - Chợ Quán", 11: "Tân Định",
    6: "Tân Sơn Nhì", 2: "Thủ Đức", 3: "Thủ Thiêm", 14: "Xóm Chiếu", 8: "Xóm Mới",
}


def fetch_tgpsaigon():
    """Bảng giờ lễ 7 ngày của TGP Sài Gòn, gọi riêng từng giáo hạt để có nhãn giáo hạt."""
    row_re = re.compile(r'<tr class="mass-time-detail">(.*?)</tr>', re.S)
    cell_re = re.compile(r"<td[^>]*>(.*?)</td>", re.S)
    link_re = re.compile(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', re.S)
    cols = ["Chúa Nhật"] + DAYS[:6]           # thứ tự cột trong bảng

    rows = []
    for did, deanery in sorted(TGPSG_DEANERIES.items()):
        body = urllib.parse.urlencode({"deaneryId": did, "keyword": ""}).encode()
        req = urllib.request.Request(TGPSG_AJAX, data=body, headers={
            "User-Agent": UA,
            "X-Requested-With": "XMLHttpRequest",
            "Referer": "https://tgpsaigon.net/gio-le/",
        })
        with urllib.request.urlopen(req, timeout=60) as r:
            h = r.read().decode("utf-8", "replace")

        for tr in row_re.findall(h):
            cells = cell_re.findall(tr)
            if len(cells) < 9:
                continue
            link = link_re.search(cells[1])
            name = clean(link.group(2) if link else cells[1])
            if not name:
                continue
            by_day = {}
            for label, cell in zip(cols, cells[2:9]):
                times = norm_times(re.findall(r"\d{1,2}[hg:.]\d{2}", cell))
                if times:
                    by_day[label] = times
            rows.append({
                "id": "sg-" + (link.group(1).rsplit("-", 1)[1] if link else strip_accents(name).replace(" ", "-")),
                "parish": name,
                "diocese": "Sài Gòn",
                "deanery": deanery,
                "province": "Hồ Chí Minh",
                "address": "",
                "weekdayMass": sorted({t for d in DAYS[:6] for t in by_day.get(d, [])}),
                "sundayMass": by_day.get("Chúa Nhật", []),
                "byDay": by_day,
                "lat": None,
                "lng": None,
                "source": "https://tgpsaigon.net/gio-le/",
            })
        time.sleep(0.2)
    return rows


# --- Nguồn 5: danh bạ giáo xứ theo GIÁO PHẬN + GIÁO HẠT ---
# giole.vn (nguồn chính) không có trường giáo phận. Hai nguồn dưới đây là danh bạ
# tổ chức đúng theo Giáo phận -> Giáo hạt -> Giáo xứ, dùng để GẮN NHÃN chứ không
# thêm nhà thờ mới.
# Tiền tố URL không đồng nhất ("...giao-xu-giao-hat-thuoc-" vs "...giao-hat-thuoc-",
# "giao-phan-" vs "tong-giao-phan-") nên ghi nguyên đường dẫn cho chắc.
STCG = "https://sotayconggiao.com/"
STCG_PAGES = {
    "Bà Rịa": "danh-sach-cac-giao-xu-giao-hat-thuoc-giao-phan-ba-ria/",
    "Cần Thơ": "danh-sach-cac-giao-xu-giao-hat-thuoc-giao-phan-can-tho/",
    "Đà Nẵng": "danh-sach-cac-giao-xu-giao-hat-thuoc-giao-phan-da-nang/",
    "Hải Phòng": "danh-sach-cac-giao-xu-giao-hat-thuoc-giao-phan-hai-phong-giao-tinh-ha-noi/",
    "Long Xuyên": "danh-sach-cac-giao-xu-giao-hat-thuoc-giao-phan-long-xuyen/",
    "Mỹ Tho": "danh-sach-cac-giao-xu-giao-hat-thuoc-giao-phan-my-tho/",
    "Nha Trang": "danh-sach-cac-giao-xu-giao-hat-thuoc-giao-phan-nha-trang/",
    "Phan Thiết": "danh-sach-cac-giao-xu-giao-hat-thuoc-giao-phan-phan-thiet/",
    "Phát Diệm": "danh-sach-cac-giao-xu-giao-hat-thuoc-giao-phan-phat-diem/",
    "Xuân Lộc": "danh-sach-cac-giao-xu-giao-hat-thuoc-giao-phan-xuan-loc-giao-tinh-sai-gon/",
    "Hà Nội": "danh-sach-cac-giao-xu-giao-hat-thuoc-tong-giao-phan-ha-noi/",
    "Huế": "danh-sach-cac-giao-xu-giao-hat-thuoc-tong-giao-phan-hue/",
    "Sài Gòn": "danh-sach-cac-giao-hat-thuoc-giao-phan-sai-gon-ho-chi-minh/",
}
BMT_DEANERIES = ["chinh-toa", "mau-tam", "giang-son", "dak-mil", "phuoc-long", "dong-xoai"]

# từ chung phải bỏ khi so tên giáo xứ giữa các nguồn
GENERIC_WORDS = r"\b(nha tho|giao xu|giao ho|ghbl|den thanh|nha nguyen|chinh toa|biet lap|bien lap|giao diem)\b"


def parish_key(name):
    """Khoá so khớp tên giáo xứ: bỏ dấu, bỏ từ chung, bỏ đuôi 'giáo phận X'."""
    s = strip_accents(clean(name).lower())
    s = re.sub(r"\bgiao phan .*$", " ", s)
    s = re.sub(GENERIC_WORDS, " ", s)
    return re.sub(r"[^a-z0-9]+", " ", s).strip()


def _html_tables(h):
    def cell(x):
        return clean(re.sub(r"<[^>]+>", " ", x))
    out = []
    for tb in re.findall(r"<table.*?</table>", h, re.S):
        out.append([[cell(c) for c in re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", r, re.S)]
                    for r in re.findall(r"<tr.*?</tr>", tb, re.S)])
    return out


def fetch_parish_directory():
    """Trả {parish_key: {(giáo phận, giáo hạt)}} từ các danh bạ có phân cấp."""
    index = collections.defaultdict(set)

    for dio, path in STCG_PAGES.items():
        h = None
        for attempt in range(3):          # trang này thỉnh thoảng lỗi tạm thời
            try:
                req = urllib.request.Request(STCG + path, headers={"User-Agent": UA})
                with urllib.request.urlopen(req, timeout=60) as r:
                    h = r.read().decode("utf-8", "replace")
                break
            except Exception as e:
                print(f"  ! {dio} (lần {attempt + 1}): {e}", file=sys.stderr)
                time.sleep(3)
        if h is None:
            continue
        tables = _html_tables(h)
        if not tables:
            print(f"  ! {dio}: trang không có bảng nào (URL đổi?)", file=sys.stderr)
            continue
        # bảng đầu liệt kê các giáo hạt, các bảng sau là giáo xứ của từng hạt (cùng thứ tự)
        deans = [r[1] for r in tables[0][1:] if len(r) > 1 and r[1]]
        n = 0
        for dean, tb in zip(deans, tables[1:]):
            for row in tb[1:]:
                if len(row) > 1 and row[1]:
                    k = parish_key(row[1])
                    if k:
                        index[k].add((dio, dean))
                        n += 1
        print(f"  {dio:12} {len(deans):3d} hạt {n:4d} giáo xứ")

    # Ban Mê Thuột: giáo hạt và giáo xứ nằm ngay trong đường dẫn
    n = 0
    for hat in BMT_DEANERIES:
        try:
            req = urllib.request.Request(f"https://gpbanmethuot.vn/giao-xu/giao-hat-{hat}/",
                                         headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                h = r.read().decode("utf-8", "replace")
        except Exception as e:
            print(f"  ! Ban Mê Thuột/{hat}: {e}", file=sys.stderr)
            continue
        dean = hat.replace("-", " ").title()
        for m in re.finditer(r'href="/giao-xu/giao-hat-[a-z0-9-]+/giao-xu-[a-z0-9-]+-\d+\.html"[^>]*>(.*?)</a>', h, re.S):
            k = parish_key(m.group(1))
            if k:
                index[k].add(("Ban Mê Thuột", dean))
                n += 1
    print(f"  {'Ban Mê Thuột':12}   6 hạt {n:4d} giáo xứ")
    return index


def label_dioceses(rows, index):
    """
    Gắn Giáo phận / Giáo hạt cho các bản ghi còn trống, dựa trên danh bạ.
    Tên giáo xứ trùng nhau giữa các giáo phận rất nhiều ("An Bình", "Tân Hưng"),
    nên khi một tên ứng với nhiều giáo phận thì phải dựa vào tỉnh để chọn:
    chỉ nhận giáo phận đã có nhà thờ ĐƯỢC GẮN NHÃN ở đúng tỉnh đó.
    """
    prov_of_diocese = collections.defaultdict(collections.Counter)
    for r in rows:
        if r["diocese"] and r["province"]:
            prov_of_diocese[r["diocese"]][r["province"]] += 1

    # Lặp nhiều vòng: mỗi nhà thờ được gán làm giàu thêm bản đồ "giáo phận nào có mặt
    # ở tỉnh nào", nhờ đó vòng sau gỡ được những tên trùng mà vòng trước phải bỏ qua.
    total = 0
    for _ in range(5):
        assigned = ambiguous = 0
        for r in rows:
            if r["diocese"]:
                continue
            cands = index.get(parish_key(r["parish"]))
            if not cands:
                continue
            dios = {d for d, _ in cands}
            if len(dios) > 1:
                fit = {d for d in dios if r["province"] in prov_of_diocese.get(d, {})}
                if len(fit) != 1:
                    ambiguous += 1
                    continue
                dios = fit
            dio = next(iter(dios))
            deans = {h for d, h in cands if d == dio}
            r["diocese"] = dio
            if len(deans) == 1:
                r["deanery"] = next(iter(deans))
            if r["province"]:
                prov_of_diocese[dio][r["province"]] += 1
            assigned += 1
        total += assigned
        if not assigned:
            break
    return total, ambiguous


def drop_geographic_outliers(rows, min_members=6, k=5, max_km=100):
    """
    Bỏ nhãn giáo phận gán sai do TRÙNG TÊN GIÁO XỨ.

    Tên giáo xứ lặp lại rất nhiều giữa các giáo phận ("An Bình", "Tân Hưng",
    "Thánh Tâm"), nên khớp theo tên có thể gán một nhà thờ ở Phú Thọ vào TGP Sài Gòn.
    Một giáo phận là một vùng lãnh thổ liền khoảnh, vì vậy nhà thờ nào cách hàng
    trăm km khỏi phần còn lại của giáo phận đó gần như chắc chắn là gán nhầm.

    Dùng khoảng cách tới láng giềng thứ k (không phải tới tâm) vì giáo phận thường
    trải dài, lấy tâm sẽ loại oan các nhà thờ ở hai đầu.
    """
    groups = collections.defaultdict(list)
    for r in rows:
        if r["diocese"] and r.get("lat") and r.get("lng"):
            groups[r["diocese"]].append(r)

    dropped = 0
    for dio, members in groups.items():
        if len(members) < min_members:
            continue                      # quá ít mẫu để kết luận
        pts = [(float(m["lat"]), float(m["lng"])) for m in members]
        for i, r in enumerate(members):
            la, lo = pts[i]
            ds = sorted(math.hypot((la - b) * 111.0,
                                   (lo - c) * 111.0 * math.cos(math.radians(la)))
                        for j, (b, c) in enumerate(pts) if j != i)
            if ds[min(k, len(ds)) - 1] > max_km:
                r["diocese"] = ""
                r["deanery"] = ""
                dropped += 1

    # Bản ghi KHÔNG có toạ độ không lọc được bằng khoảng cách, nên xét theo tỉnh:
    # chỉ giữ nếu giáo phận đó thực sự hiện diện đáng kể ở tỉnh ấy (tính từ các
    # bản ghi CÓ toạ độ, vốn đã qua bước lọc trên).
    footprint = collections.defaultdict(collections.Counter)
    for r in rows:
        if r["diocese"] and r.get("lat"):
            footprint[r["diocese"]][r["province"]] += 1
    for r in rows:
        if not r["diocese"] or r.get("lat"):
            continue
        fp = footprint.get(r["diocese"])
        if not fp:
            continue
        share = fp[r["province"]] / sum(fp.values())
        if share < 0.05:
            r["diocese"] = ""
            r["deanery"] = ""
            dropped += 1
    return dropped


def merge(primary, extra):
    """
    Gộp 2 nguồn. Khử trùng THEO TÊN (đã bỏ dấu + bỏ các từ chung như "nhà thờ",
    "giáo xứ"), rồi xác nhận lại bằng khoảng cách.

    Không dùng toạ độ làm khoá chính: ở vùng công giáo dày như Bùi Chu, hai nhà
    thờ khác nhau cách nhau vài trăm mét, gộp theo ô lưới toạ độ sẽ nhập nhầm
    (đã thấy "Hà Đông" bị gộp vào "Nhà thờ Lớn Hà Nội").
    """
    GENERIC = r"\b(nha tho|giao xu|giao ho|den thanh|nha nguyen|chinh toa|lon)\b"

    def name_key(r):
        n = strip_accents(r["parish"].lower())
        n = re.sub(GENERIC, " ", n)
        return re.sub(r"[^a-z0-9]+", " ", n).strip()

    def km_apart(a, b):
        if not (a.get("lat") and a.get("lng") and b.get("lat") and b.get("lng")):
            return None
        dlat = (float(a["lat"]) - float(b["lat"])) * 111.0
        dlng = (float(a["lng"]) - float(b["lng"])) * 111.0 * math.cos(math.radians(float(a["lat"])))
        return math.hypot(dlat, dlng)

    index = {}
    for r in primary:
        index.setdefault(name_key(r), []).append(r)

    merged, dupes = list(primary), 0
    for r in extra:
        hit = None
        for cand in index.get(name_key(r), []):
            # giáo phận phải khớp (hoặc một bên chưa rõ) VÀ không cách nhau quá 5km
            if cand["diocese"] and r["diocese"] and cand["diocese"] != r["diocese"]:
                continue
            # tên giáo xứ trùng nhau giữa các tỉnh rất phổ biến ("An Bình", "Tân Hưng")
            if cand["province"] and r["province"] and cand["province"] != r["province"]:
                continue
            d = km_apart(cand, r)
            if d is not None and d > 5:
                continue
            hit = cand
            break

        if hit:
            dupes += 1
            # nguồn 2 có giờ lễ theo từng thứ -> ưu tiên giờ lễ của nó
            for k in ("weekdayMass", "sundayMass", "byDay"):
                if r.get(k):
                    hit[k] = r[k]
            # các trường còn lại chỉ dùng để lấp chỗ trống, không đè.
            # deanery BẮT BUỘC có mặt ở đây: giole.vn (nguồn chính) không có trường
            # này, bỏ sót thì nhãn Giáo hạt của nguồn khác mất sạch khi gộp.
            for k in ("diocese", "deanery", "province", "address", "lat", "lng"):
                if not hit.get(k) and r.get(k):
                    hit[k] = r[k]
        else:
            merged.append(r)
            index.setdefault(name_key(r), []).append(r)
    return merged, dupes


def main():
    print("Nguồn 3 (chính): giole.vn — quét theo tỉnh/thành...")
    base = fetch_giolevn()
    n_times = sum(1 for r in base if r["weekdayMass"] or r["saturdayMass"] or r["sundayMass"])
    print(f"   {len(base)} nhà thờ ({n_times} đã có giờ lễ, {len(base) - n_times} chưa khai)\n")

    print("Tải danh mục Giáo phận / Giáo hạt / Tỉnh thành...")
    states = fetch_terms("property_state")   # chứa cả "Giáo phận X" lẫn "Giáo hạt Y"
    cities = fetch_terms("property_city")    # tỉnh/thành

    print("Tải danh sách nhà thờ...")
    raw = fetch_churches()

    rows, skipped = [], 0
    for p in raw:
        meta = p.get("property_meta") or {}
        names = [states.get(i, "") for i in p.get("property_state") or []]
        diocese = norm_diocese(next((n for n in names if n.startswith("Giáo phận")), ""),
                               clean(p["title"]["rendered"]))
        deanery = next((n for n in names if n.startswith("Giáo hạt")), "")

        sunday = norm_times(meta.get(META_SUNDAY))
        weekday = norm_times(meta.get(META_WEEKDAY))
        generic = norm_times(meta.get(META_GENERIC))
        # Nhà thờ chỉ khai báo 1 danh sách gộp -> coi như giờ lễ Chúa Nhật
        if not sunday and generic:
            sunday = generic

        if not sunday and not weekday:
            skipped += 1
            continue

        addr = (meta.get("fave_property_address") or [""])[0].strip()
        map_addr = (meta.get("fave_property_map_address") or [""])[0].strip()
        province = norm_province(next((cities[i] for i in p.get("property_city") or [] if i in cities), ""))
        lat = (meta.get("houzez_geolocation_lat") or [""])[0]
        lng = (meta.get("houzez_geolocation_long") or [""])[0]

        rows.append({
            "id": f"gtl-{p['id']}",
            "parish": clean(p["title"]["rendered"]),
            "diocese": diocese,
            "deanery": deanery,
            "province": norm_province(province),
            "address": ", ".join(x for x in [addr, province] if x) or map_addr,
            "weekdayMass": weekday,
            "sundayMass": sunday,
            "lat": float(lat) if lat else None,
            "lng": float(lng) if lng else None,
            "source": p["link"],
        })

    print(f"   nguồn 1 (giothanhle.net): {len(rows)} nhà thờ có giờ lễ")

    print("Tải nguồn 2 (gioleconggiao.com)...")
    try:
        extra = fetch_gioleconggiao()
        rows, dupes = merge(rows, extra)
        print(f"   nguồn 2: {len(extra)} nhà thờ ({dupes} trùng đã gộp vào nguồn 1)")
    except Exception as e:
        print(f"   ! bỏ qua nguồn 2: {e}", file=sys.stderr)

    print("Tải nguồn 4 (tgpsaigon.net)...")
    try:
        sg = fetch_tgpsaigon()
        rows, dupes = merge(rows, sg)
        print(f"   nguồn 4: {len(sg)} giáo xứ TGP Sài Gòn ({dupes} trùng)")
    except Exception as e:
        print(f"   ! bỏ qua nguồn 4: {e}", file=sys.stderr)

    # giole.vn phủ rộng nhất nhưng không có Giáo phận/Giáo hạt/giờ theo từng thứ.
    # Gộp 2 nguồn kia vào để bổ sung đúng những trường đó.
    rows, dupes = merge(base, rows)
    print(f"\nGộp: {len(base)} (giole.vn) + phần còn lại -> {len(rows)} ({dupes} trùng đã hợp nhất)")

    print("\nGắn nhãn Giáo phận / Giáo hạt từ danh bạ có phân cấp...")
    try:
        index = fetch_parish_directory()
        a, amb = label_dioceses(rows, index)
        out = drop_geographic_outliers(rows)
        print(f"   gắn thêm {a} nhà thờ ({amb} tên trùng nhiều giáo phận, chưa quyết được)")
        print(f"   bỏ {out} nhãn do nhà thờ nằm quá xa phần còn lại của giáo phận (trùng tên)")
    except Exception as e:
        print(f"   ! bỏ qua bước gắn nhãn: {e}", file=sys.stderr)

    rows.sort(key=lambda r: (r["diocese"] or "zz", r["deanery"], r["parish"]))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")

    by_diocese = {}
    for r in rows:
        key = r["diocese"] or "(chưa rõ giáo phận)"
        by_diocese[key] = by_diocese.get(key, 0) + 1

    print(f"\n-> {OUT}")
    with_times = sum(1 for r in rows if r["weekdayMass"] or r.get("saturdayMass") or r["sundayMass"])
    print(f"   {len(rows)} nhà thờ — {with_times} có giờ lễ, {len(rows) - with_times} chưa khai")
    print(f"   {sum(1 for r in rows if r.get('byDay'))} có giờ lễ chi tiết theo từng thứ")
    print(f"   {sum(1 for r in rows if r['province'])} có tỉnh/thành, {sum(1 for r in rows if r['diocese'])} có giáo phận")
    covered = sorted(set(by_diocese) & set(DIOCESES))
    print(f"   Phủ {len(covered)}/27 giáo phận. Còn trống: {', '.join(sorted(set(DIOCESES) - set(covered))) or 'không'}")
    print("   Theo giáo phận:")
    for d, n in sorted(by_diocese.items(), key=lambda x: -x[1]):
        print(f"     {n:4d}  {d}")


if __name__ == "__main__":
    if "--check" in sys.argv:
        _self_check()
    else:
        main()
