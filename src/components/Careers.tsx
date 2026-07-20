import React from 'react';
import { Briefcase, MapPin, DollarSign, Send, CheckCircle, Clock } from 'lucide-react';
import { Language, JobApplication } from '../types';

interface CareersProps {
  language: Language;
}

export default function Careers({ language }: CareersProps) {
  const [selectedJobId, setSelectedJobId] = React.useState<string | null>(null);
  
  // Application form fields
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [experienceYears, setExperienceYears] = React.useState<number>(3);
  const [portfolioUrl, setPortfolioUrl] = React.useState('');
  const [coverLetter, setCoverLetter] = React.useState('');
  
  const [submitted, setSubmitted] = React.useState(false);

  const jobs = [
    {
      id: 'net-dev',
      titleAr: 'مطور أول ASP.NET Core / C#',
      titleEn: 'Senior ASP.NET Core / C# Developer',
      departmentAr: 'قسم هندسة النظم والـ ERP',
      departmentEn: 'System Architecture & ERP',
      locationAr: 'القاهرة / هجين (عن بعد + مقر)',
      locationEn: 'Cairo / Hybrid (Remote + Office)',
      salaryAr: 'رواتب مجزية طبقاً للخبرة',
      salaryEn: 'Competitive salary based on skillset',
      requirementsAr: [
        'خبرة عملية لا تقل عن 5 سنوات في بناء أنظمة الويب باستخدام .NET 8/9 C#',
        'فهم عميق لبنية الأكواد النظيفة Clean Architecture وأنماط SOLID',
        'خبرة متطورة في قواعد البيانات SQL Server و Entity Framework Core',
        'القدرة على دمج بوابات الدفع الإلكترونية وبناء APIs آمنة بالكامل'
      ],
      requirementsEn: [
        '5+ years of production experience building web systems with .NET 8/9 C#',
        'Deep grasp of Clean Architecture structures and SOLID design patterns',
        'Advanced proficiency with Microsoft SQL Server and EF Core databases',
        'Capable of secure payment gateway mapping and advanced Web API designs'
      ]
    },
    {
      id: 'react-dev',
      titleAr: 'مطور واجهات React / Frontend Developer',
      titleEn: 'Senior Frontend Developer (React / TS)',
      departmentAr: 'قسم واجهات الاستخدام والفرونت إند',
      departmentEn: 'UI/UX & Frontend Department',
      locationAr: 'المنصورة / عن بعد بالكامل',
      locationEn: 'Mansoura / Fully Remote',
      salaryAr: 'باقات رواتب متميزة وحوافز إنتاج',
      salaryEn: 'Excellent salary brackets and project bonuses',
      requirementsAr: [
        'خبرة 3+ سنوات في تطوير واجهات الويب التفاعلية باستخدام React و TypeScript',
        'إتقان كامل لإطار العمل Tailwind CSS وبناء تصاميم متجاوبة بالكامل',
        'فهم ممتاز لمبادئ تحسين محركات البحث SEO وتقنيات سرعة تحميل الصفحات',
        'خبرة جيدة في العمل مع إطارات الحركة والتحريك مثل Framer Motion'
      ],
      requirementsEn: [
        '3+ years experience with React, TypeScript and responsive web standards',
        'Complete mastery over Tailwind CSS utility structures',
        'Exceptional understanding of page optimization metrics and Core Web Vitals',
        'Grasp of smooth animations utilizing tools like motion or Framer Motion'
      ]
    }
  ];

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert(language === 'ar' ? 'يرجى إكمال بياناتك أولاً.' : 'Please enter your contact details first.');
      return;
    }

    const matchedJob = jobs.find(j => j.id === selectedJobId);
    const position = matchedJob ? (language === 'ar' ? matchedJob.titleAr : matchedJob.titleEn) : 'General Application';

    const newApp: JobApplication = {
      id: `APP-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName,
      email,
      phone,
      position,
      experienceYears,
      portfolioUrl,
      coverLetter,
      status: 'applied',
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Save to LocalStorage
    const existingApps = JSON.parse(localStorage.getItem('barmegny_job_applications') || '[]');
    localStorage.setItem('barmegny_job_applications', JSON.stringify([newApp, ...existingApps]));

    setSubmitted(true);
  };

  const resetRecruitment = () => {
    setSelectedJobId(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setExperienceYears(3);
    setPortfolioUrl('');
    setCoverLetter('');
    setSubmitted(false);
  };

  return (
    <section className="py-20 bg-transparent transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {language === 'ar' ? 'انضم إلى فريق برمجني' : 'Careers at Barmegny'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-light text-sm sm:text-base">
            {language === 'ar'
              ? 'نحن نبحث باستمرار عن المطورين المتميزين والمحاسبين وخبراء نظم المعلومات للانضمام إلى مهندس يوسف بلح وابتكار الحلول البرمجية العالمية.'
              : 'We are always scouting for top engineering minds, system analysts, and database specialists to join Eng. Youssef Balah in crafting superior software.'}
          </p>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Form Submission Confirmation state */}
        {submitted ? (
          <div className="p-8 rounded-3xl glass-panel text-center space-y-4 shadow-xl relative overflow-hidden animate-fadeIn">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>
            <CheckCircle size={36} className="text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? 'تم استلام طلب التقديم!' : 'Application Successfully Logged!'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {language === 'ar'
                ? 'شكراً لاهتمامك بالانضمام إلينا. تم إرسال ملفك وسيرة عملك إلى إدارة الموارد البشرية والمهندس يوسف بلح لمراجعتها، وسنتواصل معك قريباً لتحديد موعد مقابلة.'
                : 'Thank you for your application. Our recruitment department and Eng. Youssef Balah will analyze your skills and contact you for technical interview arrangements shortly.'}
            </p>
            <button
              onClick={resetRecruitment}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              {language === 'ar' ? 'عرض الوظائف الشاغرة' : 'Back to Careers'}
            </button>
          </div>
        ) : selectedJobId ? (
          /* Application Form drawer style */
          <div className="glass-panel rounded-3xl p-6 sm:p-10 animate-fadeIn space-y-6 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500"></div>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-1">
                  {language === 'ar' ? 'استمارة تقديم طلب وظيفة' : 'Job Application Form'}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? jobs.find(j => j.id === selectedJobId)?.titleAr : jobs.find(j => j.id === selectedJobId)?.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedJobId(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-300 text-slate-600 dark:border-white/10 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer"
              >
                {language === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'الاسم الكامل' : 'Full Name'} *</label>
                  <input
                    type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: محمد علي أحمد' : 'e.g. Michael Smith'}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'رقم الهاتف' : 'Mobile Number'} *</label>
                  <input
                    type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="+966..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *</label>
                  <input
                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="example@dev.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'سنوات الخبرة العملية' : 'Years of Experience'} *</label>
                  <input
                    type="number" min={1} max={30} required value={experienceYears} onChange={e => setExperienceYears(parseInt(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'رابط ملف أعمالك (GitHub / Behance / LinkedIn)' : 'Portfolio / GitHub / LinkedIn Link'}</label>
                <input
                  type="url" value={portfolioUrl} onChange={e => setPortfolioUrl(e.target.value)}
                  placeholder="https://github.com/yourusername"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'نبذة عن خبرتك ورسالة التغطية' : 'Cover Letter / Tech Skills Summary'}</label>
                <textarea
                  rows={4} required value={coverLetter} onChange={e => setCoverLetter(e.target.value)}
                  placeholder={language === 'ar' ? 'تحدث باختصار عن التقنيات التي تتقنها والمشاريع السابقة التي بنيتها...' : 'Briefly outline the ERP modules or full stack projects you have built...'}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="text-left pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
                >
                  <Send size={16} />
                  <span>{language === 'ar' ? 'تقديم طلب التوظيف' : 'Submit Application'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Jobs Listings Grid */
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="group p-6 rounded-2xl glass-panel interactive-card hover:border-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                      {language === 'ar' ? job.departmentAr : job.departmentEn}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {language === 'ar' ? job.titleAr : job.titleEn}
                    </h3>
                    
                    {/* Meta rows */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-blue-500" />
                        <span>{language === 'ar' ? job.locationAr : job.locationEn}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign size={14} className="text-emerald-500" />
                        <span>{language === 'ar' ? job.salaryAr : job.salaryEn}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      onClick={() => setSelectedJobId(job.id)}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-500/10 active:scale-95 cursor-pointer"
                    >
                      {language === 'ar' ? 'التقديم لهذه الوظيفة' : 'Apply For Job'}
                    </button>
                  </div>
                </div>

                {/* Job requirements summary box */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 space-y-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    {language === 'ar' ? 'الشروط والمؤهلات المطلوبة:' : 'Job Requirements:'}
                  </span>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed list-disc list-inside">
                    {(language === 'ar' ? job.requirementsAr : job.requirementsEn).map((req, i) => (
                      <li key={i} className="list-none flex items-start gap-1.5">
                        <Clock size={12} className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
