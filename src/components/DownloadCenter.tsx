import React from 'react';
import { Download, FileCode, FileText, CheckCircle, ArrowDownCircle, Search } from 'lucide-react';
import { initialDownloads } from '../data';
import { Language, DownloadItem } from '../types';

interface DownloadCenterProps {
  language: Language;
}

export default function DownloadCenter({ language }: DownloadCenterProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [downloadingId, setDownloadingId] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [downloads, setDownloads] = React.useState<DownloadItem[]>([]);

  React.useEffect(() => {
    const saved = localStorage.getItem('barmegny_downloads_list');
    if (saved) {
      setDownloads(JSON.parse(saved));
    } else {
      setDownloads(initialDownloads);
    }
  }, []);

  const handleDownload = (item: DownloadItem) => {
    if (downloadingId) return; // Wait for active download

    setDownloadingId(item.id);
    setProgress(0);

    // Simulate progress counting
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadingId(null);
            
            // Increment download counts in state and storage
            const updated = downloads.map(d => {
              if (d.id === item.id) {
                return { ...d, downloadsCount: d.downloadsCount + 1 };
              }
              return d;
            });
            setDownloads(updated);
            localStorage.setItem('barmegny_downloads_list', JSON.stringify(updated));

            // Trigger actual download mockup alert
            alert(language === 'ar' 
              ? `بدأ الآن تحميل الملف: ${item.titleAr} (${item.fileSize}) بنجاح.` 
              : `Successfully completed downloading: ${item.titleEn} (${item.fileSize}).`);
          }, 300);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const filteredDownloads = downloads.filter(item => 
    (item.titleAr + item.titleEn + item.descriptionAr + item.descriptionEn)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20 bg-transparent transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {language === 'ar' ? 'مركز التحميل الرقمي' : 'Barmegny Download Center'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-light text-sm sm:text-base">
            {language === 'ar'
              ? 'حمل النسخ التجريبية المجانية لبرامج نقاط البيع الكاشير، نماذج إكسل الضريبية، والكتيبات التوضيحية لجميع أنظمة ERP.'
              : 'Download free trial versions of retail cashier systems, VAT calculation tools, and PDF user manuals.'}
          </p>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10 max-w-md mx-auto">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'ar' ? 'ابحث عن البرامج والأدلة...' : 'Search manuals or software installers...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Downloads Catalog */}
        <div className="space-y-6">
          {filteredDownloads.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm font-light">
              {language === 'ar' ? 'لا توجد ملفات متوفرة تطابق هذا الاسم.' : 'No items match your search term.'}
            </div>
          ) : (
            filteredDownloads.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl glass-panel interactive-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden"
              >
                {/* Information block */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-white/5 text-blue-600 dark:text-blue-400 mt-1 sm:mt-0 flex-shrink-0 border dark:border-white/10">
                    {item.type === 'installer' ? <FileCode size={24} /> : <FileText size={24} />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {language === 'ar' ? item.titleAr : item.titleEn}
                      </h3>
                      <span className="bg-slate-200 text-slate-700 dark:bg-white/5 dark:text-slate-300 dark:border dark:border-white/10 text-[9px] font-black uppercase px-2 py-0.5 rounded">
                        {item.version}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                      {language === 'ar' ? item.descriptionAr : item.descriptionEn}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold pt-1">
                      <span>{language === 'ar' ? `حجم الملف: ${item.fileSize}` : `File Size: ${item.fileSize}`}</span>
                      <span>•</span>
                      <span>{language === 'ar' ? `التحميلات: ${item.downloadsCount}` : `Total Downloads: ${item.downloadsCount}`}</span>
                    </div>
                  </div>
                </div>

                {/* Download trigger */}
                <div className="w-full sm:w-auto flex-shrink-0">
                  {downloadingId === item.id ? (
                    <div className="w-full sm:w-40 space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-blue-500">
                        <span>{language === 'ar' ? 'جاري التحميل...' : 'Downloading...'}</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-150"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDownload(item)}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Download size={14} />
                      <span>{language === 'ar' ? 'تحميل مباشر' : 'Direct Download'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Warning Policy strip */}
        <div className="mt-12 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-slate-500 dark:text-slate-400 text-xs text-center leading-relaxed">
          {language === 'ar'
            ? 'جميع برمجيات برمجني (Barmegny) محمية بحقوق الملكية الفكرية لـ م. يوسف بلح. لا تقوم برمجني برفع برامج تفتقد الأمان أو تحتوى على روابط غير معلنة. يمكنك تنصيب الملفات بأمان تام.'
            : 'All utilities hosted at Barmegny are copyrighted. Downloads are 100% clean and secured. Install our trial versions with complete confidence.'}
        </div>

      </div>
    </section>
  );
}
