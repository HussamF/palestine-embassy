import Link from 'next/link';
import React from 'react';

// تعريف شكل البيانات (Interface)
interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

interface NewsListProps {
  title: string;
  subtitle: string;
  news: NewsItem[];
}

export default function NewsListLayout({ title, subtitle, news }: NewsListProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
      <div className="mb-12 text-right">
        <h2 className="text-3xl font-black text-[#1e1b4b] mb-2">{title}</h2>
        <p className="text-slate-500 font-bold">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item) => (
          <article key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-[#c5a059] text-[#1e1b4b] text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                فلسطين
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-2 text-slate-400 text-xs mb-3 font-bold">
                <span>📅</span>
                <span>{item.date}</span>
              </div>
              
              <h3 className="text-xl font-bold text-[#1e1b4b] mb-4 leading-snug line-clamp-2 group-hover:text-[#c5a059] transition-colors">
                {item.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                {item.excerpt}
              </p>
              
              <Link 
                href={`/news/${item.id}`} 
                className="inline-flex items-center gap-2 text-[#1e1b4b] font-black text-sm hover:gap-4 transition-all"
              >
                اقرأ التفاصيل
                <span className="text-[#c5a059]">←</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}