"use client";
import { useState, useEffect } from 'react';
import { 
  FaFingerprint, FaPassport, FaFileSignature, FaPen, 
  FaScaleBalanced, FaXmark, FaCircleCheck, FaBuildingUser 
} from 'react-icons/fa6'; 
import BookingSystem from './BookingSystem'; 

// --- البيانات (تم الإبقاء عليها كما هي) ---
const passportHoyaCases: Record<string, string[]> = {
  "تجديد": ["جواز السفر الحالي (الأصل + صورة)", "الهوية الفلسطينية الأصلية", "الإقامة القطرية الأصلية", "4 صور شخصية حديثة (خلفية بيضاء)"],
  "أول مرة": ["شهادة الميلاد الأصلية مصدقة من الخارجية", "صورة عن هوية الأب والأم وعقد الزواج", "الإقامة القطرية الأصلية", "4 صور شخصية حديثة"],
  "بدل تالف": ["إحضار الجواز التالف (الأصل)", "صورة عن الهوية الفلسطينية والإقامة", "كتاب خطي يشرح أسباب التلف", "4 صور شخصية حديثة"],
  "بدل فاقد": ["بلاغ شرطة أصلي من السلطات القطرية", "صورة عن الجواز المفقود + صورة الهوية والإقامة", "كتاب موجه للسفارة حول ظروف الفقدان"],
  "أطفال (تحت 16)": ["حضور الأب شخصياً مع هويته الأصلية", "شهادة الميلاد الأصلية للطفل + صورة عنها", "جواز السفر القديم + الإقامة القطرية", "4 صور شخصية حديثة"],
};

const passportSpecialCases: Record<string, string[]> = {
  "تجديد": ["وثيقة السفر الحالية (الأصل + صورة)", "صورة عن الإقامة القطرية سارية المفعول", "كتاب موجه لسعادة السفير يشرح الحاجة للجواز", "4 صور شخصية حديثة"],
  "أول مرة": ["شهادة الميلاد الأصلية مصدقة", "وثائق سفر الأبوين + صور الإقامات", "4 صور شخصية حديثة", "كتاب طلب من ولي الأمر"],
  "بدل تالف": ["الوثيقة التالفة (الأصل)", "صورة عن الإقامة القطرية", "كتاب خطي حول أسباب التلف"],
  "بدل فاقد": ["بلاغ فقدان من الشرطة القطرية", "صورة عن الوثيقة المفقودة", "إثبات سكن", "كتاب للسفير"],
  "أطفال (تحت 16)": ["حضور الأب شخصياً", "شهادة الميلاد الأصلية", "جواز السفر القديم", "4 صور شخصية"],
};

// --- تحسين مفاتيح الخدمات الأخرى لتطابق العناوين في المصفوفة ---
const otherServices: Record<string, string[]> = {
  "الإفادات القنصلية": ["جواز السفر أو الهوية الأصلية", "الوثائق الداعمة للإفادة", "حضور صاحب العلاقة"],
  "التصديقات": ["الوثيقة الأصلية مصدقة من الخارجية", "صورة عن الوثيقة", "إثبات شخصية"],
  "الوكالات العدلية": ["حضور الموكل شخصياً", "بيانات الوكيل كاملة", "رسوم الوكالة المقررة"],
  "مجمع الثمامة": ["إثبات الشخصية (هوية أو جواز)", "شهادة سكن أو كتاب تخصيص", "حضور صاحب العلاقة"]
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeSubCase, setActiveSubCase] = useState<string>("تجديد");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = selectedService ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedService]);

  const consularServices = [
    { title: "جوازات سفر (حملة الهوية)", desc: "للمواطنين الفلسطينيين حملة الهوية الفلسطينية.", icon: <FaFingerprint />, tag: "دائم" },
    { title: "جواز سفر (خارجي) وثائق سفر", desc: "لحملة الوثائق الفلسطينية (الجواز الخاص).", icon: <FaPassport />, tag: "مؤقت" },
    { title: "الإفادات القنصلية", desc: "إصدار الإفادات الرسمية والكتب المصدقة.", icon: <FaFileSignature />, tag: "رسمي" },
    { title: "التصديقات", desc: "تصديق الشهادات والوثائق الرسمية المتنوعة.", icon: <FaPen />, tag: "قانوني" },
    { title: "الوكالات العدلية", desc: "تنظيم الوكالات العامة والخاصة للمواطنين.", icon: <FaScaleBalanced />, tag: "عدلي" },
    { title: "مجمع الثمامة", desc: "خدمات المجمع المخصصة للجالية الفلسطينية.", icon: <FaBuildingUser />, tag: "رعاية" },
  ];

  // --- تحسين الدوال لجلب البيانات بناءً على العنوان ---
  const getRequirements = () => {
    if (!selectedService) return [];
    
    if (selectedService === "جوازات سفر (حملة الهوية)") return passportHoyaCases[activeSubCase] || [];
    if (selectedService === "جواز سفر (خارجي) وثائق سفر") return passportSpecialCases[activeSubCase] || [];
    
    // للخدمات الأخرى، نستخدم العنوان مباشرة كمفتاح
    return otherServices[selectedService] || [];
  };

  const getSubCases = () => {
    if (selectedService === "جوازات سفر (حملة الهوية)") return Object.keys(passportHoyaCases);
    if (selectedService === "جواز سفر (خارجي) وثائق سفر") return Object.keys(passportSpecialCases);
    return [];
  };

  return (
    <section id="services" className="py-20 bg-slate-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-right mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#1e1b4b] mb-4"> الخدمات <span className="text-[#c5a059]">القنصلية</span> </h2>
          <div className="w-20 h-1.5 bg-[#c5a059] rounded-full"></div>
        </div>

        {/* Grid Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {consularServices.map((service, index) => (
            <article 
              key={index} 
              onClick={() => { 
                setSelectedService(service.title); 
                // ضبط الحالة الافتراضية للجوازات فقط
                if (service.title.includes("جواز")) {
                    setActiveSubCase("تجديد");
                }
              }} 
              className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-white flex flex-col transition-all duration-500 hover:translate-y-[-8px] hover:shadow-2xl"
            >
              <div className="p-8 md:p-10 text-right flex flex-col h-full relative">
                <div className="absolute top-6 left-6 px-3 py-1 rounded-full text-[10px] font-black z-30 bg-slate-50 text-[#c5a059] border border-slate-100 group-hover:bg-[#c5a059] group-hover:text-white transition-colors">
                  {service.tag}
                </div>
                <div className="w-14 h-14 bg-slate-50 text-[#c5a059] rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:bg-[#1e1b4b] group-hover:scale-110 transition-all duration-500 shadow-inner">
                  {service.icon}
                </div>
                <h3 className="text-xl font-black text-[#1e1b4b] mb-3 group-hover:text-[#c5a059] transition-colors leading-snug">{service.title}</h3>
                <p className="text-slate-500 text-sm font-bold leading-relaxed mb-8">{service.desc}</p>
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[#c5a059] font-black text-sm">عرض التفاصيل ←</span>
                    <span className="text-slate-100 font-black text-2xl italic">0{index + 1}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal Structure */}
        {selectedService && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-[#1e1b4b]/90 backdrop-blur-md">
            <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in duration-300">
              
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#c5a059] text-white rounded-xl flex items-center justify-center text-xl shadow-lg shadow-[#c5a059]/20">
                    {consularServices.find(s => s.title === selectedService)?.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-[#1e1b4b]">{selectedService}</h3>
                </div>
                <button onClick={() => setSelectedService(null)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm">
                  <FaXmark size={20} />
                </button>
              </div>

              {/* Modal Content - Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10">
                
                {/* 1. Sub-cases Navigation (Chips) - تظهر للجوازات فقط */}
                {getSubCases().length > 0 && (
                  <div className="mb-10 text-right">
                    <span className="block text-xs font-black text-slate-400 mb-4 mr-2 uppercase tracking-widest">نوع المعاملة المحددة:</span>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {getSubCases().map((sub) => (
                        <button 
                          key={sub} 
                          onClick={() => setActiveSubCase(sub)} 
                          className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-black transition-all border-2 ${activeSubCase === sub ? 'bg-[#1e1b4b] border-[#1e1b4b] text-[#c5a059] shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Requirements Section */}
                <div className="text-right">
                  <span className="block text-xs font-black text-slate-400 mb-6 mr-2 uppercase tracking-widest">المتطلبات والوثائق اللازمة:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getRequirements().map((req, i) => (
                      <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:border-[#c5a059]/40 hover:shadow-md transition-all group/item">
                        <div className="w-6 h-6 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 group-hover/item:bg-[#c5a059]">
                          <FaCircleCheck className="text-[#c5a059] text-sm group-hover/item:text-white transition-colors" />
                        </div>
                        <p className="text-slate-700 font-bold text-sm leading-relaxed">{req}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Note */}
                <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-4">
                    <div className="w-2 h-10 bg-amber-400 rounded-full"></div>
                    <p className="text-amber-800 text-xs md:text-sm font-bold">يرجى التأكد من إحضار أصول جميع الوثائق المذكورة أعلاه مع صور ضوئية عنها لضمان إتمام المعاملة بنجاح.</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 md:p-8 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="flex-[2] bg-[#1e1b4b] text-[#c5a059] py-5 rounded-2xl font-black hover:bg-[#c5a059] hover:text-[#1e1b4b] transition-all shadow-xl shadow-indigo-900/20 text-lg active:scale-95"
                >
                  الاستمرار لحجز الموعد
                </button>
                <button onClick={() => setSelectedService(null)} className="flex-1 py-5 bg-white border-2 border-slate-200 text-slate-500 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all">إلغاء</button>
              </div>

            </div>
          </div>
        )}
        
        <BookingSystem 
          isOpen={isBookingOpen} 
          onClose={() => setIsBookingOpen(false)} 
          serviceName={selectedService || ""} 
        />
      </div>
    </section>
  );
}