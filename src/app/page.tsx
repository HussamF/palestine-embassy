"use client"; // مكون تفاعلي يعمل لدى المستخدم لضمان عمل الـ States والـ Effects
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // شريط التنقل العلوي
import Hero from "../components/Hero"; // قسم الترحيب الرئيسي
import News from "../components/News"; // قسم الأخبار
import Services from "../components/Services"; // قسم الخدمات
import Footer from "../components/Footer"; // تذييل الصفحة
import BookingSystem from "../components/BookingSystem"; // نظام حجز المواعيد

export default function Home() {
  // --- حالات التحكم (States) ---
  const [isBookingOpen, setIsBookingOpen] = useState(false); // التحكم في فتح وإغلاق مودال الحجز
  const [selectedServiceName, setSelectedServiceName] = useState(""); // تخزين اسم الخدمة المختارة للحجز
  const [alertData, setAlertData] = useState<any>(null); // تخزين بيانات التنويه القادمة من قاعدة البيانات
  const [isAlertVisible, setIsAlertVisible] = useState(true); // حالة للتحكم في إظهار أو إخفاء التنويه عند الضغط على (X)

  useEffect(() => {
    // منع المتصفح من حفظ موقع السكرول عند التحديث لضمان بداية الصفحة من الأعلى
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // دالة جلب التنويه العاجل من الـ API
    const fetchAlert = async () => {
      try {
        const res = await fetch(`/api/news?type=alert&v=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          // التأكد من استخراج الكائن الصحيح سواء كانت البيانات مصفوفة أو كائن مباشر
          const finalData = data.rows ? data.rows[0] : Array.isArray(data) ? data[0] : data;
          setAlertData(finalData);
        }
      } catch (error) {
        console.error("خطأ في جلب التنويه:", error);
      }
    };
    fetchAlert();
  }, []);

  // دالة التعامل مع فتح مودال الحجز وتمرير اسم الخدمة
  const handleOpenBooking = (serviceName: string) => {
    setSelectedServiceName(serviceName);
    setIsBookingOpen(true);
  };

  return (
    <main className="bg-white min-h-screen">
      {/* 1. شريط التنويه العاجل (Alert Bar) */}
      {/* يظهر فقط إذا كانت البيانات موجودة والحالة هي "مرئي" */}
      {alertData && alertData.value && isAlertVisible && (
        <div
          className={`fixed top-0 left-0 w-full h-[50px] flex items-center shadow-2xl z-[10002] ${
            alertData.type === "emergency" ? "bg-red-600" : "bg-[#c5a059]"
          } text-white`}
          dir="rtl"
        >
          <div className="flex items-center justify-center w-full max-w-7xl mx-auto px-4 relative overflow-hidden gap-4">
            {/* التاغ (Label): تم تكبيره وإضافة نبض (Pulse) لجذب الانتباه */}
            <span className="bg-white text-black px-4 py-1.5 rounded-md font-black text-xs md:text-sm shrink-0 shadow-lg animate-pulse">
              تنويه عاجل
            </span>

            {/* نص التنويه: موسط وكبير لسهولة القراءة */}
            <div className="font-bold text-base md:text-lg truncate">{alertData.value}</div>

            {/* زر الإغلاق (X): يسمح للمستخدم بإخفاء الشريط */}
            <button
              onClick={() => setIsAlertVisible(false)}
              className="absolute left-4 p-1 hover:bg-black/20 rounded-full transition-colors"
              title="إغلاق"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 2. حاوية النافبار (Navbar Wrapper) */}
      {/* نتحكم في موقع النافبار برمجياً؛ إذا ظهر التنويه ينزل 50px وإذا اختفى يعود للقمة */}
      <div
        id="navbar-wrapper"
        className="fixed left-0 w-full z-[10001]"
        style={{
          top: alertData && alertData.value && isAlertVisible ? "50px" : "0px",
          transition: "top 0.3s ease", // حركة سلسة عند الإغلاق
        }}
      >
        <Navbar />
      </div>

      {/* 3. محتوى الصفحة الرئيسي */}
      {/* يتم إضافة Padding علوي ديناميكي لمنع المحتوى من الاختفاء تحت النافبار الثابت */}
      <div
        className="relative overflow-hidden transition-all duration-300"
        style={{
          // الحساب: (ارتفاع التنويه 50px + ارتفاع النافبار التقريبي 64px = 114px)
          paddingTop: alertData && alertData.value && isAlertVisible ? "114px" : "64px",
        }}
      >
        <Hero onBookClick={handleOpenBooking} />
        <News />
        <Services />
      </div>

      {/* مودال نظام الحجز */}
      <BookingSystem
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceName={selectedServiceName}
      />

      {/* <Footer /> */}

      {/* تنسيقات عالمية (Global CSS) لضمان انصياع مكون النافبار الداخلي للإزاحة البرمجية */}
      <style jsx global>{`
        header,
        nav,
        .fixed.top-0 {
          top: inherit !important; /* إجبار العناصر الثابتة داخلياً على وراثة موقع الحاوية الأم */
        }
      `}</style>
    </main>
  );
}
