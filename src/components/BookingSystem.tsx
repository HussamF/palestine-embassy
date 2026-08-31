"use client";
import { useState, useEffect } from 'react';
import { FaXmark, FaUser, FaPhone, FaIdCard, FaCalendarDays, FaClock, FaPaperPlane } from 'react-icons/fa6';

interface BookingSystemProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

export default function BookingSystem({ isOpen, onClose, serviceName }: BookingSystemProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    idNumber: '',
    date: '',
    time: ''
  });

  // 1. منع سكرول الخلفية عند فتح المودال
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const availableTimes = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("تم استلام طلبك بنجاح.");
  };

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 sm:p-6 bg-[#1e1b4b]/95 backdrop-blur-md" dir="rtl">
      {/* Container المودال مع تحديد أقصى ارتفاع وسكرول داخلي */}
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header - ثابت في الأعلى */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
          <div>
            <h3 className="text-lg md:text-xl font-black text-[#1e1b4b]">تأكيد تفاصيل الموعد</h3>
            <p className="text-[#c5a059] text-[10px] md:text-xs font-bold mt-1 tracking-wide">الخدمة: {serviceName}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-red-500 transition-all shadow-sm">
            <FaXmark size={20} />
          </button>
        </div>

        {/* Form Content - قابل للسكرول إذا كانت الشاشة صغيرة */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <form id="booking-form" onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            
            {/* الاسم الكامل */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-widest">الاسم الكامل (كما في الجواز/الهوية)</label>
              <div className="relative">
                <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c5a059]" />
                <input 
                  required
                  type="text"
                  placeholder="أدخل الاسم الثلاثي"
                  className="w-full pr-12 pl-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#c5a059] focus:bg-white focus:outline-none font-bold text-sm transition-all placeholder:text-slate-400 text-[#1e1b4b]"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* رقم الجوال */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-widest">رقم الجوال</label>
                <div className="relative">
                  <FaPhone className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c5a059]" />
                  <input 
                    required
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{8}"
                    maxLength={8}
                    placeholder="XXXXXXXX"
                    onInvalid={(e) => e.currentTarget.setCustomValidity("عذراً، يجب أن يتكون رقم الجوال من 8 أرقام")}
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                        e.currentTarget.setCustomValidity("");
                    }}
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#c5a059] focus:bg-white focus:outline-none font-bold text-sm transition-all text-left placeholder:text-slate-400 text-[#1e1b4b]"
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              {/* البطاقة القطرية */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-widest">البطاقة الشخصية القطرية</label>
                <div className="relative">
                  <FaIdCard className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c5a059]" />
                  <input 
                    required
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{11}"
                    maxLength={11}
                    placeholder="2XXXXXXXXXX"
                    onInvalid={(e) => e.currentTarget.setCustomValidity("يرجى إدخال 11 رقماً صحيحاً")}
                    onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                        e.currentTarget.setCustomValidity("");
                    }}
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#c5a059] focus:bg-white focus:outline-none font-bold text-sm transition-all text-left placeholder:text-slate-400 text-[#1e1b4b]"
                    onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* تاريخ الموعد */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-widest">تاريخ الموعد</label>
                <div className="relative">
                  <FaCalendarDays className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c5a059]" />
                  <input 
                    required
                    type="date"
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#c5a059] focus:bg-white focus:outline-none font-bold text-sm transition-all text-[#1e1b4b]"
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              {/* الوقت */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 mr-2 uppercase tracking-widest">الوقت المتاح</label>
                <div className="relative">
                  <FaClock className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c5a059]" />
                  <select 
                    required
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#c5a059] focus:bg-white focus:outline-none font-bold text-sm appearance-none transition-all text-[#1e1b4b]"
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  >
                    <option value="">اختر الوقت</option>
                    {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer - ثابت في الأسفل */}
        <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 shrink-0">
          <button 
            form="booking-form"
            type="submit"
            className="w-full bg-[#1e1b4b] text-[#c5a059] py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-[#c5a059] hover:text-[#1e1b4b] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <FaPaperPlane className="text-xl" />
            تأكيد الحجز واستلام الرسالة
          </button>
        </div>
      </div>
    </div>
  );
}