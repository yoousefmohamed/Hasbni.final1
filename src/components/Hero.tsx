import React from 'react';
import { Play, ClipboardList, Shield, Zap, Sparkles, Star } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onOrderClick: () => void;
  onPortfolioClick: () => void;
}

export default function Hero({ language, onOrderClick, onPortfolioClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-transparent text-slate-900 dark:text-white py-24 lg:py-32 border-b border-slate-200 dark:border-white/10">
      {/* Decorative background grid and ambient lighting */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1.5px,transparent_1.5px),linear-gradient(to_bottom,#0f172a_1.5px,transparent_1.5px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
      
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
 
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="grid lg:grid-cols-12 gap-12 items-center">
           
           {/* Main Content */}
           <div className="lg:col-span-7 space-y-8 text-center lg:text-right">
             {/* Tagline Badge */}
             <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wider ${language === 'en' ? 'lg:flex-row' : ''}`}>
               <Sparkles size={14} className="animate-spin text-amber-400" />
               <span>
                 {language === 'ar' 
                   ? 'برمجة احترافية بأعلى معايير الأمان والجودة العالمية' 
                   : 'Professional Development with World-Class Security'}
               </span>
             </div>
 
             {/* Main Headline */}
             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
               {language === 'ar' ? (
                 <>
                   منصتك البرمجية المتكاملة <br />
                   <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-400 bg-clip-text text-transparent">
                     لتطوير أنظمتك الذكية
                   </span>
                 </>
               ) : (
                 <>
                   Your Integrated Platform <br />
                   <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-400 bg-clip-text text-transparent">
                     For Intelligent Systems
                   </span>
                 </>
               )}
             </h1>
 
             {/* Description */}
             <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
               {language === 'ar' ? (
                 <>
                   نحن في <strong>برمجني (Barmegny)</strong>، بقيادة <strong>المهندس يوسف بلح</strong>، نبتكر حلولاً متقدمة تناسب تطلعات أعمالك. متخصصون في تصميم الأنظمة المحاسبية المتطورة، برمجيات الكاشير ونقاط البيع (POS)، أنظمة ERP الشاملة، المواقع والمتاجر الإلكترونية المتكاملة، وتطبيقات سطح المكتب والهاتف المدعومة بالذكاء الاصطناعي والأتمتة.
                 </>
               ) : (
                 <>
                   At <strong>Barmegny</strong>, led by <strong>Eng. Youssef Balah</strong>, we craft bespoke high-performance software. We specialize in designing modern accounting programs, smart POS systems, end-to-end ERP platforms, highly secure e-commerce systems, and custom AI automated solutions.
                 </>
               )}
             </p>
 
             {/* CTAs */}
             <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
               <button
                 onClick={onOrderClick}
                 className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 shadow-lg shadow-blue-500/20 active:scale-95 cursor-pointer"
               >
                 <ClipboardList size={18} />
                 <span>{language === 'ar' ? 'اطلب مشروعك الآن' : 'Request a Project'}</span>
               </button>
               
               <button
                 onClick={onPortfolioClick}
                 className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold bg-slate-100 hover:bg-slate-200 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-800 dark:text-slate-100 transition-all duration-200 active:scale-95 cursor-pointer"
               >
                 <Play size={18} className="text-blue-500 dark:text-blue-400" />
                 <span>{language === 'ar' ? 'مشاهدة معرض الأعمال' : 'Browse Portfolio'}</span>
               </button>
             </div>
 
             {/* Features trust row */}
             <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
               <div className="flex items-center gap-2 justify-center lg:justify-start">
                 <Shield size={16} className="text-emerald-500 flex-shrink-0" />
                 <span>{language === 'ar' ? 'حماية فائقة ونظام مشفر' : 'Highly Encrypted'}</span>
               </div>
               <div className="flex items-center gap-2 justify-center lg:justify-start">
                 <Zap size={16} className="text-amber-500 flex-shrink-0" />
                 <span>{language === 'ar' ? 'سرعة قصوى وتقنيات حديثة' : 'Lightning Fast'}</span>
               </div>
               <div className="flex items-center gap-2 justify-center lg:justify-start">
                 <Star size={16} className="text-blue-500 dark:text-blue-400 flex-shrink-0" />
                 <span>{language === 'ar' ? 'دعم فني وضمان متكامل' : '24/7 Support'}</span>
               </div>
             </div>
           </div>
 
           {/* Stats & Interactive Card */}
           <div className="lg:col-span-5 relative mt-8 lg:mt-0">
             {/* Gradient border glowing card */}
             <div className="relative rounded-3xl bg-white dark:immersive-glass p-6 sm:p-8 border border-slate-200 dark:immersive-border shadow-2xl dark:shadow-blue-500/5">
               
               <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                 <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
                 <span>{language === 'ar' ? 'إحصائيات وقدرات برمجني' : 'Barmegny Capabilities'}</span>
               </h3>
 
               <div className="space-y-6">
                 {/* Stat 1 */}
                 <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#05070a]/60 border border-slate-200/80 dark:immersive-border">
                   <div className="flex flex-col">
                     <span className="text-xs text-slate-500 dark:text-slate-400">{language === 'ar' ? 'الأنظمة النشطة والعملاء' : 'Active Client Systems'}</span>
                     <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">150+</span>
                   </div>
                   <div className="text-right text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full">
                     {language === 'ar' ? 'دعم مستمر' : 'Active Support'}
                   </div>
                 </div>
 
                 {/* Stat 2 */}
                 <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#05070a]/60 border border-slate-200/80 dark:immersive-border">
                   <div className="flex flex-col">
                     <span className="text-xs text-slate-500 dark:text-slate-400">{language === 'ar' ? 'سرعة أداء الأنظمة والمواقع' : 'System Performance Rating'}</span>
                     <span className="text-2xl font-black bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">98.6%</span>
                   </div>
                   <div className="text-right text-xs text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full">
                     PageSpeed A+
                   </div>
                 </div>
 
                 {/* Stat 3 */}
                 <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#05070a]/60 border border-slate-200/80 dark:immersive-border">
                   <div className="flex flex-col">
                     <span className="text-xs text-slate-500 dark:text-slate-400">{language === 'ar' ? 'درجة الأمان ومكافحة الاختراق' : 'Security Level Rating'}</span>
                     <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">A+ Class</span>
                   </div>
                   <div className="text-right text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full">
                     {language === 'ar' ? 'تشفير كامل' : 'Fully Secured'}
                   </div>
                 </div>
 
                 {/* Stat 4 */}
                 <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-[#05070a]/60 border border-slate-200/80 dark:immersive-border">
                   <div className="flex flex-col">
                     <span className="text-xs text-slate-500 dark:text-slate-400">{language === 'ar' ? 'سنوات الخبرة التقنية م. يوسف' : 'Eng. Youssef Experience'}</span>
                     <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">12+</span>
                   </div>
                   <div className="text-right text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-500/10 px-2.5 py-1 rounded-full">
                     {language === 'ar' ? 'سنة تطوير' : 'Years Experience'}
                   </div>
                 </div>
               </div>
 
               {/* Success Partners Logo strip simulation */}
               <div className="mt-8 pt-6 border-t border-slate-100 dark:immersive-border text-center">
                 <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-3">
                   {language === 'ar' ? 'قاعدة عملاء دولية تشمل' : 'Trusted Internationally Across'}
                 </span>
                 <div className="flex items-center justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all">
                   <span className="font-extrabold text-[10px] sm:text-xs tracking-wider text-slate-600 dark:text-slate-400">SAUDI ARABIA</span>
                   <span className="font-extrabold text-[10px] sm:text-xs tracking-wider text-slate-600 dark:text-slate-400">EGYPT</span>
                   <span className="font-extrabold text-[10px] sm:text-xs tracking-wider text-slate-600 dark:text-slate-400">UAE</span>
                 </div>
               </div>
 
             </div>
           </div>
 
         </div>
       </div>
     </div>
  );
}
