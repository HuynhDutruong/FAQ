'use client';
import React, { useState } from 'react';
import { X, Send, CheckCircle, Church, Clock, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { MassTime, parseTimes, submitMassTimeFeedback } from '@/lib/massTimes';
import { ALL_DIOCESES, dioceseLabel } from '@/lib/dioceses';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetParish?: MassTime | null;
  defaultDiocese?: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '10px',
  border: '1px solid var(--color-input-border)',
  backgroundColor: 'var(--color-input-bg)',
  fontSize: '0.95rem',
  color: 'var(--color-input-text)',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '4px',
  fontWeight: 600,
  fontSize: '0.85rem',
  color: 'var(--color-dark)',
  letterSpacing: '0.2px'
};

function FeedbackFormContent({
  targetParish,
  defaultDiocese,
  onClose
}: {
  targetParish?: MassTime | null;
  defaultDiocese: string;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const isEdit = !!targetParish;

  const [parish, setParish] = useState(targetParish?.parish || '');
  const [diocese, setDiocese] = useState(targetParish?.diocese || defaultDiocese || '');
  const [deanery, setDeanery] = useState(targetParish?.deanery || '');
  const [province, setProvince] = useState(targetParish?.province || '');
  const [address, setAddress] = useState(targetParish?.address || '');
  const [weekdayMassStr, setWeekdayMassStr] = useState((targetParish?.weekdayMass || []).join(', '));
  const [saturdayMassStr, setSaturdayMassStr] = useState((targetParish?.saturdayMass || []).join(', '));
  const [sundayMassStr, setSundayMassStr] = useState((targetParish?.sundayMass || []).join(', '));
  const [note, setNote] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!parish.trim()) {
      setError('Vui lòng nhập tên Giáo xứ / Nhà thờ.');
      return;
    }
    if (!diocese.trim()) {
      setError('Vui lòng chọn hoặc nhập Giáo phận.');
      return;
    }
    if (!province.trim()) {
      setError('Vui lòng nhập Tỉnh / Thành phố.');
      return;
    }

    const weekdayMass = parseTimes(weekdayMassStr);
    const saturdayMass = parseTimes(saturdayMassStr);
    const sundayMass = parseTimes(sundayMassStr);

    if (weekdayMass.length === 0 && saturdayMass.length === 0 && sundayMass.length === 0) {
      setError('Vui lòng nhập ít nhất một khung giờ lễ (VD: 05:00, 17:30).');
      return;
    }

    setLoading(true);

    try {
      await submitMassTimeFeedback({
        type: isEdit ? 'suggest_edit' : 'suggest_new',
        targetMassTimeId: targetParish?.id,
        parish: parish.trim(),
        diocese: diocese.trim(),
        deanery: deanery.trim(),
        province: province.trim(),
        address: address.trim(),
        weekdayMass,
        saturdayMass: saturdayMass.length > 0 ? saturdayMass : undefined,
        sundayMass,
        note: note.trim(),
        contactName: contactName.trim(),
        contactPhone: contactPhone.trim()
      });

      setSuccess(true);
    } catch (err: unknown) {
      console.error('Error submitting feedback:', err);
      setError(err instanceof Error ? err.message : t.feedbackErrorSubmit);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '32px 16px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}
        >
          <CheckCircle size={36} />
        </div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
          Gửi Thông Tin Thành Công!
        </h3>
        <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '24px' }}>
          {t.feedbackSuccessMessage}
        </p>
        <button
          onClick={onClose}
          style={{
            padding: '10px 24px',
            backgroundColor: 'var(--color-red)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem'
          }}
        >
          Đóng
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: isEdit ? 'rgba(211, 47, 47, 0.1)' : 'rgba(251, 192, 45, 0.2)',
            color: isEdit ? 'var(--color-red)' : '#B45309',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Church size={22} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>
            {isEdit ? t.feedbackModalTitleEdit : t.feedbackModalTitleAdd}
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '2px' }}>
            {isEdit
              ? 'Đề xuất sửa đổi giờ lễ hoặc địa chỉ của giáo xứ này'
              : 'Đóng góp giáo xứ mới chưa có trong hệ thống'}
          </p>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: '12px 14px',
            backgroundColor: '#FEE2E2',
            color: '#991B1B',
            borderRadius: '10px',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '14px' }}>
        <div>
          <label style={labelStyle}>Tên Giáo xứ / Nhà thờ *</label>
          <input
            style={inputStyle}
            value={parish}
            onChange={(e) => setParish(e.target.value)}
            placeholder="VD: Giáo xứ Tân Định"
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Giáo phận *</label>
          <select
            style={inputStyle}
            value={diocese}
            onChange={(e) => setDiocese(e.target.value)}
            required
          >
            <option value="">-- Chọn Giáo phận --</option>
            {ALL_DIOCESES.map((d) => (
              <option key={d} value={d}>
                {dioceseLabel(d)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '14px' }}>
        <div>
          <label style={labelStyle}>Giáo hạt (nếu biết)</label>
          <input
            style={inputStyle}
            value={deanery}
            onChange={(e) => setDeanery(e.target.value)}
            placeholder="VD: Tân Định, Gia Định..."
          />
        </div>

        <div>
          <label style={labelStyle}>Tỉnh / Thành phố *</label>
          <input
            style={inputStyle}
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            placeholder="VD: TP. Hồ Chí Minh, Tiền Giang..."
            required
          />
        </div>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <label style={labelStyle}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={14} /> Địa chỉ chi tiết
          </span>
        </label>
        <input
          style={inputStyle}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="VD: 289 Hai Bà Trưng, Phường 8, Quận 3..."
        />
      </div>

      {/* Mass Times Inputs */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          borderRadius: '12px',
          padding: '14px',
          marginBottom: '14px',
          border: '1px solid rgba(0, 0, 0, 0.06)'
        }}
      >
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={15} /> Giờ lễ (nhập cách nhau bằng dấu phẩy, VD: 05:00, 17:30)
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          <div>
            <label style={{ ...labelStyle, fontSize: '0.8rem', color: '#4B5563' }}>
              Ngày thường (Thứ 2 - Thứ 6 / Thứ 7 sáng)
            </label>
            <input
              style={inputStyle}
              value={weekdayMassStr}
              onChange={(e) => setWeekdayMassStr(e.target.value)}
              placeholder="VD: 05:00, 17:30"
            />
          </div>

          <div>
            <label style={{ ...labelStyle, fontSize: '0.8rem', color: '#4B5563' }}>
              Chiều Thứ Bảy (Lễ Vọng Chúa Nhật - nếu có)
            </label>
            <input
              style={inputStyle}
              value={saturdayMassStr}
              onChange={(e) => setSaturdayMassStr(e.target.value)}
              placeholder="VD: 18:00, 19:30"
            />
          </div>

          <div>
            <label style={{ ...labelStyle, fontSize: '0.8rem', color: 'var(--color-red)' }}>
              Chúa Nhật *
            </label>
            <input
              style={inputStyle}
              value={sundayMassStr}
              onChange={(e) => setSundayMassStr(e.target.value)}
              placeholder="VD: 05:00, 07:00, 16:30, 18:00"
            />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <label style={labelStyle}>Ghi chú / Nguồn thông tin (lý do sửa, link bài viết...)</label>
        <textarea
          style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="VD: Giờ lễ áp dụng từ tháng 10/2024 theo thông báo của Giáo xứ..."
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        <div>
          <label style={labelStyle}>Tên người gửi (tuỳ chọn)</label>
          <input
            style={inputStyle}
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="VD: Giuse Nguyễn Văn A"
          />
        </div>

        <div>
          <label style={labelStyle}>Số điện thoại (tuỳ chọn)</label>
          <input
            style={inputStyle}
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="VD: 0901234567"
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          style={{
            padding: '10px 18px',
            backgroundColor: '#F3F4F6',
            color: '#374151',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Huỷ
        </button>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 22px',
            backgroundColor: 'var(--color-red)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: loading ? 0.7 : 1,
            boxShadow: '0 4px 12px rgba(211, 47, 47, 0.25)'
          }}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="spin" /> Đang gửi...
            </>
          ) : (
            <>
              <Send size={18} /> Gửi Phản Hồi
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default function MassTimeFeedbackModal({
  isOpen,
  onClose,
  targetParish,
  defaultDiocese = ''
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        className="liquid-glass"
        style={{
          width: '100%',
          maxWidth: '620px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '28px 24px',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(0, 0, 0, 0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#4B5563',
            transition: 'all 0.2s'
          }}
          aria-label="Đóng"
        >
          <X size={20} />
        </button>

        <FeedbackFormContent
          key={targetParish?.id ?? 'new-form'}
          targetParish={targetParish}
          defaultDiocese={defaultDiocese}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
