"use client";
import { FaBell, FaEdit } from "react-icons/fa";

interface AlertProps {
  alertText: string;
  setAlertText: (t: string) => void;
  isAlertActive: boolean;
  setIsAlertActive: (a: boolean) => void;
  alertType: "emergency" | "info";
  setAlertType: (t: "emergency" | "info") => void;
  onSave: () => void;
}

export default function AlertManager({
  alertText,
  setAlertText,
  isAlertActive,
  setIsAlertActive,
  alertType,
  setAlertType,
  onSave,
}: AlertProps) {
  return (
    <section className="max-w-7xl mx-auto mb-12 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* التحكم بالحالة */}
        <div className="p-8 lg:w-1/3 bg-slate-50 border-l border-slate-100 flex flex-col justify-center">
          <h3 className="text-lg font-black text-[#1e1b4b] mb-6 flex items-center gap-3 italic">
            <FaBell
              className={isAlertActive ? "text-green-500 animate-bounce" : "text-slate-300"}
            />
            التنبيه العلوي للموقع
          </h3>
          <div className="space-y-4">
            <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
              <button
                onClick={() => setIsAlertActive(true)}
                className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${isAlertActive ? "bg-[#1e1b4b] text-[#c5a059] shadow-md" : "text-slate-400"}`}
              >
                تفعيل
              </button>
              <button
                onClick={() => setIsAlertActive(false)}
                className={`flex-1 py-3 rounded-xl font-black text-xs transition-all ${!isAlertActive ? "bg-red-600 text-white shadow-md" : "text-slate-400"}`}
              >
                تعطيل
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setAlertType("emergency")}
                className={`p-3 rounded-xl border-2 font-black text-[10px] transition-all ${alertType === "emergency" ? "border-red-500 bg-red-50 text-red-600" : "border-slate-100 text-slate-400"}`}
              >
                حالة طارئة
              </button>
              <button
                onClick={() => setAlertType("info")}
                className={`p-3 rounded-xl border-2 font-black text-[10px] transition-all ${alertType === "info" ? "border-blue-500 bg-blue-50 text-blue-600" : "border-slate-100 text-slate-400"}`}
              >
                تنبيه عام
              </button>
            </div>
          </div>
        </div>
        {/* مدخل النص */}
        <div className="p-8 lg:w-2/3 flex flex-col justify-center bg-white">
          <label className="text-[10px] font-black text-slate-400 mb-3 mr-2 flex items-center gap-2">
            <FaEdit /> نص التنبيه المباشر:
          </label>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={alertText}
              onChange={(e) => setAlertText(e.target.value)}
              className="flex-1 p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#c5a059] outline-none font-bold text-[#1e1b4b] text-lg transition-all shadow-inner"
            />
            <button
              onClick={onSave}
              className="bg-[#1e1b4b] text-[#c5a059] px-10 rounded-2xl font-black text-sm hover:bg-[#c5a059] hover:text-[#1e1b4b] transition-all shadow-lg active:scale-95"
            >
              حفظ ونشر
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
