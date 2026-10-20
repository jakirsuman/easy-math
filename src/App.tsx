import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, CircleHelp,
  Clock3, Flame, GraduationCap, Home, Lightbulb, LockKeyhole,
  RotateCcw, Sparkles, Target, Trophy, X, ChartNoAxesColumnIncreasing,
} from 'lucide-react'
import { learningPaths, starterQuestions } from './data/curriculum'
import type { LearningPath } from './data/curriculum'
import { areEquivalentFractions } from './math/fractions'

type View = 'home' | 'learn' | 'lesson' | 'practice' | 'lab' | 'progress'
type StoredProgress = { xp: number; completedLessons: string[]; correctAnswers: number; attempts: number; streak: number }
const STORAGE_KEY = 'easy-math-progress-v1'
const defaultProgress: StoredProgress = { xp: 0, completedLessons: [], correctAnswers: 0, attempts: 0, streak: 1 }

function readProgress(): StoredProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProgress
    const parsed = JSON.parse(raw) as Partial<StoredProgress>
    return {
      xp: Number.isFinite(parsed.xp) ? Math.max(0, parsed.xp!) : 0,
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons.filter((x): x is string => typeof x === 'string') : [],
      correctAnswers: Number.isFinite(parsed.correctAnswers) ? Math.max(0, parsed.correctAnswers!) : 0,
      attempts: Number.isFinite(parsed.attempts) ? Math.max(0, parsed.attempts!) : 0,
      streak: Number.isFinite(parsed.streak) ? Math.max(0, parsed.streak!) : 1,
    }
  } catch {
    return defaultProgress
  }
}

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
  const [progress, setProgress] = useState<StoredProgress>(readProgress)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const completedCount = progress.completedLessons.length
  const totalLessons = learningPaths.reduce((sum, path) => sum + path.lessons.length, 0)

  function openLesson(path: LearningPath, lessonId: string) {
    setActivePath(path)
    setActiveLesson(lessonId)
    setView('lesson')
    setMobileMenuOpen(false)
  }

  function completeLesson(lessonId: string, earnedXp = 20) {
    setProgress((current) => {
      if (current.completedLessons.includes(lessonId)) return current
      return { ...current, completedLessons: [...current.completedLessons, lessonId], xp: current.xp + earnedXp }
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
          <span className="brand-mark"><span>∑</span></span>
          <span className="brand-copy"><strong>সহজ গণিত</strong><small>EASY MATH</small></span>
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
        {view === 'lesson' && <LessonView lessonId={activeLesson} path={activePath} completed={progress.completedLessons.includes(activeLesson)} onBack={() => navigate('learn')} onComplete={() => completeLesson(activeLesson)} onPractice={() => navigate('practice')} />}
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

function HomeView({ progress, completedCount, onNavigate, onOpenLesson }: { progress: StoredProgress; completedCount: number; onNavigate: (view: View) => void; onOpenLesson: (path: LearningPath, id: string) => void }) {
  const nextLesson = learningPaths[1].lessons[0]
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

      <section className="section-block">
        <div className="section-heading"><div><span className="eyebrow">তোমার পরিকল্পনা</span><h2>শেখার পথ</h2></div><button className="text-link" onClick={() => onNavigate('learn')}>সব দেখো <ArrowRight size={16} /></button></div>
        <div className="path-grid">
          {learningPaths.map((path) => <PathCard key={path.id} path={path} onClick={() => onNavigate('learn')} />)}
        </div>
      </section>

      <section className="continue-card">
        <div className="continue-icon"><BookOpen size={21} /></div>
        <div className="continue-copy"><span>যেখান থেকে শুরু করবে</span><strong>ভগ্নাংশের শুরু</strong><small>লব, হর ও সমান অংশ · ৭ মিনিট</small></div>
        <button className="icon-button continue-button" aria-label="পাঠ শুরু করো" onClick={() => onOpenLesson(learningPaths[1], nextLesson.id)}><ArrowRight size={20} /></button>
      </section>
    </div>
  )
}

function StatCard({ icon, label, value, detail, tone }: { icon: ReactNode; label: string; value: string; detail: string; tone: string }) {
  return <article className="stat-card"><div className={`stat-icon tone-${tone}`}>{icon}</div><div className="stat-label">{label}</div><strong className="stat-value">{value}</strong><span className="stat-detail">{detail}</span></article>
}

function PathCard({ path, onClick }: { path: LearningPath; onClick: () => void }) {
  return <button className="path-card" onClick={onClick}><div className={`path-icon path-${path.color}`}>{path.icon}</div><div className="path-card-copy"><strong>{path.title}</strong><span>{path.description}</span><div className="progress-track"><div style={{ width: `${path.progress}%` }} /></div><small>{path.progress}% সম্পন্ন</small></div><ChevronRight size={18} className="path-chevron" /></button>
}

function LearnView({ completed, onOpenLesson }: { completed: string[]; onOpenLesson: (path: LearningPath, id: string) => void }) {
  const [selected, setSelected] = useState('all')
  const visiblePaths = selected === 'all' ? learningPaths : learningPaths.filter((path) => path.id === selected)
  return <div className="page-content">
    <div className="page-title-row"><div><div className="eyebrow">ধাপে ধাপে শেখা</div><h1>শেখার পথ</h1><p>নিজের গতিতে এগিয়ে যাও। প্রতিটি ছোট দক্ষতাই গুরুত্বপূর্ণ।</p></div><div className="title-stamp"><BookOpen size={23} /></div></div>
    <div className="filter-row">{[{ id: 'all', label: 'সব বিষয়' }, ...learningPaths.map((path) => ({ id: path.id, label: path.title }))].map((item) => <button key={item.id} className={selected === item.id ? 'filter-chip filter-active' : 'filter-chip'} onClick={() => setSelected(item.id)}>{item.label}</button>)}</div>
    <div className="learning-path-list">{visiblePaths.map((path) => <section key={path.id} className="learning-path-section"><div className="learning-path-header"><div className={`path-icon path-${path.color}`}>{path.icon}</div><div><h2>{path.title}</h2><p>{path.description}</p></div><span className="path-count">{path.lessons.length}টি পাঠ</span></div><div className="lesson-list">{path.lessons.map((lesson, index) => { const isComplete = completed.includes(lesson.id); const locked = lesson.status === 'coming-soon'; return <article className={`lesson-row ${locked ? 'lesson-locked' : ''}`} key={lesson.id}><div className={`lesson-index ${isComplete ? 'lesson-index-done' : ''}`}>{isComplete ? <Check size={17} /> : locked ? <LockKeyhole size={16} /> : String(index + 1).padStart(2, '0')}</div><div className="lesson-row-copy"><strong>{lesson.title}</strong><span>{lesson.subtitle}</span></div><span className="lesson-duration"><Clock3 size={13} />{lesson.duration}</span>{locked ? <span className="coming-label">শিগগিরই</span> : <button className="lesson-open" onClick={() => onOpenLesson(path, lesson.id)} aria-label={lesson.title + ' খুলুন'}><ChevronRight size={18} /></button>}</article> })}</div></section>)}</div>
  </div>
}

function LessonView({ lessonId, path, completed, onBack, onComplete, onPractice }: { lessonId: string; path: LearningPath; completed: boolean; onBack: () => void; onComplete: () => void; onPractice: () => void }) {
  const [numerator, setNumerator] = useState(1)
  const [denominator, setDenominator] = useState(2)
  const [showHint, setShowHint] = useState(false)
  const [checked, setChecked] = useState(false)
  const lesson = path.lessons.find((item) => item.id === lessonId)
  const isEquivalent = lessonId === 'equivalent-fractions'
  const title = lesson?.title ?? 'ভগ্নাংশের শুরু'
  return <div className="page-content lesson-page">
    <button className="back-link" onClick={onBack}><ArrowLeft size={16} /> শেখার পথে ফিরে যাও</button>
    <div className="lesson-topline"><span className="lesson-tag">{path.title}</span><span><Clock3 size={14} /> {lesson?.duration ?? '৭ মিনিট'}</span><span>শুরুর স্তর</span></div>
    <h1 className="lesson-title">{title}</h1><p className="lesson-lead">{lesson?.objective ?? 'একটি পুরো জিনিসকে সমান ভাগে ভাগ করলে ভগ্নাংশ তৈরি হয়।'}</p>
    <div className="lesson-layout">
      <article className="lesson-main-card">
        <div className="lesson-section-title"><span className="step-number">১</span><div><h2>ভগ্নাংশ কী?</h2><p>একটি পুরো জিনিসের সমান অংশ বোঝানোর উপায়</p></div></div>
        <p className="lesson-paragraph">ধরো, তোমার কাছে একটি রুটি আছে। তুমি রুটিটি সমান <strong>২ ভাগে</strong> কাটলে এবং তার <strong>১ ভাগ</strong> নিলে। তাহলে তুমি রুটির অর্ধেক নিয়েছ। গণিতে একে লিখি <span className="inline-math">১/২</span>।</p>
        <FractionVisualizer numerator={numerator} denominator={denominator} onNumeratorChange={(n) => { setNumerator(Math.min(n, denominator)); setChecked(false) }} onDenominatorChange={(d) => { setDenominator(d); setNumerator((n) => Math.min(n, d)); setChecked(false) }} />
        <div className="lesson-section-title second-step"><span className="step-number">২</span><div><h2>{isEquivalent ? 'একই মান, ভিন্ন রূপ' : 'লব আর হর চিনে রাখো'}</h2><p>ভগ্নাংশের দুই অংশের আলাদা কাজ আছে</p></div></div>
        <div className="fraction-parts"><div className="fraction-part numerator-part"><strong>{isEquivalent ? 'লব' : 'উপরের সংখ্যা'}</strong><div className="big-fraction">{numerator}</div><p>কতটি অংশ নেওয়া হয়েছে</p></div><div className="fraction-divider" /><div className="fraction-part denominator-part"><strong>{isEquivalent ? 'হর' : 'নিচের সংখ্যা'}</strong><div className="big-fraction">{denominator}</div><p>মোট সমান অংশের সংখ্যা</p></div></div>
        <div className="lesson-tip"><Lightbulb size={19} /><p><strong>মনে রাখো:</strong> পুরো জিনিসকে সমান ভাগে ভাগ করতে হবে। ভাগগুলো সমান না হলে এই ভগ্নাংশের মডেলটি ঠিক হবে না।</p></div>
        {showHint && <div className="hint-panel"><strong>ছোট্ট ইঙ্গিত</strong><p>উপরের সংখ্যাটি বলে কয়টি অংশ রঙ করা হয়েছে। নিচের সংখ্যাটি বলে মোট কয়টি সমান অংশ আছে।</p></div>}
        <div className="lesson-actions"><button className="button-secondary" onClick={() => setShowHint((show) => !show)}><Lightbulb size={16} /> {showHint ? 'ইঙ্গিত লুকাও' : 'ইঙ্গিত দেখো'}</button><button className="button-primary" onClick={() => { setChecked(true); onComplete() }}>{completed ? 'পাঠ সম্পন্ন' : 'পাঠ শেষ করো'} <Check size={16} /></button></div>
        {checked && <div className="success-note"><Check size={17} /> ভালো! তুমি এই পাঠটি সম্পন্ন করেছ। এবার অনুশীলন করে দেখো।</div>}
        <button className="practice-banner" onClick={onPractice}><div><strong>এবার নিজে চেষ্টা করো</strong><span>ছোট্ট কুইজে শেখা যাচাই করো</span></div><span className="practice-banner-arrow"><ArrowRight size={18} /></span></button>
      </article>
      <aside className="lesson-side-card"><div className="side-card-heading"><Target size={18} /><strong>এই পাঠে শিখবে</strong></div><ul><li><Check size={15} /> ভগ্নাংশের ধারণা</li><li><Check size={15} /> লব ও হর চেনা</li><li><Check size={15} /> সমান অংশ বোঝা</li></ul><div className="side-progress"><div className="side-progress-label"><span>পাঠের অগ্রগতি</span><strong>{checked || completed ? '১০০%' : '৩৩%'}</strong></div><div className="progress-track"><div style={{ width: checked || completed ? '100%' : '33%' }} /></div></div><div className="side-encouragement"><Sparkles size={18} /><span>তাড়াহুড়ো নয়—বুঝে শেখাই আসল।</span></div></aside>
    </div>
  </div>
}

function FractionVisualizer({ numerator, denominator, onNumeratorChange, onDenominatorChange }: { numerator: number; denominator: number; onNumeratorChange: (n: number) => void; onDenominatorChange: (d: number) => void }) {
  const parts = Array.from({ length: denominator }, (_, index) => index < numerator)
  return <div className="visualizer-card">
    <div className="visualizer-header"><div><span className="visualizer-label">ইন্টার‍্যাক্টিভ ম্যাথ ল্যাব</span><h3>নিজে ভাগ করে দেখো</h3></div><span className="lab-pill"><Sparkles size={13} /> চেষ্টা করো</span></div>
    <div className="fraction-display"><div className="fraction-wheel" role="img" aria-label={`${denominator} ভাগের মধ্যে ${numerator} ভাগ রঙ করা`} style={{ background: `conic-gradient(#6d5ce8 0deg ${numerator / denominator * 360}deg, #ebe8ff ${numerator / denominator * 360}deg 360deg)` }}><div className="wheel-center"><strong>{numerator}/{denominator}</strong><span>ভগ্নাংশ</span></div></div><div className="fraction-meaning"><span className="meaning-label">রঙ করা অংশ</span><strong>{numerator} / {denominator}</strong><p>মোট {denominator}টি সমান অংশের মধ্যে {numerator}টি অংশ রঙ করা হয়েছে।</p><div className="meaning-legend"><span /><small>রঙ করা অংশ</small><span className="legend-empty" /><small>বাকি অংশ</small></div></div></div>
    <div className="visual-controls"><label><span>কতটি অংশ নেবে? <strong>{numerator}</strong></span><input aria-label="লব" type="range" min="1" max={denominator} value={numerator} onChange={(event) => onNumeratorChange(Number(event.target.value))} /></label><label><span>মোট সমান অংশ <strong>{denominator}</strong></span><input aria-label="হর" type="range" min="2" max="8" value={denominator} onChange={(event) => onDenominatorChange(Number(event.target.value))} /></label></div>
    <div className="fraction-segments" aria-label="সমান অংশের দৃশ্য"><div className="segment-label">প্রতিটি অংশ</div><div className="segments-row">{parts.map((filled, index) => <div key={index} className={`segment ${filled ? 'segment-filled' : ''}`}><span>{index + 1}</span></div>)}</div></div>
  </div>
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
    const pool = starterQuestions.filter((item) => topic === 'all' || item.topic === topic)
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
      <button className={mode === 'daily' ? 'practice-mode practice-mode-active' : 'practice-mode'} onClick={() => changeSession('daily')}><Flame size={17} /><span><strong>দৈনিক চ্যালেঞ্জ</strong><small>প্রতিদিন একই ৫টি প্রশ্ন</small></span></button>
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
  return <div className="page-content"><div className="page-title-row"><div><div className="eyebrow">দেখে শেখার জায়গা</div><h1>ইন্টার‍্যাক্টিভ ম্যাথ ল্যাব</h1><p>সংখ্যা বদলাও, কী ঘটে তা দেখো, তারপর নিজের ভাষায় ব্যাখ্যা করো।</p></div><div className="title-stamp"><Sparkles size={23} /></div></div><div className="lab-feature-card"><div className="lab-feature-copy"><span className="hero-kicker"><Sparkles size={14} /> হাতে-কলমে গণিত</span><h2>ভগ্নাংশ ও শতকরা</h2><p>একই পরিমাণকে ভগ্নাংশ, দশমিক এবং শতকরা হিসেবে দেখো।</p><div className="lab-controls"><label>নেওয়া অংশ <strong>{value}</strong><input type="range" min="1" max={whole} value={value} onChange={(e) => { setValue(Number(e.target.value)); setShowExplanation(false) }} /></label><label>মোট অংশ <strong>{whole}</strong><input type="range" min="2" max="12" value={whole} onChange={(e) => { const next = Number(e.target.value); setWhole(next); setValue((v) => Math.min(v, next)); setShowExplanation(false) }} /></label></div></div><div className="lab-visual"><div className="lab-ring" style={{ background: `conic-gradient(#6d5ce8 0% ${percent}%, #eeebff ${percent}% 100%)` }}><div><strong>{percent}%</strong><span>শতকরা</span></div></div><div className="lab-equivalents"><div><span>ভগ্নাংশ</span><strong>{value}/{whole}</strong></div><div><span>দশমিক (প্রায়)</span><strong>{(value / whole).toFixed(2)}</strong></div><div><span>শতকরা</span><strong>{percent}%</strong></div></div></div></div><FractionEquivalenceCheck /><button className="explain-toggle" onClick={() => setShowExplanation((show) => !show)}><Lightbulb size={18} /> {showExplanation ? 'ব্যাখ্যা লুকাও' : 'এটি কীভাবে কাজ করে?'} <ChevronRight size={17} className={showExplanation ? 'rotate-chevron' : ''} /></button>{showExplanation && <div className="explanation-card"><h3>একই মানের তিনটি রূপ</h3><p>{value}/{whole} মানে {whole}টি সমান অংশের মধ্যে {value}টি অংশ। দশমিক পেতে {value} ÷ {whole} হিসাব করি। শতকরা পেতে সেই মানকে ১০০ দিয়ে গুণ করি। এখানে শতকরা মানটি নিকটতম পূর্ণ সংখ্যায় দেখানো হয়েছে।</p></div>}<div className="lab-coming-grid"><article><div className="coming-icon coming-blue">x²</div><strong>বীজগণিত ব্যালেন্স</strong><p>সমীকরণের দুই পাশ কীভাবে সমান থাকে, তা দেখো।</p><span>শিগগিরই আসছে</span></article><article><div className="coming-icon coming-green">△</div><strong>জ্যামিতি এক্সপ্লোরার</strong><p>আকারের মাপ বদলে ক্ষেত্রফল ও পরিসীমা বোঝো।</p><span>শিগগিরই আসছে</span></article></div></div>
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
