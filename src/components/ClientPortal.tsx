import React from 'react';
import { User, Lock, CheckCircle, Clock, CreditCard, Send, Sparkles, MessageCircle, FileText, Download, FileCheck, LifeBuoy, PlusCircle } from 'lucide-react';
import { initialClientProjects } from '../data';
import { Language, ClientProjectState } from '../types';
import { supabase } from '../lib/supabase';
interface ClientPortalProps {
  language: Language;
  onLoginSuccess: (role: 'client' | 'admin', email: string) => void;
  currentUserEmail: string | null;
}

export default function ClientPortal({ language, onLoginSuccess, currentUserEmail }: ClientPortalProps) {
  // Login states
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');

  // Active client project state loaded from localStorage or default
  const [projectState, setProjectState] = React.useState<ClientProjectState | null>(null);
  const [chatMessage, setChatMessage] = React.useState('');

  // Support ticket state
  const [ticketSubject, setTicketSubject] = React.useState('');
  const [showTicketForm, setShowTicketForm] = React.useState(false);

  React.useEffect(() => {
    if (currentUserEmail) {
      // Find matching project
      const savedProjects = JSON.parse(localStorage.getItem('barmegny_client_projects') || '[]');
      const allProjects = [...savedProjects, ...initialClientProjects];
      const match = allProjects.find(p => p.clientEmail.toLowerCase() === currentUserEmail.toLowerCase());
      if (match) {
        setProjectState(match);
      } else {
        // Create a default project state for custom logins
        const defaultState: ClientProjectState = {
          id: 'cl-proj-custom',
          titleAr: 'مشروع مخصص تحت الدراسة والمراجعة',
          titleEn: 'Custom Enterprise System Review',
          clientEmail: currentUserEmail,
          clientName: currentUserEmail.split('@')[0],
          progress: 15,
          status: 'planning',
          invoices: [
            { id: 'INV-2001', amount: 500, dueDate: '2026-07-30', status: 'unpaid' }
          ],
          updates: [
            {
              date: new Date().toISOString().split('T')[0],
              titleAr: 'تلقي تفاصيل الطلب بنجاح',
              titleEn: 'Inquiry details successfully received',
              descriptionAr: 'قامت الإدارة بالاستلام وجاري دراسة المخطط الهيكلي لقواعد البيانات والربط.',
              descriptionEn: 'The technical group has initiated schema audits for your custom ERP modules.'
            }
          ],
          chatHistory: [
            { sender: 'support', message: 'مرحباً بك! يمكنك كتابة ملاحظاتك هنا وسيرد عليك المهندس يوسف بلح مباشرة.', timestamp: 'Now' }
          ]
        };
        setProjectState(defaultState);
      }
    } else {
      setProjectState(null);
    }
  }, [currentUserEmail]);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setLoginError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    return;
  }

  onLoginSuccess(
    'client',
    data.user.email || email
  );

  setLoginError('');
};

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !projectState) return;

    const newMsg = {
      sender: 'client' as const,
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedState: ClientProjectState = {
      ...projectState,
      chatHistory: [...projectState.chatHistory, newMsg]
    };

    setProjectState(updatedState);
    setChatMessage('');

    // Save back to LocalStorage
    const savedProjects = JSON.parse(localStorage.getItem('barmegny_client_projects') || '[]');
    const isSavedAlready = savedProjects.some((p: any) => p.id === projectState.id);

    if (isSavedAlready) {
      const updatedLocal = savedProjects.map((p: any) => p.id === projectState.id ? updatedState : p);
      localStorage.setItem('barmegny_client_projects', JSON.stringify(updatedLocal));
    } else {
      // First time saving a modified initial project
      localStorage.setItem('barmegny_client_projects', JSON.stringify([updatedState, ...savedProjects]));
    }

    // Simulate auto-reply from Eng. Youssef Balah's team after 1 second
    setTimeout(() => {
      const autoReply = {
        sender: 'support' as const,
        message: language === 'ar' 
          ? 'أهلاً بك يا فندم، تم استلام ملاحظتك بنجاح وجاري مراجعتها وتفعيل التعديل المطلوب فوراً.' 
          : 'Thank you for your feedback! We have successfully received your request and our engineers are implementing it right away.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const finalState: ClientProjectState = {
        ...updatedState,
        chatHistory: [...updatedState.chatHistory, autoReply]
      };

      setProjectState(finalState);
      
      const latestSaved = JSON.parse(localStorage.getItem('barmegny_client_projects') || '[]');
      const updatedLocalWithReply = latestSaved.map((p: any) => p.id === projectState.id ? finalState : p);
      localStorage.setItem('barmegny_client_projects', JSON.stringify(updatedLocalWithReply));
    }, 1200);
  };

  const handleCreateSupportTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !projectState) return;

    const newTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subjectAr: ticketSubject,
      subjectEn: ticketSubject,
      status: 'open' as const,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedState: ClientProjectState = {
      ...projectState,
      supportTickets: [newTicket, ...(projectState.supportTickets || [])],
      chatHistory: [
        ...projectState.chatHistory,
        {
          sender: 'client' as const,
          message: language === 'ar'
            ? `[تذكرة دعم فني جديدة]: ${ticketSubject}`
            : `[New support ticket]: ${ticketSubject}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    setProjectState(updatedState);
    setTicketSubject('');
    setShowTicketForm(false);

    // Save to LocalStorage
    const savedProjects = JSON.parse(localStorage.getItem('barmegny_client_projects') || '[]');
    const isSavedAlready = savedProjects.some((p: any) => p.id === projectState.id);

    if (isSavedAlready) {
      const updatedLocal = savedProjects.map((p: any) => p.id === projectState.id ? updatedState : p);
      localStorage.setItem('barmegny_client_projects', JSON.stringify(updatedLocal));
    } else {
      localStorage.setItem('barmegny_client_projects', JSON.stringify([updatedState, ...savedProjects]));
    }

    // Auto response for tickets
    setTimeout(() => {
      const ticketReply = {
        sender: 'support' as const,
        message: language === 'ar'
          ? `مرحباً يا فندم. لقد تم تلقي تذكرة الدعم الفني رقم (${newTicket.id}) بموضوع: "${ticketSubject}". سنقوم بمراجعة الطلب وحل المشكلة فوراً.`
          : `Hello! We have successfully received support ticket #${newTicket.id} regarding: "${ticketSubject}". Our system architects are inspecting this right now.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const finalState: ClientProjectState = {
        ...updatedState,
        chatHistory: [...updatedState.chatHistory, ticketReply]
      };

      setProjectState(finalState);

      const latestSaved = JSON.parse(localStorage.getItem('barmegny_client_projects') || '[]');
      const updatedLocalWithReply = latestSaved.map((p: any) => p.id === projectState.id ? finalState : p);
      localStorage.setItem('barmegny_client_projects', JSON.stringify(updatedLocalWithReply));
    }, 1500);
  };

  // If not logged in, render login panel
  if (!currentUserEmail || !projectState) {
    return (
      <div className="py-20 bg-transparent min-h-[70vh] flex items-center justify-center transition-colors">
        <div className="w-full max-w-md p-8 rounded-3xl glass-panel shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500"></div>
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-white/5 border dark:border-white/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
              <User size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? 'بوابة عملاء برمجني' : 'Barmegny Client Portal'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light">
              {language === 'ar' 
                ? 'سجل دخولك لمتابعة نسبة إنجاز مشروعك، تحميل الفواتير، والدردشة مع الإدارة.' 
                : 'Log in to track completion, download mock invoices, and text our team.'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="client@alamal.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">{language === 'ar' ? 'كلمة المرور' : 'Password'}</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-xs font-semibold text-rose-500 text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all cursor-pointer shadow-lg shadow-blue-500/20"
            >
              {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </button>
          </form>

          {/* Login hints */}
          <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/10 text-[11px] text-slate-500 leading-relaxed text-center">
            <span className="font-bold block text-blue-600 dark:text-blue-400 mb-1">
              {language === 'ar' ? 'للتجربة والاختبار الفوري:' : 'For Instant Testing:'}
            </span>
            {language === 'ar' ? (
              <>
                البريد: <code className="font-mono text-blue-600">client@alamal.com</code> / كلمة المرور: <code className="font-mono text-blue-600">123</code> <br />
                (أو اكتب أي بريد إلكتروني وكلمة مرور لتجربة حساب جديد)
              </>
            ) : (
              <>
                Email: <code className="font-mono text-blue-600">client@alamal.com</code> / Password: <code className="font-mono text-blue-600">123</code> <br />
                (Or submit any email address to create a custom profile)
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Client Dashboard panel
  return (
    <div className="py-12 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header summary */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-6 mb-8">
          <div className="space-y-1">
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              {language === 'ar' ? 'لوحة تحكم العميل' : 'Client Operations Center'}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {language === 'ar' ? `مرحباً، ${projectState.clientName}` : `Welcome, ${projectState.clientName}`}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold">{language === 'ar' ? 'رقم العميل:' : 'Profile ID:'}</span>
            <span className="text-xs font-mono bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-300">
              {projectState.id}
            </span>
          </div>
        </div>

        {/* Dashboard Grid split */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Project Progress & Milestones (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Active Project Progress Box */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? projectState.titleAr : projectState.titleEn}
                </h3>
                <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-white/5 dark:border dark:border-white/10 px-3 py-1 rounded-full">
                  {projectState.status.toUpperCase()}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>{language === 'ar' ? 'نسبة إنجاز النظام الإجمالية' : 'Overall Completion progress'}</span>
                  <span className="text-blue-600">{projectState.progress}%</span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${projectState.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Milestone pipeline graphics */}
              <div className="grid grid-cols-5 gap-2 pt-4 text-center text-[10px] font-bold text-slate-400">
                {[
                  { id: 'planning', labelAr: 'التخطيط', labelEn: 'Planning' },
                  { id: 'development', labelAr: 'البرمجة', labelEn: 'Coding' },
                  { id: 'testing', labelAr: 'الاختبار', labelEn: 'Testing' },
                  { id: 'delivery', labelAr: 'التسليم', labelEn: 'Delivery' },
                  { id: 'completed', labelAr: 'مكتمل', labelEn: 'Deployed' }
                ].map((step, idx) => {
                  const stepIndex = ['planning', 'development', 'testing', 'delivery', 'completed'].indexOf(projectState.status);
                  const isCompleted = idx <= stepIndex;
                  return (
                    <div key={step.id} className="space-y-1.5">
                      <div className={`h-2 rounded-full ${isCompleted ? 'bg-blue-600' : 'bg-slate-200 dark:bg-white/10'}`}></div>
                      <span className={isCompleted ? 'text-blue-600 dark:text-blue-400 font-extrabold' : ''}>
                        {language === 'ar' ? step.labelAr : step.labelEn}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Technical Milestones Log */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock size={18} className="text-blue-500" />
                <span>{language === 'ar' ? 'سجل تحديثات الإنجاز الفنية' : 'System Implementation Logs'}</span>
              </h3>

              <div className="relative border-l-2 border-slate-100 dark:border-white/10 space-y-6 pl-6 pr-2">
                {projectState.updates.map((update, index) => (
                  <div key={index} className="relative">
                    {/* Circle dot */}
                    <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-blue-600 border-4 border-white dark:border-[#090d16]"></div>
                    <div className="space-y-1 text-right sm:text-left">
                      <span className="text-[10px] font-mono font-bold text-slate-400">{update.date}</span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {language === 'ar' ? update.titleAr : update.titleEn}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                        {language === 'ar' ? update.descriptionAr : update.descriptionEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Deliverable Builds Section */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel shadow-sm space-y-6 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Download size={18} className="text-blue-500" />
                  <span>{language === 'ar' ? 'تحميل آخر نسخة من النظام البرمجي' : 'Download Latest Deliverable Build'}</span>
                </h3>
                <span className="text-[10px] font-mono font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">
                  {projectState.latestBuilds && projectState.latestBuilds[0] ? projectState.latestBuilds[0].version : 'N/A'}
                </span>
              </div>

              {projectState.latestBuilds && projectState.latestBuilds.length > 0 ? (
                <div className="space-y-4">
                  {projectState.latestBuilds.map((build, index) => (
                    <div key={index} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{build.version}</span>
                          <span className="text-xs font-mono text-slate-400">{build.fileSize}</span>
                          <span className="text-[10px] text-slate-400">({build.releaseDate})</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                          {language === 'ar' ? build.notesAr : build.notesEn}
                        </p>
                      </div>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(language === 'ar' ? 'بدأ تحميل ملف الإصدار التجريبي للنظام...' : 'Downloading the latest prototype bundle...');
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md shadow-blue-500/15 cursor-pointer"
                      >
                        <Download size={12} />
                        <span>{language === 'ar' ? 'تحميل النسخة' : 'Download Build'}</span>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 text-center space-y-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'ar' ? 'جاري تجهيز وبناء النسخة الأولى للتحميل والمراجعة.' : 'Our engineers are currently packaging the initial release.'}
                  </p>
                  <span className="inline-block text-[10px] bg-blue-500/10 text-blue-600 px-2.5 py-1 rounded font-bold animate-pulse">
                    {language === 'ar' ? 'تحت التطوير النشط' : 'Under Active Development'}
                  </span>
                </div>
              )}
            </div>

            {/* Contracts Section */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel shadow-sm space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck size={18} className="text-emerald-500" />
                <span>{language === 'ar' ? 'اتفاقيات وعقود المشروع الرسمية' : 'Project Agreements & Contracts'}</span>
              </h3>

              {projectState.contracts && projectState.contracts.length > 0 ? (
                <div className="space-y-3">
                  {projectState.contracts.map((contract) => (
                    <div key={contract.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                      <div className="space-y-1.5">
                        <span className="font-bold text-slate-800 dark:text-slate-200 block">
                          {language === 'ar' ? contract.titleAr : contract.titleEn}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span className="font-mono font-bold">{contract.id}</span>
                          <span>•</span>
                          <span>{language === 'ar' ? `تاريخ التوقيع: ${contract.signDate}` : `Signed: ${contract.signDate}`}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-500 uppercase">
                          {language === 'ar' ? 'موقّع ومعتمد' : 'Signed'}
                        </span>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(language === 'ar' ? 'جاري فتح العقد بصيغة PDF...' : 'Opening agreement document PDF...');
                          }}
                          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-300"
                        >
                          <FileText size={16} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-center py-6 text-xs text-slate-400">
                  {language === 'ar' ? 'لا توجد عقود مرفوعة حالياً.' : 'No active service-level agreements uploaded.'}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: Financial Invoices & Live Dev Chat (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Invoices panel */}
            <div className="p-6 rounded-3xl glass-panel shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard size={18} className="text-emerald-500" />
                <span>{language === 'ar' ? 'الفواتير والمدفوعات' : 'Project Financial Invoices'}</span>
              </h3>

              <div className="space-y-3">
                {projectState.invoices.map((inv) => (
                  <div key={inv.id} className="p-3.5 rounded-xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{inv.id}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{language === 'ar' ? `تاريخ الاستحقاق: ${inv.dueDate}` : `Due Date: ${inv.dueDate}`}</span>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="font-extrabold block text-slate-900 dark:text-slate-100">${inv.amount}</span>
                      <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${inv.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                        {inv.status === 'paid' ? (language === 'ar' ? 'مدفوعة' : 'Paid') : (language === 'ar' ? 'مستحقة' : 'Unpaid')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Support Tickets */}
            <div className="p-6 rounded-3xl glass-panel shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <LifeBuoy size={18} className="text-amber-500" />
                  <span>{language === 'ar' ? 'تذاكر الدعم الفني' : 'Technical Support Tickets'}</span>
                </h3>
                <button
                  onClick={() => setShowTicketForm(!showTicketForm)}
                  className="text-blue-600 hover:text-blue-500 flex items-center gap-1 text-xs font-bold cursor-pointer"
                >
                  <PlusCircle size={14} />
                  <span>{language === 'ar' ? 'جديد' : 'New'}</span>
                </button>
              </div>

              {showTicketForm && (
                <form onSubmit={handleCreateSupportTicket} className="p-3 rounded-2xl bg-amber-500/5 border border-amber-500/15 space-y-2 animate-fadeIn">
                  <span className="text-[10px] font-bold text-amber-600 block">{language === 'ar' ? 'تقديم تذكرة دعم جديدة:' : 'Log Support Issue:'}</span>
                  <input
                    type="text"
                    required
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder={language === 'ar' ? 'موضوع التذكرة أو المشكلة...' : 'Describe the technical problem...'}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a] text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="flex justify-end gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowTicketForm(false)}
                      className="px-2.5 py-1 rounded text-[10px] font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                    >
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 rounded text-[10px] font-bold bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                    >
                      {language === 'ar' ? 'تقديم الطلب' : 'Submit Ticket'}
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-thin">
                {projectState.supportTickets && projectState.supportTickets.length > 0 ? (
                  projectState.supportTickets.map((tck) => (
                    <div key={tck.id} className="p-3 rounded-xl bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-xs flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[9px] font-bold text-slate-400">{tck.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${tck.status === 'open' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                          {tck.status === 'open' ? (language === 'ar' ? 'مفتوحة' : 'Open') : (language === 'ar' ? 'محلولة' : 'Resolved')}
                        </span>
                      </div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                        {language === 'ar' ? tck.subjectAr : tck.subjectEn}
                      </span>
                      <span className="text-[8px] text-slate-400 font-semibold">{tck.createdAt}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-white/5 rounded-xl border border-dashed">
                    {language === 'ar' ? 'لا توجد تذاكر دعم حالية.' : 'No active support inquiries found.'}
                  </div>
                )}
              </div>
            </div>

            {/* Support Messaging panel */}
            <div className="p-6 rounded-3xl glass-panel shadow-sm flex flex-col h-[380px]">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b dark:border-white/10 pb-3 mb-3 flex items-center gap-1.5">
                <MessageCircle size={16} className="text-blue-500" />
                <span>{language === 'ar' ? 'الدردشة والتعليقات الفورية' : 'Live Development Feed'}</span>
              </h3>

              {/* Chat thread */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-3 p-1 scrollbar-thin">
                {projectState.chatHistory.map((chat, i) => (
                  <div key={i} className={`flex flex-col ${chat.sender === 'client' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-2.5 rounded-2xl max-w-[85%] text-xs ${chat.sender === 'client' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 rounded-tl-none border dark:border-white/10'}`}>
                      {chat.message}
                    </div>
                    <span className="text-[8px] text-slate-400 mt-1 font-bold px-1">{chat.timestamp}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendChatMessage} className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={e => setChatMessage(e.target.value)}
                  placeholder={language === 'ar' ? 'اكتب رسالة أو ملاحظة...' : 'Submit project feedback...'}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#05070a]/60 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="h-8 w-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <Send size={12} />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
