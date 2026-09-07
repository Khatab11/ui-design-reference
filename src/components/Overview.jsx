import { chapters } from '../lib/content.js'
import { hrefFor } from '../lib/hooks.js'
import { t } from '../lib/ui.js'
import { site } from '../config.js'

// Simple icons mapped from the prototype
const ChevronIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
  </svg>
)

const LayoutIcon = () => (
  <div className="w-16 h-16 bg-action-tint rounded-xl grid grid-cols-3 gap-1 p-2">
    <div className="bg-action-tint-line rounded-sm"></div><div className="bg-action-tint-line rounded-sm"></div><div className="bg-action-tint-line rounded-sm"></div>
    <div className="bg-action-tint-line rounded-sm"></div><div className="bg-action-tint-line rounded-sm"></div><div className="bg-action-tint-line rounded-sm"></div>
    <div className="bg-action-tint-line rounded-sm"></div><div className="bg-action-tint-line rounded-sm"></div><div className="bg-action-tint-line rounded-sm"></div>
  </div>
)

const TypoIcon = ({ lang }) => (
  <div className="w-16 h-16 bg-surface-sunken rounded-xl flex items-center justify-center">
    <span className="font-serif text-2xl font-bold text-ink">{lang === 'ar' ? 'أب' : 'Aa'}</span>
  </div>
)

const ColorIcon = () => (
  <div className="w-16 h-16 bg-surface-sunken rounded-xl grid grid-cols-3 gap-1.5 p-2 items-center justify-items-center">
    <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div><div className="w-3 h-3 rounded-full bg-[#38bdf8]"></div><div className="w-3 h-3 rounded-full bg-[#fb7185]"></div>
    <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div><div className="w-3 h-3 rounded-full bg-[#34d399]"></div><div className="w-3 h-3 rounded-full bg-[#6366f1]"></div>
  </div>
)

const ButtonIcon = () => (
  <div className="w-20 h-16 rounded-xl flex flex-col gap-1.5 justify-center">
    <div className="h-4 bg-action rounded px-1.5 flex items-center justify-center text-[7px] text-white font-medium">Primary</div>
    <div className="h-4 bg-surface border border-line rounded px-1.5 flex items-center justify-center text-[7px] text-action font-medium">Secondary</div>
    <div className="h-4 bg-surface-sunken rounded px-1.5 flex items-center justify-center text-[7px] text-muted font-medium">Disabled</div>
  </div>
)

const FormIcon = () => (
  <div className="w-20 h-16 rounded-xl flex flex-col gap-1.5 justify-center">
    <div className="h-3 bg-surface border border-line rounded flex items-center px-1 text-[6px] text-muted">Name</div>
    <div className="h-3 bg-surface border border-line rounded flex items-center px-1 text-[6px] text-muted">Email</div>
    <div className="h-4 bg-action rounded flex items-center justify-center text-[7px] text-white">Submit</div>
  </div>
)

const SpaceIcon = () => (
  <div className="w-16 h-16 bg-surface-sunken rounded-xl p-1.5 flex gap-1 items-end relative overflow-hidden">
    <div className="w-1/2 h-10 bg-surface rounded shadow-sm border border-line"></div>
    <div className="w-1/2 h-7 bg-surface rounded shadow-sm border border-line"></div>
    <div className="absolute top-2 right-2 grid grid-cols-3 gap-[1px]">
      <div className="w-0.5 h-0.5 bg-line-strong"></div><div className="w-0.5 h-0.5 bg-line-strong"></div><div className="w-0.5 h-0.5 bg-line-strong"></div>
      <div className="w-0.5 h-0.5 bg-line-strong"></div><div className="w-0.5 h-0.5 bg-line-strong"></div><div className="w-0.5 h-0.5 bg-line-strong"></div>
    </div>
  </div>
)

// A mapping of visual icons for specific chapters just for the prototype feel
const chapterVisuals = {
  'grid-and-layout': LayoutIcon,
  'typography': TypoIcon,
  'color': ColorIcon,
  'buttons': ButtonIcon,
  'forms': FormIcon,
  'white-space': SpaceIcon
}

export default function Overview({ lang }) {
  // Use Introduction as the featured chapter (assuming it exists or fallback)
  const featuredChapter = chapters.find(c => c.id === 'introduction') || chapters[0]
  const otherChapters = chapters.filter(c => c.id !== featuredChapter?.id)

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500">
      
      {/* Header Text */}
      <div>
        <h2 className="text-xs font-bold text-muted tracking-widest uppercase mb-3">
          {lang === 'ar' ? 'مرجع الدورة' : 'COURSE COMPANION'}
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-ink tracking-tight mb-4">
          {site.title[lang]}
        </h1>
        <p className="text-lg text-body max-w-2xl">
          {site.subtitle?.[lang] || (lang === 'ar' 
            ? 'مرجع شامل ومفصل لمبادئ وأساسيات تصميم واجهات المستخدم، التخطيط، والتايبوجرافي، والهيراركي البصري.' 
            : 'A comprehensive bilingual reference for UI design principles, layout, typography, and visual hierarchy.')}
        </p>
      </div>

      {/* Tab Bar */}
      <div className="flex items-center justify-between border-b border-line">
        <div className="flex gap-6 -mb-px">
          <button className="flex items-center gap-2 pb-4 border-b-2 border-action text-action font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            <span>{lang === 'ar' ? 'كل الفصول' : 'All chapters'}</span>
          </button>
          <button className="flex items-center gap-2 pb-4 text-muted hover:text-ink transition-colors font-medium border-b-2 border-transparent hover:border-line-strong">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
            <span>{lang === 'ar' ? 'الفصول المحفوظة' : 'Saved chapters'}</span>
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-6 pb-4">
           <button className="flex items-center gap-2 text-muted hover:text-ink transition-colors text-sm font-medium">
             <span className="font-serif text-lg leading-none">Aa</span> <span>{lang === 'ar' ? 'حجم الخط' : 'Text size'}</span>
           </button>
           <div className="w-px h-4 bg-line"></div>
           <button className="flex items-center gap-2 text-muted hover:text-ink transition-colors text-sm font-medium">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
             <span>{lang === 'ar' ? 'إعدادات القراءة' : 'Reading settings'}</span>
           </button>
        </div>
      </div>

      {/* Featured Card */}
      {featuredChapter && (
        <div className="bg-action-soft rounded-[24px] p-8 md:p-12 flex flex-col lg:flex-row gap-10 items-center border border-action-tint-line">
          <div className="flex-1 order-2 lg:order-1 w-full">
             <div className="bg-surface rounded-xl shadow-sm border border-line p-4 aspect-video relative max-w-[400px] mx-auto lg:mx-0">
                <div className="absolute top-4 start-4 flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-error"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-warning"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-success"></div>
                </div>
                <div className="mt-8 flex gap-4 h-[calc(100%-2rem)]">
                   <div className="w-1/3 flex flex-col gap-3">
                     <div className="h-3 bg-surface-sunken rounded-sm w-3/4"></div>
                     <div className="h-3 bg-surface-sunken rounded-sm w-1/2"></div>
                     <div className="h-3 bg-surface-sunken rounded-sm w-full mt-4"></div>
                     <div className="h-3 bg-surface-sunken rounded-sm w-full"></div>
                     <div className="h-8 bg-surface-sunken rounded border border-line mt-auto flex items-center justify-center">
                        <div className="h-1 w-4 bg-line-strong rounded-full"></div>
                     </div>
                   </div>
                   <div className="w-2/3 grid grid-cols-2 gap-3">
                     <div className="bg-action-tint rounded-lg"></div>
                     <div className="bg-action-tint rounded-lg"></div>
                     <div className="bg-action-tint rounded-lg"></div>
                     <div className="bg-action-tint rounded-lg"></div>
                     <div className="bg-action-tint rounded-lg"></div>
                     <div className="bg-action-tint rounded-lg"></div>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex-1 order-1 lg:order-2 space-y-4">
            <div className="text-sm font-semibold text-action tracking-wide uppercase">
              {lang === 'ar' ? 'الفصل ٠١' : 'CHAPTER 01'}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-ink">{featuredChapter.title[lang]}</h3>
            <p className="text-body text-lg leading-relaxed">{featuredChapter.intro?.[lang] || featuredChapter.description?.[lang]}</p>
            <a href={hrefFor(featuredChapter.id)} className="btn btn--primary mt-4 inline-flex group">
              <span>{lang === 'ar' ? 'ابدأ القراءة' : 'Start reading'}</span>
              <ChevronIcon className="w-4 h-4 rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      )}

      {/* Browse by chapter */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-ink">{lang === 'ar' ? 'تصفح الفصول' : 'Browse by chapter'}</h3>
          <a href={hrefFor(otherChapters[0]?.id)} className="text-action font-medium flex items-center gap-1 hover:underline">
             <span>{lang === 'ar' ? 'عرض كل الفصول' : 'View all chapters'}</span>
             <ChevronIcon className="w-4 h-4 rtl:-scale-x-100" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherChapters.map((ch, idx) => {
            const Visual = chapterVisuals[ch.id] || LayoutIcon; // Fallback to LayoutIcon
            return (
              <a href={hrefFor(ch.id)} key={ch.id} className="group bg-surface border border-line rounded-2xl p-6 hover:shadow-raised hover:border-line-strong transition-all duration-300 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                   <Visual lang={lang} />
                   <button className="text-muted hover:text-action">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                   </button>
                </div>
                <div className="text-xs font-semibold text-muted tracking-wide mb-1 uppercase">
                  {lang === 'ar' ? `الفصل ${String(idx + 2).padStart(2, '٠')}` : `CHAPTER ${String(idx + 2).padStart(2, '0')}`}
                </div>
                <h4 className="text-lg font-bold text-ink mb-2">{ch.title[lang]}</h4>
                <p className="text-sm text-body leading-relaxed mb-4 flex-1 line-clamp-3">
                  {ch.intro?.[lang] || ch.description?.[lang] || 'No description available for this chapter.'}
                </p>
                <div className="flex justify-end text-line-strong group-hover:text-action transition-colors">
                   <ChevronIcon className="w-5 h-5 rtl:-scale-x-100" />
                </div>
              </a>
            )
          })}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="pt-12 border-t border-line flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
        <div>
          {lang === 'ar' ? 'مبني على كتاب UI Design Principles لمايكل فيليبيوك' : 'Based on UI Design Principles by Michael Filipink'}
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-ink transition-colors">About</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-ink transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  )
}
