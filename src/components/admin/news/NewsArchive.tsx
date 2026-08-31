"use client";
import { FaCalendarAlt, FaSearch, FaThumbtack, FaEdit, FaTrashAlt } from 'react-icons/fa';

interface ArchiveProps {
  archiveData: any[];
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  filterCategory: string;
  setFilterCategory: (c: string) => void;
  onTogglePin: (item: any) => void;
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
  editingId: number | null;
}

export default function NewsArchive({ 
  archiveData, searchTerm, setSearchTerm, filterCategory, setFilterCategory, onTogglePin, onEdit, onDelete, editingId 
}: ArchiveProps) {
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200">
      <div className="p-8 border-b bg-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <h2 className="text-xl font-black text-[#1e1b4b] flex items-center gap-2 italic">
          <FaCalendarAlt className="text-[#c5a059]" /> أرشيف الأخبار والتحكم
        </h2>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="ابحث في الأرشيف..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full pr-12 pl-4 py-4 bg-white border-2 border-slate-200 rounded-2xl outline-none font-black text-sm" 
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <tbody className="divide-y divide-slate-100">
            {archiveData.map((item) => (
              <tr key={item.id} className={`hover:bg-amber-50/30 transition-all ${editingId === item.id ? 'bg-amber-50' : ''}`}>
                <td className="p-6">
                  <div className="flex items-center gap-5">
                    <img src={item.image} className="w-16 h-16 rounded-2xl object-cover shadow-md" alt="" />
                    <div>
                      <span className="font-black text-[#1e1b4b] text-base block mb-1">{item.title}</span>
                      <span className="text-[10px] font-bold text-slate-400">📅 {item.date} | 📂 {item.category}</span>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => onTogglePin(item)} className={`px-5 py-2.5 rounded-2xl font-black text-[11px] ${item.is_pinned ? 'bg-[#c5a059] text-[#1e1b4b]' : 'bg-[#1e1b4b] text-[#c5a059]'}`}>
                      <FaThumbtack className={item.is_pinned ? "rotate-45" : ""} /> {item.is_pinned ? "مثبت" : "تثبيت"}
                    </button>
                    <button onClick={() => onEdit(item)} className="p-3.5 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-600 hover:text-white"><FaEdit /></button>
                    <button onClick={() => onDelete(item.id)} className="p-3.5 bg-red-100 text-red-700 rounded-xl hover:bg-red-600 hover:text-white"><FaTrashAlt /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}