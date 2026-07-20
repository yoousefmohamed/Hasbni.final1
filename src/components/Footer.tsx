import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, ShieldAlert } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  setActiveTab: (tab: string) => void;
}

export default function Footer({ language, setActiveTab }: FooterProps) {
  return (
    <footer className="bg-transparent text-slate-300 border-t border-slate-200 dark:border-white/10 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200 dark:border-white/10">
          
          {/* Brand Col */}
          <div className="space-y-4 text-center sm:text-right">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
                ب
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-slate-900 dark:text-white block">
                  {language === 'ar' ? 'برمجني Barmegny' : 'Barmegny Systems'}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                  {language === 'ar' ? 'م. يوسف بلح' : 'Eng. Youssef Balah'}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              {language === 'ar'
                ? 'مطورون متميزون ومتخصصون في ابتكار برامج المحاسبة المتقدمة، أنظمة الكاشير (POS)، ومنظومات ERP سحابية بأعلى درجات الأمان والسرعة العالمية.'
                : 'Pioneers in designing robust accounting ledgers, checkout POS softwares, and modern scalable ERP cloud databases.'}
            </p>
          </div>

          {/* Links 1: Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase text-slate-900 dark:text-slate-100 tracking-wider">
              {language === 'ar' ? 'خدماتنا الرئيسية' : 'Our Services'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {['أنظمة ERP', 'برامج المحاسبة', 'الكاشير ونقاط البيع POS', 'مواقع وتجارة إلكترونية', 'تطبيقات الهواتف المخصصة'].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setActiveTab('services')}
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2: Portals */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase text-slate-900 dark:text-slate-100 tracking-wider">
              {language === 'ar' ? 'بوابات الإدارة والدعم' : 'Admin & Client Areas'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('client-portal')}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'بوابة العميل لمتابعة الإنجاز' : 'Client Progress Portal'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'دخول لوحة التحكم الإدارية CRM' : 'CMS Administrator Access'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('careers')}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'الوظائف الشاغرة وهندسة البرمجيات' : 'Careers & Positions'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('downloads')}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'مركز تحميل البرامج والملفات' : 'Downloads Center'}
                </button>
              </li>
            </ul>
          </div>

          {/* Links 3: Contact Coordinates */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase text-slate-900 dark:text-slate-100 tracking-wider">
              {language === 'ar' ? 'بيانات الاتصال ومقر العمل' : 'Contact coordinates'}
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-500 dark:text-slate-400">
              <li className="flex items-start gap-2.5 justify-center sm:justify-start">
                <MapPin size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <span>
                  {language === 'ar' 
                    ? 'جمهورية مصر العربية، الدقهلية، المنصورة' 
                    : 'Mansoura, Dakahlia, Egypt'}
                </span>
              </li>
              <li className="flex items-center gap-2.5 justify-center sm:justify-start">
                <Phone size={16} className="text-emerald-500 flex-shrink-0" />
                <span dir="ltr">+20 100 000 0000</span>
              </li>
              <li className="flex items-center gap-2.5 justify-center sm:justify-start">
                <Mail size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span>youssef@barmegny.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-right">
            © 2026 {language === 'ar' ? 'جميع الحقوق محفوظة لموقع برمجني.' : 'Barmegny. All rights reserved.'}{' '}
            {language === 'ar' ? 'المالك: م. يوسف بلح' : 'Owner: Eng. Youssef Balah'}
          </p>
          <div className="flex gap-4 items-center flex-wrap justify-center">
            <div className="flex items-center gap-1">
              <ShieldAlert size={12} className="text-blue-600 dark:text-blue-400" />
              <span>{language === 'ar' ? 'معتمد ومؤمن ومحمي بالكامل' : 'Secured SSL Connection'}</span>
            </div>
            <span>•</span>
            <span className="hover:underline cursor-pointer">{language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Notice'}</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">{language === 'ar' ? 'شروط الخدمة والاستخدام' : 'Terms of Use'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
