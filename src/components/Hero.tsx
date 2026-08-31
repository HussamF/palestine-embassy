"use client";
import { useState, useRef, useEffect } from 'react';
import { 
  FaFingerprint, 
  FaPassport, 
  FaFileSignature, 
  FaScaleBalanced, 
  FaPen, 
  FaChevronDown,
  FaBuildingUser
} from 'react-icons/fa6';

interface HeroProps {
  onBookClick: (service: string) => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const services = [
    { name: "جواز سفر - حملة الهوية الفلسطينية", icon: <FaFingerprint className="w-4 h-4" /> },
    { name: "جواز سفر (خارجي) حملة الوثائق", icon: <FaPassport className="w-4 h-4" /> },
    { name: "إفادات للسفارة المصرية والكتب المصدقة", icon: <FaFileSignature className="w-4 h-4" /> },
    { name: "وكالات عدلية", icon: <FaScaleBalanced className="w-4 h-4" /> },
    { name: "التصديقات", icon: <FaPen className="w-4 h-4" /> },
    { name: "مجمع الثمامة", icon: <FaBuildingUser className="w-4 h-4" /> },
  ];

  return (
    <section 
      className="relative bg-gradient-to-b from-[#312e81] to-[#1e1b4b] w-full h-auto lg:h-[650px] 2xl:h-[750px] flex items-center justify-center pt-32 md:pt-40 lg:pt-20 pb-16 lg:pb-0" 
      style={{ zIndex: 50 }}
      dir="rtl"
    >
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 lg:w-96 lg:h-96 bg-[#c5a059] rounded-full blur-[80px] lg:blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        <div className="lg:flex lg:items-center lg:justify-between gap-12">
          
          <div className="w-full lg:w-3/5 text-right flex flex-col justify-center">
            <span className="inline-block w-fit px-4 py-1.5 bg-white/10 text-[#c5a059] rounded-full text-xs sm:text-sm font-bold mb-6 border border-white/10 tracking-wide">
              نظام الخدمات القنصلية الإلكتروني 2026
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-black text-white leading-[1.15] mb-8">
              أهلاً بكم في
              <span className="block mt-6 text-[#c5a059] drop-shadow-sm">سفارة دولة فلسطين</span>
            </h1>

            <p className="text-white/60 text-lg font-medium mb-10 max-w-xl leading-relaxed hidden lg:block">
              نعمل على تسهيل معاملاتكم القنصلية من خلال نظام حجز المواعيد المطور. اختر خدمتك وابدأ الآن.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mb-12 lg:mb-0">
              <button className="px-10 py-5 bg-[#c5a059] text-[#1e1b4b] rounded-2xl font-black hover:bg-white hover:scale-105 transition-all text-center shadow-2xl shadow-[#c5a059]/20">
                تسجيل الدخول 
              </button>
              <button className="px-10 py-5 border-2 border-white/20 text-white rounded-2xl font-black hover:bg-white/10 hover:border-white transition-all text-center">
                إنشاء حساب جديد
              </button>
            </div>
          </div>

          <div className="w-full lg:w-2/5 mt-8 lg:mt-0 flex items-center justify-center relative z-30">
            <div className="bg-white p-8 sm:p-10 rounded-[3rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 w-full relative overflow-visible">
              
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight text-right">حجز موعد</h3>
              <p className="text-slate-400 mb-6 text-sm font-bold text-right">يرجى اختيار نوع المعاملة</p>
              
              <div className="space-y-4" ref={dropdownRef}>
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-[1.5rem] border-2 transition-all duration-300
                      ${isOpen ? "border-[#c5a059] bg-white ring-4 ring-[#c5a059]/5" : "border-slate-100 bg-slate-50 hover:border-slate-200"}`}
                  >
                    <span className={`font-black text-sm sm:text-base ${selectedService ? "text-slate-900" : "text-slate-400"}`}>
                      {selectedService || "اختر نوع المعاملة..."}
                    </span>
                    <FaChevronDown className={`w-4 h-4 text-[#c5a059] transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-[95vw] md:w-full mt-2 bg-white border border-slate-100 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.25)] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300" 
                         style={{ zIndex: 9999 }}>
                      <div className="max-h-[300px] overflow-y-auto custom-scrollbar bg-white">
                        {services.map((service, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setSelectedService(service.name);
                              setIsOpen(false);
                            }}
                            className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-none transition-all group whitespace-nowrap"
                          >
                            {/* استعادة الهوفر الذهبي الأصلي */}
                            <div className="w-8 h-8 shrink-0 rounded-lg bg-slate-50 flex items-center justify-center transition-all group-hover:bg-[#c5a059] text-[#c5a059] group-hover:text-white">
                              {service.icon}
                            </div>
                            <span className="font-bold text-slate-700 text-[12px] sm:text-[13px] group-hover:text-[#1e1b4b] overflow-hidden text-ellipsis">
                              {service.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  type="button"
                  disabled={!selectedService}
                  onClick={(e) => {
                    e.preventDefault();
                    if (selectedService) onBookClick(selectedService);
                  }}
                  className={`w-full py-5 rounded-[1.5rem] font-black text-lg transition-all shadow-2xl active:scale-95 mt-2
                    ${!selectedService 
                      ? "bg-slate-100 text-slate-300 cursor-not-allowed" 
                      : "bg-[#1e1b4b] text-[#c5a059] hover:bg-[#c5a059] hover:text-[#1e1b4b] cursor-pointer shadow-indigo-900/20"
                    }`}
                >
                  {!selectedService ? "يرجى الاختيار" : "استمرار الحجز"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}