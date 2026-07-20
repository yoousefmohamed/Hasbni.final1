import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import SoftwareStore from './components/SoftwareStore';
import ProjectEstimator from './components/ProjectEstimator';
import Blog from './components/Blog';
import DownloadCenter from './components/DownloadCenter';
import Careers from './components/Careers';
import ClientPortal from './components/ClientPortal';
import AdminDashboard from './components/AdminDashboard';
import AIAssistant from './components/AIAssistant';
import Footer from './components/Footer';
import { Language, Service } from './types';
import { Sparkles, CheckCircle2, ChevronDown, Award, Globe, Phone, Mail } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = React.useState<Language>('ar');
  const [darkMode, setDarkMode] = React.useState<boolean>(true);
  const [activeTab, setActiveTab] = React.useState<string>('home');
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [currentUserEmail, setCurrentUserEmail] = React.useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = React.useState<'client' | 'admin' | null>(null);

  // Accordion active index for FAQs
  const [faqIndex, setFaqIndex] = React.useState<number | null>(null);

  // Sync document theme classes on darkMode state changes
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLoginSuccess = (role: 'client' | 'admin', email: string) => {
    setIsLoggedIn(true);
    setCurrentUserEmail(email);
    setCurrentUserRole(role);
    // Auto redirect to active dash on login success
    setActiveTab(role === 'admin' ? 'admin' : 'client-portal');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserEmail(null);
    setCurrentUserRole(null);
    setActiveTab('home');
  };

  const toggleFaq = (idx: number) => {
    setFaqIndex(faqIndex === idx ? null : idx);
  };

  const faqItems = [
    {
      qAr: 'لماذا يعتبر إطار عمل ASP.NET Core 9 الأفضل لأنظمة المحاسبة والـ ERP؟',
      qEn: 'Why is ASP.NET Core 9 preferred for accounting & ERP designs?',
      aAr: 'لأن لغة C# وإطار عمل ASP.NET Core يوفران أماناً متكاملاً (Enterprise-grade Security)، وحماية مدمجة ضد الاختراق، مع معالجة سريعة جداً لقواعد بيانات الحركات والقيود المالية المعقدة والربط الفوري مع الفاتورة الإلكترونية عبر خوادم ميكروسوفت المستقرة.',
      aEn: 'Because C# and the modern .NET runtime deliver industry-leading performance, bulletproof security defaults, and rich tooling for compiling high-volume transaction legers and scaling cloud microservices safely.'
    },
    {
      qAr: 'هل يدعم نظام الكاشير POS العمل دون إنترنت (Offline Mode)؟',
      qEn: 'Does the POS Cashier platform work in offline situations?',
      aAr: 'نعم بالكامل! نعتمد على قواعد بيانات ذكية تحفظ الفواتير والمخزون محلياً على جهاز الكاشير فور انقطاع الشبكة، ويقوم النظام بمزامنة كافة المبيعات والمدفوعات تلقائياً مع السحابة فور عودة الاتصال دون توقف البيع.',
      aEn: 'Absolutely. We design offline-first POS clients that write records locally. Once an internet connection is detected, the database automatically synchronizes all logs with your central cloud database with zero conflict.'
    },
    {
      qAr: 'كم هي المدة المستغرقة لتطوير وتسليم برنامج محاسبة مخصص لشركتي؟',
      qEn: 'How long does custom system development and delivery take?',
      aAr: 'تتراوح المدة حسب حجم المتطلبات وعدد الشاشات؛ الأنظمة ونقاط البيع البسيطة تستغرق من 2 إلى 4 أسابيع، بينما تستغرق المنظومات الضخمة وأنظمة ERP متعددة الفروع من شهرين إلى 3 أشهر شاملة الاختبار والتنصيب والتدريب.',
      aEn: 'Timeline is determined by screen capacity and feature complexity. Standard retail checkout platforms take 2-4 weeks, while massive custom ERP or healthcare modules require 2-3 months including quality assurance, setups, and staff training.'
    }
  ];

  return (
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'} 
      className="min-h-screen bg-slate-50 dark:bg-[#05070a] text-slate-800 dark:text-[#f8fafc] font-sans transition-colors duration-300 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Background canvas effects */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Architect Soft Grid - Enabled for both Light & Dark modes to solve plain flat background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(59,130,246,0.06)_1.5px,transparent_1.5px),linear-gradient(to_bottom,rgba(59,130,246,0.06)_1.5px,transparent_1.5px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_20%,#000_50%,transparent_100%)]"></div>
        <div className="absolute inset-0 immersive-canvas"></div>
        <div className="glow-orb-one"></div>
        <div className="glow-orb-two"></div>
      </div>
      
      {/* Navigation Topbar */}
      <Navigation
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        currentUserRole={currentUserRole}
      />

      {/* Main Core Layout Viewport */}
      <main className="flex-grow">
        
        {/* Tab 1: Home View */}
        {activeTab === 'home' && (
          <div className="space-y-0 animate-fadeIn">
            {/* Hero Banner with CTR indicators */}
            <Hero
              language={language}
              onOrderClick={() => setActiveTab('estimate')}
              onPortfolioClick={() => setActiveTab('portfolio')}
            />

            {/* Why Barmegny / Eng. Youssef Balah features section */}
            <section className="py-20 bg-white/40 dark:bg-transparent backdrop-blur-sm relative z-10 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header title */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                    {language === 'ar' ? 'الجودة والهندسة المتميزة' : 'ELEVATED QUALITY STANDARDS'}
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {language === 'ar' ? 'لماذا يعتمد رواد الأعمال على "برمجني"؟' : 'Why Leaders Choose Barmegny?'}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 font-light text-sm">
                    {language === 'ar'
                      ? 'لأننا لا نقدم مجرد كود، بل نبني أنظمة عمل متكاملة تقود أعمالك للنمو وتضمن الاستدامة التامة.'
                      : 'Because we go beyond lines of code; we architect powerful business nodes that secure your expansion and daily performance.'}
                  </p>
                  <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full mt-4"></div>
                </div>

                {/* Main feature points */}
                <div className="grid md:grid-cols-3 gap-8">
                  
                  {/* Point 1 */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-white dark:immersive-glass border border-slate-100 dark:immersive-border space-y-4 immersive-glass-hover shadow-md dark:shadow-2xl">
                    <div className="h-12 w-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
                      <Award size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {language === 'ar' ? 'خبرة المهندس يوسف بلح' : 'Expert Engineering Supervision'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                      {language === 'ar'
                        ? 'إشراف فني وهندسي كامل من التخطيط المبدئي حتى رفع النظام على الخادم للتأكد من خلوه من أي ثغرات أو أخطاء برمجية.'
                        : 'Rigorous engineering direction from structural planning to server deployment ensures flawless builds with zero safety gaps.'}
                    </p>
                  </div>

                  {/* Point 2 */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-white dark:immersive-glass border border-slate-100 dark:immersive-border space-y-4 immersive-glass-hover shadow-md dark:shadow-2xl">
                    <div className="h-12 w-12 rounded-xl bg-emerald-600/10 text-emerald-500 flex items-center justify-center font-bold">
                      <Sparkles size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {language === 'ar' ? 'التوافق الضريبي والفاتورة الإلكترونية' : 'E-Invoicing & VAT Compliant'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                      {language === 'ar'
                        ? 'تأتي برمجيات الكاشير والمحاسبة لدينا متوافقة كلياً مع متطلبات هيئة الزكاة والضريبة والجمارك (ZATCA) في السعودية ومصلحة الضرائب المصرية.'
                        : 'All bookkeeping and retail ERP platforms comply fully with tax and electronic-invoice regulatory standards (ZATCA / Egypt ETA).'}
                    </p>
                  </div>

                  {/* Point 3 */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-white dark:immersive-glass border border-slate-100 dark:immersive-border space-y-4 immersive-glass-hover shadow-md dark:shadow-2xl">
                    <div className="h-12 w-12 rounded-xl bg-indigo-600/10 text-indigo-500 flex items-center justify-center font-bold">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {language === 'ar' ? 'دعم فني وتحديثات مدى الحياة' : '24/7 Priority Assistance'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                      {language === 'ar'
                        ? 'دعم فني مستمر لتحديث الأنظمة وتطويرها طبقاً للمقاييس السنوية لضمان عمل أعمالك بنجاح وسلاسة تامة.'
                        : 'Permanent updates and immediate bug patches ensure continuous productivity and adaptation to newer operating protocols.'}
                    </p>
                  </div>

                </div>

              </div>
            </section>


            {/* QUICK ABOUT SECTION */}
            <section className="py-20 bg-slate-50/50 dark:bg-transparent backdrop-blur-sm relative z-10 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column Text details */}
                  <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
                    <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                      {language === 'ar' ? 'المهندس يوسف بلح في سطور' : 'About Eng. Youssef Balah'}
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      {language === 'ar' ? 'شريك نجاحك التقني وحليفك الرقمي' : 'Your Professional Technical Ally'}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-light">
                      {language === 'ar' ? (
                        <>
                          م. يوسف بلح هو مبرمج ومصمم معمارية برمجيات يمتلك خبرة عملية طويلة في تصميم وتطوير المنظومات الضخمة. كرس خبرته لمساعدة أكثر من 150 مؤسسة تجارية وطبية وصناعية في التحول الرقمي الكامل. نركز في "برمجني" على بناء أنظمة متكاملة تستطيع التوسع وربط مئات الفروع بسيرفر واحد آمن بالكامل وبأقل تكلفة صيانة ممكنة.
                        </>
                      ) : (
                        <>
                          Eng. Youssef Balah is a software architect with continuous practical experience constructing corporate accounting software. He has steered over 150 medical, commerce, and industrial entities to establish end-to-end digital cloud setups. We specialize in robust, high-availability setups that map branches seamlessly.
                        </>
                      )}
                    </p>
                    <div className="flex justify-center lg:justify-start gap-4">
                      <button
                        onClick={() => setActiveTab('estimate')}
                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                      >
                        {language === 'ar' ? 'اطلب استشارة مجانية' : 'Book Free Advice'}
                      </button>
                    </div>
                  </div>

                  {/* Right Column visual placeholder card */}
                  <div className="lg:col-span-5 relative mt-8 lg:mt-0">
                    <div className="relative rounded-3xl bg-slate-900 dark:immersive-glass p-8 border border-slate-800 dark:immersive-border text-center space-y-6 shadow-2xl">
                      <div className="h-20 w-20 rounded-full bg-blue-600/10 border border-blue-500/25 flex items-center justify-center mx-auto text-blue-500 font-extrabold text-2xl">
                        YB
                      </div>
                      <div className="space-y-1">
                        <span className="text-lg font-black text-slate-100 block">
                          {language === 'ar' ? 'م. يوسف بلح' : 'Eng. Youssef Balah'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {language === 'ar' ? 'كبير مهندسي البرمجيات ومؤسس برمجني' : 'Chief Software Engineer & Architect'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                        " {language === 'ar' 
                          ? 'رسالتنا هي تمكين الأعمال التجارية من التحكم بمبيعاتها ومخازنها بضغطة زر وبأمان يضاهي البنوك.' 
                          : 'Our absolute mission is empowering businesses with instant cashier dashboards and banking-level transaction safety.'} "
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS FAQ ACCORDION */}
            <section className="py-20 bg-white/40 dark:bg-transparent backdrop-blur-sm relative z-10 transition-colors">
              <div className="max-w-4xl mx-auto px-4">
                
                {/* Header title */}
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {language === 'ar' ? 'الأسئلة الشائعة والاستفسارات' : 'Frequently Asked Questions'}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 font-light text-sm">
                    {language === 'ar'
                      ? 'إليك إجابات شافية وتفصيلية عن الأسئلة الشائعة حول خدمات تطوير وتصميم أنظمة برمجني.'
                      : 'Answers regarding our custom ERP models, POS speed, and development cycle.'}
                  </p>
                </div>

                {/* FAQ list */}
                <div className="space-y-4">
                  {faqItems.map((item, index) => {
                    const isOpen = faqIndex === index;
                    return (
                      <div
                        key={index}
                        className="rounded-2xl border border-slate-100 dark:immersive-border bg-slate-50/50 dark:immersive-glass/40 overflow-hidden backdrop-blur-md transition-all hover:border-blue-500/30"
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white cursor-pointer"
                        >
                          <span className={language === 'ar' ? 'text-right' : 'text-left'}>
                            {language === 'ar' ? item.qAr : item.qEn}
                          </span>
                          <ChevronDown size={18} className={`text-blue-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isOpen && (
                          <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:immersive-border font-light leading-relaxed animate-slideUp">
                            {language === 'ar' ? item.aAr : item.aEn}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </section>

          </div>
        )}

        {/* Tab 2: Services View */}
        {activeTab === 'services' && (
          <Services
            language={language}
            onSelectService={(serv) => {
              // Redirect client to estimator and prefills
              setActiveTab('estimate');
            }}
          />
        )}

        {/* Tab 3: Portfolio View */}
        {activeTab === 'portfolio' && (
          <Portfolio language={language} />
        )}

        {/* Tab: Software Store */}
        {activeTab === 'store' && (
          <SoftwareStore language={language} />
        )}

        {/* Tab 4: Estimator View */}
        {activeTab === 'estimate' && (
          <ProjectEstimator
            language={language}
            onRequestSubmitted={() => {
              // Redirect to Client portal to check logs
              setTimeout(() => {
                setActiveTab('client-portal');
              }, 1000);
            }}
          />
        )}

        {/* Tab 5: Technical Blog View */}
        {activeTab === 'blog' && (
          <Blog language={language} />
        )}

        {/* Tab 6: Downloads Catalog View */}
        {activeTab === 'downloads' && (
          <DownloadCenter language={language} />
        )}

        {/* Tab 7: Careers Form View */}
        {activeTab === 'careers' && (
          <Careers language={language} />
        )}

        {/* Tab 8: Client progress panel */}
        {activeTab === 'client-portal' && (
          <ClientPortal
            language={language}
            onLoginSuccess={handleLoginSuccess}
            currentUserEmail={currentUserEmail}
          />
        )}

        {/* Tab 9: Administrator Dashboard Area */}
        {activeTab === 'admin' && (
          <AdminDashboard
            language={language}
            onLoginSuccess={handleLoginSuccess}
            currentUserEmail={currentUserEmail}
          />
        )}

      </main>

      {/* Floating AI Chat widget */}
      <AIAssistant language={language} />

      {/* Footer copyright rows */}
      <Footer
        language={language}
        setActiveTab={setActiveTab}
      />

    </div>
  );
}
