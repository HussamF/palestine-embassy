import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // استيراد الفوتر الجديد
import { Almarai } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
});

export const metadata: Metadata = {
  title: "سفارة دولة فلسطين - قطر",
  description: "الموقع الرسمي لسفارة دولة فلسطين لدى دولة قطر الشقيقة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${almarai.className} antialiased bg-white`}>
        {/* Navbar ثابت يظهر في جميع الصفحات */}
        <Navbar />

        <main className="min-h-screen">{children}</main>

        {/* الفوتر يظهر الآن أسفل كل الصفحات */}
        <Footer />

        <WhatsAppButton />
      </body>
    </html>
  );
}
