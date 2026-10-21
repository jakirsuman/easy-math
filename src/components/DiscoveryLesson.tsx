import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Lightbulb, RotateCcw, Sparkles } from 'lucide-react'
import './DiscoveryLesson.css'

type Props = {
  lessonId: string; title: string; pathTitle: string; ageLabel: string; completed: boolean
  onBack: () => void; onComplete: () => void; onPractice: () => void
}
const bn = (n: number) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)])

export function DiscoveryLesson({ lessonId, title, pathTitle, ageLabel, completed, onBack, onComplete, onPractice }: Props) {
  const [hundreds, setHundreds] = useState(3)
  const [tens, setTens] = useState(4)
  const [ones, setOnes] = useState(2)
  const [groups, setGroups] = useState(4)
  const [items, setItems] = useState(3)
  const [denominator, setDenominator] = useState(4)
  const [numerator, setNumerator] = useState(3)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [hintOpen, setHintOpen] = useState(false)
  useEffect(() => {
    setHundreds(3); setTens(4); setOnes(2); setGroups(4); setItems(3)
    setDenominator(4); setNumerator(3); setAnswer(''); setSubmitted(false); setHintOpen(false)
  }, [lessonId])
  const place = lessonId === 'place-value'
  const multiply = lessonId === 'multiplication-groups'
  const number = hundreds * 100 + tens * 10 + ones
  const product = groups * items
  const correct = place ? bn(tens * 10) : multiply ? bn(product) : bn(numerator) + '/' + bn(denominator)
  const question = place
    ? 'সংখ্যা ' + bn(number) + '-এ দশকের ঘরে ' + bn(tens) + ' আছে। এই অঙ্কটির মান কত?'
    : multiply ? bn(groups) + 'টি সমান দলে প্রতিটিতে ' + bn(items) + 'টি করে আছে। মোট কয়টি?'
    : 'পুরোটা ' + bn(denominator) + 'টি সমান ভাগে ভাগ করা। ' + bn(numerator) + 'টি ভাগ রঙ করা—কোন ভগ্নাংশটি দেখাচ্ছে?'
  const rawOptions = place ? [bn(tens), bn(tens * 10), bn(tens * 100), bn(number)]
    : multiply ? [bn(product), bn(groups + items), bn(groups * Math.max(1, items - 1)), bn(product + groups)]
    : [bn(numerator) + '/' + bn(denominator), bn(denominator - numerator) + '/' + bn(denominator), bn(numerator) + '/' + bn(denominator + 1), '১/২', '২/৩', '৩/৪', '১/৪']
  const uniqueOptions = Array.from(new Set(rawOptions))
  const options = uniqueOptions.length >= 4 ? uniqueOptions.slice(0, 4) : Array.from(new Set([...uniqueOptions, '২/৩', '৩/৪', '১/৪', '১/৩'])).slice(0, 4)
  const right = answer === correct
  const explanation = place
    ? bn(tens) + ' দশক মানে ' + bn(tens) + 'টি দশ। তাই ' + bn(tens) + ' × ১০ = ' + bn(tens * 10) + '। অঙ্কটি শুধু ' + bn(tens) + ' নয়—ঘর তার মান বদলে দেয়।'
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
        <div className="place-number"><span>{bn(number)}</span><small>{bn(hundreds * 100)} + {bn(tens * 10)} + {bn(ones)}</small></div>
        <div className="place-columns">{[{label:'শতকের ঘর',value:hundreds,set:setHundreds,place:100,color:'hundreds'},{label:'দশকের ঘর',value:tens,set:setTens,place:10,color:'tens'},{label:'এককের ঘর',value:ones,set:setOnes,place:1,color:'ones'}].map((col) => <div className={'place-column ' + col.color} key={col.label}><strong>{col.label}</strong><div className="place-blocks">{Array.from({length:col.value},(_,i)=><span key={i}>{col.place===100?'▰':col.place===10?'▥':'▪'}</span>)}</div><label>{bn(col.value)} × {bn(col.place)} = <b>{bn(col.value * col.place)}</b></label><input aria-label={col.label} type="range" min="0" max="9" value={col.value} onChange={(e)=>col.set(Number(e.target.value))}/></div>)}</div>
        <div className="discovery-insight"><Lightbulb size={19}/><p><strong>খেয়াল করো:</strong> {bn(tens)} অঙ্কটি দশকের ঘরে আছে, তাই এটি {bn(tens * 10)} বোঝায়।</p></div>
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
    <section className="discovery-card"><div className="discovery-card-top"><span className="discovery-step">২</span><div><h2>এবার তুমি ভেবে বলো</h2><p>ভুল হলেও সমস্যা নেই—ব্যাখ্যা দেখে আবার চেষ্টা করা যাবে।</p></div></div>
      <div className="discovery-question"><span>তোমার চ্যালেঞ্জ</span><h3>{question}</h3><div className="discovery-options">{options.map((option)=><button type="button" key={option} disabled={submitted} className={(answer===option?'chosen ':'')+(submitted&&option===correct?'right ':'')+(submitted&&answer===option&&!right?'wrong':'')} onClick={()=>setAnswer(option)}>{option}{submitted&&option===correct&&<Check size={17}/>}</button>)}</div>
        {!submitted ? <button className="button-primary" disabled={!answer} onClick={()=>setSubmitted(true)}>উত্তর মিলিয়ে দেখি <ArrowRight size={16}/></button> : <div className={'discovery-feedback '+(right?'success':'retry')}><strong>{right?'ঠিক ধরেছ! এবার কারণটাও বুঝে নাও।':'আরেকবার ভাবো—চিত্রের সঙ্গে মিলিয়ে দেখো।'}</strong><p>{explanation}</p>{!right&&<button className="text-link" onClick={()=>{setAnswer('');setSubmitted(false)}}><RotateCcw size={14}/> আবার চেষ্টা করো</button>}</div>}
      </div>
    </section>
    <section className="discovery-finish"><div><strong>{completed?'এই পাঠ আগেই শেষ করেছ।':'বুঝে ফেলেছ?'}</strong><p>উত্তর ঠিক হলে পাঠ শেষ করো। না হলে আবার চেষ্টা করো—শেখার জন্য সময় নেওয়া ভালো।</p></div><button className="button-primary" disabled={!submitted||!right} onClick={onComplete}>{completed?'পাঠ সম্পন্ন':'পাঠ শেষ করো'} <Check size={17}/></button></section>
    {hintOpen && <div className="hint-panel">{place?'দশকের ঘর থেকে ডান দিকে এক ঘর সরলে এককের ঘর; বাম দিকে এক ঘর সরলে শতকের ঘর।':multiply?'একটি দলের জিনিস গুনো, তারপর একই সংখ্যার দলগুলো একসঙ্গে যোগ করো।':'মোট ভাগ গুনো—সেটি হর। রঙ করা ভাগের সংখ্যা লব।'}</div>}
    <div className="discovery-bottom"><button className="text-link" onClick={()=>setHintOpen((v)=>!v)}><Lightbulb size={15}/>{hintOpen?'ইঙ্গিত লুকাও':'একটু ইঙ্গিত দাও'}</button><button className="text-link" onClick={onPractice}>আরও অনুশীলন করো <ArrowRight size={15}/></button></div>
  </div>
}
