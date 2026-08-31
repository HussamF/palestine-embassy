import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowLeft, FaNewspaper } from 'react-icons/fa';

const categoryInfo: Record<string, { title: string; subtitle: string; icon: string; dbName: string | null }> = {
  'all': { title: 'مركز الأخبار', subtitle: 'الأرشيف الكامل لكافة أخبار ونشاطات السفارة', icon: '🏛️', dbName: null },
  'statements': { title: 'لقاءات وبيانات السفير', subtitle: 'التصريحات الرسمية واللقاءات الدبلوماسية لسعادة السفير فايز أبو الرب', icon: '🎙️', dbName: 'لقاءات وبيانات السفير' },
  'activities': { title: 'الفعاليات والأنشطة', subtitle: 'تغطية شاملة لفعاليات السفارة والأنشطة الثقافية والوطنية', icon: '📅', dbName: 'فعاليات وأنشطة' },
  'notices': { title: 'إخطارات رسمية', subtitle: 'الإعلانات والتنويهات الهامة الصادرة عن السفارة للجالية الفلسطينية', icon: '📢', dbName: 'إخطارات رسمية' }
};

async function getNewsData(slug: string) {
  try {
    const baseUrl = 'https://palestine-embassy.vercel.app';
    const res = await fetch(`${baseUrl}/api/news`, { cache: 'no-store' });
    if (!res.ok) return [];
    const allNews = await res.json();
    const currentCat = categoryInfo[slug];
    if (slug === 'all') return allNews;
    return allNews.filter((item: any) => item.category === currentCat.dbName);
  } catch (error) { return []; }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const currentCategory = categoryInfo[slug];
  if (!currentCategory) notFound();
  const newsData = await getNewsData(slug);

  return (
    <div className="pt-20 min-h-screen bg-white" dir="rtl">
      <div className="relative bg-[#1e1b4b] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/imgs/pattern.png')] bg-center bg-cover"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-block p-4 bg-white/5 rounded-3xl backdrop-blur-md border border-white/10 mb-6 text-4xl shadow-2xl">
            {currentCategory.icon}
          </span>
          <h1 className="text-4xl text-[#c5a059] md:text-6xl font-black mb-6 tracking-tight">{currentCategory.title}</h1>
          <p className="max-w-3xl mx-auto text-slate-300 text-lg md:text-xl font-medium leading-relaxed">{currentCategory.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {newsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {newsData.map((news: any) => (
              <Link 
                key={news.id} 
                href={`/news/${news.id}`} 
                prefetch={false} // منع التحميل المسبق لتوفير البيانات ومنع اختفاء الصور
                className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img 
                    src={news.image || '/imgs/logo.png'} 
                    alt={news.title}
                    loading="lazy" // تحميل الصور فقط عند التمرير إليها
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b4b]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <span className="text-white font-bold flex items-center gap-2">قراءة التفاصيل <FaArrowLeft className="text-[#c5a059]" /></span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-slate-400 text-xs font-bold mb-4">
                    <FaCalendarAlt className="text-[#c5a059]" />
                    {news.created_at ? new Date(news.created_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                  </div>
                  <h3 className="text-xl font-black text-[#1e1b4b] mb-4 line-clamp-2">{news.title}</h3>
                  <p className="text-slate-500 font-medium text-sm line-clamp-3 mb-6">{news.excerpt}</p>
                  <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                    <span className="text-[#1e1b4b] font-black text-xs">اقرأ المزيد</span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#1e1b4b] group-hover:text-white transition-all">
                      <FaArrowLeft size={12} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <FaNewspaper size={50} className="mx-auto text-slate-300 mb-6" />
            <h3 className="text-2xl font-black text-[#1e1b4b] mb-2">لا توجد أخبار حالياً</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [{ slug: 'all' }, { slug: 'statements' }, { slug: 'activities' }, { slug: 'notices' }];
}