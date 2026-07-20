import React from 'react';
import { ShieldCheck, Plus, Check, RefreshCw, Trash2, Calendar, FileText, Download, Users, Layers, AlertCircle, Database } from 'lucide-react';
import { Language, ProjectRequest, JobApplication, BlogPost } from '../types';

interface AdminDashboardProps {
  language: Language;
  onLoginSuccess: (role: 'client' | 'admin', email: string) => void;
  currentUserEmail: string | null;
}

export default function AdminDashboard({ language, onLoginSuccess, currentUserEmail }: AdminDashboardProps) {
  // Login credentials
  const [adminUser, setAdminUser] = React.useState('');
  const [adminPass, setAdminPass] = React.useState('');
  const [adminError, setAdminError] = React.useState('');

  // Tab State
  const [activeSubTab, setActiveSubTab] = React.useState<'crm' | 'hr' | 'cms' | 'stats'>('crm');

  // Dynamic lists from localStorage
  const [requests, setRequests] = React.useState<ProjectRequest[]>([]);
  const [applications, setApplications] = React.useState<JobApplication[]>([]);
  const [customBlogPosts, setCustomBlogPosts] = React.useState<BlogPost[]>([]);

  // CMS New Article State
  const [titleAr, setTitleAr] = React.useState('');
  const [titleEn, setTitleEn] = React.useState('');
  const [contentAr, setContentAr] = React.useState('');
  const [contentEn, setContentEn] = React.useState('');
  const [category, setCategory] = React.useState('ERP');
  const [tagsInput, setTagsInput] = React.useState('C#, ERP, Security');
  const [image, setImage] = React.useState('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600');

  // Simulated metrics
  const [cpuLoad, setCpuLoad] = React.useState(12);
  const [redisCached, setRedisCached] = React.useState(94);
  const [dbBackupStatus, setDbBackupStatus] = React.useState<string>('Normal');

  React.useEffect(() => {
    if (currentUserEmail) {
      loadStorageData();
    }
  }, [currentUserEmail]);

  const loadStorageData = () => {
    setRequests(JSON.parse(localStorage.getItem('barmegny_project_requests') || '[]'));
    setApplications(JSON.parse(localStorage.getItem('barmegny_job_applications') || '[]'));
    setCustomBlogPosts(JSON.parse(localStorage.getItem('barmegny_blog_posts') || '[]'));
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === 'admin' && adminPass === 'admin') {
      onLoginSuccess('admin', 'admin@barmegny.com');
      setAdminError('');
    } else {
      setAdminError(language === 'ar' ? 'بيانات الاعتماد غير صحيحة.' : 'Incorrect admin coordinates.');
    }
  };

  // CRM State manager
  const handleUpdateRequestStatus = (id: string, newStatus: 'pending' | 'approved' | 'completed') => {
    const updated = requests.map(r => r.id === id ? { ...r, status: newStatus } : r);
    setRequests(updated);
    localStorage.setItem('barmegny_project_requests', JSON.stringify(updated));
  };

  const handleDeleteRequest = (id: string) => {
    const updated = requests.filter(r => r.id !== id);
    setRequests(updated);
    localStorage.setItem('barmegny_project_requests', JSON.stringify(updated));
  };

  // HR Applications manager
  const handleUpdateAppStatus = (id: string, newStatus: 'applied' | 'interviewing' | 'accepted' | 'rejected') => {
    const updated = applications.map(app => app.id === id ? { ...app, status: newStatus } : app);
    setApplications(updated);
    localStorage.setItem('barmegny_job_applications', JSON.stringify(updated));
  };

  // CMS Article Submissions
  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr || !contentAr) {
      alert(language === 'ar' ? 'يرجى كتابة عنوان المقال والمحتوى.' : 'Please write at least title and content.');
      return;
    }

    const newPost: BlogPost = {
      id: `POST-${Math.floor(1000 + Math.random() * 9000)}`,
      titleAr,
      titleEn: titleEn || titleAr,
      contentAr,
      contentEn: contentEn || contentAr,
      category,
      tags: tagsInput.split(',').map(t => t.trim()),
      image,
      date: new Date().toISOString().split('T')[0],
      authorAr: 'م. يوسف بلح',
      authorEn: 'Eng. Youssef Balah',
      views: 12
    };

    const updated = [newPost, ...customBlogPosts];
    setCustomBlogPosts(updated);
    localStorage.setItem('barmegny_blog_posts', JSON.stringify(updated));

    // Reset fields
    setTitleAr('');
    setTitleEn('');
    setContentAr('');
    setContentEn('');
    setCategory('ERP');
    setTagsInput('C#, ERP, Security');
    alert(language === 'ar' ? 'تم نشر المقال بنجاح في المدونة التقنية!' : 'Article posted successfully!');
  };

  const handleSimulateBackup = () => {
    setDbBackupStatus('Backing up...');
    setTimeout(() => {
      setDbBackupStatus(`Success (${new Date().toLocaleTimeString()})`);
    }, 1500);
  };

  // Login screen for admin portal
  if (!currentUserEmail) {
    return (
      <div className="py-20 bg-transparent min-h-[70vh] flex items-center justify-center transition-colors">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:immersive-glass border border-slate-200 dark:immersive-border shadow-xl space-y-6 animate-fadeIn">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-[#05070a]/60 text-slate-800 dark:text-white flex items-center justify-center mx-auto border dark:border-white/10">
              <ShieldCheck size={24} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? 'لوحة تحكم إدارة برمجني' : 'Barmegny Admin Control'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
              {language === 'ar' ? 'دخول الإدارة والـ CRM لمتابعة طلبات الأنظمة والتوظيف.' : 'Authenticate to handle system leads and post articles.'}
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'اسم المستخدم' : 'Admin Username'}</label>
              <input
                type="text" required value={adminUser} onChange={e => setAdminUser(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'كلمة المرور' : 'Password'}</label>
              <input
                type="password" required value={adminPass} onChange={e => setAdminPass(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {adminError && (
              <p className="text-xs font-semibold text-rose-500 text-center">{adminError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold text-sm transition-all cursor-pointer shadow-lg shadow-blue-500/20"
            >
              {language === 'ar' ? 'دخول الإدارة' : 'Authorize Admin'}
            </button>
          </form>

          {/* Quick Admin instructions */}
          <div className="p-3.5 rounded-xl bg-slate-500/5 border border-slate-500/10 text-[11px] text-slate-500 text-center leading-relaxed">
            <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              {language === 'ar' ? 'للولوج المباشر:' : 'For Instant Testing:'}
            </span>
            {language === 'ar' ? (
              <>اسم المستخدم: <code className="font-mono text-blue-600">admin</code> / كلمة المرور: <code className="font-mono text-blue-600">admin</code></>
            ) : (
              <>Username: <code className="font-mono text-blue-600">admin</code> / Password: <code className="font-mono text-blue-600">admin</code></>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard views
  return (
    <div className="py-12 bg-transparent min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header telemetry and stats */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6 mb-8">
          <div>
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              {language === 'ar' ? 'لوحة تحكم برمجني الأمنية' : 'Barmegny Root Command Control'}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {language === 'ar' ? 'أهلاً بك م. يوسف بلح' : 'Welcome back, Eng. Youssef Balah'}
            </h2>
          </div>

          {/* Server stats */}
          <div className="flex gap-4 items-center flex-wrap">
            <div className="text-right text-xs">
              <span className="text-slate-400 block">{language === 'ar' ? 'النسخ السحابي SQL:' : 'SQL Server Backup:'}</span>
              <span className="font-bold text-emerald-500 flex items-center gap-1 justify-end">
                <Database size={12} />
                {dbBackupStatus}
              </span>
            </div>
            <button
              onClick={handleSimulateBackup}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer"
              title="Backup Databases Now"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Navigation Admin modules tabs */}
        <div className="flex border-b border-slate-200 dark:border-white/10 mb-8 overflow-x-auto gap-2">
          {[
            { id: 'crm', labelAr: 'الطلبات والعملاء CRM', labelEn: 'Project Requests' },
            { id: 'hr', labelAr: 'طلبات التوظيف HR', labelEn: 'Job Seekers' },
            { id: 'cms', labelAr: 'نشر مقال SEO بالمدونة', labelEn: 'CMS Publisher' },
            { id: 'stats', labelAr: 'حالة الخادم وتفاصيل النظام', labelEn: 'Telemetry Status' }
          ].map((subTab) => (
            <button
              key={subTab.id}
              onClick={() => setActiveSubTab(subTab.id as any)}
              className={`px-4 py-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 flex-shrink-0 cursor-pointer ${
                activeSubTab === subTab.id
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {language === 'ar' ? subTab.labelAr : subTab.labelEn}
            </button>
          ))}
        </div>

        {/* Dynamic sub tab rendering */}
        
        {/* TAB 1: CRM Leads */}
        {activeSubTab === 'crm' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? 'قائمة طلبات المشاريع وحاسبة التكلفة' : 'Incoming Estimator Leads'}
            </h3>

            {requests.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:immersive-glass border border-slate-200 dark:immersive-border text-center text-slate-400 font-light text-sm">
                {language === 'ar' ? 'لا توجد طلبات مشاريع جديدة واردة حتى الآن.' : 'No customer project leads in database yet.'}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {requests.map((req) => (
                  <div key={req.id} className="p-6 bg-white dark:immersive-glass border border-slate-200 dark:immersive-border rounded-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block">{req.createdAt}</span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">{req.clientName}</h4>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                        req.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' :
                        req.status === 'approved' ? 'bg-blue-500/10 text-blue-500' :
                        'bg-amber-500/10 text-amber-500'
                      }`}>
                        {req.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                      <div>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{language === 'ar' ? 'نوع التطبيق:' : 'System Type:'}</span> {req.projectType}
                      </div>
                      <div>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{language === 'ar' ? 'الميزانية:' : 'Budget Bracket:'}</span> {req.budget}
                      </div>
                      <div>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{language === 'ar' ? 'مدة العمل:' : 'Target Timeline:'}</span> {req.duration}
                      </div>
                      <div>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{language === 'ar' ? 'الهوية واللون:' : 'Color Pref:'}</span> {req.colorTheme}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs bg-slate-50 dark:bg-[#05070a]/60 p-3 rounded-lg border dark:border-white/10">
                      <span className="font-bold text-slate-700 dark:text-slate-300 block">{language === 'ar' ? 'موجز تفاصيل العميل والعمل:' : 'Client Request details:'}</span>
                      <p className="text-slate-500 font-light leading-relaxed">{req.description || 'No custom brief provided.'}</p>
                    </div>

                    <div className="flex gap-2 text-xs font-bold">
                      <span className="text-slate-400 py-1">{language === 'ar' ? 'رقم الهاتف:' : 'Mobile:'} {req.phone}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex justify-between gap-2">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleUpdateRequestStatus(req.id, 'approved')}
                          className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-500 text-[10px] cursor-pointer"
                        >
                          {language === 'ar' ? 'موافق وتعيين مبرمج' : 'Approve Lead'}
                        </button>
                        <button
                          onClick={() => handleUpdateRequestStatus(req.id, 'completed')}
                          className="px-3 py-1.5 rounded bg-emerald-600 text-white hover:bg-emerald-500 text-[10px] cursor-pointer"
                        >
                          {language === 'ar' ? 'اكتمال التسليم' : 'Set Completed'}
                        </button>
                      </div>
                      <button
                        onClick={() => handleDeleteRequest(req.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded cursor-pointer"
                        title="Delete inquiry"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: HR Candidates */}
        {activeSubTab === 'hr' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? 'قائمة المتقدمين للوظائف والطلبات' : 'Active Job Seeker Applications'}
            </h3>

            {applications.length === 0 ? (
              <div className="p-8 bg-white dark:immersive-glass border border-slate-200 dark:immersive-border text-center text-slate-400 text-sm font-light">
                {language === 'ar' ? 'لا توجد طلبات توظيف مقدمة جديدة حالياً.' : 'No CV applications inside local database yet.'}
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="p-6 bg-white dark:immersive-glass border border-slate-200 dark:immersive-border rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">{app.fullName}</h4>
                        <span className="text-[10px] bg-slate-200 dark:bg-white/5 dark:border dark:border-white/10 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded">
                          {app.position}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-bold">{app.email} • {app.phone}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-2xl bg-slate-50 dark:bg-[#05070a]/60 p-2.5 rounded border dark:border-white/10">
                        {app.coverLetter}
                      </p>
                      <div className="flex gap-4 text-[10px] text-slate-400 font-bold">
                        <span>{language === 'ar' ? `الخبرة: ${app.experienceYears} سنوات` : `Exp: ${app.experienceYears} Years`}</span>
                        {app.portfolioUrl && (
                          <a href={app.portfolioUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                            Portfolio/GitHub LINK
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0 flex flex-col items-end gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        app.status === 'accepted' ? 'bg-emerald-500/15 text-emerald-500' :
                        app.status === 'interviewing' ? 'bg-indigo-500/15 text-indigo-500' :
                        app.status === 'rejected' ? 'bg-rose-500/15 text-rose-500' :
                        'bg-amber-500/15 text-amber-500'
                      }`}>
                        {app.status.toUpperCase()}
                      </span>
                      
                      <div className="flex gap-1.5 pt-2">
                        <button
                          onClick={() => handleUpdateAppStatus(app.id, 'interviewing')}
                          className="px-2 py-1 rounded bg-indigo-600 text-white text-[9px] cursor-pointer"
                        >
                          {language === 'ar' ? 'مقابلة فنية' : 'Interview'}
                        </button>
                        <button
                          onClick={() => handleUpdateAppStatus(app.id, 'accepted')}
                          className="px-2 py-1 rounded bg-emerald-600 text-white text-[9px] cursor-pointer"
                        >
                          {language === 'ar' ? 'قبول وتوظيف' : 'Hire'}
                        </button>
                        <button
                          onClick={() => handleUpdateAppStatus(app.id, 'rejected')}
                          className="px-2 py-1 rounded bg-rose-600 text-white text-[9px] cursor-pointer"
                        >
                          {language === 'ar' ? 'رفض' : 'Decline'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CMS Blog Writer */}
        {activeSubTab === 'cms' && (
          <form onSubmit={handleCreateArticle} className="p-6 bg-white dark:immersive-glass border border-slate-200 dark:immersive-border rounded-2xl space-y-6 animate-fadeIn">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-white/10">
              {language === 'ar' ? 'كتابة ونشر مقال تقني متوافق مع الـ SEO' : 'Write and Publish Tech Blog Post'}
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'عنوان المقال بالعربية' : 'Article Title (Arabic)'} *</label>
                <input
                  type="text" required value={titleAr} onChange={e => setTitleAr(e.target.value)}
                  placeholder="مثال: ميزات معمارية Clean Architecture في أنظمة ERP"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'عنوان المقال بالإنجليزية' : 'Article Title (English)'}</label>
                <input
                  type="text" value={titleEn} onChange={e => setTitleEn(e.target.value)}
                  placeholder="e.g. Grasping Clean Architecture Structures in ERP"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'محتوى المقال بالعربية' : 'Article Content (Arabic)'} *</label>
                <textarea
                  rows={6} required value={contentAr} onChange={e => setContentAr(e.target.value)}
                  placeholder="اكتب تفاصيل مقالك التقني بالتفصيل ليتصدر محركات البحث..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'محتوى المقال بالإنجليزية' : 'Article Content (English)'}</label>
                <textarea
                  rows={6} value={contentEn} onChange={e => setContentEn(e.target.value)}
                  placeholder="Write english specifications for your developers..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'التصنيف الرئيسي' : 'Category'}</label>
                <select
                  value={category} onChange={e => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ERP">ERP & Enterprise</option>
                  <option value="POS">Cashier & POS</option>
                  <option value="Security">Security & Cyber</option>
                  <option value="Web">Web Apps</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'الكلمات المفتاحية (مفصولة بفاصلة)' : 'SEO Tags (Comma Separated)'}</label>
                <input
                  type="text" value={tagsInput} onChange={e => setTagsInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'رابط صورة الغلاف' : 'Cover Image URL'}</label>
                <input
                  type="url" value={image} onChange={e => setImage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="text-left pt-2 border-t border-slate-100 dark:border-white/10">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus size={16} />
                <span>{language === 'ar' ? 'نشر المقال الآن' : 'Publish Article Now'}</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: Platform Telemetry status */}
        {activeSubTab === 'stats' && (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn">
            
            {/* CPU */}
            <div className="p-6 bg-white dark:immersive-glass border border-slate-200 dark:immersive-border rounded-2xl text-center space-y-2">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">
                {language === 'ar' ? 'حمل المعالج والذاكرة' : 'CPU Load Average'}
              </span>
              <span className="text-3xl font-black text-blue-600">{cpuLoad}%</span>
              <p className="text-[10px] text-slate-400">Node Cluster Live</p>
            </div>

            {/* Redis */}
            <div className="p-6 bg-white dark:immersive-glass border border-slate-200 dark:immersive-border rounded-2xl text-center space-y-2">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">
                {language === 'ar' ? 'مؤشر كاش Redis' : 'Redis Caching Rate'}
              </span>
              <span className="text-3xl font-black text-amber-500">{redisCached}%</span>
              <p className="text-[10px] text-slate-400">Response: 12ms average</p>
            </div>

            {/* DB Rows */}
            <div className="p-6 bg-white dark:immersive-glass border border-slate-200 dark:immersive-border rounded-2xl text-center space-y-2">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">
                {language === 'ar' ? 'نشاط الفهرسة SQL Server' : 'MSSQL Concurrency'}
              </span>
              <span className="text-3xl font-black text-emerald-500">Active</span>
              <p className="text-[10px] text-slate-400">Clean EntityFramework Core</p>
            </div>

            {/* SignalR Sessions */}
            <div className="p-6 bg-white dark:immersive-glass border border-slate-200 dark:immersive-border rounded-2xl text-center space-y-2">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest">
                {language === 'ar' ? 'جلسات التحديث المباشر' : 'SignalR Socket Sessions'}
              </span>
              <span className="text-3xl font-black text-indigo-500">142</span>
              <p className="text-[10px] text-slate-400">Active live connections</p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
