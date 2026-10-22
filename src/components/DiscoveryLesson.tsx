import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Lightbulb, RotateCcw, Sparkles } from 'lucide-react'
import { lessonContent } from '../data/lessonContent'
import { getLessonAssessment, isLessonAnswerCorrect } from '../data/lessonAssessment'
import { lessonTeachingNotes } from '../data/lessonTeachingNotes'
import './DiscoveryLesson.css'

type Props = {
  lessonId: string; title: string; pathTitle: string; ageLabel: string; completed: boolean; reviewMode?: boolean
  onBack: () => void; onComplete: () => void; onPractice: () => void
}
const bn = (n: number | string) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])

export function DiscoveryLesson({ lessonId, title, pathTitle, ageLabel, completed, reviewMode = false, onBack, onComplete, onPractice }: Props) {
  const [crores, setCrores] = useState(0)
  const [tenLakhs, setTenLakhs] = useState(0)
  const [lakhs, setLakhs] = useState(0)
  const [tenThousands, setTenThousands] = useState(0)
  const [thousands, setThousands] = useState(0)
  const [hundreds, setHundreds] = useState(3)
  const [tens, setTens] = useState(4)
  const [ones, setOnes] = useState(2)
  const [tenths, setTenths] = useState(0)
  const [hundredths, setHundredths] = useState(0)
  const [thousandths, setThousandths] = useState(0)
  const [selectedPlace, setSelectedPlace] = useState(6)
  const [groups, setGroups] = useState(4)
  const [items, setItems] = useState(3)
  const [denominator, setDenominator] = useState(4)
  const [numerator, setNumerator] = useState(3)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [assessmentIndex,setAssessmentIndex] = useState(0)
  const [assessmentAnswers,setAssessmentAnswers] = useState<Record<string,string>>({})
  const [orderedStepsByQuestion,setOrderedStepsByQuestion] = useState<Record<string,string[]>>({})
  const [submittedQuestionIds,setSubmittedQuestionIds] = useState<string[]>([])
  const [firstAttemptCorrect,setFirstAttemptCorrect] = useState<Record<string,boolean>>({})
  const [assessmentFinished,setAssessmentFinished] = useState(false)
  const [hintOpen, setHintOpen] = useState(false)
  useEffect(() => {
    setCrores(0); setTenLakhs(0); setLakhs(0); setTenThousands(0); setThousands(0)
    setHundreds(3); setTens(4); setOnes(2); setTenths(0); setHundredths(0); setThousandths(0); setSelectedPlace(6)
    setGroups(4); setItems(3); setDenominator(4); setNumerator(3); setAnswer(''); setSubmitted(false)
    setAssessmentIndex(0); setAssessmentAnswers({}); setOrderedStepsByQuestion({}); setSubmittedQuestionIds([]); setFirstAttemptCorrect({}); setAssessmentFinished(false); setHintOpen(false)
  }, [lessonId])
  const staticContent = lessonContent[lessonId] ?? lessonContent['fraction-basics']
  const assessmentQuestions = getLessonAssessment(lessonId, { question: staticContent.question, options: staticContent.options, answer: staticContent.answer, explanation: staticContent.explanation })
  const currentAssessmentQuestion = assessmentQuestions[assessmentIndex]
  const selectedAssessmentAnswer = assessmentAnswers[currentAssessmentQuestion?.id ?? ''] ?? ''
  const orderedCurrentSteps = currentAssessmentQuestion?.type === 'ordered-steps' ? (orderedStepsByQuestion[currentAssessmentQuestion.id] ?? [...(currentAssessmentQuestion.steps ?? [])]) : []
  const assessmentSubmitted = currentAssessmentQuestion ? submittedQuestionIds.includes(currentAssessmentQuestion.id) : false
  const currentAssessmentCorrect = currentAssessmentQuestion ? currentAssessmentQuestion.type === 'ordered-steps'
    ? orderedCurrentSteps.length === (currentAssessmentQuestion.correctOrder ?? []).length && orderedCurrentSteps.every((step,index)=>step===currentAssessmentQuestion.correctOrder?.[index])
    : isLessonAnswerCorrect(currentAssessmentQuestion, selectedAssessmentAnswer) : false
  const canSubmitAssessment = currentAssessmentQuestion?.type === 'ordered-steps' || Boolean(selectedAssessmentAnswer.trim())
  const assessmentScore = assessmentQuestions.reduce((score, question) => score + (firstAttemptCorrect[question.id] ? 1 : 0), 0)
  const passMark = Math.ceil(assessmentQuestions.length * 0.8)
  const hasMastered = assessmentFinished && assessmentScore >= passMark
  const teachingNote = lessonTeachingNotes[lessonId]
  function moveOrderedStep(index:number,direction:-1|1) {
    if(!currentAssessmentQuestion||currentAssessmentQuestion.type!=='ordered-steps') return
    const steps=[...orderedCurrentSteps], target=index+direction
    if(target<0||target>=steps.length) return
    ;[steps[index],steps[target]]=[steps[target],steps[index]]
    setOrderedStepsByQuestion(previous=>({...previous,[currentAssessmentQuestion.id]:steps}))
  }
  const place = lessonId === 'place-value'
  const multiply = lessonId === 'multiplication-groups'
  const placeRows = [
    { label:'কোটি', value:crores, set:setCrores, unit:10000000, color:'large-place' },
    { label:'দশ লক্ষ', value:tenLakhs, set:setTenLakhs, unit:1000000, color:'large-place' },
    { label:'লক্ষ', value:lakhs, set:setLakhs, unit:100000, color:'large-place' },
    { label:'দশ হাজার', value:tenThousands, set:setTenThousands, unit:10000, color:'large-place' },
    { label:'হাজার', value:thousands, set:setThousands, unit:1000, color:'large-place' },
    { label:'শতক', value:hundreds, set:setHundreds, unit:100, color:'hundreds' },
    { label:'দশক', value:tens, set:setTens, unit:10, color:'tens' },
    { label:'একক', value:ones, set:setOnes, unit:1, color:'ones' },
    { label:'দশমাংশ', value:tenths, set:setTenths, unit:0.1, color:'decimal-place' },
    { label:'শতাংশ', value:hundredths, set:setHundredths, unit:0.01, color:'decimal-place' },
    { label:'সহস্রাংশ', value:thousandths, set:setThousandths, unit:0.001, color:'decimal-place' },
  ]
  const digitString = [crores,tenLakhs,lakhs,tenThousands,thousands,hundreds,tens,ones].join('').replace(/^0+(?=\d)/,'')
  const groupedWhole = digitString.length > 3 ? digitString.slice(0,-3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + digitString.slice(-3) : digitString
  const decimalString = [tenths,hundredths,thousandths].join('')
  const displayNumber = bn(groupedWhole || '0') + (tenths || hundredths || thousandths ? '.' + bn(decimalString) : '')
  const number = Number(digitString || 0) + tenths/10 + hundredths/100 + thousandths/1000
  const selectedRow = placeRows[selectedPlace]
  const selectedValue = selectedRow.value * selectedRow.unit
  const formatPlace = (v:number) => {
    const rounded = Number(v.toFixed(3))
    if (!Number.isInteger(rounded)) return bn(String(rounded))
    const digits = String(rounded)
    const grouped = digits.length > 3 ? digits.slice(0,-3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + digits.slice(-3) : digits
    return bn(grouped)
  }
  const expanded = placeRows.filter(row=>row.value!==0).map(row=>formatPlace(row.value*row.unit))
  const product = groups * items
  const correct = place ? formatPlace(selectedValue) : multiply ? bn(product) : bn(numerator) + '/' + bn(denominator)
  const question = place
    ? 'সংখ্যা ' + displayNumber + '-এ ' + selectedRow.label + ' ঘরে ' + bn(selectedRow.value) + ' আছে। এই অঙ্কটির স্থানীয় মান কত?'
    : multiply ? bn(groups) + 'টি সমান দলে প্রতিটিতে ' + bn(items) + 'টি করে আছে। মোট কয়টি?'
    : 'পুরোটা ' + bn(denominator) + 'টি সমান ভাগে ভাগ করা। ' + bn(numerator) + 'টি ভাগ রঙ করা—কোন ভগ্নাংশটি দেখাচ্ছে?'
  const rawOptions = place ? [formatPlace(selectedRow.value),formatPlace(selectedValue),formatPlace(selectedValue*10),formatPlace(number)]
    : multiply ? [bn(product), bn(groups + items), bn(groups * Math.max(1, items - 1)), bn(product + groups)]
    : [bn(numerator) + '/' + bn(denominator), bn(denominator - numerator) + '/' + bn(denominator), bn(numerator) + '/' + bn(denominator + 1), '১/২', '২/৩', '৩/৪', '১/৪']
  const uniqueOptions = Array.from(new Set(rawOptions))
  const options = uniqueOptions.length >= 4 ? uniqueOptions.slice(0, 4) : Array.from(new Set([...uniqueOptions, '২/৩', '৩/৪', '১/৪', '১/৩'])).slice(0, 4)
  const right = answer === correct
  const placeUnitNoun = selectedRow.label === 'দশক' ? 'দশ' : selectedRow.label === 'শতক' ? 'শত' : selectedRow.label
  const explanation = place
    ? bn(selectedRow.value) + ' ' + selectedRow.label + ' মানে ' + bn(selectedRow.value) + 'টি ' + placeUnitNoun + '। তাই ' + bn(selectedRow.value) + ' × ' + formatPlace(selectedRow.unit) + ' = ' + formatPlace(selectedValue) + '। অঙ্কটির মান নির্ভর করে এটি কোন ঘরে আছে তার ওপর।'
    : multiply ? bn(groups) + 'টি দলে ' + bn(items) + 'টি করে: ' + Array.from({length:groups}, () => bn(items)).join(' + ') + ' = ' + bn(product) + '। তাই ' + bn(groups) + ' × ' + bn(items) + ' = ' + bn(product) + '।'
    : bn(denominator) + 'টি সমান ভাগের মধ্যে ' + bn(numerator) + 'টি নেওয়া হয়েছে। হর মোট ভাগ, লব নেওয়া ভাগ—তাই ভগ্নাংশ ' + correct + '।'
  return <div className="page-content discovery-page">
    <button className="back-link" onClick={onBack}><ArrowLeft size={16}/> শেখার পথে ফিরে যাও</button>
    <div className="lesson-topline"><span className="lesson-tag">{pathTitle}</span><span className="lesson-age-chip">{ageLabel}</span><span>আবিষ্কার করে শিখি</span></div>
    <div className="discovery-heading"><div><div className="discovery-kicker"><Sparkles size={15}/> দেখো · বদলাও · বুঝে নাও</div><h1 className="lesson-title">{title}</h1></div><div className="discovery-mascot">{place ? '৩৪২' : multiply ? '×' : '½'}</div></div>
    <p className="lesson-lead">{place ? 'একই অঙ্ক একেক ঘরে বসলে তার মান বদলে যায়। সংখ্যাটাকে খুলে দেখি।' : multiply ? 'সমান দল সাজাও। গুণের উত্তর মুখস্থ না করে চোখে দেখে খুঁজে বের করো।' : 'একটি রুটি বা কাগজকে সমান ভাগে ভাবো। কয়টি ভাগ আছে আর কয়টি নেওয়া হয়েছে—দুটিই গুরুত্বপূর্ণ।'}</p>
    <section className="discovery-card">
      <div className="discovery-card-top"><span className="discovery-step">১</span><div><h2>{place ? 'সংখ্যাটাকে খুলে দেখি' : multiply ? 'নিজের মতো দল সাজাও' : 'ভাগগুলো রঙ করে দেখি'}</h2><p>নিয়ন্ত্রণগুলো বদলাও—চিত্র ও হিসাব একসঙ্গে বদলাবে।</p></div></div>
      {place && <>
        <div className="place-number"><span>{displayNumber}</span><small>{expanded.length ? expanded.join(' + ') : '০'}</small></div>
        <div className="place-value-groups">
          <h3>পূর্ণ সংখ্যার স্থানীয় মান</h3>
          <div className="place-columns">{placeRows.slice(0,8).map((col) => <div className={'place-column ' + col.color} key={col.label}><strong>{col.label}</strong><div className="place-blocks"><span>{bn(col.value)}</span></div><label>{bn(col.value)} × {formatPlace(col.unit)} = <b>{formatPlace(col.value * col.unit)}</b></label><input aria-label={col.label} type="range" min="0" max="9" value={col.value} onChange={(e)=>{col.set(Number(e.target.value));setAnswer('');setSubmitted(false)}}/></div>)}</div>
          <h3>দশমিকের পরের স্থানীয় মান</h3>
          <div className="place-columns decimal-columns">{placeRows.slice(8).map((col) => <div className={'place-column ' + col.color} key={col.label}><strong>{col.label}</strong><div className="place-blocks"><span>{bn(col.value)}</span></div><label>{bn(col.value)} × {formatPlace(col.unit)} = <b>{formatPlace(col.value * col.unit)}</b></label><input aria-label={col.label} type="range" min="0" max="9" value={col.value} onChange={(e)=>col.set(Number(e.target.value))}/></div>)}</div>
        </div>
        <div className="discovery-insight"><Lightbulb size={19}/><p><strong>খেয়াল করো:</strong> একই অঙ্কের স্থান বদলালে মান ১০ গুণ বাড়তে বা কমতে পারে। দশমিকের ডানে গেলে স্থানীয় মান হয় ০.১, ০.০১, ০.০০১—অর্থাৎ এককের দশমাংশ, শতাংশ ও সহস্রাংশ।</p></div>
      </>}
      {multiply && <>
        <div className="group-controls"><label>কতটি দল? <strong>{bn(groups)}টি</strong><input aria-label="দলের সংখ্যা" type="range" min="2" max="6" value={groups} onChange={(e)=>setGroups(Number(e.target.value))}/></label><label>প্রতি দলে কতটি? <strong>{bn(items)}টি</strong><input aria-label="প্রতি দলে জিনিসের সংখ্যা" type="range" min="2" max="5" value={items} onChange={(e)=>setItems(Number(e.target.value))}/></label></div>
        <div className="groups-visual">{Array.from({length:groups},(_,g)=><div className="item-group" key={g}><span className="group-label">দল {bn(g+1)}</span><div className="group-dots">{Array.from({length:items},(_,i)=><span key={i}/>)}</div></div>)}</div>
        <div className="equation-strip"><span>{bn(groups)}টি দল</span><b>×</b><span>প্রতি দলে {bn(items)}টি</span><b>=</b><strong>{bn(product)}টি</strong></div>
        <div className="discovery-insight"><Lightbulb size={19}/><p><strong>গুণের মানে:</strong> একই সংখ্যাকে বারবার যোগ না করে দল গুনে হিসাব করি।</p></div>
      </>}
      {!place && !multiply && <>
        <div className="fraction-controls"><label>মোট সমান ভাগ <strong>{bn(denominator)}টি</strong><div className="fraction-choice">{[2,3,4,6,8].map((n)=><button key={n} type="button" className={denominator===n?'selected':''} onClick={()=>{setDenominator(n);setNumerator(Math.min(numerator,n))}}>{bn(n)}</button>)}</div></label><label>রঙ করা ভাগ <strong>{bn(numerator)}টি</strong><input aria-label="রঙ করা ভাগ" type="range" min="1" max={denominator} value={numerator} onChange={(e)=>setNumerator(Number(e.target.value))}/></label></div>
        <div className="fraction-pieces">{Array.from({length:denominator},(_,i)=><div key={i} className={'fraction-piece ' + (i<numerator?'filled':'')}><span>{bn(i+1)}</span></div>)}</div>
        <div className="equation-strip"><span>মোট {bn(denominator)} ভাগ</span><b>→</b><span>নেওয়া {bn(numerator)} ভাগ</span><b>=</b><strong>{bn(numerator)}/{bn(denominator)}</strong></div>
        <div className="discovery-insight"><Lightbulb size={19}/><p><strong>দুটি প্রশ্ন করো:</strong> মোট কয়টি সমান ভাগ? কয়টি ভাগ নেওয়া হয়েছে? হর মোট ভাগ, লব নেওয়া ভাগ বোঝায়।</p></div>
      </>}
    </section>
    {teachingNote&&<section className="workshop-deep-dive"><div className="workshop-deep-dive-header"><span>আরও গভীরে বুঝি</span><p>{teachingNote.why}</p></div><div className="workshop-mental-model"><strong>মনে ছবি তৈরি করো</strong><p>{teachingNote.mentalModel}</p></div><div className="workshop-worked-example"><h3>{teachingNote.workedExampleTitle}</h3><p>{teachingNote.workedExample}</p><ol>{teachingNote.workedSteps.map((step,i)=><li key={i}>{step}</li>)}</ol></div><div className="workshop-misconception"><div><strong>সাধারণ ভুল</strong><p>{teachingNote.commonError}</p></div><div><strong>কীভাবে ঠিক করবে</strong><p>{teachingNote.correction}</p></div></div><div className="workshop-transfer"><strong>নিজে প্রয়োগ করো</strong><p>{teachingNote.transfer}</p></div></section>}
    <section className="discovery-card"><div className="discovery-card-top"><span className="discovery-step">২</span><div><h2>চিত্র দেখে দ্রুত যাচাই</h2><p>এটি একটি ছোট চেকপয়েন্ট। শুধু এই একটি উত্তর দিয়ে পাঠ সম্পন্ন হবে না।</p></div></div>
      <div className="discovery-question"><span>তোমার চ্যালেঞ্জ</span>{place&&<label className="place-question-select">কোন ঘরের স্থানীয় মান যাচাই করবে? <select aria-label="যে ঘরের মান যাচাই করবে" value={selectedPlace} onChange={e=>{setSelectedPlace(Number(e.target.value));setAnswer('');setSubmitted(false)}}>{placeRows.map((row,i)=><option value={i} key={row.label}>{row.label}</option>)}</select></label>}<h3>{question}</h3><div className="discovery-options">{options.map((option)=><button type="button" key={option} disabled={submitted} className={(answer===option?'chosen ':'')+(submitted&&option===correct?'right ':'')+(submitted&&answer===option&&!right?'wrong':'')} onClick={()=>setAnswer(option)}>{option}{submitted&&option===correct&&<Check size={17}/>}</button>)}</div>
        {!submitted ? <button className="button-primary" disabled={!answer} onClick={()=>setSubmitted(true)}>উত্তর মিলিয়ে দেখি <ArrowRight size={16}/></button> : <div className={'discovery-feedback '+(right?'success':'retry')}><strong>{right?'ঠিক ধরেছ! এবার কারণটাও বুঝে নাও।':'আরেকবার ভাবো—চিত্রের সঙ্গে মিলিয়ে দেখো।'}</strong><p>{explanation}</p>{!right&&<button className="text-link" onClick={()=>{setAnswer('');setSubmitted(false)}}><RotateCcw size={14}/> আবার চেষ্টা করো</button>}</div>}
      </div>
    </section>
    <section className="workshop-card"><div className="workshop-section-title"><span>৩</span><div><h2>পাঁচটি প্রশ্নে শেখা যাচাই</h2><p>ধারণা, হিসাব ও নতুন পরিস্থিতিতে প্রয়োগ—সব মিলিয়ে {bn(assessmentQuestions.length)}টি প্রশ্নের উত্তর দাও। প্রতিটি উত্তরের ব্যাখ্যা পড়ো। প্রথম চেষ্টার ফল থেকে অগ্রগতি হিসাব হবে।</p></div></div>
      {!assessmentFinished&&currentAssessmentQuestion&&<div className="workshop-question"><div className="mastery-progress-row"><span>প্রশ্ন {bn(assessmentIndex+1)} / {bn(assessmentQuestions.length)}</span><span>পাস করতে {bn(passMark)}টি সঠিক</span></div><div className="mastery-progress-track" role="progressbar" aria-label="যাচাইয়ের অগ্রগতি" aria-valuemin={0} aria-valuemax={assessmentQuestions.length} aria-valuenow={assessmentIndex}><span style={{width:((assessmentIndex+1)/assessmentQuestions.length*100)+'%'}}/></div><h3>{currentAssessmentQuestion.prompt}</h3>{currentAssessmentQuestion.type==='short-answer'?<label className="assessment-text-label">নিজের হিসাব লিখো<input aria-label="নিজের উত্তর লিখো" type="text" inputMode="text" autoComplete="off" value={selectedAssessmentAnswer} disabled={assessmentSubmitted} onChange={event=>setAssessmentAnswers(previous=>({...previous,[currentAssessmentQuestion.id]:event.target.value}))} placeholder="এখানে উত্তর লেখো"/></label>:currentAssessmentQuestion.type==='ordered-steps'?<ol className="assessment-order-list">{orderedCurrentSteps.map((step,index)=><li key={step}><span className="assessment-order-number">{bn(index+1)}</span><p>{step}</p><div className="assessment-order-controls"><button type="button" aria-label={'ধাপ '+bn(index+1)+' উপরে'} disabled={assessmentSubmitted||index===0} onClick={()=>moveOrderedStep(index,-1)}>↑ উপরে</button><button type="button" aria-label={'ধাপ '+bn(index+1)+' নিচে'} disabled={assessmentSubmitted||index===orderedCurrentSteps.length-1} onClick={()=>moveOrderedStep(index,1)}>↓ নিচে</button></div></li>)}</ol>:<div className="workshop-options">{(currentAssessmentQuestion.options??[]).map(option=><button type="button" key={option} disabled={assessmentSubmitted} className={(selectedAssessmentAnswer===option?'chosen ':'')+(assessmentSubmitted&&option===currentAssessmentQuestion.answer?' right':'')+(assessmentSubmitted&&selectedAssessmentAnswer===option&&!currentAssessmentCorrect?' wrong':'')} onClick={()=>setAssessmentAnswers(previous=>({...previous,[currentAssessmentQuestion.id]:option}))}>{option}{assessmentSubmitted&&option===currentAssessmentQuestion.answer&&<Check size={16}/>}</button>)}</div>}{!assessmentSubmitted?<button className="button-primary" disabled={!canSubmitAssessment} onClick={()=>{setSubmittedQuestionIds(previous=>[...previous,currentAssessmentQuestion.id]);setFirstAttemptCorrect(previous=>({...previous,[currentAssessmentQuestion.id]:currentAssessmentCorrect}))}}>উত্তর যাচাই করি <ArrowRight size={16}/></button>:<div className={'workshop-feedback '+(currentAssessmentCorrect?'success':'retry')}><strong>{currentAssessmentCorrect?'সঠিক উত্তর। কারণটিও বুঝে নাও।':'এইবার সঠিক হয়নি। সমাধান দেখে আবার শিখো।'}</strong>{!currentAssessmentCorrect&&currentAssessmentQuestion.type!=='ordered-steps'&&<p>সঠিক উত্তর: <strong>{currentAssessmentQuestion.answer}</strong></p>}{!currentAssessmentCorrect&&currentAssessmentQuestion.type==='ordered-steps'&&<div className="assessment-correct-order"><strong>সঠিক ক্রম</strong><ol>{(currentAssessmentQuestion.correctOrder??[]).map((step,index)=><li key={step}>{bn(index+1)}. {step}</li>)}</ol></div>}<p>{currentAssessmentQuestion.explanation}</p>{!currentAssessmentCorrect&&teachingNote&&<aside className="assessment-remediation"><strong>এই পাঠের একটি সাধারণ ভুল</strong><p>{teachingNote.commonError}</p><strong>সংশোধনের উপায়</strong><p>{teachingNote.correction}</p><ol>{teachingNote.workedSteps.slice(0,2).map((step,index)=><li key={index}>{step}</li>)}</ol></aside>}<button className="button-primary" onClick={()=>{if(assessmentIndex===assessmentQuestions.length-1){setAssessmentFinished(true)}else{setAssessmentIndex(index=>index+1)}}}>{assessmentIndex===assessmentQuestions.length-1?'ফলাফল দেখো':'পরের প্রশ্ন'} <ArrowRight size={16}/></button></div>}</div>}
      {assessmentFinished&&<div className={'mastery-result '+(hasMastered?'mastery-pass':'mastery-retry')}><strong>{hasMastered?'পাঠের প্রাথমিক দক্ষতা যাচাই পাস':'আরও অনুশীলন দরকার'}</strong><p>প্রথম চেষ্টায় {bn(assessmentScore)} / {bn(assessmentQuestions.length)}টি সঠিক। পাস করতে অন্তত {bn(passMark)}টি সঠিক দরকার। {hasMastered?'এখন নতুন পরিস্থিতিতে এই ধারণা ব্যবহার করার অনুশীলন চালিয়ে যাও।':'ভুল প্রশ্নগুলোর ব্যাখ্যা পড়ে পুনরায় যাচাই দাও।'}</p>{!hasMastered&&<button className="button-secondary" onClick={()=>{setAssessmentIndex(0);setAssessmentAnswers({});setOrderedStepsByQuestion({});setSubmittedQuestionIds([]);setFirstAttemptCorrect({});setAssessmentFinished(false)}}><RotateCcw size={15}/> আবার যাচাই দাও</button>}</div>}
    </section>
    {assessmentFinished&&<section className="discovery-finish"><div><strong>{hasMastered?(completed?'এই পাঠ আগেই শেষ করেছ।':'এই পাঠের প্রাথমিক লক্ষ্য পূরণ হয়েছে।'):'পাঠটি এখনো সম্পন্ন হয়নি।'}</strong><p>{hasMastered?'কমপক্ষে ৮০% প্রশ্ন প্রথম চেষ্টায় সঠিক হয়েছে।':'পাসের নম্বর পেলে পাঠ সম্পন্ন করা যাবে। ভুল উত্তরের ব্যাখ্যা দেখে আবার চেষ্টা করো।'}</p></div><button className="button-primary" disabled={!hasMastered} onClick={onComplete}>{reviewMode?'পুনরাবৃত্তি শেষ':completed?'পাঠ সম্পন্ন':'পাঠ শেষ করো'} <Check size={17}/></button></section>}
    {hintOpen && <div className="hint-panel">{place?'দশকের ঘর থেকে ডান দিকে এক ঘর সরলে এককের ঘর; বাম দিকে এক ঘর সরলে শতকের ঘর।':multiply?'একটি দলের জিনিস গুনো, তারপর একই সংখ্যার দলগুলো একসঙ্গে যোগ করো।':'মোট ভাগ গুনো—সেটি হর। রঙ করা ভাগের সংখ্যা লব।'}</div>}
    <div className="discovery-bottom"><button className="text-link" onClick={()=>setHintOpen((v)=>!v)}><Lightbulb size={15}/>{hintOpen?'ইঙ্গিত লুকাও':'একটু ইঙ্গিত দাও'}</button><button className="text-link" onClick={onPractice}>আরও অনুশীলন করো <ArrowRight size={15}/></button></div>
  </div>
}
