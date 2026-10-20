export type AgeBand = '8-9' | '10-11' | '12+'

export type Lesson = {
  ageBand: AgeBand
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
      { id: 'place-value', ageBand: '8-9', title: 'সংখ্যার স্থানীয় মান', subtitle: 'কোন ঘরে আছে, কত মান', duration: '৬ মিনিট', status: 'available', kind: 'lesson', objective: 'অঙ্ক কোন ঘরে আছে, তা দেখে তার মান বুঝি।' },
      { id: 'number-line', ageBand: '8-9', title: 'সংখ্যারেখায় সংখ্যা', subtitle: 'সংখ্যার পথে সামনে-পেছনে', duration: '৮ মিনিট', status: 'available', kind: 'visual', objective: 'সংখ্যার পথে সামনে বা পেছনে কত ধাপ, তা বুঝি।' },
      { id: 'operations', ageBand: '8-9', title: 'যোগ, বিয়োগ, গুণ ও ভাগ', subtitle: 'এক করা, বাকি, দল ও ভাগ', duration: '১০ মিনিট', status: 'available', kind: 'practice', objective: 'জিনিস যোগ, বিয়োগ, গুণ ও ভাগ করে হিসাব করি।' },
      { id: 'factors-multiples', ageBand: '10-11', title: 'গুণনীয়ক ও গুণিতক', subtitle: 'ভাগ করে আর গুণ করে চিনি', duration: '৮ মিনিট', status: 'available', kind: 'lesson', objective: 'ভাগ আর গুণ দিয়ে সংখ্যার সম্পর্ক খুঁজি।' },
      { id: 'negative-numbers', ageBand: '12+', title: 'ধনাত্মক ও ঋণাত্মক সংখ্যা', subtitle: 'শূন্যের নিচে ও ওপরে', duration: '৭ মিনিট', status: 'available', kind: 'visual', objective: 'শূন্যের নিচে ও ওপরে থাকা সংখ্যা বুঝি।' },
      { id: 'order-of-operations', ageBand: '12+', title: 'হিসাবের সঠিক ক্রম', subtitle: 'কোন কাজ আগে করব?', duration: '৮ মিনিট', status: 'available', kind: 'lesson', objective: 'একাধিক হিসাব থাকলে কোন কাজ আগে করব, তা শিখি।' },
      { id: 'hcf-lcm', ageBand: '12+', title: 'গ.সা.গু. ও ল.সা.গু.', subtitle: 'দুই সংখ্যার মধ্যে মিল খুঁজি', duration: '৯ মিনিট', status: 'available', kind: 'lesson', objective: 'দুটি সংখ্যাকে একসঙ্গে ভাগ করতে পারে এমন সংখ্যা খুঁজি।' },
      { id: 'averages', ageBand: '10-11', title: 'গড় নির্ণয়', subtitle: 'সমান ভাগ করলে কত হয়?', duration: '৭ মিনিট', status: 'available', kind: 'practice', objective: 'সবকিছু সমান ভাগ করলে কত হয়, তা বের করি।' },
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
      { id: 'fraction-basics', ageBand: '8-9', title: 'ভগ্নাংশের শুরু', subtitle: 'সমান ভাগের ছোট অংশ', duration: '৭ মিনিট', status: 'available', kind: 'visual', objective: 'পুরো জিনিসের সমান ভাগের অংশ ভগ্নাংশে লিখি।' },
      { id: 'equivalent-fractions', ageBand: '10-11', title: 'সমতুল্য ভগ্নাংশ', subtitle: 'একই পরিমাণ, আলাদা রূপ', duration: '৮ মিনিট', status: 'available', kind: 'lesson', objective: 'দেখতে আলাদা ভগ্নাংশের মান একই কি না বুঝি।' },
      { id: 'fraction-practice', ageBand: '8-9', title: 'ভগ্নাংশ অনুশীলন', subtitle: 'ছবি দেখে নিজে করি', duration: '৫ মিনিট', status: 'available', kind: 'practice', objective: 'ছবি আর ছোট প্রশ্ন দিয়ে ভগ্নাংশ বুঝি।' },
      { id: 'decimals', ageBand: '10-11', title: 'দশমিক সংখ্যা', subtitle: 'টাকা-পয়সা দিয়ে বুঝি', duration: '৮ মিনিট', status: 'available', kind: 'lesson', objective: 'দশমিক সংখ্যা দিয়ে ছোট অংশও দেখাই।' },
      { id: 'percentages', ageBand: '10-11', title: 'শতকরা', subtitle: '১০০টির মধ্যে কতটি?', duration: '১০ মিনিট', status: 'available', kind: 'lesson', objective: 'প্রতি ১০০-তে কত অংশ, তা বের করি।' },
      { id: 'fraction-addition', ageBand: '10-11', title: 'ভগ্নাংশের যোগ ও বিয়োগ', subtitle: 'একই আকারের অংশ যোগ করি', duration: '১০ মিনিট', status: 'available', kind: 'visual', objective: 'একই আকারের ভগ্নাংশ যোগ ও বিয়োগ করি।' },
      { id: 'decimal-operations', ageBand: '10-11', title: 'দশমিকের যোগ ও বিয়োগ', subtitle: 'দশমিক মিলিয়ে হিসাব', duration: '৮ মিনিট', status: 'available', kind: 'practice', objective: 'দশমিক বিন্দু মিলিয়ে যোগ ও বিয়োগ করি।' },
      { id: 'fraction-multiply-divide', ageBand: '12+', title: 'ভগ্নাংশের গুণ ও ভাগ', subtitle: 'অংশের গুণ ও ভাগ', duration: '৯ মিনিট', status: 'available', kind: 'visual', objective: 'ভগ্নাংশের গুণ ও ভাগ ধাপে ধাপে করি।' },
      { id: 'rounding-decimals', ageBand: '12+', title: 'দশমিক পূর্ণীকরণ ও অনুমান', subtitle: 'কাছাকাছি মানে লিখি', duration: '৭ মিনিট', status: 'available', kind: 'practice', objective: 'দশমিক সংখ্যাকে কাছাকাছি মানে লিখি।' },
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
      { id: 'ratio', ageBand: '12+', title: 'অনুপাতের ধারণা', subtitle: 'দুটি পরিমাণের তুলনা', duration: '৮ মিনিট', status: 'available', kind: 'lesson', objective: 'দুটি পরিমাণের তুলনা অনুপাত দিয়ে দেখাই।' },
      { id: 'variables', ageBand: '12+', title: 'চলক ও রাশি', subtitle: 'খালি বাক্সের বদলে x', duration: '৯ মিনিট', status: 'available', kind: 'visual', objective: 'অজানা সংখ্যার জায়গায় অক্ষর ব্যবহার করি।' },
      { id: 'linear-equations', ageBand: '12+', title: 'সহজ সমীকরণ', subtitle: 'অজানা সংখ্যা খুঁজে পাই', duration: '১০ মিনিট', status: 'available', kind: 'lesson', objective: 'সমীকরণ থেকে অজানা সংখ্যা খুঁজে পাই।' },
      { id: 'proportion', ageBand: '12+', title: 'সমানুপাত ও একক দর', subtitle: 'একটির দাম থেকে মোট দাম', duration: '৮ মিনিট', status: 'available', kind: 'practice', objective: 'একটি জিনিসের দাম থেকে কয়েকটির দাম বের করি।' },
      { id: 'two-step-equations', ageBand: '12+', title: 'দুই ধাপের সমীকরণ', subtitle: 'দুই ধাপে x খুঁজি', duration: '৯ মিনিট', status: 'available', kind: 'lesson', objective: 'দুটি ধাপে অজানা সংখ্যা খুঁজে পাই।' },
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
      { id: 'shapes', ageBand: '8-9', title: 'আকার ও বৈশিষ্ট্য', subtitle: 'চারপাশের আকার চিনে নিই', duration: '৭ মিনিট', status: 'available', kind: 'visual', objective: 'চারপাশের জিনিসের আকার ও বাহু চিনে নিই।' },
      { id: 'perimeter-area', ageBand: '10-11', title: 'পরিসীমা ও ক্ষেত্রফল', subtitle: 'চারপাশ আর ভেতরের জায়গা', duration: '১০ মিনিট', status: 'available', kind: 'lesson', objective: 'আকারের চারপাশ ও ভেতরের জায়গার হিসাব করি।' },
      { id: 'angles', ageBand: '10-11', title: 'কোণ ও ডিগ্রি', subtitle: 'কোণ কতটা খোলা?', duration: '৭ মিনিট', status: 'available', kind: 'visual', objective: 'কোণ কতটা খোলা, তা বুঝি ও মাপি।' },
      { id: 'unit-conversion', ageBand: '10-11', title: 'একক রূপান্তর', subtitle: 'মিটার আর সেন্টিমিটার', duration: '৮ মিনিট', status: 'available', kind: 'practice', objective: 'মিটার ও সেন্টিমিটারের মধ্যে বদল করি।' },
      { id: 'triangles', ageBand: '12+', title: 'ত্রিভুজের ধরন ও কোণ', subtitle: 'তিন বাহু, তিন কোণ', duration: '৮ মিনিট', status: 'available', kind: 'visual', objective: 'ত্রিভুজের বাহু ও কোণ দেখে তার বৈশিষ্ট্য বুঝি।' },
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
