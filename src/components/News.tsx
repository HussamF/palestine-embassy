"use client";
import { useState, useEffect } from 'react';
import { FaPlay, FaImages } from 'react-icons/fa';
import Link from 'next/link';

interface NewsItem {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  created_at: string;
  content: string;
  image: string;      // الصورة الرئيسية
  images?: string[];  // الصور الإضافية
  is_pinned?: boolean;
}

export default function NewsSection() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // جلب البيانات الفعلية من السيرفر
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        if (res.ok) {
          const data = await res.json();
          setNewsData(data);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // تحديد الخبر الرئيسي
  const mainNews = newsData.find(n => n.is_pinned) || newsData[0];
  
  // الأخبار الجانبية
  const otherNews = newsData.filter(n => n.id !== mainNews?.id).slice(0, 5);

  // --- إصلاح الصور للسلايدر ---
  const sliderImages = mainNews 
    ? [mainNews.image, ...(mainNews.images || [])].filter(img => img && typeof img === 'string' && img.trim() !== "") 
    : [];

  // مؤقت السلايدر
  useEffect(() => {
    if (sliderImages.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [sliderImages.length]);

  if (loading) return (
    <div className="py-24 text-center font-black text-[#1e1b4b] bg-[#f8fafc]">
      جاري تحميل آخر الأخبار من السيرفر...
    </div>
  );

  if (newsData.length === 0) return null;

  return (
    <section id="news" className="py-24 bg-[#f8fafc]" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#1e1b4b] border-r-8 border-[#c5a059] pr-6">
            آخر الأخبار <span className="text-[#c5a059]">والفعاليات</span>
          </h2>
          <div className="hidden md:block h-px flex-grow bg-slate-200 mr-10"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* الجانب الأيمن: الخبر الرئيسي الديناميكي */}
          <div className="w-full lg:w-2/3">
            <article className="group bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-white flex flex-col h-full transition-all hover:shadow-amber-900/5">
              
              <div className="relative h-[400px] md:h-[550px] overflow-hidden bg-slate-200">
                {sliderImages.length > 0 ? (
                  sliderImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 group-hover:scale-105 ${
                        idx === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                      alt={mainNews?.title}
                      // معالجة الخطأ إذا كان الرابط لا يعمل
                      onError={(e) => { (e.target as HTMLImageElement).src = "/imgs/placeholder.jpg"; }}
                    />
                  ))
                ) : (
                  <div className="w-full h-full bg-slate-300 flex items-center justify-center">لا توجد صورة</div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b]/60 to-transparent"></div>

                <div className="absolute top-8 left-8 flex gap-3 z-30">
                  {sliderImages.length > 1 && (
                    <div className="bg-[#1e1b4b] text-[#c5a059] p-4 rounded-2xl shadow-xl backdrop-blur-sm bg-opacity-90">
                      <FaImages size={14} />
                    </div>
                  )}
                </div>

                <div className="absolute top-8 right-8 px-8 py-3 rounded-2xl text-xs font-black z-30 bg-white text-[#1e1b4b] shadow-2xl border-b-4 border-[#c5a059]">
                  {mainNews?.category}
                </div>

                {sliderImages.length > 1 && (
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30 bg-white/10 backdrop-blur-md p-3 rounded-3xl">
                    {sliderImages.map((_, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-10 bg-[#c5a059]' : 'w-2 bg-white/50 hover:bg-white'}`} 
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="p-12 text-right">
                <div className="flex items-center gap-3 text-slate-400 font-bold mb-4 italic">
                  <span className="w-8 h-[2px] bg-[#c5a059]"></span>
                  {mainNews && new Date(mainNews.created_at).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-[#1e1b4b] mb-6 group-hover:text-[#c5a059] transition-colors leading-tight">
                  {mainNews?.title}
                </h3>
                <p className="text-slate-600 text-xl line-clamp-2 mb-8 leading-relaxed font-medium">
                  {mainNews?.excerpt}
                </p>
                <Link href={`/news/${mainNews?.id}`}>
                  <button className="bg-[#1e1b4b] text-white font-black px-10 py-5 rounded-[2rem] hover:bg-[#c5a059] hover:text-[#1e1b4b] transition-all flex items-center gap-4 w-fit shadow-lg active:scale-95">
                    تفاصيل الخبر <span>←</span>
                  </button>
                </Link>
              </div>
            </article>
          </div>

          {/* الجانب الأيسر: الأخبار الجانبية */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-2xl font-black text-[#1e1b4b] flex items-center gap-3 italic">
                <span className="w-3 h-8 bg-[#c5a059] rounded-full"></span>
                أخبار سابقة
              </h4>
            </div>
            
            {otherNews.map((item) => (
              <Link href={`/news/${item.id}`} key={item.id}>
                <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex gap-5 items-center group transition-all hover:shadow-2xl hover:border-amber-100 cursor-pointer h-full">
                  <div className="w-28 h-28 rounded-3xl overflow-hidden shrink-0 relative bg-slate-50 border-2 border-slate-50 shadow-inner">
                    <img 
                      // تم تصحيح جلب الصورة هنا بضمان وجود قيمة
                      src={item.image || "/imgs/placeholder.jpg"} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={item.title} 
                      onError={(e) => { (e.target as HTMLImageElement).src = "/imgs/placeholder.jpg"; }}
                    />
                  </div>
                  <div className="text-right flex-1">
                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl mb-3 inline-block shadow-sm
                      ${item.category === "إخطارات" ? "bg-red-50 text-red-600 border border-red-100" : "bg-amber-50 text-[#c5a059] border border-amber-100"}`}>
                      {item.category}
                    </span>
                    <h5 className="font-black text-[#1e1b4b] text-[15px] line-clamp-2 leading-snug group-hover:text-[#c5a059] transition-colors">
                      {item.title}
                    </h5>
                    <p className="text-slate-400 text-xs mt-2 font-bold">
                      {new Date(item.created_at).toLocaleDateString('ar-EG')}
                    </p>
                  </div>
                </div>
              </Link>
            ))}

            <Link href="/news/category/all" className="block w-full">
              <button className="w-full py-6 bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-500 font-black hover:border-[#c5a059] hover:text-[#c5a059] hover:bg-amber-50/30 transition-all mt-4 shadow-sm flex items-center justify-center gap-3">
                استكشاف كافة الأخبار <span>⚡</span>
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}