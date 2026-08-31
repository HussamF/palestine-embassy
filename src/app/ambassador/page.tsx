import { FaQuoteLeft, FaMapMarkerAlt, FaUserTie, FaAward } from 'react-icons/fa';

export default function AmbassadorPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-20" dir="rtl">
      {/* Hero Header Section */}
      <div className="bg-[#1e1b4b] h-[300px] relative overflow-hidden flex items-center justify-center pt-28 md:pt-32">
        <div className="absolute inset-0 opacity-10 bg-[url('/imgs/pattern.png')] bg-repeat"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-[#c5a059] mb-4 italic tracking-widest">السفير</h1>
          <div className="h-1.5 w-24 bg-[#c5a059] mx-auto rounded-full shadow-lg"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 pt-28 md:pt-32">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          
          {/* Right Side: Portrait & Official Info */}
          <div className="md:w-1/3 bg-slate-50 p-8 md:p-12 border-l border-slate-100">
            <div className="sticky top-28">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#c5a059] to-[#1e1b4b] rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl bg-slate-200">
                  <img 
                    src="/imgs/ambassador/portrait.jpeg" 
                    alt="سعادة السفير فايز أبو الرب" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              <div className="mt-8 text-center md:text-right">
                <h2 className="text-2xl font-black text-[#1e1b4b]">سعادة السفير فايز أبو الرب</h2>
                <p className="text-[#c5a059] font-bold mt-1">سفير دولة فلسطين لدى دولة قطر</p>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4 text-slate-600 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <FaUserTie className="text-[#c5a059] shrink-0" />
                    <span className="text-sm font-bold">رئيس البعثة الدبلوماسية</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <FaMapMarkerAlt className="text-[#c5a059] shrink-0" />
                    <span className="text-sm font-bold">الدوحة - دولة قطر</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                    <FaAward className="text-[#c5a059] shrink-0" />
                    <span className="text-sm font-bold">تمثيل مفوض فوق العادة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Left Side: The Official Speech Content */}
          <div className="md:w-2/3 p-8 md:p-16 bg-white">
            <div className="flex items-center gap-4 mb-10 border-b border-slate-50 pb-8">
               <div className="w-12 h-12 bg-[#1e1b4b] rounded-2xl flex items-center justify-center shadow-lg">
                  <FaQuoteLeft className="text-[#c5a059]" size={20} />
               </div>
               <h3 className="text-3xl font-black text-[#1e1b4b]">كلمة السفير</h3>
            </div>

            <article className="prose prose-slate max-w-none">
              <div className="space-y-8 text-slate-700 leading-[2.1] text-lg font-medium text-justify">
                
                <p className="font-black text-[#1e1b4b] text-xl mb-6">بسم الله الرحمن الرحيم</p>
                
                <p>
                  <span className="font-black text-[#1e1b4b] block text-2xl mb-4 text-right">أهلي وأبناء شعبي الفلسطيني الصامد في دولة قطر الشقيقة،،</span>
                  <span className="font-bold text-[#1e1b4b]">سيداتي وسادتي، أصدقاء الشعب الفلسطيني،</span>
                </p>

                <p>
                  أهلاً وسهلاً بكم في الموقع الإلكتروني لسفارة دولة فلسطين.
                </p>

                <p>
                  إنه لمن دواعي سروري وفخري أن أخاطبكم عبر هذه النافذة الرقمية، التي أردناها جسراً للتواصل الدائم، ومنبراً لنقل صوت الحق والحرية، ومرجعاً شاملاً لخدمتكم.
                </p>

                <p className="bg-slate-50 p-8 rounded-[2rem] border-r-8 border-[#c5a059] italic text-xl font-bold text-[#1e1b4b] shadow-inner leading-[1.8]">
                  "إن سفارتكم هنا، هي بيتكم الأول، وهي تمثل امتداداً للوطن الذي نحمله في قلوبنا أينما ارتحلنا."
                </p>

                <p>
                  نحن هنا لنحمل الأمانة، ونمثل تضحيات شعبنا العظيم الذي يسطر أروع ملاحم الصمود والثبات في وجه التحديات. هدفنا الأسمى هو تعزيز صمود أهلنا، وإيصال رسالة فلسطين للعالم: رسالة السلام العادل القائم على الحقوق المشروعة، وعلى رأسها حقنا في تقرير المصير وإقامة دولتنا المستقلة وعاصمتها القدس الشريف.
                </p>

                <p>
                  <span className="font-black text-[#1e1b4b] block mb-2 underline decoration-[#c5a059] decoration-4 underline-offset-8">إلى أبناء جاليتنا الأعزاء:</span>
                  أنتم سفراء فلسطين في كافة الميادين، ونحن في السفارة نضع كل إمكانياتنا في خدمتكم. إن توفير الرعاية القنصلية الفضلى، وتسهيل معاملاتكم، وتوثيق روابطكم بالوطن الأم، هي أولويات لا نتنازل عنها. هذا الموقع هو خطوة لتطوير خدماتنا، لتكون أسرع، أدق، وأكثر سهولة.
                </p>

                <p>
                  <span className="font-black text-[#1e1b4b] block mb-2 underline decoration-[#c5a059] decoration-4 underline-offset-8">إلى أصدقائنا في دولة قطر الشقيقة:</span>
                  نقدر عالياً مواقفكم الداعمة للحق الفلسطيني، ونتطلع دائماً لتعزيز العلاقات الثنائية في كافة المجالات، بناءً على قيم الاحترام المتبادل والمبادئ الإنسانية السامية.
                </p>

                <p className="text-xl font-bold text-[#1e1b4b]">
                  نسأل الله أن يحفظ فلسطين وشعبها، وأن يكتب لنا النصر والحرية القريبة.
                </p>

                <div className="space-y-4 border-t-2 border-slate-100 pt-10 mt-16">
                   <p className="font-bold text-[#1e1b4b] text-xl">والسلام عليكم ورحمة الله وبركاته،،</p>
                   <div className="mt-6">
                      <p className="text-3xl font-black text-[#1e1b4b] tracking-tighter mb-1">فايز أبو الرب</p>
                      <p className="text-[#c5a059] font-black text-lg">سفير دولة فلسطين لدى دولة قطر</p>
                   </div>
                </div>
              </div>
            </article>
          </div>

        </div>
      </div>
    </div>
  );
}