'use client';

import React, { useState, useEffect } from 'react';
import {
  Heart,
  HelpCircle,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  BookOpen,
  Tag,
  Clock,
  Layers,
  Save
} from 'lucide-react';
import { PRAYERS, PRAYER_CATEGORIES, Prayer } from '@/lib/prayersData';
import { FAITH_FAQS, FAITH_CATEGORIES, FaithFAQ } from '@/lib/faithFAQs';
import { removeAccents } from '@/lib/textUtils';

const PRAYERS_STORAGE_KEY = 'custom_prayers_db_v1';
const FAQS_STORAGE_KEY = 'custom_faith_faqs_db_v1';

export default function PrayerAndFaqAdmin() {
  const [activeSubTab, setActiveSubTab] = useState<'kinh_nguyen' | 'van_dap'>('kinh_nguyen');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // State cho Kinh Nguyện
  const [prayersList, setPrayersList] = useState<Prayer[]>([]);
  const [editingPrayer, setEditingPrayer] = useState<Prayer | null>(null);
  const [isAddingPrayer, setIsAddingPrayer] = useState(false);
  const [prayerForm, setPrayerForm] = useState<Partial<Prayer>>({
    title: '',
    latinTitle: '',
    category: 'hang-ngay',
    isPopular: false,
    content: '',
    note: ''
  });

  // State cho Vấn Đáp Đức Tin
  const [faqsList, setFaqsList] = useState<FaithFAQ[]>([]);
  const [editingFaq, setEditingFaq] = useState<FaithFAQ | null>(null);
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [faqForm, setFaqForm] = useState<Partial<FaithFAQ>>({
    question: '',
    category: 'giao-ly',
    categoryLabel: 'Giáo Lý & Đức Tin',
    categoryIcon: '📖',
    shortAnswer: '',
    detailedAnswer: [''],
    reference: '',
    tags: []
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Khởi tạo dữ liệu
  useEffect(() => {
    try {
      const savedPrayers = localStorage.getItem(PRAYERS_STORAGE_KEY);
      if (savedPrayers) {
        setPrayersList(JSON.parse(savedPrayers));
      } else {
        setPrayersList(PRAYERS);
      }

      const savedFaqs = localStorage.getItem(FAQS_STORAGE_KEY);
      if (savedFaqs) {
        setFaqsList(JSON.parse(savedFaqs));
      } else {
        setFaqsList(FAITH_FAQS);
      }
    } catch {
      setPrayersList(PRAYERS);
      setFaqsList(FAITH_FAQS);
    }
  }, []);

  // Lưu Kinh Nguyện
  const handleSavePrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerForm.title?.trim() || !prayerForm.content?.trim()) {
      alert('Vui lòng nhập đầy đủ Tên kinh và Nội dung kinh nguyện.');
      return;
    }

    let updated: Prayer[];
    if (editingPrayer) {
      updated = prayersList.map((p) =>
        p.id === editingPrayer.id
          ? ({ ...editingPrayer, ...prayerForm } as Prayer)
          : p
      );
      showNotify(` Đã cập nhật kinh "${prayerForm.title}" thành công!`);
    } else {
      const newId = `kinh-${Date.now()}-${removeAccents(prayerForm.title || '').replace(/[^a-z0-9]/g, '-')}`;
      const newPrayer: Prayer = {
        id: newId,
        title: prayerForm.title.trim(),
        latinTitle: prayerForm.latinTitle?.trim() || undefined,
        category: prayerForm.category || 'hang-ngay',
        isPopular: !!prayerForm.isPopular,
        content: prayerForm.content.trim(),
        note: prayerForm.note?.trim() || undefined
      };
      updated = [newPrayer, ...prayersList];
      showNotify(` Đã thêm kinh mới "${newPrayer.title}" thành công!`);
    }

    setPrayersList(updated);
    try {
      localStorage.setItem(PRAYERS_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    setIsAddingPrayer(false);
    setEditingPrayer(null);
    setPrayerForm({
      title: '',
      latinTitle: '',
      category: 'hang-ngay',
      isPopular: false,
      content: '',
      note: ''
    });
  };

  const handleDeletePrayer = (prayerId: string, title: string) => {
    if (!confirm(`Bạn có chắc muốn xoá kinh "${title}"?`)) return;
    const updated = prayersList.filter((p) => p.id !== prayerId);
    setPrayersList(updated);
    try {
      localStorage.setItem(PRAYERS_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    showNotify(` Đã xoá kinh "${title}".`);
  };

  // Lưu Vấn Đáp FAQ
  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question?.trim() || !faqForm.shortAnswer?.trim()) {
      alert('Vui lòng nhập đầy đủ Câu hỏi và Câu trả lời tóm tắt.');
      return;
    }

    const catObj = FAITH_CATEGORIES.find((c) => c.id === faqForm.category) || {
      id: 'giao-ly',
      label: 'Giáo Lý & Đức Tin',
      icon: '📖'
    };

    let updated: FaithFAQ[];
    if (editingFaq) {
      updated = faqsList.map((f) =>
        f.id === editingFaq.id
          ? ({
              ...editingFaq,
              ...faqForm,
              categoryLabel: catObj.label,
              categoryIcon: catObj.icon
            } as FaithFAQ)
          : f
      );
      showNotify(` Đã cập nhật câu hỏi vấn đáp thành công!`);
    } else {
      const newId = `faq-${Date.now()}-${removeAccents(faqForm.question || '').replace(/[^a-z0-9]/g, '-')}`;
      const newFaq: FaithFAQ = {
        id: newId,
        question: faqForm.question.trim(),
        category: (faqForm.category as FaithFAQ['category']) || 'giao-ly',
        categoryLabel: catObj.label,
        categoryIcon: catObj.icon,
        shortAnswer: faqForm.shortAnswer.trim(),
        detailedAnswer: faqForm.detailedAnswer && faqForm.detailedAnswer.length > 0 ? faqForm.detailedAnswer : [faqForm.shortAnswer.trim()],
        reference: faqForm.reference?.trim() || undefined,
        tags: faqForm.tags || []
      };
      updated = [newFaq, ...faqsList];
      showNotify(` Đã thêm câu hỏi vấn đáp mới thành công!`);
    }

    setFaqsList(updated);
    try {
      localStorage.setItem(FAQS_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    setIsAddingFaq(false);
    setEditingFaq(null);
    setFaqForm({
      question: '',
      category: 'giao-ly',
      categoryLabel: 'Giáo Lý & Đức Tin',
      categoryIcon: '📖',
      shortAnswer: '',
      detailedAnswer: [''],
      reference: '',
      tags: []
    });
  };

  const handleDeleteFaq = (faqId: string, question: string) => {
    if (!confirm(`Bạn có chắc muốn xoá câu hỏi "${question}"?`)) return;
    const updated = faqsList.filter((f) => f.id !== faqId);
    setFaqsList(updated);
    try {
      localStorage.setItem(FAQS_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    showNotify(` Đã xoá câu hỏi vấn đáp.`);
  };

  // Filter prayers
  const filteredPrayers = prayersList.filter((p) => {
    const matchSearch =
      !searchQuery.trim() ||
      removeAccents(p.title).includes(removeAccents(searchQuery)) ||
      (p.latinTitle && removeAccents(p.latinTitle).includes(removeAccents(searchQuery))) ||
      removeAccents(p.content).includes(removeAccents(searchQuery));

    const matchCategory =
      categoryFilter === 'all' ||
      (categoryFilter === 'popular' && p.isPopular) ||
      p.category === categoryFilter;

    return matchSearch && matchCategory;
  });

  // Filter FAQs
  const filteredFaqs = faqsList.filter((f) => {
    const matchSearch =
      !searchQuery.trim() ||
      removeAccents(f.question).includes(removeAccents(searchQuery)) ||
      removeAccents(f.shortAnswer).includes(removeAccents(searchQuery));

    const matchCategory = categoryFilter === 'all' || f.category === categoryFilter;

    return matchSearch && matchCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Toast Notification */}
      {notification && (
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: 'rgba(5, 150, 105, 0.12)',
            border: '1px solid #059669',
            borderRadius: '12px',
            color: '#065F46',
            fontWeight: 700,
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Check size={18} />
          <span>{notification}</span>
        </div>
      )}

      {/* Header Bar: Sub-tabs and Action Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--color-border-subtle)'
        }}
      >
        {/* Toggle between Kinh Nguyện & Vấn Đáp */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => {
              setActiveSubTab('kinh_nguyen');
              setCategoryFilter('all');
              setSearchQuery('');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '10px',
              border: activeSubTab === 'kinh_nguyen' ? '1.5px solid #059669' : '1px solid var(--color-border-subtle)',
              backgroundColor: activeSubTab === 'kinh_nguyen' ? 'rgba(5, 150, 105, 0.1)' : 'var(--color-card-bg)',
              color: activeSubTab === 'kinh_nguyen' ? '#059669' : 'var(--color-dark)',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            <Heart size={16} />
            <span>Quản Lý Kinh Nguyện ({prayersList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveSubTab('van_dap');
              setCategoryFilter('all');
              setSearchQuery('');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '10px',
              border: activeSubTab === 'van_dap' ? '1.5px solid #2563EB' : '1px solid var(--color-border-subtle)',
              backgroundColor: activeSubTab === 'van_dap' ? 'rgba(37, 99, 235, 0.1)' : 'var(--color-card-bg)',
              color: activeSubTab === 'van_dap' ? '#2563EB' : 'var(--color-dark)',
              fontWeight: 800,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            <HelpCircle size={16} />
            <span>Quản Lý Vấn Đáp Đức Tin ({faqsList.length})</span>
          </button>
        </div>

        {/* Add Button */}
        {activeSubTab === 'kinh_nguyen' ? (
          <button
            type="button"
            onClick={() => {
              setEditingPrayer(null);
              setPrayerForm({
                title: '',
                latinTitle: '',
                category: 'hang-ngay',
                isPopular: false,
                content: '',
                note: ''
              });
              setIsAddingPrayer(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '10px',
              backgroundColor: '#059669',
              color: '#FFF',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <Plus size={16} />
            <span>Thêm Kinh Nguyện Mới</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setEditingFaq(null);
              setFaqForm({
                question: '',
                category: 'giao-ly',
                categoryLabel: 'Giáo Lý & Đức Tin',
                categoryIcon: '📖',
                shortAnswer: '',
                detailedAnswer: [''],
                reference: '',
                tags: []
              });
              setIsAddingFaq(true);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '10px',
              backgroundColor: '#2563EB',
              color: '#FFF',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <Plus size={16} />
            <span>Thêm Câu Hỏi Vấn Đáp Mới</span>
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. SECTION: QUẢN LÝ KINH NGUYỆN */}
      {/* ========================================================================= */}
      {activeSubTab === 'kinh_nguyen' && (
        <div>
          {/* Modal / Form Thêm & Chỉnh Sửa Kinh Nguyện */}
          {(isAddingPrayer || editingPrayer) && (
            <div
              style={{
                backgroundColor: 'var(--color-input-bg)',
                border: '1.5px solid #059669',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#059669' }}>
                  {editingPrayer ? `✏️ Chỉnh sửa: ${editingPrayer.title}` : '✨ Thêm Kinh Nguyện Mới'}
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingPrayer(false);
                    setEditingPrayer(null);
                  }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSavePrayer} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                      Tên Kinh Nguyện (Tiếng Việt) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Kinh Lạy Cha, Kinh Kính Mừng..."
                      value={prayerForm.title || ''}
                      onChange={(e) => setPrayerForm({ ...prayerForm, title: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border-subtle)',
                        backgroundColor: 'var(--color-card-bg)',
                        color: 'var(--color-dark)',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                      Tên Tiếng Latinh (Nếu có)
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Pater Noster, Ave Maria..."
                      value={prayerForm.latinTitle || ''}
                      onChange={(e) => setPrayerForm({ ...prayerForm, latinTitle: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border-subtle)',
                        backgroundColor: 'var(--color-card-bg)',
                        color: 'var(--color-dark)',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                      Chuyên Mục Phân Loại
                    </label>
                    <select
                      value={prayerForm.category || 'hang-ngay'}
                      onChange={(e) => setPrayerForm({ ...prayerForm, category: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border-subtle)',
                        backgroundColor: 'var(--color-card-bg)',
                        color: 'var(--color-dark)',
                        fontSize: '0.88rem'
                      }}
                    >
                      {PRAYER_CATEGORIES.filter((c) => c.id !== 'all' && c.id !== 'popular').map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Toàn Văn Lời Kinh Nguyện *
                  </label>
                  <textarea
                    rows={6}
                    required
                    placeholder="Nhập toàn văn lời kinh nguyện..."
                    value={prayerForm.content || ''}
                    onChange={(e) => setPrayerForm({ ...prayerForm, content: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'var(--color-card-bg)',
                      color: 'var(--color-dark)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="isPopularCheck"
                    checked={!!prayerForm.isPopular}
                    onChange={(e) => setPrayerForm({ ...prayerForm, isPopular: e.target.checked })}
                  />
                  <label htmlFor="isPopularCheck" style={{ fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>
                    Đánh dấu là Kinh Phổ Biến (Ưu tiên hiển thị đầu trang)
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingPrayer(false);
                      setEditingPrayer(null);
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'var(--color-card-bg)',
                      color: 'var(--color-dark)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '8px 20px',
                      borderRadius: '8px',
                      backgroundColor: '#059669',
                      color: '#FFF',
                      border: 'none',
                      fontWeight: 800,
                      fontSize: '0.84rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Save size={15} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    {editingPrayer ? 'Cập Nhật Lời Kinh' : 'Lưu Kinh Mới'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search & Category Filter */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <Search size={16} color="var(--color-subtle)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              <input
                type="text"
                placeholder="Tìm kiếm kinh theo tên, tiếng Latinh hoặc nội dung..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border-subtle)',
                  backgroundColor: 'var(--color-card-bg)',
                  color: 'var(--color-dark)',
                  fontSize: '0.86rem'
                }}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                padding: '9px 14px',
                borderRadius: '10px',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-dark)',
                fontSize: '0.86rem',
                fontWeight: 700
              }}
            >
              {PRAYER_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Prayers Table / List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredPrayers.length === 0 ? (
              <div style={{ padding: '30px', textAlign: 'center', color: 'var(--color-subtle)' }}>
                Không tìm thấy kinh nguyện nào khớp với tìm kiếm.
              </div>
            ) : (
              filteredPrayers.map((prayer) => (
                <div
                  key={prayer.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-card-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                        {prayer.title}
                      </span>
                      {prayer.latinTitle && (
                        <span style={{ fontSize: '0.74rem', fontStyle: 'italic', color: 'var(--color-subtle)' }}>
                          ({prayer.latinTitle})
                        </span>
                      )}
                      {prayer.isPopular && (
                        <span
                          style={{
                            fontSize: '0.66rem',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(217, 119, 6, 0.15)',
                            color: '#D97706'
                          }}
                        >
                          Phổ Biến
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.78rem',
                        color: 'var(--color-subtle)',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {prayer.content}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPrayer(prayer);
                        setPrayerForm(prayer);
                        setIsAddingPrayer(false);
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border-subtle)',
                        backgroundColor: 'var(--color-input-bg)',
                        color: 'var(--color-dark)',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Edit2 size={13} />
                      <span>Sửa</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePrayer(prayer.id, prayer.title)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(220, 38, 38, 0.3)',
                        backgroundColor: 'rgba(220, 38, 38, 0.08)',
                        color: '#DC2626',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SECTION: QUẢN LÝ VẤN ĐÁP ĐỨC TIN */}
      {/* ========================================================================= */}
      {activeSubTab === 'van_dap' && (
        <div>
          {/* Modal / Form Thêm & Chỉnh Sửa Vấn Đáp */}
          {(isAddingFaq || editingFaq) && (
            <div
              style={{
                backgroundColor: 'var(--color-input-bg)',
                border: '1.5px solid #2563EB',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#2563EB' }}>
                  {editingFaq ? `✏️ Chỉnh sửa: ${editingFaq.question}` : '✨ Thêm Câu Hỏi Vấn Đáp Mới'}
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingFaq(false);
                    setEditingFaq(null);
                  }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveFaq} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Câu Hỏi Thắc Mắc Đức Tin *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Tại sao người Công Giáo lại xưng tội với Linh mục?..."
                    value={faqForm.question || ''}
                    onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'var(--color-card-bg)',
                      color: 'var(--color-dark)',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                      Chuyên Mục
                    </label>
                    <select
                      value={faqForm.category || 'giao-ly'}
                      onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value as FaithFAQ['category'] })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border-subtle)',
                        backgroundColor: 'var(--color-card-bg)',
                        color: 'var(--color-dark)',
                        fontSize: '0.88rem'
                      }}
                    >
                      {FAITH_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                      Trích Dẫn Giáo Lý / Kinh Thánh
                    </label>
                    <input
                      type="text"
                      placeholder="VD: GLHTCG 1441-1442, Ga 20,22-23"
                      value={faqForm.reference || ''}
                      onChange={(e) => setFaqForm({ ...faqForm, reference: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border-subtle)',
                        backgroundColor: 'var(--color-card-bg)',
                        color: 'var(--color-dark)',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    Câu Trả Lời Tóm Tắt (Ngắn gọn, dễ hiểu) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tóm tắt lời giải đáp chính yếu..."
                    value={faqForm.shortAnswer || ''}
                    onChange={(e) => setFaqForm({ ...faqForm, shortAnswer: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'var(--color-card-bg)',
                      color: 'var(--color-dark)',
                      fontSize: '0.88rem',
                      lineHeight: 1.5
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingFaq(false);
                      setEditingFaq(null);
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border-subtle)',
                      backgroundColor: 'var(--color-card-bg)',
                      color: 'var(--color-dark)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '8px 20px',
                      borderRadius: '8px',
                      backgroundColor: '#2563EB',
                      color: '#FFF',
                      border: 'none',
                      fontWeight: 800,
                      fontSize: '0.84rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Save size={15} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    {editingFaq ? 'Cập Nhật Câu Trả Lời' : 'Lưu Câu Hỏi Mới'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search & Category Filter */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <Search size={16} color="var(--color-subtle)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              <input
                type="text"
                placeholder="Tìm kiếm thắc mắc giáo lý, từ khóa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 36px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border-subtle)',
                  backgroundColor: 'var(--color-card-bg)',
                  color: 'var(--color-dark)',
                  fontSize: '0.86rem'
                }}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                padding: '9px 14px',
                borderRadius: '10px',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-card-bg)',
                color: 'var(--color-dark)',
                fontSize: '0.86rem',
                fontWeight: 700
              }}
            >
              {FAITH_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* FAQs List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredFaqs.length === 0 ? (
              <div style={{ padding: '30px', textAlign: 'center', color: 'var(--color-subtle)' }}>
                Không tìm thấy câu hỏi vấn đáp nào khớp với tìm kiếm.
              </div>
            ) : (
              filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-card-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563EB', padding: '2px 8px', borderRadius: '6px', backgroundColor: 'rgba(37, 99, 235, 0.1)' }}>
                        {faq.categoryIcon} {faq.categoryLabel}
                      </span>
                      {faq.reference && (
                        <span style={{ fontSize: '0.72rem', fontStyle: 'italic', color: 'var(--color-subtle)' }}>
                          📖 {faq.reference}
                        </span>
                      )}
                    </div>
                    <h5 style={{ margin: '4px 0 6px', fontSize: '0.96rem', fontWeight: 800, color: 'var(--color-dark)' }}>
                      {faq.question}
                    </h5>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-subtle)', lineHeight: 1.45 }}>
                      {faq.shortAnswer}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFaq(faq);
                        setFaqForm(faq);
                        setIsAddingFaq(false);
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border-subtle)',
                        backgroundColor: 'var(--color-input-bg)',
                        color: 'var(--color-dark)',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Edit2 size={13} />
                      <span>Sửa</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFaq(faq.id, faq.question)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(220, 38, 38, 0.3)',
                        backgroundColor: 'rgba(220, 38, 38, 0.08)',
                        color: '#DC2626',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
