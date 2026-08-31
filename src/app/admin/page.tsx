"use client";
import AdminNews from "@/components/AdminNews";
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]" dir="rtl">
      {/* هيدر بسيط للوحة التحكم */}
      <div className="bg-[#1e1b4b] py-6 px-8 mb-12 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black text-[#c5a059]">لوحة إدارة قسم الأخبار</h1>
          <button className="text-white text-sm bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all">خروج</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pb-20 px-6">
        <div className="mb-10 border-r-4 border-[#c5a059] pr-4">
          <h2 className="text-3xl font-black text-[#1e1b4b]">إدارة محتوى الأخبار</h2>
          <p className="text-[#64748b] font-bold mt-1">أضف خبراً جديداً ليظهر تلقائياً كخبر مميز</p>
        </div>
        
        {/* مكون إضافة الخبر */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
             <AdminNews />
        </div>

        {/* --- الإضافة الجديدة: جدول إدارة الأخبار المنشورة --- */}
        <div className="mt-16 mb-6 border-r-4 border-[#1e1b4b] pr-4">
          <h2 className="text-2xl font-black text-[#1e1b4b]">الأخبار الحالية</h2>
          <p className="text-[#64748b] font-bold mt-1">يمكنك تعديل أو حذف الأخبار من هنا</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-md border border-slate-100 overflow-hidden">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-5 text-[#1e1b4b] font-black">الخبر</th>
                <th className="p-5 text-[#1e1b4b] font-black">التصنيف</th>
                <th className="p-5 text-[#1e1b4b] font-black">العمليات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {/* مثال لخبر منشور */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-5">
                  <p className="font-bold text-[#1e1b4b] text-sm line-clamp-1">سفارة دولة فلسطين تطلق منتدى الاستثمار...</p>
                  <span className="text-[10px] text-slate-400">نُشر في: 18 يناير 2026</span>
                </td>
                <td className="p-5">
                  <span className="px-3 py-1 bg-amber-50 text-[#c5a059] text-[10px] font-black rounded-full">لقاءات السفير</span>
                </td>
                <td className="p-5">
                  <div className="flex gap-3">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors"><FaEdit size={16} /></button>
                    <button className="text-slate-400 hover:text-red-600 transition-colors"><FaTrash size={16} /></button>
                    <button className="text-slate-400 hover:text-[#c5a059] transition-colors"><FaEye size={16} /></button>
                  </div>
                </td>
              </tr>
              {/* مثال لإخطار */}
              <tr className="hover:bg-red-50/30 transition-colors">
                <td className="p-5">
                  <p className="font-bold text-red-600 text-sm line-clamp-1">تحديثات هامة بشأن التأشيرات</p>
                  <span className="text-[10px] text-slate-400">نُشر في: 17 يناير 2026</span>
                </td>
                <td className="p-5">
                  <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black rounded-full animate-pulse">إخطار</span>
                </td>
                <td className="p-5">
                  <div className="flex gap-3">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors"><FaEdit size={16} /></button>
                    <button className="text-slate-400 hover:text-red-600 transition-colors"><FaTrash size={16} /></button>
                    <button className="text-slate-400 hover:text-[#c5a059] transition-colors"><FaEye size={16} /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="p-4 bg-slate-50 text-center">
             <button className="text-[#c5a059] font-bold text-xs hover:underline">عرض جميع الأخبار (15 خبر)</button>
          </div>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-[#1e1b4b] p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <p className="text-white/60 font-bold mb-1">المواعيد المحجوزة اليوم</p>
            <p className="text-4xl font-black text-[#c5a059]">12</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border-2 border-[#c5a059]/10 shadow-sm">
            <p className="text-[#64748b] font-bold mb-1 text-right">الأخبار النشطة</p>
            <p className="text-4xl font-black text-[#1e1b4b] text-right">05</p>
          </div>
        </div>
      </div>
    </main>
  );
}