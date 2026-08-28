'use client';
import React, { useState } from 'react';
import { X, Send, CheckCircle, Church, Clock, MapPin, AlertCircle, Loader2, User, Phone, FileText } from 'lucide-react';
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
  padding: '11px 14px',
  borderRadius: '8px',
  border: '1px solid var(--color-input-border)',
  backgroundColor: 'var(--color-input-bg)',
  fontSize: '0.92rem',
  color: 'var(--color-input-text)',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s, box-shadow 0.2s'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '6px',
  fontWeight: 700,
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
        saturdayMass: saturdayMass || [],
        sundayMass,
        note: note.trim(),
        contactName: contactName.trim(),
        contactPhone: contactPhone.trim()
      });

      setSuccess(true);
    } catch (err: unknown) {
      console.error('Error submitting feedback:', err);
      setError(err instanceof Error ? err.message : (t?.feedbackErrorSubmit || 'Có lỗi xảy ra khi gửi thông tin.'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '36px 16px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}
        >
          <CheckCircle size={36} />
        </div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-dark)', marginBottom: '8px' }}>
          Gửi Thông Tin Thành Công!
        </h3>
        <p style={{ color: 'var(--color-muted)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '24px', maxWidth: '380px', margin: '0 auto 24px' }}>
          Cảm ơn bạn đã đóng góp thông tin cho cộng đoàn. Ban quản trị sẽ đối chiếu và cập nhật sớm nhất.
        </p>
        <button
          onClick={onClose}
          style={{
            padding: '10px 28px',
            backgroundColor: 'var(--color-red)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.92rem'
          }}
        >
          Đóng cửa sổ
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      
      {/* Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              backgroundColor: isEdit ? 'rgba(211, 47, 47, 0.1)' : 'rgba(217, 119, 6, 0.1)',
              color: isEdit ? 'var(--color-red)' : '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Church size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-dark)', margin: 0 }}>
              {isEdit ? 'Yêu Cầu Chỉnh Sửa Giờ Lễ' : 'Đóng Góp Giáo Xứ Mới'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-subtle)', margin: '2px 0 0' }}>
              {isEdit
                ? `Đề xuất điều chỉnh thông tin cho ${targetParish?.parish}`
                : 'Bổ sung nhà thờ / giáo xứ mới vào hệ thống tra cứu'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-subtle)',
            cursor: 'pointer',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={20} />
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: '12px 14px',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            color: 'var(--color-red)',
            borderRadius: '8px',
            fontSize: '0.88rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Basic Parish Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Tên Giáo xứ / Nhà thờ <span style={{ color: 'var(--color-red)' }}>*</span></label>
            <input
              style={inputStyle}
              value={parish}
              onChange={(e) => setParish(e.target.value)}
              placeholder="VD: Giáo xứ Tân Định"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Giáo phận <span style={{ color: 'var(--color-red)' }}>*</span></label>
            <select
              style={{ ...inputStyle, cursor: 'pointer' }}
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Giáo hạt (nếu biết)</label>
            <input
              style={inputStyle}
              value={deanery}
              onChange={(e) => setDeanery(e.target.value)}
              placeholder="VD: Tân Định, Mỹ Tho..."
            />
          </div>

          <div>
            <label style={labelStyle}>Tỉnh / Thành phố <span style={{ color: 'var(--color-red)' }}>*</span></label>
            <input
              style={inputStyle}
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              placeholder="VD: TP. Hồ Chí Minh, Tiền Giang..."
              required
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={14} color="var(--color-red)" /> Địa chỉ chi tiết
            </span>
          </label>
          <input
            style={inputStyle}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="VD: 289 Hai Bà Trưng, Phường 8, Quận 3..."
          />
        </div>
      </div>

      {/* 2. Mass Times Schedule Inputs */}
      <div
        style={{
          backgroundColor: 'var(--color-btn-subtle-bg)',
          borderRadius: '10px',
          padding: '14px',
          border: '1px solid var(--color-border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={15} color="var(--color-red)" />
          <span>Lịch Giờ Thánh Lễ (Cách nhau bởi dấu phẩy, VD: 05:00, 17:30)</span>
        </div>

        <div>
          <label style={{ ...labelStyle, fontSize: '0.82rem', color: 'var(--color-muted)' }}>
            Chúa Nhật (Lễ Chính) <span style={{ color: 'var(--color-red)' }}>*</span>
          </label>
          <input
            style={inputStyle}
            value={sundayMassStr}
            onChange={(e) => setSundayMassStr(e.target.value)}
            placeholder="VD: 05:00, 07:00, 16:30, 18:00"
            required
          />
        </div>

        <div>
          <label style={{ ...labelStyle, fontSize: '0.82rem', color: 'var(--color-muted)' }}>
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
          <label style={{ ...labelStyle, fontSize: '0.82rem', color: 'var(--color-muted)' }}>
            Ngày trong tuần (Thứ 2 - Thứ 6)
          </label>
          <input
            style={inputStyle}
            value={weekdayMassStr}
            onChange={(e) => setWeekdayMassStr(e.target.value)}
            placeholder="VD: 05:00, 17:30"
          />
        </div>
      </div>

      {/* 3. Additional Note & Contact Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={labelStyle}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <FileText size={14} /> Ghi chú thêm (nguồn thông tin, lưu ý...)
            </span>
          </label>
          <textarea
            style={{ ...inputStyle, minHeight: '65px', resize: 'vertical' }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="VD: Giờ lễ áp dụng theo lịch mùa hè, có lễ tiếng Anh..."
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div>
            <label style={labelStyle}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <User size={14} /> Họ tên người gửi (tuỳ chọn)
              </span>
            </label>
            <input
              style={inputStyle}
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="VD: Giuse Nguyễn Văn A"
            />
          </div>

          <div>
            <label style={labelStyle}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Phone size={14} /> Số điện thoại liên hệ (tuỳ chọn)
              </span>
            </label>
            <input
              style={inputStyle}
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="VD: 0901234567"
            />
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--color-border-subtle)' }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '10px 18px',
            borderRadius: '8px',
            backgroundColor: 'var(--color-btn-subtle-bg)',
            color: 'var(--color-dark)',
            border: '1px solid var(--color-border-subtle)',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Huỷ
        </button>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 24px',
            borderRadius: '8px',
            backgroundColor: 'var(--color-red)',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(211, 47, 47, 0.3)',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          <span>{isEdit ? 'Gửi Yêu Cầu Chỉnh Sửa' : 'Gửi Đóng Góp'}</span>
        </button>
      </div>
    </form>
  );
}

export default function MassTimeFeedbackModal({ isOpen, onClose, targetParish, defaultDiocese = '' }: Props) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
          border: '1px solid var(--color-border-subtle)',
          padding: '24px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}
      >
        <FeedbackFormContent
          targetParish={targetParish}
          defaultDiocese={defaultDiocese}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
