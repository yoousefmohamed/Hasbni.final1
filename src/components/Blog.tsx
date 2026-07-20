import React from 'react';
import { Search, Calendar, User, Eye, ArrowRight, Tag } from 'lucide-react';
import { initialBlogPosts } from '../data';
import { Language, BlogPost } from '../types';

interface BlogProps {
  language: Language;
}

export default function Blog({ language }: BlogProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [activePost, setActivePost] = React.useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = React.useState<BlogPost[]>([]);

  React.useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem('barmegny_blog_posts') || '[]');
    setAllPosts([...localPosts, ...initialBlogPosts]);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const incrementViews = (post: BlogPost) => {
    const updated = allPosts.map(p => {
      if (p.id === post.id) {
        return { ...p, views: p.views + 1 };
      }
      return p;
    });
    setAllPosts(updated);
    
    // Save state back to local storage if it was customized
    const localPosts = JSON.parse(localStorage.getItem('barmegny_blog_posts') || '[]');
    const isLocal = localPosts.some((p: any) => p.id === post.id);
    if (isLocal) {
      const updatedLocal = localPosts.map((p: any) => p.id === post.id ? { ...p, views: p.views + 1 } : p);
      localStorage.setItem('barmegny_blog_posts', JSON.stringify(updatedLocal));
    }
    
    setActivePost({ ...post, views: post.views + 1 });
  };

  // Extract all unique tags
  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags)));

  // Filter posts
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = 
      (post.titleAr + post.titleEn + post.contentAr + post.contentEn)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    
    return matchesSearch && matchesTag;
  });

  return (
    <section className="py-20 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'ar' ? 'المدونة التقنية والتعليمية' : 'Barmegny Tech & ERP Blog'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-light text-sm sm:text-base">
            {language === 'ar' 
              ? 'مقالات متخصصة في المحاسبة الإلكترونية، الأمان، أنظمة ERP ومستقبل كاشير POS والذكاء الاصطناعي كتبها م. يوسف بلح.' 
              : 'Specialized articles regarding digital accounting, modern security, cloud ERP systems, and retail automation written by Eng. Youssef Balah.'}
          </p>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full mt-4"></div>
        </div>

        {activePost ? (
          /* SINGLE POST READ VIEW */
          <div className="max-w-3xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 space-y-8 animate-fadeIn relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500"></div>
            <button
              onClick={() => setActivePost(null)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>{language === 'ar' ? '← العودة للمقالات' : '← Back to Articles'}</span>
            </button>

            <img
              src={activePost.image}
              alt={language === 'ar' ? activePost.titleAr : activePost.titleEn}
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-96 object-cover rounded-2xl"
            />

            <div className="flex items-center gap-4 text-xs text-slate-400 font-semibold flex-wrap">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{activePost.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <User size={14} />
                <span>{language === 'ar' ? activePost.authorAr : activePost.authorEn}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{activePost.views} {language === 'ar' ? 'مشاهدة' : 'Views'}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {language === 'ar' ? activePost.titleAr : activePost.titleEn}
            </h1>

            {/* Simulated SEO Schema or Keywords banner */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {activePost.tags.map((tag, idx) => (
                <span key={idx} className="bg-blue-50 text-blue-600 dark:bg-white/5 dark:text-blue-400 dark:border dark:border-white/10 text-xs font-bold px-2.5 py-1 rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="text-slate-600 dark:text-slate-300 space-y-6 leading-relaxed text-sm sm:text-base font-light">
              <p>{language === 'ar' ? activePost.contentAr : activePost.contentEn}</p>
              <p>
                {language === 'ar'
                  ? 'يتطلب تصميم الأنظمة المحاسبية المتينة رعاية كاملة للتفاصيل. إن دمج قواعد البيانات الموزعة SQL Server مع معمارية ASP.NET Core 9 يضمن عدم فقدان أي فاتورة أو حركة مالية للمخزن، مما يجعل برمجني الخيار الآمن دائماً لنمو وازدهار عملياتك.'
                  : 'Crafting premium accounting databases requires continuous technical oversight. Leveraging C# with clean repository structures ensures zero ledger loss and high concurrency, making Barmegny the safest technical option for your digital expansion.'}
              </p>
            </div>
          </div>
        ) : (
          /* BLOG LISTING & SEARCH */
          <div className="space-y-12">
            
            {/* Search and Filters Bar */}
            <div className="flex flex-col md:flex-row items-center gap-4 justify-between glass-panel p-4 rounded-2xl shadow-sm">
              <div className="relative w-full md:w-96">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder={language === 'ar' ? 'ابحث في المقالات التقنية والمحاسبية...' : 'Search ERP or POS articles...'}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#05070a]/60 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Tags quick filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    !selectedTag 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300 dark:border dark:border-white/10'
                  }`}
                >
                  {language === 'ar' ? 'الكل' : 'All Tags'}
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      selectedTag === tag 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300 dark:border dark:border-white/10'
                    }`}
                  >
                    <Tag size={10} />
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Listings Grid */}
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12 text-slate-400 font-light text-sm">
                {language === 'ar' ? 'لا توجد مقالات تطابق هذا البحث.' : 'No articles match this query.'}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="group glass-panel interactive-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 overflow-hidden bg-slate-800">
                        <img
                          src={post.image}
                          alt={language === 'ar' ? post.titleAr : post.titleEn}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          <span>{post.category}</span>
                          <span>{post.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                          {language === 'ar' ? post.titleAr : post.titleEn}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light line-clamp-3">
                          {language === 'ar' ? post.contentAr : post.contentEn}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 mt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/10 text-xs font-bold text-blue-600 dark:text-blue-400">
                      <button
                        onClick={() => incrementViews(post)}
                        className="flex items-center gap-1.5 hover:underline cursor-pointer"
                      >
                        <span>{language === 'ar' ? 'اقرأ المقال بالكامل' : 'Read Full Article'}</span>
                        <ArrowRight size={14} className={language === 'ar' ? 'rotate-180' : ''} />
                      </button>
                      <span className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Eye size={12} />
                        {post.views}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
