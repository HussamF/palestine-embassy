"use client";
import { useState, useRef, useEffect, useCallback } from "react";

// استيراد المكونات الفرعية
import AlertManager from "@/components/admin/news/AlertManager";
import NewsPreview from "@/components/admin/news/NewsPreview";
import NewsArchive from "@/components/admin/news/NewsArchive";
import NewsEditor from "@/components/admin/news/NewsEditor";

// استيراد الأيقونات
import { FaSave } from "react-icons/fa";

export default function AdminNews() {
  // --- حالات الحالة (States) ---
  const [mounted, setMounted] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null); // معرف الخبر عند التعديل
  const [title, setTitle] = useState(""); // عنوان الخبر
  const [excerpt, setExcerpt] = useState(""); // ملخص الخبر
  const [fullContent, setFullContent] = useState(""); // محتوى Tiptap (HTML)
  const [category, setCategory] = useState("news"); // تصنيف الخبر
  const [isPinned, setIsPinned] = useState(false); // هل الخبر مثبت؟
  const [selectedMedia, setSelectedMedia] = useState<any[]>([]); // الصور والفيديوهات المختارة
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [searchTerm, setSearchTerm] = useState(""); // بحث في الأرشيف
  const [filterCategory, setFilterCategory] = useState("الكل");
  const [archiveData, setArchiveData] = useState([]); // بيانات الأخبار من السيرفر
  const [alertText, setAlertText] = useState("جاري التحميل...");
  const [isAlertActive, setIsAlertActive] = useState(true);
  const [alertType, setAlertType] = useState<"emergency" | "info">("emergency");
  const [isPublishing, setIsPublishing] = useState(false);

  // مراجع لمدخلات الملفات
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // --- دالة جلب البيانات من قاعدة البيانات ---
  const fetchArchive = useCallback(async () => {
    try {
      const response = await fetch("/api/news");
      if (response.ok) {
        const data = await response.json();
        setArchiveData(
          data.map((item: any) => ({
            ...item,
            date: new Date(item.created_at).toLocaleDateString("ar-EG"),
            image:
              item.images && item.images.length > 0 ? item.images[0] : "/imgs/news/sub-news1.jpg",
          }))
        );
      }
    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    fetchArchive();
  }, [fetchArchive]);

  // --- دالة نقل الصور (ترتيب الصور) - جديد ---
  const moveMedia = (idx: number, direction: "left" | "right") => {
    const newList = [...selectedMedia];
    const targetIdx = direction === "left" ? idx - 1 : idx + 1;

    // منع الخروج عن حدود المصفوفة
    if (targetIdx < 0 || targetIdx >= newList.length) return;

    // عملية التبديل (Swap)
    [newList[idx], newList[targetIdx]] = [newList[targetIdx], newList[idx]];
    setSelectedMedia(newList);
  };

  // --- دالة النشر أو التحديث ---
  const handlePublish = async () => {
    if (!title) return alert("يرجى إدخال العنوان");
    setIsPublishing(true);
    try {
      const response = await fetch("/api/news", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          title,
          excerpt,
          content: fullContent,
          category,
          images: selectedMedia.map((m) => m.url),
          is_pinned: isPinned, // تأكد أن الاسم هو is_pinned ليتطابق مع قاعدة البيانات
        }),
      });
      if (response.ok) {
        alert("تم حفظ الخبر بنجاح");
        cancelEdit();
        fetchArchive();
      }
    } catch (e) {
      alert("خطأ في الاتصال بالسيرفر");
    } finally {
      setIsPublishing(false);
    }
  };

  // --- دالة حذف الخبر ---
  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا الخبر نهائياً؟")) return;
    try {
      const response = await fetch(`/api/news?id=${id}`, { method: "DELETE" });
      if (response.ok) fetchArchive();
    } catch (error) {
      alert("فشل الحذف");
    }
  };

  // --- دالة تثبيت/إلغاء تثبيت الخبر من الأرشيف ---
  const handleTogglePin = async (item: any) => {
    try {
      const response = await fetch("/api/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, isPinned: !item.is_pinned }),
      });
      if (response.ok) fetchArchive();
    } catch (error) {
      alert("فشل تحديث حالة التثبيت");
    }
  };

  // --- دالة تجهيز البيانات للتعديل ---
  const handleEditPreview = (item: any) => {
    setEditingId(item.id);
    setTitle(item.title);
    setExcerpt(item.excerpt || "");
    setCategory(item.category || "news");
    setFullContent(item.content || "");
    setIsPinned(item.is_pinned === true || item.is_pinned === 1); // التأكد من تحويل القيمة القادمة من SQL إلى Boolean
    setSelectedMedia((item.images || []).map((img: string) => ({ url: img, type: "image" })));
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // --- إلغاء وضع التعديل وتفريغ الحقول ---
  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setExcerpt("");
    setFullContent("");
    setSelectedMedia([]);
    setIsPinned(false);
    setCategory("news");
  };

  // --- معالجة اختيار الملفات ---
  const handleFileSelection = (files: FileList | null) => {
    if (!files) return;
    const newMedia = Array.from(files).map((f) => ({
      url: URL.createObjectURL(f),
      type: f.type.startsWith("video") ? "video" : "image",
    }));
    setSelectedMedia((prev) => [...prev, ...newMedia]);
  };

  const removeMedia = (index: number) => {
    setSelectedMedia((prev) => prev.filter((_, i) => i !== index));
  };

  if (!mounted) return null;

  return (
    <div className="p-4 md:p-10 bg-[#f8fafc] min-h-screen font-sans text-right" dir="rtl">
      {/* رأس الصفحة */}
      <div className="max-w-7xl mx-auto mb-8 bg-[#1e1b4b] p-8 rounded-[3rem] text-white shadow-2xl flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black italic">لوحة التحكم</h1>
          <p className="text-[#c5a059] font-bold">إدارة أخبار وفعاليات السفارة</p>
        </div>
      </div>

      {/* شريط الإعلانات العاجلة */}
      <AlertManager
        alertText={alertText}
        setAlertText={setAlertText}
        isAlertActive={isAlertActive}
        setIsAlertActive={setIsAlertActive}
        alertType={alertType}
        setAlertType={setAlertType}
        onSave={async () => {
          try {
            const response = await fetch("/api/news", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                alertText: alertText, // تأكد من مطابقة الاسم مع الـ API
                isAlertActive: isAlertActive,
                alertType: alertType,
              }),
            });

            if (response.ok) {
              alert("تم الحفظ بنجاح! سيظهر التعديل الآن في الصفحة الرئيسية");
            } else {
              alert("فشل في تحديث قاعدة البيانات");
            }
          } catch (e) {
            console.error(e);
            alert("خطأ في الاتصال");
          }
        }}
      />

      {/* 1. إعدادات الخبر الأساسية (التصنيف والتثبيت) - تم نقلها هنا لتكون قبل المحرر */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 mb-6 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-200">
        {/* اختيار التصنيف */}
        <div className="flex-1 min-w-[280px] flex flex-col items-center md:items-start">
          <label className="block text-sm font-black text-[#1e1b4b] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#c5a059] rounded-full"></span>
            تصنيف الخبر:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 rounded-xl border border-slate-200 font-bold text-[#1e1b4b] bg-white outline-none focus:border-[#c5a059] transition-all cursor-pointer shadow-sm text-center md:text-right"
          >
            <option value="ambassador">لقاءات وبيانات السفير</option>
            <option value="activities">فعاليات وأنشطة</option>
            <option value="notices">إخطارات</option>
          </select>
        </div>

        {/* تثبيت الخبر المميز */}
        <div className="flex items-center justify-center gap-4 bg-white px-8 rounded-xl border border-slate-200 shadow-sm h-[64px] self-end">
          <label
            htmlFor="pin-news"
            className="relative inline-flex items-center cursor-pointer select-none"
          >
            {/* الـ Input المخفي */}
            <input
              id="pin-news"
              type="checkbox"
              checked={isPinned}
              onChange={() => setIsPinned(!isPinned)}
              className="sr-only peer"
            />

            {/* خلفية الزر - الـ Peer هنا ستغير لون الخلفية */}
            <div
              className="w-11 h-6 bg-slate-200 rounded-full peer 
                  peer-checked:bg-[#c5a059] transition-all duration-300
                  after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all 
                  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                  peer-checked:after:border-white shadow-inner"
            ></div>

            {/* النص المصاحب */}
            <span className="mr-3 text-sm font-black text-[#1e1b4b]">تثبيت في الأخبار المميزة</span>
          </label>
        </div>
      </div>

      {/* 2. محرر Tiptap - تم تمرير كافة الـ Props المطلوبة */}
      <NewsEditor
        editingId={editingId}
        cancelEdit={cancelEdit}
        title={title}
        setTitle={setTitle}
        excerpt={excerpt}
        setExcerpt={setExcerpt}
        fullContent={fullContent}
        setFullContent={setFullContent}
        selectedMedia={selectedMedia} // تم التمرير بنجاح لحل خطأ الـ length
        handleFileSelection={handleFileSelection}
        removeMedia={removeMedia}
        photoInputRef={photoInputRef}
        videoInputRef={videoInputRef}
        moveMedia={moveMedia} // تم تمرير دالة الترتيب الجديدة
      />

      {/* 3. معاينة الخبر قبل النشر */}
      <NewsPreview
        previewDevice={previewDevice}
        setPreviewDevice={setPreviewDevice}
        title={title}
        excerpt={excerpt}
        fullContent={fullContent}
        selectedMedia={selectedMedia}
      />

      {/* 4. زر النشر النهائي في الأسفل */}
      <div className="max-w-7xl mx-auto mb-16">
        <section className="bg-[#1e1b4b] rounded-[2.5rem] p-6 text-white shadow-2xl flex flex-col md:flex-row items-center gap-6 justify-center">
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="w-full md:w-96 bg-[#c5a059] text-[#1e1b4b] py-5 rounded-2xl font-black text-xl hover:bg-white transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <FaSave />{" "}
            {isPublishing
              ? "جاري المعالجة..."
              : editingId
                ? "تحديث الخبر الآن"
                : "نشر الخبر للجمهور"}
          </button>
        </section>
      </div>

      {/* 5. أرشيف الأخبار المنشورة سابقاً */}
      <NewsArchive
        archiveData={archiveData.filter((item: any) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        onTogglePin={handleTogglePin}
        onEdit={handleEditPreview}
        onDelete={handleDelete}
        editingId={editingId}
      />
    </div>
  );
}
