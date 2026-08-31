import { FaCalendarAlt, FaShareAlt, FaVideo, FaImages } from 'react-icons/fa';
import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';

// 1. جلب البيانات الحقيقية من Neon
async function getSingleNews(id: string) {
  try {
    // جلب الخبر الأساسي
    const { rows } = await sql`SELECT * FROM news WHERE id = ${id}`;
    if (rows.length === 0) return null;

    const news = rows[0];

    // جلب الصور الإضافية من جدول news_images
    const { rows: images } = await sql`SELECT image_url FROM news_images WHERE news_id = ${id}`;

    return {
      id: news.id,
      title: news.title,
      date: new Date(news.created_at).toLocaleDateString('ar-EG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      content: news.content,
      category: news.category,
      mainImage: news.image,
      gallery: images.map(img => img.image_url),
      videoUrl: news.video_url || "" // تأكد من وجود عمود video_url في جدولك
    };
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

// 2. المكون الرئيسي مع حل مشكلة الـ Promise في params
export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // فك تغليف params (إلزامي في إصدارات Next.js الجديدة)
  const resolvedParams = await params;
  const news = await getSingleNews(resolvedParams.id);

  // إذا لم يتم العثور على الخبر
  if (!news) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-20" dir="rtl">
      {/* Header الخبر */}
      <div className="pt-32 pb-12 px-4 max-w-4xl mx-auto text-right">
        <div className="flex items-center gap-2 text-[#c5a059] font-black text-sm mb-4">
          <span className="bg-[#c5a059]/10 px-4 py-1.5 rounded-full">{news.category || 'أخبار السفارة'}</span>
          <span className="flex items-center gap-1">
            <FaCalendarAlt /> {news.date}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-[#1e1b4b] leading-tight mb-8 italic">
          {news.title}
        </h1>
      </div>

      {/* الصورة الرئيسية */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[400px] md:h-[600px] border-4 border-white bg-slate-100">
          <img 
            src={news.mainImage || "/imgs/placeholder.jpg"} 
            alt={news.title} 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>

      {/* محتوى الخبر */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="prose prose-xl prose-slate max-w-none text-right mb-16">
          {/* عرض المحتوى مع دعم الـ HTML إذا كنت تستخدم Rich Text Editor */}
          <div 
            className="text-slate-700 leading-[2.2] text-xl font-medium whitespace-pre-line border-r-4 border-slate-100 pr-6"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </div>

        {/* معرض الصور - يظهر من الداتابيز */}
        {news.gallery && news.gallery.length > 0 && (
          <div className="mt-20 p-8 bg-slate-50 rounded-[3rem]">
            <h3 className="flex items-center gap-2 text-2xl font-black text-[#1e1b4b] mb-8 border-r-4 border-[#c5a059] pr-4">
              <FaImages className="text-[#c5a059]" /> معرض الصور الفوتوغرافية
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.gallery.map((img, index) => (
                <div key={index} className="rounded-3xl overflow-hidden h-56 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border-4 border-white">
                  <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* قسم الفيديو - ديناميكي من السيرفر */}
        {news.videoUrl && news.videoUrl.trim() !== "" && (
          <div className="mt-20">
            <h3 className="flex items-center gap-2 text-2xl font-black text-[#1e1b4b] mb-8 border-r-4 border-[#c5a059] pr-4">
              <FaVideo className="text-[#c5a059]" /> التغطية المرئية للحدث
            </h3>
            <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <iframe 
                className="w-full h-full"
                src={news.videoUrl.replace("watch?v=", "embed/")} 
                title="Video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* تذييل الخبر */}
        <div className="mt-20 pt-8 border-t-2 border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
            <button className="flex items-center gap-3 bg-[#1e1b4b] text-white px-8 py-4 rounded-full font-bold hover:bg-[#c5a059] hover:text-[#1e1b4b] transition-all shadow-lg group">
                <FaShareAlt className="group-hover:rotate-12 transition-transform" /> مشاركة هذا الخبر
            </button>
            <div className="text-slate-400 font-bold text-sm bg-slate-50 px-6 py-2 rounded-full italic">
                سفارة دولة فلسطين لدى دولة قطر
            </div>
        </div>
      </div>
    </div>
  );
}