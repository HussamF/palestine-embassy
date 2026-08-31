"use client";

import { 
  FaPhone, FaEnvelope, FaLocationDot, 
  FaFacebook, FaWhatsapp, FaInstagram, FaClock 
} from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#1e293b] text-white border-t border-[#c5a059]/30 relative font-sans" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-slate-900 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. قسم الهوية والتعريف */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src="/imgs/logo.png" alt="Logo" className="h-14 w-auto" />
              <h3 className="text-xl font-black leading-tight border-r-4 border-[#c5a059] pr-4">
                سفارة دولة <br /> <span className="text-[#c5a059]">فلسطين</span>
              </h3>
            </div>
            <p className="text-[16px] text-slate-300 leading-relaxed font-medium">
              للتواصل و لمتابعة اخبار الجالية والسفارة عبر حساباتنا على مواقع التواصل الاجتماعي
            </p>
            
            {/* أيقونات السوشيال ميديا: كلاسيك، ملونة، وبدون خلفية */}
            <div className="flex gap-6 pt-2 items-center">
              <a href="#" className="text-[#25D366] drop-shadow-md hover:drop-shadow-[0_0_8px_#25D366] transition-all duration-300 hover:-translate-y-1">
                <FaWhatsapp size={22} />
              </a>
              <a href="#" className="text-[#1877F2] drop-shadow-md hover:drop-shadow-[0_0_8px_#1877F2] transition-all duration-300 hover:-translate-y-1">
                <FaFacebook size={22} />
              </a>
              <a href="#" className="text-[#E4405F] drop-shadow-md hover:drop-shadow-[0_0_8px_#E4405F] transition-all duration-300 hover:-translate-y-1">
                <FaInstagram size={22} />
              </a>
            </div>
          </div>

          {/* 2. مركز الاستعلامات */}
          <div className="space-y-6">
            <h4 className="text-xl font-black text-[#c5a059] tracking-tight italic">الاستعلامات</h4>
            <div className="space-y-4">
              {[
                "+974 4483 2235",
                "+974 3734 8229",
                "+974 4483 2236"
              ].map((num, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <FaPhone size={11} className="text-red-600 transition-colors group-hover:text-red-400" />
                  <a href={`tel:${num.replace(/\s/g, '')}`} dir="ltr" className="text-sm font-medium text-slate-300 hover:text-white transition-colors tracking-widest">
                    {num}
                  </a>
                </div>
              ))}
              <div className="pt-3 border-t border-white/5 flex items-center gap-3 text-slate-400">
                <FaEnvelope size={14} className="text-[#c5a059]" />
                <span className="text-[14px] font-bold hover:text-white transition-colors cursor-pointer tracking-tight">info@palestine.qa</span>
              </div>
            </div>
          </div>

          {/* 3. أوقات العمل */}
          <div className="space-y-6">
            <h4 className="text-xl font-black text-[#c5a059] tracking-tight italic">ساعات العمل</h4>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-bold text-white mb-1">الأحد — الخميس</p>
                <p className="text-lg font-light text-indigo-100 tracking-widest">09:00 ص — 01:00 م</p>
              </div>
              
              <div className="bg-red-600/10 border-r-4 border-red-600 p-4 rounded-sm shadow-inner">
                <p className="text-[#fca5a5] text-[13px] font-black leading-relaxed">
                  يوم الخميس نعتذر عن استلام معاملات <br />
                  <span className="text-white underline decoration-[#c5a059] underline-offset-4 font-black text-[14px]">
                    "الجوازات الخاصة (الاستعمال الخارجي)"
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* 4. موقع السفارة */}
          <div className="space-y-6">
            <h4 className="text-xl font-black text-[#c5a059]">موقع السفارة</h4>
            <div className="h-32 w-full rounded-xl overflow-hidden border border-slate-700 shadow-xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.975422891!2d51.5284!3d25.321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE5JzE1LjYiTiA1McKwMzEnNDIuMiJF!5e0!3m2!1sar!2sqa!4v1620000000000!5m2!1sar!2sqa"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                className="grayscale-[0.4] contrast-[1.1] hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
            <div className="space-y-1 px-1">
               <p className="text-sm font-medium text-slate-300 flex items-center gap-2">
                 <FaLocationDot size={12} className="text-[#c5a059]" />
                 الدوحة، منطقة الدفنة، شارع البعثات
               </p>
            </div>
          </div>

        </div>

        {/* سطر الحقوق السفلي */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            © 2026 جميع الحقوق محفوظة | سفارة دولة فلسطين - قطر
          </p>
          <div className="text-slate-600 font-black text-[8px] tracking-widest uppercase cursor-default group">
            Designed and Developed by <span className="text-[#c5a059] italic group-hover:text-[#d4af37] transition-colors">Hussam Fanos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}