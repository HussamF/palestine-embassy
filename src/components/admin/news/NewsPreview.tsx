"use client";
import { FaEye, FaDesktop, FaMobileAlt } from 'react-icons/fa';

// تعريف أنواع البيانات اللي بيحتاجها المكون
interface PreviewProps {
  previewDevice: 'desktop' | 'mobile';
  setPreviewDevice: (d: 'desktop' | 'mobile') => void;
  title: string;
  excerpt: string;
  fullContent: string;
  selectedMedia: any[];
}

export default function NewsPreview({ 
  previewDevice, 
  setPreviewDevice, 
  title, 
  excerpt, 
  fullContent, 
  selectedMedia 
}: PreviewProps) {
  return (
    <div className="max-w-7xl mx-auto mb-12">
      {/* رأس منطقة المعاينة مع أزرار التبديل */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-black text-[#1e1b4b] flex items-center gap-3 italic">
            <FaEye className="text-[#c5a059]" /> مركز المعاينة المباشرة
          </h2>
          
          <div className="flex bg-slate-200 p-1.5 rounded-2xl gap-2 shadow-inner">
            <button 
              onClick={() => setPreviewDevice('desktop')} 
              className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${previewDevice === 'desktop' ? 'bg-[#1e1b4b] text-[#c5a059] shadow-lg' : 'text-slate-500 hover:bg-slate-300'}`}
            >
              <FaDesktop /> كمبيوتر
            </button>
            <button 
              onClick={() => setPreviewDevice('mobile')} 
              className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${previewDevice === 'mobile' ? 'bg-[#1e1b4b] text-[#c5a059] shadow-lg' : 'text-slate-500 hover:bg-slate-300'}`}
            >
              <FaMobileAlt /> جوال
            </button>
          </div>
      </div>
      
      {/* جسم المعاينة - يحاكي شكل الشاشة */}
      <div className="flex flex-col items-center">
         <div className={`transition-all duration-700 bg-white shadow-2xl overflow-hidden border-8 border-slate-900 rounded-[3.5rem] relative ${previewDevice === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full max-w-5xl'}`}>
           
           {/* إطار الشاشة العلوي */}
           <div className="bg-slate-900 p-3 flex justify-between px-6 items-center">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              </div>
              <div className="bg-white/10 px-4 py-1 rounded text-[8px] text-slate-400 font-mono italic">
                {previewDevice === 'mobile' ? 'MOBILE-VIEW' : 'DESKTOP-VIEW'}
              </div>
           </div>

           {/* محتوى الخبر داخل المعاينة */}
           <div className="overflow-y-auto h-[calc(100%-40px)] text-right bg-white" dir="rtl">
              <article>
                {/* عرض الصورة الرئيسية */}
                <div className={`relative bg-slate-100 overflow-hidden ${previewDevice === 'mobile' ? 'h-[200px]' : 'h-[400px]'}`}>
                  {selectedMedia.length > 0 ? (
                    <img 
                      src={selectedMedia[0].url} 
                      className="w-full h-full object-cover" 
                      alt="Preview" 
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                      <FaEye size={40} className="opacity-20" />
                      <span className="font-black italic">بانتظار إضافة صورة...</span>
                    </div>
                  )}
                </div>

                {/* النصوص */}
                <div className="p-6 md:p-10">
                  <h3 className={`font-black text-[#1e1b4b] mb-4 leading-tight ${previewDevice === 'mobile' ? 'text-2xl' : 'text-4xl'}`}>
                    {title || "عنوان الخبر سيظهر هنا..."}
                  </h3>
                  
                  {excerpt && (
                    <div className="text-slate-500 text-sm font-bold mb-6 bg-slate-50 p-4 rounded-xl border-r-4 border-[#c5a059]">
                      {excerpt}
                    </div>
                  )}

                  {/* هذا الجزء يقرأ كود HTML الناتج من المحرر (ReactQuill) ويعرضه بتنسيقه */}
                  <div 
                    className="prose prose-slate max-w-none text-black leading-relaxed ql-editor !p-0" 
                    dangerouslySetInnerHTML={{ __html: fullContent || "<p className='text-slate-300 italic'>محتوى الخبر سيظهر هنا بمجرد الكتابة في المحرر...</p>" }} 
                  />
                </div>
              </article>
           </div>
         </div>
      </div>
    </div>
  );
}