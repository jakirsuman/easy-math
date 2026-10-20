export type Lesson = {
  id: string
  title: string
  subtitle: string
  duration: string
  status: 'available' | 'coming-soon'
  kind: 'lesson' | 'practice' | 'visual'
  objective: string
}

export type LearningPath = {
  id: string
  title: string
  description: string
  icon: string
  color: string
  progress: number
  lessons: Lesson[]
}

export const learningPaths: LearningPath[] = [
  {
    id: 'numbers',
    title: 'সংখ্যা ও পাটিগণিত',
    description: 'সংখ্যা বুঝি, হিসাব করি',
    icon: '01',
    color: 'blue',
    progress: 20,
    lessons: [
      { id: 'place-value', title: 'সংখ্যার স্থানীয় মান', subtitle: 'একক, দশক ও শতক', duration: '৬ মিনিট', status: 'available', kind: 'lesson', objective: 'সংখ্যার প্রতিটি অঙ্কের স্থানীয় মান বুঝতে পারা।' },
      { id: 'number-line', title: 'সংখ্যারেখায় সংখ্যা', subtitle: 'সংখ্যার অবস্থান ও দূরত্ব', duration: '৮ মিনিট', status: 'available', kind: 'visual', objective: 'সংখ্যারেখায় সংখ্যা সাজানো ও দূরত্ব বোঝা।' },
      { id: 'operations', title: 'যোগ, বিয়োগ, গুণ ও ভাগ', subtitle: 'চারটি মৌলিক প্রক্রিয়া', duration: '১০ মিনিট', status: 'coming-soon', kind: 'practice', objective: 'দৈনন্দিন সমস্যায় মৌলিক গাণিতিক প্রক্রিয়া প্রয়োগ করা।' },
    ],
  },
  {
    id: 'fractions',
    title: 'ভগ্নাংশ, দশমিক ও শতকরা',
    description: 'অংশ থেকে পুরোটা বুঝি',
    icon: '½',
    color: 'purple',
    progress: 0,
    lessons: [
      { id: 'fraction-basics', title: 'ভগ্নাংশের শুরু', subtitle: 'লব, হর ও সমান অংশ', duration: '৭ মিনিট', status: 'available', kind: 'visual', objective: 'ভগ্নাংশের লব ও হর এবং সমান অংশের ধারণা বোঝা।' },
      { id: 'equivalent-fractions', title: 'সমতুল্য ভগ্নাংশ', subtitle: 'একই মান, ভিন্ন রূপ', duration: '৮ মিনিট', status: 'available', kind: 'lesson', objective: 'সমতুল্য ভগ্নাংশ শনাক্ত করা এবং তৈরি করা।' },
      { id: 'fraction-practice', title: 'ভগ্নাংশ অনুশীলন', subtitle: 'শিখে নিজে করি', duration: '৫ মিনিট', status: 'available', kind: 'practice', objective: 'ভগ্নাংশের ধারণা প্রশ্নের মাধ্যমে যাচাই করা।' },
      { id: 'decimals', title: 'দশমিক সংখ্যা', subtitle: 'ভগ্নাংশ থেকে দশমিক', duration: '৮ মিনিট', status: 'coming-soon', kind: 'lesson', objective: 'ভগ্নাংশ ও দশমিকের সম্পর্ক বোঝা।' },
      { id: 'percentages', title: 'শতকরা', subtitle: '১০০-এর মধ্যে কত?', duration: '১০ মিনিট', status: 'coming-soon', kind: 'lesson', objective: 'শতকরা হিসাব করা ও বাস্তব জীবনে প্রয়োগ করা।' },
    ],
  },
  {
    id: 'algebra',
    title: 'অনুপাত ও বীজগণিত',
    description: 'অজানাকে চেনা শিখি',
    icon: 'x²',
    color: 'orange',
    progress: 0,
    lessons: [
      { id: 'ratio', title: 'অনুপাতের ধারণা', subtitle: 'দুটি পরিমাণের তুলনা', duration: '৮ মিনিট', status: 'coming-soon', kind: 'lesson', objective: 'অনুপাত দিয়ে দুটি পরিমাণ তুলনা করা।' },
      { id: 'variables', title: 'চলক ও রাশি', subtitle: 'x আসলে কী?', duration: '৯ মিনিট', status: 'coming-soon', kind: 'visual', objective: 'চলক ও বীজগাণিতিক রাশির অর্থ বোঝা।' },
      { id: 'linear-equations', title: 'সহজ সমীকরণ', subtitle: 'সমতার দুই পাশ', duration: '১০ মিনিট', status: 'coming-soon', kind: 'lesson', objective: 'এক ধাপের রৈখিক সমীকরণ সমাধান করা।' },
    ],
  },
  {
    id: 'geometry',
    title: 'জ্যামিতি ও পরিমাপ',
    description: 'আকার, কোণ ও ক্ষেত্রফল',
    icon: '△',
    color: 'green',
    progress: 0,
    lessons: [
      { id: 'shapes', title: 'আকার ও বৈশিষ্ট্য', subtitle: 'ত্রিভুজ, বর্গ ও বৃত্ত', duration: '৭ মিনিট', status: 'coming-soon', kind: 'visual', objective: 'মৌলিক জ্যামিতিক আকৃতি শনাক্ত করা।' },
      { id: 'perimeter-area', title: 'পরিসীমা ও ক্ষেত্রফল', subtitle: 'সীমানা আর ভেতরের জায়গা', duration: '১০ মিনিট', status: 'coming-soon', kind: 'lesson', objective: 'পরিসীমা ও ক্ষেত্রফলের পার্থক্য এবং হিসাব বোঝা।' },
    ],
  },
]

export const starterQuestions = [
  { id: 'q1', prompt: 'একটি পিৎজার ২ সমান অংশের ১ অংশকে কীভাবে লিখবে?', options: ['১/২', '১/৩', '২/১'], answer: '১/২', explanation: 'মোট ২টি সমান অংশের মধ্যে ১টি অংশ নেওয়া হয়েছে। তাই ভগ্নাংশ ১/২।' },
  { id: 'q2', prompt: 'কোন ভগ্নাংশটি ১/২-এর সমান?', options: ['২/৩', '২/৪', '৩/৪'], answer: '২/৪', explanation: 'লব ও হর দুটিকেই ২ দিয়ে গুণ করলে ১/২ = ২/৪ হয়।' },
  { id: 'q3', prompt: '৪টি সমান অংশের ৩টি অংশকে কীভাবে লিখবে?', options: ['৪/৩', '৩/৪', '১/৪'], answer: '৩/৪', explanation: '৩টি অংশ নেওয়া হয়েছে এবং মোট অংশ ৪টি। তাই ৩/৪।' },
]
