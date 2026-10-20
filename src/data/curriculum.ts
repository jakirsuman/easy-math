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
  { id: 'q1', topic: 'fractions', prompt: 'একটি পিৎজার ২ সমান অংশের ১ অংশকে কীভাবে লিখবে?', options: ['১/২', '১/৩', '২/১'], answer: '১/২', explanation: 'মোট ২টি সমান অংশের মধ্যে ১টি অংশ নেওয়া হয়েছে। তাই ভগ্নাংশ ১/২।' },
  { id: 'q2', topic: 'fractions', prompt: 'কোন ভগ্নাংশটি ১/২-এর সমান?', options: ['২/৩', '২/৪', '৩/৪'], answer: '২/৪', explanation: 'লব ও হর দুটিকেই ২ দিয়ে গুণ করলে ১/২ = ২/৪ হয়।' },
  { id: 'q3', topic: 'fractions', prompt: '৪টি সমান অংশের ৩টি অংশকে কীভাবে লিখবে?', options: ['৪/৩', '৩/৪', '১/৪'], answer: '৩/৪', explanation: '৩টি অংশ নেওয়া হয়েছে এবং মোট অংশ ৪টি। তাই ৩/৪।' },

  { id: 'q4', topic: 'arithmetic', prompt: '২৭ + ১৫ = কত?', options: ['৩২', '৪২', '৪১'], answer: '৪২', explanation: '২৭ + ১০ = ৩৭, এরপর আরও ৫ যোগ করলে ৪২ হয়।' },
  { id: 'q5', topic: 'arithmetic', prompt: '৬ × ৭ = কত?', options: ['৪২', '৪৮', '৩৬'], answer: '৪২', explanation: '৬-এর ৭টি দল মানে ৬ + ৬ + ৬ + ৬ + ৬ + ৬ + ৬ = ৪২।' },
  { id: 'q6', topic: 'arithmetic', prompt: '৮৪ ÷ ৭ = কত?', options: ['১১', '১২', '১৩'], answer: '১২', explanation: '৭ × ১২ = ৮৪, তাই ৮৪ ÷ ৭ = ১২।' },
  { id: 'q7', topic: 'numbers', prompt: '৫,৪৩২ সংখ্যাটিতে ৪-এর স্থানীয় মান কত?', options: ['৪', '৪০', '৪০০'], answer: '৪০০', explanation: '৪ শতকের ঘরে আছে, তাই এর স্থানীয় মান ৪ × ১০০ = ৪০০।' },
  { id: 'q8', topic: 'numbers', prompt: 'সংখ্যারেখায় ০-এর ডান পাশে কোন সংখ্যা থাকে?', options: ['−১', '১', '−২'], answer: '১', explanation: 'সংখ্যারেখায় ডান দিকে গেলে সংখ্যা বাড়ে; ০-এর ঠিক ডানে ১।' },
  { id: 'q9', topic: 'fractions', prompt: '১/৪ + ১/৪ = কত?', options: ['১/৮', '২/৪', '২/৮'], answer: '২/৪', explanation: 'হর একই, তাই লব যোগ করি: ১/৪ + ১/৪ = ২/৪, যা ১/২-এর সমান।' },
  { id: 'q10', topic: 'fractions', prompt: '৩/৫ ভগ্নাংশে হর কোনটি?', options: ['৩', '৫', '৮'], answer: '৫', explanation: 'ভগ্নাংশের নিচের সংখ্যাটিকে হর বলে। এখানে হর ৫।' },
  { id: 'q11', topic: 'fractions', prompt: 'কোন ভগ্নাংশটি ১-এর সমান?', options: ['২/৩', '৪/৪', '৩/৪'], answer: '৪/৪', explanation: 'লব ও হর সমান এবং শূন্য নয় হলে ভগ্নাংশটির মান ১ হয়।' },
  { id: 'q12', topic: 'decimals', prompt: '০.৫-এর ভগ্নাংশ রূপ কোনটি?', options: ['১/২', '১/৫', '৫/১০০'], answer: '১/২', explanation: '০.৫ = ৫/১০ = ১/২। অর্থাৎ এটি অর্ধেক।' },
  { id: 'q13', topic: 'decimals', prompt: '৩.৪ + ০.৬ = কত?', options: ['৩.১০', '৪', '৪.৬'], answer: '৪', explanation: '৩.৪-এর সঙ্গে ০.৬ যোগ করলে ৪.০, অর্থাৎ ৪ হয়।' },
  { id: 'q14', topic: 'percentages', prompt: '১০০-এর ২৫% কত?', options: ['২৫', '৪০', '৭৫'], answer: '২৫', explanation: '২৫% মানে প্রতি ১০০-তে ২৫। তাই ১০০-এর ২৫% = ২৫।' },
  { id: 'q15', topic: 'percentages', prompt: 'অর্ধেককে শতকরায় লিখলে কত?', options: ['২৫%', '৫০%', '৭৫%'], answer: '৫০%', explanation: '১/২ = ০.৫। ০.৫ × ১০০ = ৫০%, তাই অর্ধেক ৫০%।' },
  { id: 'q16', topic: 'ratio', prompt: '২টি লাল বল ও ৩টি নীল বলের লাল:নীল অনুপাত কত?', options: ['৩:২', '২:৩', '২:৫'], answer: '২:৩', explanation: 'প্রথমে লাল বলের সংখ্যা, পরে নীল বলের সংখ্যা লিখি: ২:৩।' },
  { id: 'q17', topic: 'algebra', prompt: 'x + ৩ = ৮ হলে x কত?', options: ['৫', '১১', '২৪'], answer: '৫', explanation: 'x একা করতে দুই পাশ থেকে ৩ বিয়োগ করি: x = ৮ − ৩ = ৫।' },
  { id: 'q18', topic: 'algebra', prompt: '২a মানে কী?', options: ['a + ২', '২ × a', 'a ÷ ২'], answer: '২ × a', explanation: 'সংখ্যা ও চলক পাশাপাশি লিখলে সাধারণত গুণ বোঝায়। তাই ২a = ২ × a।' },
  { id: 'q19', topic: 'geometry', prompt: 'ত্রিভুজের কয়টি বাহু?', options: ['২টি', '৩টি', '৪টি'], answer: '৩টি', explanation: 'ত্রিভুজের তিনটি বাহু ও তিনটি কোণ থাকে।' },
  { id: 'q20', topic: 'geometry', prompt: 'একটি বর্গের প্রতিটি কোণ কত ডিগ্রি?', options: ['৪৫°', '৯০°', '১৮০°'], answer: '৯০°', explanation: 'বর্গের চারটি কোণই সমকোণ, প্রতিটি ৯০ ডিগ্রি।' },
  { id: 'q21', topic: 'geometry', prompt: 'দৈর্ঘ্য ৫ সেমি ও প্রস্থ ৩ সেমি আয়তক্ষেত্রের পরিসীমা কত?', options: ['৮ সেমি', '১৫ সেমি', '১৬ সেমি'], answer: '১৬ সেমি', explanation: 'পরিসীমা = ২ × (দৈর্ঘ্য + প্রস্থ) = ২ × (৫ + ৩) = ১৬ সেমি।' },
  { id: 'q22', topic: 'geometry', prompt: '৪ সেমি বাহুবিশিষ্ট বর্গের ক্ষেত্রফল কত?', options: ['৮ বর্গ সেমি', '১৬ বর্গ সেমি', '১২ বর্গ সেমি'], answer: '১৬ বর্গ সেমি', explanation: 'বর্গের ক্ষেত্রফল = বাহু × বাহু = ৪ × ৪ = ১৬ বর্গ সেমি।' },
  { id: 'q23', topic: 'arithmetic', prompt: '৯০ থেকে ৩৭ বিয়োগ করলে কত থাকে?', options: ['৫৩', '৬৩', '৫৭'], answer: '৫৩', explanation: '৯০ − ৩০ = ৬০, এরপর ৭ বিয়োগ করলে ৫৩।' },
  { id: 'q24', topic: 'percentages', prompt: '২০০ টাকার ১০% কত টাকা?', options: ['১০ টাকা', '২০ টাকা', '৫০ টাকা'], answer: '২০ টাকা', explanation: '১০% = ১০/১০০। তাই ২০০ × ১০/১০০ = ২০ টাকা।' },
  { id: 'q25', topic: 'ratio', prompt: 'অনুপাত ৪:৮ সরল করলে কী হয়?', options: ['১:২', '২:৪', '৪:২'], answer: '১:২', explanation: 'উভয় অংশকে ৪ দিয়ে ভাগ করলে ৪:৮ = ১:২।' },
]
