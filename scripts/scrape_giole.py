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

TIME_RE = re.compile(r"^([0-2]?\d)[:hg\.]([0-5]\d)$")

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
    """Gỡ HTML entity + tag khỏi title WordPress."""
    import html
    return re.sub(r"<[^>]+>", "", html.unescape(s or "")).strip()


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
            "province": (x.get("province") or "").strip(),
            "address": (x.get("address") or "").strip(),
            "weekdayMass": weekday,
            "sundayMass": sunday,
            "byDay": by_day,
            "lat": x.get("lat"),
            "lng": x.get("lng"),
            "source": f"https://gioleconggiao.com/nha-tho/{x['slug']}/",
        })
    return rows


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
            # các trường còn lại chỉ dùng để lấp chỗ trống, không đè
            for k in ("diocese", "province", "address", "lat", "lng"):
                if not hit.get(k) and r.get(k):
                    hit[k] = r[k]
        else:
            merged.append(r)
            index.setdefault(name_key(r), []).append(r)
    return merged, dupes


def main():
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
        province = next((cities[i] for i in p.get("property_city") or [] if i in cities), "")
        lat = (meta.get("houzez_geolocation_lat") or [""])[0]
        lng = (meta.get("houzez_geolocation_long") or [""])[0]

        rows.append({
            "id": f"gtl-{p['id']}",
            "parish": clean(p["title"]["rendered"]),
            "diocese": diocese,
            "deanery": deanery,
            "province": province,
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

    rows.sort(key=lambda r: (r["diocese"] or "zz", r["deanery"], r["parish"]))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")

    by_diocese = {}
    for r in rows:
        key = r["diocese"] or "(chưa rõ giáo phận)"
        by_diocese[key] = by_diocese.get(key, 0) + 1

    print(f"\n-> {OUT}")
    print(f"   {len(rows)} nhà thờ, {sum(1 for r in rows if r.get('byDay'))} có giờ lễ chi tiết theo từng thứ")
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
