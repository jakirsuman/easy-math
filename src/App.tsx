import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, CircleHelp,
  Clock3, Flame, GraduationCap, Home, Lightbulb, LockKeyhole,
  RotateCcw, Sparkles, Target, Trophy, X, ChartNoAxesColumnIncreasing,
} from 'lucide-react'
import { learningPaths } from './data/curriculum'
import { practiceQuestions } from './data/expandedQuestions'
import type { AgeBand, LearningPath } from './data/curriculum'
import { areEquivalentFractions } from './math/fractions'
import { lessonContent } from './data/lessonContent'
import { DiscoveryLesson } from './components/DiscoveryLesson'
import { LessonWorkshop } from './components/LessonWorkshop'
import { advanceReviewSchedule, isReviewDue, scheduleFirstReview, type SpacedReviewRecord } from './math/spacedReview'

type View = 'home' | 'learn' | 'lesson' | 'practice' | 'lab' | 'progress'
type StoredProgress = { xp: number; completedLessons: string[]; correctAnswers: number; attempts: number; streak: number; reviewSchedule: Record<string, SpacedReviewRecord> }
const STORAGE_KEY = 'easy-math-progress-v1'
const defaultProgress: StoredProgress = { xp: 0, completedLessons: [], correctAnswers: 0, attempts: 0, streak: 1, reviewSchedule: {} }

function readProgress(): StoredProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress
    const parsed = JSON.parse(raw) as Partial<StoredProgress>
    const completedLessons = Array.isArray(parsed.completedLessons) ? parsed.completedLessons.filter((x): x is string => typeof x === 'string') : []
    const storedSchedule = parsed.reviewSchedule && typeof parsed.reviewSchedule === 'object' ? parsed.reviewSchedule as Record<string, SpacedReviewRecord> : {}
    const reviewSchedule: Record<string, SpacedReviewRecord> = {}
    for (const lessonId of completedLessons) {
      const record = storedSchedule[lessonId]
      if (record && Number.isFinite(record.dueAt) && Number.isFinite(record.intervalIndex) && Number.isFinite(record.completedReviews)) {
        reviewSchedule[lessonId] = {
          dueAt: record.dueAt,
          intervalIndex: Math.max(0, Math.min(3, record.intervalIndex)),
          completedReviews: Math.max(0, record.completedReviews),
        }
      } else {
        reviewSchedule[lessonId] = scheduleFirstReview(Date.now())
      }
    }
    return {
      xp: Number.isFinite(parsed.xp) ? Math.max(0, parsed.xp!) : 0,
      completedLessons,
      correctAnswers: Number.isFinite(parsed.correctAnswers) ? Math.max(0, parsed.correctAnswers!) : 0,
      attempts: Number.isFinite(parsed.attempts) ? Math.max(0, parsed.attempts!) : 0,
      streak: Number.isFinite(parsed.streak) ? Math.max(0, parsed.streak!) : 1,
      reviewSchedule,
    }
  } catch {
    return defaultProgress
  }
}

const ageBandLabels: Record<AgeBand, string> = {
  '8-9': '৮–৯ বছর',
  '10-11': '১০–১১ বছর',
  '12+': '১২ বছর বা বেশি',
}

const ageOptions: { id: AgeBand | 'all'; label: string; description: string }[] = [
  { id: '8-9', label: '৮–৯ বছর', description: 'সংখ্যা, যোগ-বিয়োগ, ভগ্নাংশ আর পরিচিত আকার দিয়ে শুরু করো।' },
  { id: '10-11', label: '১০–১১ বছর', description: 'দশমিক, শতকরা, গড় আর মাপজোকের মতো নতুন ধারণা শেখো।' },
  { id: '12+', label: '১২ বছর বা বেশি', description: 'ঋণাত্মক সংখ্যা, ভগ্নাংশের নিয়ম ও বীজগণিতের চ্যালেঞ্জ নাও।' },
  { id: 'all', label: 'সব বয়সের পাঠ', description: 'সব পাঠ একসঙ্গে দেখো। নিজের স্বাচ্ছন্দ্য অনুযায়ী যেকোনো পাঠ বেছে নিতে পারো।' },
]

const navItems: { id: View; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'হোম', icon: Home },
  { id: 'learn', label: 'শিখি', icon: BookOpen },
  { id: 'practice', label: 'অনুশীলন', icon: Target },
  { id: 'lab', label: 'ম্যাথ ল্যাব', icon: Sparkles },
  { id: 'progress', label: 'অগ্রগতি', icon: ChartNoAxesColumnIncreasing },
]

function App() {
  const [view, setView] = useState<View>('home')
  const [activePath, setActivePath] = useState<LearningPath>(learningPaths[1])
  const [activeLesson, setActiveLesson] = useState('fraction-basics')
  const [activeLessonReview, setActiveLessonReview] = useState(false)
  const [progress, setProgress] = useState<StoredProgress>(readProgress)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const completedCount = progress.completedLessons.length
  const totalLessons = learningPaths.reduce((sum, path) => sum + path.lessons.length, 0)

  function openLesson(path: LearningPath, lessonId: string, reviewMode = false) {
    setActivePath(path)
    setActiveLesson(lessonId)
    setActiveLessonReview(reviewMode)
    setView('lesson')
    setMobileMenuOpen(false)
  }

  function completeLesson(lessonId: string, earnedXp = 20) {
    setProgress((current) => {
      if (current.completedLessons.includes(lessonId)) return current
      return {
        ...current,
        completedLessons: [...current.completedLessons, lessonId],
        reviewSchedule: { ...current.reviewSchedule, [lessonId]: current.reviewSchedule[lessonId] ?? scheduleFirstReview(Date.now()) },
        xp: current.xp + earnedXp,
      }
    })
  }

  function completeReview(lessonId: string) {
    setProgress((current) => {
      const schedule = current.reviewSchedule[lessonId] ?? scheduleFirstReview(Date.now() - 24 * 60 * 60 * 1000)
      return {
        ...current,
        reviewSchedule: { ...current.reviewSchedule, [lessonId]: advanceReviewSchedule(schedule, Date.now()) },
        xp: current.xp + 10,
      }
    })
  }

  function recordAnswer(correct: boolean) {
    setProgress((current) => ({
      ...current,
      attempts: current.attempts + 1,
      correctAnswers: current.correctAnswers + (correct ? 1 : 0),
      xp: current.xp + (correct ? 5 : 0),
    }))
  }

  function navigate(next: View) {
    setView(next)
    setMobileMenuOpen(false)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenuOpen ? 'sidebar-open' : ''}`}>
        <button className="brand" onClick={() => navigate('home')} aria-label="সহজ গণিত হোম">
          <span className="brand-copy">
            <img className="brand-wordmark" src="/sopan-wordmark.svg" alt="Sopan wordmark" />
            <small>সহজ গণিত · EASY MATH</small>
          </span>
        </button>
        <div className="side-label">শেখার জায়গা</div>
        <nav className="side-nav" aria-label="প্রধান নেভিগেশন">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item ${view === id || (view === 'lesson' && id === 'learn') ? 'nav-item-active' : ''}`} onClick={() => navigate(id)}>
              <Icon size={19} strokeWidth={1.9} /><span>{label}</span>
              {id === 'practice' && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="streak-card">
            <div className="streak-icon"><Flame size={20} fill="currentColor" /></div>
            <div><strong>{progress.streak} দিনের ধারাবাহিকতা</strong><span>আজ একটু অনুশীলন করো</span></div>
          </div>
          <div className="profile-mini">
            <div className="avatar">শি</div>
            <div><strong>শিক্ষার্থী</strong><span>শেখার যাত্রা চলছে</span></div>
            <Sparkles size={17} className="profile-sparkle" />
          </div>
        </div>
      </aside>

      {mobileMenuOpen && <button className="mobile-scrim" aria-label="মেনু বন্ধ করো" onClick={() => setMobileMenuOpen(false)} />}
      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu-button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="মেনু"><span>{mobileMenuOpen ? <X size={20} /> : <BookOpen size={20} />}</span></button>
          <div className="breadcrumb"><span>তোমার শেখার জগৎ</span><ChevronRight size={15} /><strong>{navItems.find((item) => item.id === (view === 'lesson' ? 'learn' : view))?.label ?? 'শিখি'}</strong></div>
          <div className="topbar-actions">
            <div className="xp-pill"><Sparkles size={16} /><strong>{progress.xp} XP</strong></div>
            <button className="help-button" onClick={() => navigate('lab')}><CircleHelp size={17} /><span>সাহায্য</span></button>
          </div>
        </header>

        {view === 'home' && <HomeView progress={progress} completedCount={completedCount} onNavigate={navigate} onOpenLesson={openLesson} />}
        {view === 'learn' && <LearnView completed={progress.completedLessons} onOpenLesson={openLesson} />}
        {view === 'lesson' && <LessonView lessonId={activeLesson} path={activePath} completed={progress.completedLessons.includes(activeLesson)} reviewMode={activeLessonReview} onBack={() => navigate('learn')} onComplete={() => activeLessonReview ? completeReview(activeLesson) : completeLesson(activeLesson)} onPractice={() => navigate('practice')} />}
        {view === 'practice' && <PracticeView onRecord={recordAnswer} onFinish={() => navigate('progress')} />}
        {view === 'lab' && <LabView />}
        {view === 'progress' && <ProgressView progress={progress} completedCount={completedCount} totalLessons={totalLessons} onReset={() => { setProgress(defaultProgress); localStorage.removeItem(STORAGE_KEY) }} />}
      </main>
      <nav className="mobile-bottom-nav" aria-label="মোবাইল নেভিগেশন">
        {navItems.map(({ id, label, icon: Icon }) => <button key={id} className={view === id || (view === 'lesson' && id === 'learn') ? 'mobile-nav-active' : ''} onClick={() => navigate(id)}><Icon size={19} /><span>{label}</span></button>)}
      </nav>
    </div>
  )
}

function HomeView({ progress, completedCount, onNavigate, onOpenLesson }: { progress: StoredProgress; completedCount: number; onNavigate: (view: View) => void; onOpenLesson: (path: LearningPath, id: string, reviewMode?: boolean) => void }) {
  const nextLesson = learningPaths.flatMap((path) => path.lessons.map((lesson) => ({ path, lesson }))).find(({ lesson }) => !progress.completedLessons.includes(lesson.id)) ?? { path: learningPaths[0], lesson: learningPaths[0].lessons[0] }
  const dueReviews = learningPaths.flatMap((path) => path.lessons.map((lesson) => ({ path, lesson, schedule: progress.reviewSchedule[lesson.id] })))
    .filter(({ lesson, schedule }) => progress.completedLessons.includes(lesson.id) && isReviewDue(schedule, Date.now()))
    .sort((a, b) => (a.schedule?.dueAt ?? 0) - (b.schedule?.dueAt ?? 0))
  return (
    <div className="page-content">
      <section className="welcome-row">
        <div><div className="eyebrow"><span className="eyebrow-dot" /> তোমার শেখার সময়</div><h1>হ্যালো, শিক্ষার্থী! <span className="wave">✳</span></h1><p>আজ নতুন কিছু বুঝে ফেলি। এক ধাপ করে এগোলেই হবে।</p></div>
        <div className="date-chip"><span className="date-sun">☼</span><span>আজকের লক্ষ্য</span><strong>১০ মিনিট</strong></div>
      </section>

      <section className="hero-card">
        <div className="hero-copy">
          <span className="hero-kicker"><Sparkles size={14} /> আজকের শেখা</span>
          <h2>ভগ্নাংশকে<br />চোখে দেখে বুঝি</h2>
          <p>একটি পুরো জিনিসকে সমান ভাগে ভাগ করলে কী হয়? চলো, নিজেই দেখে নিই।</p>
          <button className="button-primary" onClick={() => onOpenLesson(learningPaths[1], 'fraction-basics')}>শেখা শুরু করো <ArrowRight size={17} /></button>
          <div className="hero-meta"><span><Clock3 size={14} /> ৭ মিনিট</span><span><GraduationCap size={15} /> একদম শুরু থেকে</span></div>
        </div>
        <div className="hero-art" aria-label="অর্ধেক রঙ করা বৃত্তের চিত্র">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="fraction-disc"><div className="disc-half" /><div className="disc-line" /><div className="disc-center" /></div>
          <div className="floating-math floating-one">½</div><div className="floating-math floating-two">¼</div><div className="floating-star">✳</div>
          <div className="art-caption"><strong>১/২</strong><span>অর্ধেক</span></div>
        </div>
        <div className="hero-decoration decoration-one" /><div className="hero-decoration decoration-two" />
      </section>

      <section className="stats-grid">
        <StatCard icon={<Target size={19} />} label="সম্পন্ন পাঠ" value={String(completedCount)} detail="চালিয়ে যাও" tone="blue" />
        <StatCard icon={<Sparkles size={19} />} label="অর্জিত পয়েন্ট" value={String(progress.xp)} detail="প্রতিটি চেষ্টায় শেখা" tone="purple" />
        <StatCard icon={<Flame size={19} />} label="ধারাবাহিকতা" value={String(progress.streak) + ' দিন'} detail="আজকের লক্ষ্য পূরণ করো" tone="orange" />
      </section>

      {dueReviews.length > 0 && <section className="section-block spaced-review-section" aria-label="সময় হলে আবার মনে করার পাঠ">
        <div className="section-heading"><div><span className="eyebrow">আগে শেখা মনে রাখি</span><h2>আবার মনে করি</h2></div><span className="review-count">{dueReviews.length}টি পাঠ</span></div>
        <p className="review-intro">কিছুদিন পর ফিরে এলে শেখা বিষয়টি মনে আছে কি না যাচাই করা যায়। আজকের পুনরালোচনায় আবার ছয়টি ছোট কাজ করবে—উত্তর মুখস্থ নয়, ধারণা মনে করার চেষ্টা করো।</p>
        <div className="spaced-review-list">{dueReviews.slice(0, 3).map(({ path, lesson, schedule }) => <article className="spaced-review-row" key={lesson.id}><div><strong>{lesson.title}</strong><small>{schedule?.completedReviews ? 'আগেও পুনরালোচনা হয়েছে' : 'প্রথম পুনরালোচনার সময়'} · {lesson.subtitle}</small></div><button type="button" className="button-secondary" onClick={() => onOpenLesson(path, lesson.id, true)}>পুনরায় মনে করি <ArrowRight size={15} /></button></article>)}</div>
      </section>}
      <section className="section-block">
        <div className="section-heading"><div><span className="eyebrow">তোমার পরিকল্পনা</span><h2>শেখার পথ</h2></div><button className="text-link" onClick={() => onNavigate('learn')}>সব দেখো <ArrowRight size={16} /></button></div>
        <div className="path-grid">
          {learningPaths.map((path) => <PathCard key={path.id} path={path} completed={progress.completedLessons} onClick={() => onNavigate('learn')} />)}
        </div>
      </section>

      <section className="continue-card">
        <div className="continue-icon"><BookOpen size={21} /></div>
        <div className="continue-copy"><span>যেখান থেকে শুরু করবে</span><strong>{nextLesson.lesson.title}</strong><small>{nextLesson.lesson.subtitle} · {nextLesson.lesson.duration}</small></div>
        <button className="icon-button continue-button" aria-label="পাঠ শুরু করো" onClick={() => onOpenLesson(nextLesson.path, nextLesson.lesson.id)}><ArrowRight size={20} /></button>
      </section>
    </div>
  )
}

function StatCard({ icon, label, value, detail, tone }: { icon: ReactNode; label: string; value: string; detail: string; tone: string }) {
  return <article className="stat-card"><div className={`stat-icon tone-${tone}`}>{icon}</div><div className="stat-label">{label}</div><strong className="stat-value">{value}</strong><span className="stat-detail">{detail}</span></article>
}

function PathCard({ path, completed, onClick }: { path: LearningPath; completed: string[]; onClick: () => void }) {
  const completedInPath = path.lessons.filter((lesson) => completed.includes(lesson.id)).length
  const progress = path.lessons.length ? Math.round(completedInPath / path.lessons.length * 100) : 0
  return <button className="path-card" onClick={onClick}><div className={`path-icon path-${path.color}`}>{path.icon}</div><div className="path-card-copy"><strong>{path.title}</strong><span>{path.description}</span><div className="progress-track"><div style={{ width: `${progress}%` }} /></div><small>{progress}% সম্পন্ন · {completedInPath}/{path.lessons.length}টি পাঠ</small></div><ChevronRight size={18} className="path-chevron" /></button>
}

function LearnView({ completed, onOpenLesson }: { completed: string[]; onOpenLesson: (path: LearningPath, id: string) => void }) {
  const [selected, setSelected] = useState('all')
  const [selectedAge, setSelectedAge] = useState<AgeBand | 'all'>('8-9')
  const selectedPaths = selected === 'all' ? learningPaths : learningPaths.filter((path) => path.id === selected)
  const visiblePaths = selectedPaths
    .map((path) => ({ ...path, lessons: path.lessons.filter((lesson) => selectedAge === 'all' || lesson.ageBand === selectedAge) }))
    .filter((path) => path.lessons.length > 0)
  const ageDescription = ageOptions.find((option) => option.id === selectedAge)?.description

  return <div className="page-content">
    <div className="page-title-row"><div><div className="eyebrow">ধাপে ধাপে শেখা</div><h1>শেখার পথ</h1><p>ছোট ছোট ধাপে শিখি। না বুঝলে আবার দেখে নিতে পারো।</p></div><div className="title-stamp"><BookOpen size={23} /></div></div>
    <section className="age-selector" aria-label="বয়স অনুযায়ী পাঠ বেছে নাও">
      <div className="age-selector-heading"><strong>তোমার বয়স অনুযায়ী পাঠ বেছে নাও</strong><span>সহজ থেকে ধীরে ধীরে কঠিন</span></div>
      <div className="filter-row age-filter-row">{ageOptions.map((option) => <button key={option.id} type="button" className={selectedAge === option.id ? 'filter-chip filter-active' : 'filter-chip'} aria-pressed={selectedAge === option.id} onClick={() => setSelectedAge(option.id)}>{option.label}</button>)}</div>
      <p className="age-description">{ageDescription}</p>
    </section>
    <div className="filter-row subject-filter-row" aria-label="বিষয় বেছে নাও">{[{ id: 'all', label: 'সব বিষয়' }, ...learningPaths.map((path) => ({ id: path.id, label: path.title }))].map((item) => <button key={item.id} type="button" className={selected === item.id ? 'filter-chip filter-active' : 'filter-chip'} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>{item.label}</button>)}</div>
    <div className="learning-path-list">{visiblePaths.map((path) => <section key={path.id} className="learning-path-section"><div className={`learning-path-header`}><div className={`path-icon path-${path.color}`}>{path.icon}</div><div><h2>{path.title}</h2><p>{path.description}</p></div><span className="path-count">{path.lessons.length}টি পাঠ</span></div><div className="lesson-list">{path.lessons.map((lesson, index) => { const isComplete = completed.includes(lesson.id); const locked = lesson.status === 'coming-soon'; return <button type="button" className={`lesson-row ${locked ? 'lesson-locked' : ''}`} key={lesson.id} onClick={() => { if (!locked) onOpenLesson(path, lesson.id) }} disabled={locked} aria-label={lesson.title + ' খুলুন'}><span className={`lesson-index ${isComplete ? 'lesson-index-done' : ''}`}>{isComplete ? <Check size={17} /> : locked ? <LockKeyhole size={16} /> : String(index + 1).padStart(2, '0')}</span><span className="lesson-row-copy"><strong>{lesson.title}</strong><span>{lesson.subtitle}</span></span><span className="lesson-duration"><Clock3 size={13} />{lesson.duration}</span>{locked ? <span className="coming-label">শিগগিরই</span> : <span className="lesson-open" aria-hidden="true"><ChevronRight size={18} /></span>}</button> })}</div></section>)}</div>
    {visiblePaths.length === 0 && <p className="empty-lessons">এই বয়সের জন্য এই বিষয়ে পাঠ নেই। অন্য বয়সের পাঠ বেছে দেখো।</p>}
  </div>
}

function LessonView({ lessonId, path, completed, reviewMode, onBack, onComplete, onPractice }: { lessonId: string; path: LearningPath; completed: boolean; reviewMode: boolean; onBack: () => void; onComplete: () => void; onPractice: () => void }) {
  const lesson = path.lessons.find((item) => item.id === lessonId)
  const content = lessonContent[lessonId] ?? lessonContent['fraction-basics']

  if (['place-value', 'multiplication-groups', 'fraction-basics'].includes(lessonId)) {
    return <DiscoveryLesson lessonId={lessonId} title={lesson?.title ?? 'গণিতের পাঠ'} pathTitle={path.title} ageLabel={ageBandLabels[lesson?.ageBand ?? '8-9']} onBack={onBack} onComplete={onComplete} onPractice={onPractice} completed={completed} reviewMode={reviewMode} />
  }

  return <LessonWorkshop lessonId={lessonId} title={lesson?.title ?? 'গণিতের পাঠ'} pathTitle={path.title} ageLabel={ageBandLabels[lesson?.ageBand ?? '8-9']} onBack={onBack} onComplete={onComplete} onPractice={onPractice} completed={completed} content={content} reviewMode={reviewMode} />
}

function PracticeView({ onRecord, onFinish }: { onRecord: (correct: boolean) => void; onFinish: () => void }) {
  const [mode, setMode] = useState<'mixed' | 'daily'>('mixed')
  const [topic, setTopic] = useState('all')
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const questions = useMemo(() => {
    const pool = practiceQuestions.filter((item) => topic === 'all' || item.topic === topic)
    if (!pool.length) return []
    if (mode === 'daily') {
      const day = new Date().toLocaleDateString('en-CA')
      return [...pool].sort((a, b) => {
        const hash = (id: string) => [...(day + id)].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7)
        return hash(a.id) - hash(b.id)
      }).slice(0, Math.min(5, pool.length))
    }
    const [first, ...rest] = pool
    for (let i = rest.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[rest[i], rest[j]] = [rest[j], rest[i]]
    }
    return [first, ...rest].slice(0, Math.min(10, pool.length))
  }, [mode, topic])

  const question = questions[index]
  const isCorrect = Boolean(question && selected === question.answer)

  function changeSession(nextMode: 'mixed' | 'daily') {
    setMode(nextMode)
    setIndex(0)
    setSelected('')
    setSubmitted(false)
    setScore(0)
    setFinished(false)
  }

  function changeTopic(nextTopic: string) {
    setTopic(nextTopic)
    setIndex(0)
    setSelected('')
    setSubmitted(false)
    setScore(0)
    setFinished(false)
  }

  function submit() {
    if (!question || !selected || submitted) return
    setSubmitted(true)
    onRecord(isCorrect)
    if (isCorrect) setScore((value) => value + 1)
  }

  function next() {
    if (index + 1 >= questions.length) {
      setFinished(true)
      return
    }
    setIndex((value) => value + 1)
    setSelected('')
    setSubmitted(false)
  }

  if (finished) {
    const accuracy = questions.length ? Math.round(score / questions.length * 100) : 0
    return <div className="page-content practice-page">
      <div className="quiz-result-card">
        <div className="result-icon"><Trophy size={30} /></div>
        <span className="eyebrow">{mode === 'daily' ? 'আজকের চ্যালেঞ্জ সম্পন্ন' : 'অনুশীলন শেষ'}</span>
        <h1>{accuracy >= 80 ? 'দারুণ অগ্রগতি!' : accuracy >= 50 ? 'ভালো চেষ্টা!' : 'চর্চা চালিয়ে যাও'}</h1>
        <p>ভুল উত্তরও শেখার সুযোগ। ব্যাখ্যাগুলো আবার দেখে নিলে ধারণা আরও পরিষ্কার হবে।</p>
        <div className="result-stats">
          <div><span>সঠিক উত্তর</span><strong>{score}/{questions.length}</strong></div>
          <div><span>নির্ভুলতা</span><strong>{accuracy}%</strong></div>
          <div><span>অর্জিত XP</span><strong>{score * 5}</strong></div>
        </div>
        <div className="result-actions">
          <button className="button-secondary" onClick={() => changeSession(mode === 'daily' ? 'daily' : 'mixed')}><RotateCcw size={16} /> আবার চেষ্টা করো</button>
          <button className="button-primary" onClick={onFinish}>অগ্রগতি দেখো <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  }

  if (!question) return <div className="page-content practice-page"><h1>এই বিষয়ে প্রশ্ন এখনো যোগ করা হয়নি</h1><button className="button-primary" onClick={() => changeTopic('all')}>সব বিষয় থেকে অনুশীলন</button></div>

  return <div className="page-content practice-page">
    <button className="back-link" onClick={onFinish}><ArrowLeft size={16} /> অগ্রগতিতে ফিরে যাও</button>
    <div className="practice-header"><div><div className="eyebrow">ছোট্ট চ্যালেঞ্জ</div><h1>এবার নিজে করো</h1><p>প্রতিবার নতুন প্রশ্ন অনুশীলন করো। ভুল হলে ব্যাখ্যা দেখে শিখে নাও।</p></div><div className="quiz-score"><Sparkles size={17} /><strong>{score} পয়েন্ট</strong></div></div>
    <div className="practice-modes" aria-label="অনুশীলনের ধরন">
      <button className={mode === 'mixed' ? 'practice-mode practice-mode-active' : 'practice-mode'} onClick={() => changeSession('mixed')}><Target size={17} /><span><strong>মিশ্র অনুশীলন</strong><small>১০টি পর্যন্ত প্রশ্ন</small></span></button>
      <button className={mode === 'daily' ? 'practice-mode practice-mode-active' : 'practice-mode'} onClick={() => changeSession('daily')}><Flame size={17} /><span><strong>দৈনিক চ্যালেঞ্জ</strong><small>আজকের জন্য নির্দিষ্ট ৫টি প্রশ্ন</small></span></button>
    </div>
    <label className="topic-filter">বিষয় বেছে নাও
      <select value={topic} onChange={(event) => changeTopic(event.target.value)}>
        <option value="all">সব বিষয়</option>
        <option value="arithmetic">যোগ, বিয়োগ, গুণ ও ভাগ</option>
        <option value="numbers">সংখ্যা ও স্থানীয় মান</option>
        <option value="fractions">ভগ্নাংশ</option>
        <option value="decimals">দশমিক</option>
        <option value="percentages">শতকরা</option>
        <option value="ratio">অনুপাত</option>
        <option value="algebra">বীজগণিত</option>
        <option value="geometry">জ্যামিতি</option>
      </select>
    </label>
    <div className="quiz-card">
      <div className="quiz-top"><span>{index + 1} / {questions.length}টি প্রশ্ন · {question.topic === 'fractions' ? 'ভগ্নাংশ' : question.topic === 'arithmetic' ? 'পাটিগণিত' : question.topic === 'numbers' ? 'সংখ্যা' : question.topic === 'decimals' ? 'দশমিক' : question.topic === 'percentages' ? 'শতকরা' : question.topic === 'ratio' ? 'অনুপাত' : question.topic === 'algebra' ? 'বীজগণিত' : 'জ্যামিতি'}</span><span><Clock3 size={14} /> বুঝে উত্তর দাও</span></div>
      <div className="quiz-progress"><div style={{ width: `${(index + 1) / questions.length * 100}%` }} /></div>
      <h2>{question.prompt}</h2>
      <div className="answer-options">{question.options.map((option, optionIndex) => <button key={option} disabled={submitted} className={`answer-option ${selected === option ? 'answer-selected' : ''} ${submitted && option === question.answer ? 'answer-correct' : ''} ${submitted && selected === option && !isCorrect ? 'answer-wrong' : ''}`} onClick={() => setSelected(option)}><span className="option-letter">{['A', 'B', 'C'][optionIndex]}</span><span>{option}</span>{submitted && option === question.answer && <Check size={18} />}</button>)}</div>
      {submitted && <div className={`answer-feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}><strong>{isCorrect ? 'সঠিক উত্তর!' : 'আরেকবার বুঝে নিই'}</strong><p>{question.explanation}</p></div>}
      <div className="quiz-footer"><span>{submitted ? (isCorrect ? '+৫ XP অর্জন' : 'চেষ্টা চালিয়ে যাও') : 'একটি উত্তর বেছে নাও'}</span>{!submitted ? <button className="button-primary" disabled={!selected} onClick={submit}>উত্তর যাচাই <ArrowRight size={16} /></button> : <button className="button-primary" onClick={next}>{index + 1 === questions.length ? 'ফলাফল দেখো' : 'পরের প্রশ্ন'} <ArrowRight size={16} /></button>}</div>
    </div>
    <div className="practice-note"><Lightbulb size={18} /><p><strong>শেখার টিপস:</strong> উত্তর দেওয়ার আগে প্রশ্নটি নিজের ভাষায় বোঝার চেষ্টা করো। প্রতিটি উত্তরের ব্যাখ্যা দেখো, তারপর পরের প্রশ্নে যাও।</p></div>
  </div>
}

function LabView() {
  const [value, setValue] = useState(3)
  const [whole, setWhole] = useState(8)
  const [showExplanation, setShowExplanation] = useState(false)
  const percent = Math.round(value / whole * 100)
  return <div className="page-content"><div className="page-title-row"><div><div className="eyebrow">দেখে শেখার জায়গা</div><h1>ইন্টার‍্যাক্টিভ ম্যাথ ল্যাব</h1><p>সংখ্যা বদলাও, কী ঘটে তা দেখো, তারপর নিজের ভাষায় ব্যাখ্যা করো।</p></div><div className="title-stamp"><Sparkles size={23} /></div></div><div className="lab-feature-card"><div className="lab-feature-copy"><span className="hero-kicker"><Sparkles size={14} /> হাতে-কলমে গণিত</span><h2>ভগ্নাংশ ও শতকরা</h2><p>একই পরিমাণকে ভগ্নাংশ, দশমিক এবং শতকরা হিসেবে দেখো।</p><div className="lab-controls"><label>নেওয়া অংশ <strong>{value}</strong><input type="range" min="1" max={whole} value={value} onChange={(e) => { setValue(Number(e.target.value)); setShowExplanation(false) }} /></label><label>মোট অংশ <strong>{whole}</strong><input type="range" min="2" max="12" value={whole} onChange={(e) => { const next = Number(e.target.value); setWhole(next); setValue((v) => Math.min(v, next)); setShowExplanation(false) }} /></label></div></div><div className="lab-visual"><div className="lab-ring" style={{ background: `conic-gradient(#0B58FC 0% ${percent}%, #eaf2ff ${percent}% 100%)` }}><div><strong>{percent}%</strong><span>শতকরা</span></div></div><div className="lab-equivalents"><div><span>ভগ্নাংশ</span><strong>{value}/{whole}</strong></div><div><span>দশমিক (প্রায়)</span><strong>{(value / whole).toFixed(2)}</strong></div><div><span>শতকরা</span><strong>{percent}%</strong></div></div></div></div><FractionEquivalenceCheck /><button className="explain-toggle" onClick={() => setShowExplanation((show) => !show)}><Lightbulb size={18} /> {showExplanation ? 'ব্যাখ্যা লুকাও' : 'এটি কীভাবে কাজ করে?'} <ChevronRight size={17} className={showExplanation ? 'rotate-chevron' : ''} /></button>{showExplanation && <div className="explanation-card"><h3>একই মানের তিনটি রূপ</h3><p>{value}/{whole} মানে {whole}টি সমান অংশের মধ্যে {value}টি অংশ। দশমিক পেতে {value} ÷ {whole} হিসাব করি। শতকরা পেতে সেই মানকে ১০০ দিয়ে গুণ করি। এখানে শতকরা মানটি নিকটতম পূর্ণ সংখ্যায় দেখানো হয়েছে।</p></div>}<div className="lab-model-grid"><AlgebraBalanceModel /><RectangleExplorer /></div></div>
}


function AlgebraBalanceModel() {
  const [offset, setOffset] = useState(3)
  const [total, setTotal] = useState(11)
  const answer = total - offset

  return <article className="lab-model-card">
    <div className="model-card-heading"><div><span className="visualizer-label">বীজগণিত</span><h3>সমতার দুই পাশ</h3></div><span className="model-mark">x = ?</span></div>
    <p className="model-intro">একটি অজানা সংখ্যার সঙ্গে কোনো সংখ্যা যোগ করা হয়েছে। দুই পাশ থেকে একই সংখ্যা বিয়োগ করে x-কে একা করো।</p>
    <div className="balance-equation" aria-live="polite">
      <div className="balance-side"><span>বাম পাশ</span><strong>x + {offset}</strong></div>
      <div className="balance-equals" aria-label="সমান">=</div>
      <div className="balance-side"><span>ডান পাশ</span><strong>{total}</strong></div>
    </div>
    <div className="balance-controls">
      <label>যোগ করা সংখ্যা <strong>{offset}</strong><input aria-label="সমীকরণে যোগ করা সংখ্যা" type="range" min="0" max="10" value={offset} onChange={(event) => setOffset(Number(event.target.value))} /></label>
      <label>সমীকরণের ডান পাশ <strong>{total}</strong><input aria-label="সমীকরণের ডান পাশ" type="range" min="0" max="20" value={total} onChange={(event) => setTotal(Number(event.target.value))} /></label>
    </div>
    <div className="balance-solution" aria-live="polite"><span>দুই পাশ থেকে {offset} বিয়োগ</span><strong>x = {total} − {offset} = {answer}</strong><small>যাচাই: {answer} + {offset} = {total}</small></div>
    <p className="model-footnote">সমীকরণের এক পাশেই শুধু কাজ করলে ভারসাম্য নষ্ট হয়। সমতা রাখতে দুই পাশেই একই ক্রিয়া করো।</p>
  </article>
}

function RectangleExplorer() {
  const [length, setLength] = useState(8)
  const [width, setWidth] = useState(4)
  const perimeter = 2 * (length + width)
  const area = length * width

  return <article className="lab-model-card">
    <div className="model-card-heading"><div><span className="visualizer-label">জ্যামিতি</span><h3>আয়তক্ষেত্র এক্সপ্লোরার</h3></div><span className="model-mark">দৈর্ঘ্য × প্রস্থ</span></div>
    <p className="model-intro">দৈর্ঘ্য ও প্রস্থ বদলে দেখো—সীমানার দৈর্ঘ্য (পরিসীমা) আর ভেতরের জায়গা (ক্ষেত্রফল) কীভাবে বদলায়।</p>
    <div className="rectangle-stage">
      <div className="rectangle-shape" role="img" aria-label={`দৈর্ঘ্য ${length} সেমি এবং প্রস্থ ${width} সেমির আয়তক্ষেত্র`} style={{ width: `${Math.min(96, length * 8)}%`, height: `${width * 9 + 18}px` }}>
        <span>{length} সেমি</span><small>{width} সেমি</small>
      </div>
    </div>
    <div className="balance-controls">
      <label>দৈর্ঘ্য <strong>{length} সেমি</strong><input aria-label="আয়তক্ষেত্রের দৈর্ঘ্য" type="range" min="2" max="12" value={length} onChange={(event) => setLength(Number(event.target.value))} /></label>
      <label>প্রস্থ <strong>{width} সেমি</strong><input aria-label="আয়তক্ষেত্রের প্রস্থ" type="range" min="1" max="8" value={width} onChange={(event) => setWidth(Number(event.target.value))} /></label>
    </div>
    <div className="geometry-metrics"><div><span>পরিসীমা</span><strong>{perimeter} সেমি</strong><small>২ × (দৈর্ঘ্য + প্রস্থ)</small></div><div><span>ক্ষেত্রফল</span><strong>{area} বর্গ সেমি</strong><small>দৈর্ঘ্য × প্রস্থ</small></div></div>
    <p className="model-footnote">পরিসীমা হলো চারদিকের মোট দৈর্ঘ্য; ক্ষেত্রফল হলো আয়তক্ষেত্রের ভেতরের জায়গা। একটির একক সেমি, অন্যটির বর্গ সেমি।</p>
  </article>
}

function ProgressView({ progress, completedCount, totalLessons, onReset }: { progress: StoredProgress; completedCount: number; totalLessons: number; onReset: () => void }) {
  const accuracy = progress.attempts ? Math.round(progress.correctAnswers / progress.attempts * 100) : 0
  const pathProgress = useMemo(() => learningPaths.map((path) => ({ ...path, done: path.lessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length })), [progress.completedLessons])
  return <div className="page-content"><div className="page-title-row"><div><div className="eyebrow">তোমার অর্জন</div><h1>শেখার অগ্রগতি</h1><p>ছোট ছোট চেষ্টাই বড় দক্ষতা তৈরি করে।</p></div><div className="title-stamp"><Trophy size={23} /></div></div><div className="progress-hero"><div className="progress-hero-icon"><Trophy size={25} /></div><div><span>তোমার মোট অর্জন</span><strong>{progress.xp} XP</strong><p>শেখার প্রতিটি পদক্ষেপই মূল্যবান।</p></div><div className="progress-hero-pattern">✳</div></div><div className="stats-grid progress-stats"><StatCard icon={<BookOpen size={19} />} label="সম্পন্ন পাঠ" value={String(completedCount)} detail={`মোট ${totalLessons}টি তালিকাভুক্ত পাঠ`} tone="blue" /><StatCard icon={<Target size={19} />} label="উত্তরের নির্ভুলতা" value={`${accuracy}%`} detail={`${progress.correctAnswers}/${progress.attempts}টি সঠিক`} tone="purple" /><StatCard icon={<Flame size={19} />} label="ধারাবাহিকতা" value={`${progress.streak} দিন`} detail="আজকের শেখা চালিয়ে যাও" tone="orange" /></div><section className="section-block"><div className="section-heading"><div><span className="eyebrow">বিষয় অনুযায়ী</span><h2>তোমার শেখার পথ</h2></div></div><div className="progress-paths">{pathProgress.map((path) => { const percent = path.lessons.length ? Math.round(path.done / path.lessons.length * 100) : 0; return <div className="progress-path-row" key={path.id}><div className={`path-icon path-${path.color}`}>{path.icon}</div><div className="progress-path-copy"><strong>{path.title}</strong><div className="progress-track"><div style={{ width: `${percent}%` }} /></div></div><span>{path.done}/{path.lessons.length}</span></div> })}</div></section><button className="reset-progress" onClick={() => { if (window.confirm('তোমার সংরক্ষিত অগ্রগতি মুছে ফেলবে?')) onReset() }}><RotateCcw size={16} /> স্থানীয় অগ্রগতি রিসেট করো</button><p className="local-note">এই প্রাথমিক সংস্করণে অগ্রগতি এই ব্রাউজারেই সংরক্ষিত থাকে। অ্যাকাউন্ট ও ডিভাইস-সিঙ্ক পরে যুক্ত হবে।</p></div>
}

export default App


function FractionEquivalenceCheck() {
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const correct = areEquivalentFractions(answer, 1, 2)
  return <section className="equivalence-check">
    <div><strong>নিজে যাচাই করো</strong><p>১/২-এর সমতুল্য একটি ভগ্নাংশ লেখো। যেমন: ২/৪।</p></div>
    <form onSubmit={(event) => { event.preventDefault(); setChecked(true) }}>
      <input aria-label="সমতুল্য ভগ্নাংশ লেখো" value={answer} onChange={(event) => { setAnswer(event.target.value); setChecked(false) }} placeholder="যেমন ৩/৬" />
      <button className="button-primary" type="submit" disabled={!answer.trim()}>যাচাই</button>
    </form>
    {checked && <p className={correct ? 'equivalence-correct' : 'equivalence-incorrect'}>{correct ? 'সঠিক! এই ভগ্নাংশটির মান ১/২-এর সমান।' : 'এখনও মেলেনি। লব ও হরকে একই অশূন্য সংখ্যা দিয়ে গুণ করে দেখো।'}</p>}
  </section>
}
