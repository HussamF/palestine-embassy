"use client";
import { FaWhatsapp } from 'react-icons/fa'; // تأكد من عمل npm install react-icons

export default function WhatsAppButton() {
  const phoneNumber = "974XXXXXXXX"; // ضع رقم السفارة هنا
  const message = "السلام عليكم، أرغب في الاستفسار عن الخدمات القنصلية";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 left-6 z-[9999] group" dir="rtl">
      {/* التلميح الذي يظهر عند الحوم بالماوس */}
      <span className="absolute bottom-full mb-4 left-0 px-4 py-2 bg-[#1e1b4b] text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-2xl border border-[#c5a059]/30 translate-y-2 group-hover:translate-y-0">
        تواصل معنا الآن
      </span>

      {/* تأثير النبض الجاذب للانتباه */}
      <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping"></span>

      {/* الزر الرئيسي */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white"
      >
        <FaWhatsapp className="text-3xl md:text-4xl" />
      </a>
    </div>
  );
}