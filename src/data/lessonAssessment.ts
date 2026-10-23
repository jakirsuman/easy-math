import { practiceQuestions } from './expandedQuestions'
import { lessonTeachingNotes } from './lessonTeachingNotes'
import { lessonContent } from './lessonContent'

export type LessonAssessmentQuestion = {
  id: string
  prompt: string
  type?: 'choice' | 'short-answer' | 'ordered-steps'
  options?: readonly string[]
  steps?: readonly string[]
  correctOrder?: readonly string[]
  answer: string
  acceptableAnswers?: readonly string[]
  explanation: string
  responsePurpose?: 'application' | 'error-correction'
  distractorFeedback?: Readonly<Record<string, string>>
  reasoningPrompt?: string
  reasoningOptions?: readonly string[]
  reasoningAnswer?: string
}

type BaseQuestion = {
  question: string
  options: string[]
  answer: string
  explanation: string
}

const extraQuestions: LessonAssessmentQuestion[] = [
  { id: 'pv-1', prompt: '৭,০৪,০৫৬ সংখ্যাটির বিস্তৃত রূপ কোনটি?', options: ['৭,০০,০০০ + ৪,০০০ + ৫০ + ৬', '৭০,০০০ + ৪,০০০ + ৫৬', '৭,০০,০০০ + ৪০,০০০ + ৫৬'], answer: '৭,০০,০০০ + ৪,০০০ + ৫০ + ৬', explanation: '৭ লক্ষের ঘরে, ৪ হাজারের ঘরে, ৫ দশকের ঘরে এবং ৬ এককের ঘরে আছে। মাঝখানে শূন্য থাকা ঘরের মান যোগ হয় না।' },
  { id: 'nl-1', prompt: 'সংখ্যারেখায় −৩ থেকে ডানে ৫ ধাপ গেলে কোথায় পৌঁছাবে?', options: ['−৮', '২', '৮'], answer: '২', explanation: '−৩ থেকে ডানে গেলে সংখ্যা বাড়ে: −২, −১, ০, ১, ২। পাঁচ ধাপ শেষে ২।' },
  { id: 'mg-1', prompt: '৬টি দলে ৪টি করে মার্বেল থাকলে মোট কতটি মার্বেল?', options: ['১০টি', '২৪টি', '৬৪টি'], answer: '২৪টি', explanation: '৬টি সমান দল, প্রতি দলে ৪টি: ৬ × ৪ = ২৪। বারবার যোগ করলেও ৪ + ৪ + ৪ + ৪ + ৪ + ৪ = ২৪।' },
  { id: 'fm-1', prompt: 'কোন সংখ্যাটি ১৮-এর গুণনীয়ক?', options: ['৫', '৬', '৭'], answer: '৬', explanation: '১৮ ÷ ৬ = ৩, ভাগশেষ শূন্য; তাই ৬ গুণনীয়ক।' },
  { id: 'fm-2', prompt: '৭-এর প্রথম চারটি ধনাত্মক গুণিতকের একটি কোনটি?', options: ['১৮', '২৮', '৩০'], answer: '২৮', explanation: '৭, ১৪, ২১, ২৮—প্রতিটি ৭-এর পূর্ণসংখ্যা গুণিতক।' },
  { id: 'fm-3', prompt: 'কোন জোড়ার সাধারণ গুণনীয়ক ১ ছাড়া আর নেই?', options: ['৮ ও ১৫', '৮ ও ১২', '৯ ও ১২'], answer: '৮ ও ১৫', explanation: '৮-এর গুণনীয়ক ১, ২, ৪, ৮; ১৫-এর ১, ৩, ৫, ১৫। সাধারণ গুণনীয়ক শুধু ১।' },
  { id: 'fm-4', prompt: '২৪ কি ৬-এর গুণিতক?', options: ['হ্যাঁ, কারণ ৬ × ৪ = ২৪', 'না, কারণ ২৪ ÷ ৬ = ৩', 'না, কারণ ২৪ জোড় সংখ্যা'], answer: 'হ্যাঁ, কারণ ৬ × ৪ = ২৪', explanation: 'কোনো সংখ্যা অপর সংখ্যাকে পূর্ণসংখ্যা দিয়ে গুণ করে পাওয়া গেলে সেটি ওই সংখ্যার গুণিতক। ৬ × ৪ = ২৪।' },
  { id: 'order-1', prompt: '১৮ − ২ × ৫ = কত?', options: ['৮', '৮০', '১০'], answer: '৮', explanation: 'আগে গুণ: ২ × ৫ = ১০। তারপর ১৮ − ১০ = ৮।' },
  { id: 'order-2', prompt: '(১৮ − ২) × ৫ = কত?', options: ['৮', '৮০', '১০০'], answer: '৮০', explanation: 'বন্ধনী আগে: ১৮ − ২ = ১৬। তারপর ১৬ × ৫ = ৮০।' },
  { id: 'hcf-1', prompt: '১২ ও ১৮-এর গ.সা.গু. কত?', options: ['৩', '৬', '৩৬'], answer: '৬', explanation: '১২-এর গুণনীয়ক ১, ২, ৩, ৪, ৬, ১২; ১৮-এর ১, ২, ৩, ৬, ৯, ১৮। সবচেয়ে বড় সাধারণটি ৬।' },
  { id: 'hcf-2', prompt: '৪ ও ৬-এর ল.সা.গু. কত?', options: ['২', '১২', '২৪'], answer: '১২', explanation: '৪-এর গুণিতক ৪, ৮, ১২…; ৬-এর ৬, ১২…। প্রথম সাধারণ ধনাত্মক গুণিতক ১২।' },
  { id: 'hcf-3', prompt: '১৬ ও ২৪-এর গ.সা.গু. ৮ হলে ল.সা.গু. কত?', options: ['৩২', '৪৮', '১৯২'], answer: '৪৮', explanation: 'দুটি ধনাত্মক পূর্ণসংখ্যার ক্ষেত্রে গ.সা.গু. × ল.সা.গু. = সংখ্যাদুটির গুণফল। তাই ল.সা.গু. = ১৬ × ২৪ ÷ ৮ = ৪৮।' },
  { id: 'hcf-4', prompt: 'দুটি বাস ৬ মিনিট ও ৮ মিনিট পরপর ছাড়ে। একসঙ্গে ছাড়ার পর আবার কত মিনিটে একসঙ্গে ছাড়বে?', options: ['২ মিনিট', '১৪ মিনিট', '২৪ মিনিট'], answer: '২৪ মিনিট', explanation: 'দুটির আবার একই সময়ে ছাড়ার জন্য ৬ ও ৮-এর প্রথম সাধারণ গুণিতক, অর্থাৎ ল.সা.গু. ২৪ মিনিট লাগে।' },
  { id: 'avg-1', prompt: '৫, ৭ ও ১২-এর গড় কত?', options: ['৭', '৮', '১২'], answer: '৮', explanation: 'যোগফল ৫ + ৭ + ১২ = ২৪। তিনটি সংখ্যা, তাই গড় ২৪ ÷ ৩ = ৮।' },
  { id: 'avg-2', prompt: 'চারটি পরীক্ষার নম্বর ৬, ৮, ১০ ও ১২। গড় কত?', options: ['৮', '৯', '১০'], answer: '৯', explanation: 'মোট ৬ + ৮ + ১০ + ১২ = ৩৬; ৪টি নম্বরের গড় ৩৬ ÷ ৪ = ৯।' },
  { id: 'avg-3', prompt: '৩টি সংখ্যার গড় ১০। তাদের যোগফল কত?', options: ['১৩', '৩০', '১০'], answer: '৩০', explanation: 'গড় = যোগফল ÷ সংখ্যা। তাই যোগফল = গড় × সংখ্যা = ১০ × ৩ = ৩০।' },
  { id: 'avg-4', prompt: '৪, ৬ ও ২০-এর গড় কত?', options: ['১০', '১২', '৩০'], answer: '১০', explanation: 'মোট ৪ + ৬ + ২০ = ৩০; ৩ দিয়ে ভাগ করলে গড় ১০। বড় একটি মান থাকলে গড়ও বাড়তে পারে।' },
  { id: 'fb-1', prompt: 'একটি কেক ৮টি সমান ভাগে কাটা হয়েছে। ৩টি ভাগ নেওয়া হলে কত অংশ নেওয়া হয়েছে?', options: ['৩/৮', '৮/৩', '৩/৫'], answer: '৩/৮', explanation: 'নেওয়া ভাগের সংখ্যা লব, মোট সমান ভাগের সংখ্যা হর। তাই ৩/৮।' },
  { id: 'eqf-1', prompt: '৩/৫-এর সমতুল্য ভগ্নাংশ কোনটি?', options: ['৬/১০', '৬/৫', '৩/১০'], answer: '৬/১০', explanation: 'লব ও হর উভয়কে ২ দিয়ে গুণ করলে ৩/৫ = ৬/১০; মান অপরিবর্তিত থাকে।' },
  { id: 'fa-1', prompt: '২/৭ + ৩/৭ = কত?', options: ['৫/৭', '৫/১৪', '৬/৭'], answer: '৫/৭', explanation: 'হর একই, তাই সমান আকারের অংশের সংখ্যা যোগ করি: (২ + ৩)/৭ = ৫/৭।' },
  { id: 'fmul-1', prompt: '২/৩ × ৩/৫ = কত?', options: ['৬/১৫', '৫/৯', '৫/৮'], answer: '৬/১৫', explanation: 'লবের সঙ্গে লব ও হরের সঙ্গে হর গুণ করি: (২×৩)/(৩×৫) = ৬/১৫ = ২/৫।' },
  { id: 'decop-1', prompt: '৪.০০ − ১.৭৫ = কত?', options: ['২.২৫', '৩.২৫', '২.৩৫'], answer: '২.২৫', explanation: 'দশমিক ঘর মিলিয়ে ৪.০০ − ১.৭৫ হিসাব করলে ২.২৫ থাকে।' },
  { id: 'round-1', prompt: '৬.২৪-কে নিকটতম পূর্ণ সংখ্যায় পূর্ণ করলে কত?', options: ['৬', '৭', '৬.২'], answer: '৬', explanation: 'দশমাংশের অঙ্ক ২, যা ৫-এর কম। তাই নিকটতম পূর্ণ সংখ্যা ৬।' },
  { id: 'round-2', prompt: '৮.৭৬-কে এক ঘর দশমিক পর্যন্ত পূর্ণ করলে কত?', options: ['৮.৭', '৮.৮', '৯.০'], answer: '৮.৮', explanation: 'দশমাংশের পরের অঙ্ক ৬; ৫ বা বেশি হওয়ায় দশমাংশের অঙ্ক ৭ থেকে ৮ হয়।' },
  { id: 'round-3', prompt: '৪.৯৬-কে এক ঘর দশমিক পর্যন্ত পূর্ণ করলে কত?', options: ['৪.৯', '৫.০', '৪.১০'], answer: '৫.০', explanation: 'শতকাংশের অঙ্ক ৬, তাই ৪.৯-কে এক দশমাংশ বাড়ালে ৫.০ হয়। এখানে দশমাংশের ঘরে বহন করতে হয়।' },
  { id: 'angle-1', prompt: '১৩০° কোণটি কোন ধরনের?', options: ['সূক্ষ্মকোণ', 'সমকোণ', 'স্থূলকোণ'], answer: 'স্থূলকোণ', explanation: '৯০°-এর বেশি কিন্তু ১৮০°-এর কম কোণ স্থূলকোণ।' },
  { id: 'angle-2', prompt: 'একটি সরলকোণ ১৮০°। তার একটি অংশ ৬৫° হলে বাকি অংশ কত?', options: ['২৫°', '১১৫°', '১২৫°'], answer: '১১৫°', explanation: 'সরলকোণের মোট মান ১৮০°; তাই ১৮০° − ৬৫° = ১১৫°।' },
  { id: 'fmul-2', prompt: '৩/৪ ÷ ১/৮ = কত?', options: ['৩/৩২', '৬', '৪'], answer: '৬', explanation: '৩/৪ × ৮/১ = ২৪/৪ = ৬; অর্থাৎ তিন-চতুর্থাংশে এক-অষ্টমাংশের ৬টি অংশ আছে।' },
  { id: 'step-2', prompt: '৪x + ৫ = ২৫ হলে x কত?', options: ['৫', '৭.৫', '১০'], answer: '৫', explanation: 'দুই পাশ থেকে ৫ বিয়োগ করলে ৪x = ২০; এরপর ৪ দিয়ে ভাগ করলে x = ৫।' },
  { id: 'unit-1', prompt: '৩.৫ মিটার কত সেন্টিমিটার?', options: ['৩৫ সেমি', '৩৫০ সেমি', '৩,৫০০ সেমি'], answer: '৩৫০ সেমি', explanation: '১ মিটার = ১০০ সেমি, তাই ৩.৫ × ১০০ = ৩৫০ সেমি।' },
  { id: 'unit-2', prompt: '২৫০ সেন্টিমিটার কত মিটার?', options: ['০.২৫ মিটার', '২.৫ মিটার', '২৫ মিটার'], answer: '২.৫ মিটার', explanation: '১০০ সেমি = ১ মিটার; তাই ২৫০ ÷ ১০০ = ২.৫ মিটার।' },
  { id: 'unit-3', prompt: '২ কিলোগ্রাম কত গ্রাম?', options: ['২০০ গ্রাম', '২,০০০ গ্রাম', '২০,০০০ গ্রাম'], answer: '২,০০০ গ্রাম', explanation: '১ কিলোগ্রাম = ১,০০০ গ্রাম; তাই ২ কিলোগ্রাম = ২,০০০ গ্রাম।' },
  { id: 'tri-1', prompt: 'একটি ত্রিভুজের দুই কোণ ৪৫° ও ৮০°। তৃতীয় কোণ কত?', options: ['৫৫°', '৬৫°', '৭০°'], answer: '৫৫°', explanation: 'তিন কোণের যোগ ১৮০°; তৃতীয় কোণ = ১৮০° − ৪৫° − ৮০° = ৫৫°।' },
  { id: 'step-1', prompt: '৩x − ৬ = ১২ হলে x কত?', options: ['২', '৬', '১৮'], answer: '৬', explanation: 'দুই পাশে ৬ যোগ করলে ৩x = ১৮; তারপর ৩ দিয়ে ভাগ করলে x = ৬।' },
]

const questionIdsByLesson: Record<string, string[]> = {
  'place-value': ['q7', 'extra-n26', 'extra-n33', 'pv-1'],
  'number-line': ['q8', 'extra-n31', 'extra-n32', 'nl-1'],
  'operations': ['q4', 'extra-a26', 'extra-a27', 'extra-a29'],
  'multiplication-groups': ['q5', 'extra-a28', 'extra-a32', 'mg-1'],
  'factors-multiples': ['fm-1', 'fm-2', 'fm-3', 'fm-4'],
  'negative-numbers': ['extra-n30', 'extra-n31', 'extra-n32', 'q8'],
  'order-of-operations': ['extra-a30', 'extra-a31', 'order-1', 'order-2'],
  'hcf-lcm': ['hcf-1', 'hcf-2', 'hcf-3', 'hcf-4'],
  'averages': ['avg-1', 'avg-2', 'avg-3', 'avg-4'],
  'fraction-basics': ['q1', 'q10', 'extra-f28', 'fb-1'],
  'equivalent-fractions': ['q2', 'q11', 'extra-f32', 'eqf-1'],
  'fraction-practice': ['q1', 'q3', 'extra-f28', 'extra-f31'],
  'decimals': ['q12', 'extra-d30', 'extra-d32', 'extra-d33'],
  'percentages': ['q14', 'q15', 'extra-p26', 'extra-p30'],
  'fraction-addition': ['q9', 'extra-f26', 'extra-f27', 'fa-1'],
  'decimal-operations': ['q13', 'extra-d26', 'extra-d27', 'decop-1'],
  'fraction-multiply-divide': ['extra-f29', 'extra-f30', 'fmul-1', 'fmul-2'],
  'rounding-decimals': ['extra-d31', 'round-1', 'round-2', 'round-3'],
  'ratio': ['q16', 'q25', 'extra-r28', 'extra-r32'],
  'variables': ['q18', 'extra-al31', 'extra-al32', 'extra-al33'],
  'linear-equations': ['q17', 'extra-al26', 'extra-al27', 'extra-al28'],
  'proportion': ['extra-r27', 'extra-r29', 'extra-r33', 'extra-r31'],
  'two-step-equations': ['extra-al29', 'extra-al30', 'step-1', 'step-2'],
  'shapes': ['q19', 'q20', 'extra-g30', 'extra-g31'],
  'perimeter-area': ['q21', 'q22', 'extra-g27', 'extra-g28'],
  'angles': ['q20', 'angle-1', 'angle-2', 'extra-g26'],
  'unit-conversion': ['extra-g32', 'unit-1', 'unit-2', 'unit-3'],
  'triangles': ['q19', 'extra-g26', 'extra-g31', 'tri-1'],
}

const distractorFeedbackByPrompt: Record<string, Readonly<Record<string, string>>> = {
  "৪,২৫,৬৭৮ সংখ্যায় ২-এর স্থানীয় মান কত?": {
    "২": "এখানে অঙ্কের নিজের মান আর স্থানীয় মান গুলিয়ে গেছে। ২ দশ হাজারের ঘরে, তাই ২ × ১০,০০০ হিসাব করো।",
    "২,০০০": "২ হাজার নয়, দশ হাজারের ঘরে আছে। ডান দিক থেকে ঘর গুনে ২-এর মান নির্ণয় করো।"
  },
  "৪ থেকে ডানে ৩ ধাপ গেলে কোন সংখ্যায় পৌঁছাবে?": {
    "৬": "ধাপ গোনার সময় শুরু সংখ্যাটিকে ধাপ হিসেবে ধরো না। ৪-এর পর ৫ প্রথম ধাপ।",
    "৮": "ডানে প্রতিটি ধাপে ১ বাড়ে; ৪-এ ৩ যোগ করো, ৪-এর সঙ্গে ৪ নয়।"
  },
  "৪টি বাক্সে ৩টি করে পেন্সিল আছে। মোট পেন্সিল কয়টি?": {
    "৭টি": "এখানে দুইটি সংখ্যা যোগ করলে মোট দলভিত্তিক বস্তু পাওয়া যায় না। ৩টি করে চারটি সমান দল আছে।",
    "১৬টি": "প্রতি বাক্সে ৩টি, বাক্স ৪টি—৪ × ৩ হিসাব করো; ৪ × ৪ নয়।"
  },
  "নিচের কোনটি ১২-এর গুণনীয়ক?": {
    "৫": "গুণনীয়ক হলে ১২-কে ওই সংখ্যা দিয়ে ভাগ করলে ভাগশেষ শূন্য হতে হবে। ১২ ÷ ৫ পরীক্ষা করো।",
    "৭": "১২ ÷ ৭ নিঃশেষে ভাগ যায় না; গুণনীয়ক যাচাই করতে ভাগশেষ দেখো।"
  },
  "−৪ থেকে ডানে ৭ ধাপ গেলে কোন সংখ্যায় পৌঁছাবে?": {
    "−১১": "ডানে গেলে মান বাড়ে, কমে না। −৪ থেকে ডানে ৪ ধাপেই শূন্যে পৌঁছাবে।",
    "১১": "শূন্য পার হওয়ার পরও সংখ্যারেখায় ৩ ধাপ বাকি থাকে; চিহ্নসহ অবস্থানটি হিসাব করো।"
  },
  "৫ + ২ × ৩ = কত?": {
    "২১": "গুণ আগে করতে হয়। আগে ২ × ৩ = ৬, তারপর ৫ যোগ করো।",
    "১৫": "৫ + ২-কে আগে গুণ করা যাবে না, কারণ বন্ধনী নেই। আগে ২ × ৩ হিসাব করো।"
  },
  "৮ ও ১২-এর গ.সা.গু. কত?": {
    "২": "২ সাধারণ গুণনীয়ক, কিন্তু সবচেয়ে বড়টি নয়। ৮ ও ১২-এর সাধারণ গুণনীয়কগুলো তুলনা করো।",
    "৮": "৮ দিয়ে ১২ নিঃশেষে ভাগ যায় না; উভয় সংখ্যাকে নিঃশেষে ভাগ করে এমন বৃহত্তম সংখ্যা দরকার।"
  },
  "৪, ৬ ও ৮-এর গড় কত?": {
    "১৮": "১৮ হলো যোগফল। গড় পেতে যোগফলকে মোট সংখ্যা, অর্থাৎ ৩ দিয়ে ভাগ করো।",
    "৮": "শুধু সবচেয়ে বড় বা শেষ সংখ্যাটি নিলে গড় হয় না; সবগুলো যোগ করে ৩ দিয়ে ভাগ করো।"
  },
  "৪টি সমান ভাগের মধ্যে ৩টি ভাগ নিলে কোন ভগ্নাংশ হবে?": {
    "৪/৩": "হরে মোট সমান ভাগ এবং লবে নেওয়া ভাগ লিখতে হয়। এখানে মোট ৪, নেওয়া ৩।",
    "১/৪": "১/৪ একটি অংশ বোঝায়, কিন্তু নেওয়া হয়েছে ৩টি অংশ। লবে ৩ বসবে।"
  },
  "১/২-এর সমান কোন ভগ্নাংশটি?": {
    "২/৩": "লব ও হর একই অনুপাতে বাড়াতে হয়। ১/২-কে দ্বিগুণ করলে ২/৪ হয়।",
    "১/৪": "১/৪-এর মান ১/২-এর অর্ধেক; সমতুল্য ভগ্নাংশে লব ও হর একই সংখ্যা দিয়ে গুণ করতে হয়।"
  },
  "৫টি সমান ভাগের মধ্যে ২টি ভাগ নিলে কোন ভগ্নাংশ হবে?": {
    "৫/২": "মোট ভাগ হরে, নেওয়া ভাগ লবে বসে। ৫টি মোট ভাগ এবং ২টি নেওয়া।",
    "৩/৫": "৩টি ভাগ নেওয়া হয়নি; নেওয়া হয়েছে ২টি। তাই লব ২ হবে।"
  },
  "০.৬ + ০.২৫ = কত?": {
    "০.৩১": "দশমিকের ঘর মিলিয়ে লিখো: ০.৬ = ০.৬০। তারপর ০.৬০ + ০.২৫ যোগ করো।",
    "০.৬৫": "দশমিকের ডান পাশের অঙ্কগুলোকে এককের অঙ্কের মতো না ধরে স্থানীয় মান মিলিয়ে যোগ করো।"
  },
  "১০০টি স্টিকারের ১০% কতটি?": {
    "২৫টি": "১০% মানে প্রতি ১০০-তে ১০; এক-চতুর্থাংশ বা ২৫% নয়।",
    "৫০টি": "৫০% হলো অর্ধেক। ১০% পেতে ১০০-কে ১০০ দিয়ে ভাগ করে ১০ দিয়ে গুণ করো।"
  },
  "৪/৭ − ২/৭ = কত?": {
    "২/১৪": "হর একই, তাই হর যোগ বা গুণ করতে হয় না—শুধু লব বিয়োগ করো।",
    "৬/৭": "বিয়োগে লব যোগ করলে ৬ হয়; এখানে ৪ থেকে ২ বিয়োগ করতে হবে।"
  },
  "১.৫০ + ০.২৫ = কত?": {
    "১.২৫": "যোগে পরিমাণ বাড়ে। দশমিক বিন্দু এক লাইনে রেখে ১.৫০ + ০.২৫ হিসাব করো।",
    "২.২৫": "দশমিকের ঘর মিলিয়ে দশমাংশ ও শতাংশ যোগ করো; ০.৫০ + ০.২৫ = ০.৭৫।"
  },
  "১/২ × ১/৩ = কত?": {
    "১/৫": "ভগ্নাংশের গুণে হর যোগ করি না; লবের সঙ্গে লব এবং হরের সঙ্গে হর গুণ করি।",
    "২/৩": "এটি গুণ, যোগ বা ভাগ নয়। ১ × ১ লবে এবং ২ × ৩ হরে বসাও।"
  },
  "৩.৪৮-কে এক ঘর দশমিক পর্যন্ত লিখলে কত?": {
    "৩.৪": "দশমাংশের পরের অঙ্ক ৮। ৫ বা বেশি হলে দশমাংশের ঘর এক বাড়ে।",
    "৩.৮": "এক ঘর দশমিকের জন্য শুধু পরের অঙ্কটি দশমাংশে বসানো হয় না; ৩.৪-কে পূর্ণীকরণ করো।"
  },
  "৩টি লাল ও ৫টি নীল বল থাকলে লাল : নীল অনুপাত কত?": {
    "৫ : ৩": "প্রশ্নে ক্রমটি লাল : নীল। তাই লাল বলের সংখ্যা আগে, নীল বলের সংখ্যা পরে লিখো।",
    "৩ : ৮": "অনুপাতটি লাল ও নীলের তুলনা; মোট বল ৮ নয়, তাই ৩ : ৮ নয়।"
  },
  "x + ৪ = ৯ হলে x কত?": {
    "৪": "x-এর সঙ্গে ৪ যোগ করলে ৯ হতে হবে। ৪ একা হলে ৪ + ৪ = ৮, তাই যাচাই করো।",
    "১৩": "x-কে আলাদা করতে ৯ থেকে ৪ বিয়োগ করতে হবে, যোগ নয়।"
  },
  "x − ৬ = ১১ হলে x কত?": {
    "৫": "x থেকে ৬ বিয়োগ করলে ১১ পাওয়া যায়; x-কে পেতে ১১-এর সঙ্গে ৬ যোগ করো।",
    "৬৬": "বিয়োগের বিপরীত ক্রিয়া যোগ, গুণ নয়। ১১ + ৬ পরীক্ষা করো।"
  },
  "একটি খাতা ১২ টাকা হলে ৩টি খাতার দাম কত?": {
    "১৫ টাকা": "১২ টাকা প্রতি খাতার দাম; মোটের জন্য ১২-কে ৩ বার যোগ করো বা ১২ × ৩ করো।",
    "২৪ টাকা": "দুটি খাতার দাম ২৪ টাকা; এখানে তিনটি খাতা আছে।"
  },
  "২x + ৪ = ১০ হলে x কত?": {
    "২": "আগে দুই পাশ থেকে ৪ বিয়োগ করো, তারপর ২ দিয়ে ভাগ করো।",
    "৭": "সমীকরণে ৪-কে সরিয়ে x-এর সহগ ২ দিয়ে ভাগ করতে হবে; শুধু ১০ থেকে ৩ নয়।"
  },
  "কোন আকারের ৩টি বাহু আছে?": {
    "বৃত্ত": "বৃত্তের সরল বাহু ও শীর্ষবিন্দু নেই; তিনটি সরল বাহু মিলে ত্রিভুজ তৈরি হয়।",
    "বর্গ": "বর্গের ৪টি বাহু; ৩টি বাহু থাকা আকারটি খুঁজো।"
  },
  "দৈর্ঘ্য ৬ সেমি ও প্রস্থ ২ সেমি হলে ক্ষেত্রফল কত?": {
    "৮ বর্গ সেমি": "৬ + ২ যোগ করলে পরিসীমার অংশ পাওয়া যায়; ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ।",
    "১৬ বর্গ সেমি": "ক্ষেত্রফল ৬ × ২; দৈর্ঘ্য ও প্রস্থ দুটিকে যোগ করে আবার গুণ করতে হবে না।"
  },
  "সমকোণ কত ডিগ্রি?": {
    "৪৫°": "৪৫° সূক্ষ্মকোণ; সমকোণের মাপ ৯০°।",
    "১৮০°": "১৮০° সরলকোণ; সমকোণ তার অর্ধেক, অর্থাৎ ৯০°।"
  },
  "২ মিটার কত সেন্টিমিটার?": {
    "২০ সেমি": "১ মিটার = ১০০ সেন্টিমিটার, তাই ২ দিয়ে ১০০ গুণ করো।",
    "২,০০০ সেমি": "মিটারে ১,০০০ নয়, ১০০ সেন্টিমিটার থাকে। ২ × ১০০ হিসাব করো।"
  },
  "একটি ত্রিভুজের দুটি কোণ ৫০° ও ৬০°। তৃতীয় কোণ কত?": {
    "৬০°": "প্রথম দুটি কোণ ১১০°। তিন কোণের যোগ ১৮০° হওয়ায় অবশিষ্ট কোণটি বের করো।",
    "৮০°": "৫০° + ৬০° = ১১০°; ১৮০° থেকে ১১০° বিয়োগ করতে হবে।"
  }
}

const applicationQuestions: Record<string, LessonAssessmentQuestion> = {
  'place-value': { id: 'place-value-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '৪,০৬,০২১ সংখ্যায় ৬-এর স্থানীয় মান কত? উত্তরটি নিজে লিখো।', options: undefined, answer: '৬,০০০', acceptableAnswers: ['৬০০০'], explanation: '৬ হাজারের ঘরে আছে, তাই স্থানীয় মান ৬ × ১,০০০ = ৬,০০০।' },
  'number-line': { id: 'number-line-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '−৫ থেকে সংখ্যারেখায় ডানে ৮ ধাপ গেলে কোন সংখ্যায় পৌঁছাবে?', answer: '৩', explanation: '−৫ থেকে ডানে ৫ ধাপ গেলে শূন্য, তারপর আরও ৩ ধাপে ৩। তাই −৫ + ৮ = ৩।' },
  'operations': { id: 'operations-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '৫৬টি আম ৭ জনের মধ্যে সমান ভাগে দিলে প্রত্যেকে কয়টি আম পাবে?', answer: '৮', acceptableAnswers: ['৮টি'], explanation: 'সমান ভাগ করতে ভাগ ব্যবহার করি: ৫৬ ÷ ৭ = ৮টি আম।' },
  'multiplication-groups': { id: 'multiplication-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '৮টি দলে প্রতিটিতে ৭টি করে পেন্সিল থাকলে মোট পেন্সিল কতটি?', answer: '৫৬', acceptableAnswers: ['৫৬টি'], explanation: 'দলের সংখ্যা × প্রতি দলে পেন্সিল = ৮ × ৭ = ৫৬টি।' },
  'factors-multiples': { id: 'factors-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '৯-এর ষষ্ঠ ধনাত্মক গুণিতক কত?', answer: '৫৪', explanation: 'ধনাত্মক গুণিতকগুলো হলো ৯, ১৮, ২৭, ৩৬, ৪৫, ৫৪। ষষ্ঠটি ৫৪।' },
  'negative-numbers': { id: 'negative-transfer', type: 'short-answer', responsePurpose: 'application', prompt: 'তাপমাত্রা ২°C থেকে ৭°C কমে গেলে নতুন তাপমাত্রা কত হবে?', answer: '−৫', acceptableAnswers: ['−৫°', '-5'], explanation: '২ থেকে ৭ বিয়োগ করলে ২ − ৭ = −৫°C। শূন্যের নিচে নামলে ঋণাত্মক চিহ্ন থাকে।' },
  'order-of-operations': { id: 'order-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '২৪ ÷ ৬ × ২ হিসাবটি সঠিক ক্রমে করে উত্তর লিখো।', answer: '৮', explanation: 'ভাগ ও গুণ একই স্তরের ক্রিয়া, তাই বাম দিক থেকে: ২৪ ÷ ৬ = ৪, তারপর ৪ × ২ = ৮।' },
  'hcf-lcm': { id: 'hcf-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '১২ ও ৩০-এর গ.সা.গু. কত?', answer: '৬', explanation: '১২ ও ৩০-এর সাধারণ গুণনীয়ক ১, ২, ৩, ৬; এদের মধ্যে সবচেয়ে বড় ৬।' },
  'averages': { id: 'average-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '৫, ৭, ৯ ও ১১-এর গড় কত?', answer: '৮', explanation: 'যোগফল ৫ + ৭ + ৯ + ১১ = ৩২। চারটি সংখ্যা, তাই গড় ৩২ ÷ ৪ = ৮।' },
  'fraction-basics': { id: 'fraction-basics-transfer', type: 'short-answer', responsePurpose: 'application', prompt: 'একটি পিৎজা ৯টি সমান ভাগে কাটা হয়েছে। ৪টি ভাগ নেওয়া হলে ভগ্নাংশটি লেখো।', answer: '৪/৯', acceptableAnswers: ['৪/৯', '4/9'], explanation: 'মোট সমান ভাগ ৯, তাই হর ৯; নেওয়া ভাগ ৪, তাই লব ৪। ভগ্নাংশ ৪/৯।' },
  'equivalent-fractions': { id: 'equivalent-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '৮/১২ ভগ্নাংশটি সরলতম আকারে লেখো।', answer: '২/৩', acceptableAnswers: ['২/৩', '2/3'], explanation: 'লব ও হর দুটিকে ৪ দিয়ে ভাগ করি: ৮/১২ = ২/৩।' },
  'fraction-practice': { id: 'fraction-practice-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '১২টি সমান ঘরের মধ্যে ৫টি রঙ করা। রঙ করা অংশের ভগ্নাংশ লেখো।', answer: '৫/১২', acceptableAnswers: ['৫/১২', '5/12'], explanation: 'মোট সমান ঘর ১২টি, রঙ করা ৫টি; তাই ভগ্নাংশ ৫/১২।' },
  'decimals': { id: 'decimals-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '০.৭৫-কে সরলতম ভগ্নাংশে লেখো।', answer: '৩/৪', acceptableAnswers: ['৩/৪', '3/4'], explanation: '০.৭৫ = ৭৫/১০০। লব ও হরকে ২৫ দিয়ে ভাগ করলে ৩/৪।' },
  'percentages': { id: 'percent-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '১৮০-এর ১৫% কত?', answer: '২৭', explanation: '১০% = ১৮ এবং ৫% = ৯। তাই ১৫% = ১৮ + ৯ = ২৭।' },
  'fraction-addition': { id: 'fraction-addition-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '৩/৮ + ২/৮ = কত? সরলতম ভগ্নাংশে উত্তর দাও।', answer: '৫/৮', acceptableAnswers: ['৫/৮', '5/8'], explanation: 'হর একই, তাই লব যোগ করি: (৩ + ২)/৮ = ৫/৮।' },
  'decimal-operations': { id: 'decimal-operation-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '৬.০০ − ২.৭৫ = কত?', answer: '৩.২৫', acceptableAnswers: ['৩.২৫', '3.25'], explanation: 'দশমিক বিন্দু মিলিয়ে ৬.০০ − ২.৭৫ = ৩.২৫।' },
  'fraction-multiply-divide': { id: 'fraction-multiply-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '২/৩ × ৩/৪ = কত? সরলতম ভগ্নাংশে উত্তর দাও।', answer: '১/২', acceptableAnswers: ['১/২', '1/2', '২/৪', '2/4'], explanation: '(২×৩)/(৩×৪) = ৬/১২ = ১/২।' },
  'rounding-decimals': { id: 'rounding-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '৭.৮৬-কে এক ঘর দশমিক পর্যন্ত পূর্ণ করো।', answer: '৭.৯', acceptableAnswers: ['৭.৯', '7.9'], explanation: 'লক্ষ্য দশমাংশের পরের অঙ্ক ৬, যা ৫ বা বেশি; তাই ৭.৮ থেকে এক ধাপ বাড়িয়ে ৭.৯।' },
  'ratio': { id: 'ratio-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '৪:৬ অনুপাতটি সরলতম আকারে লেখো।', answer: '২:৩', acceptableAnswers: ['২:৩', '2:3', '২:৩'], explanation: 'উভয় অংশকে ২ দিয়ে ভাগ করলে ৪:৬ = ২:৩।' },
  'variables': { id: 'variables-transfer', type: 'short-answer', responsePurpose: 'application', prompt: 'x = ৬ হলে ৩x − ২-এর মান কত?', answer: '১৬', explanation: 'x-এর জায়গায় ৬ বসাও: ৩ × ৬ − ২ = ১৮ − ২ = ১৬।' },
  'linear-equations': { id: 'linear-transfer', type: 'short-answer', responsePurpose: 'application', prompt: 'x + ৮ = ২১ হলে x-এর মান কত?', answer: '১৩', explanation: 'দুই পাশ থেকে ৮ বিয়োগ করি: x = ২১ − ৮ = ১৩। যাচাই: ১৩ + ৮ = ২১।' },
  'proportion': { id: 'proportion-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '৫টি খাতার দাম ৭৫ টাকা হলে একই দরে ৭টি খাতার দাম কত টাকা?', answer: '১০৫', acceptableAnswers: ['১০৫', '১০৫ টাকা'], explanation: 'একটি খাতার দাম ৭৫ ÷ ৫ = ১৫ টাকা। সাতটির দাম ১৫ × ৭ = ১০৫ টাকা।' },
  'two-step-equations': { id: 'two-step-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '৩x + ৪ = ১৯ হলে x-এর মান কত?', answer: '৫', explanation: 'দুই পাশ থেকে ৪ বিয়োগ করলে ৩x = ১৫; এরপর ৩ দিয়ে ভাগ করলে x = ৫।' },
  'shapes': { id: 'shapes-transfer', type: 'short-answer', responsePurpose: 'application', prompt: 'একটি পঞ্চভুজের কয়টি বাহু থাকে? সংখ্যা লিখো।', answer: '৫', acceptableAnswers: ['৫টি'], explanation: 'পঞ্চভুজের নামেই পাঁচ বোঝায়; এর ৫টি বাহু ও ৫টি শীর্ষবিন্দু থাকে।' },
  'perimeter-area': { id: 'perimeter-transfer', type: 'short-answer', responsePurpose: 'application', prompt: 'দৈর্ঘ্য ৯ সেমি ও প্রস্থ ৪ সেমি আয়তক্ষেত্রের পরিসীমা কত সেমি?', answer: '২৬', acceptableAnswers: ['২৬ সেমি', '২৬'], explanation: 'পরিসীমা = ২ × (দৈর্ঘ্য + প্রস্থ) = ২ × (৯ + ৪) = ২৬ সেমি।' },
  'angles': { id: 'angles-transfer', type: 'short-answer', responsePurpose: 'application', prompt: 'একটি সরলকোণে ১২৫° অংশ আছে। সরলকোণের বাকি অংশ কত ডিগ্রি?', answer: '৫৫', acceptableAnswers: ['৫৫°', '৫৫'], explanation: '১৮০° − ১২৫° = ৫৫°। দুটি কোণের যোগ ১৮০°।' },
  'unit-conversion': { id: 'unit-transfer', type: 'short-answer', responsePurpose: 'application', prompt: '২.৪ মিটার কত সেন্টিমিটার?', answer: '২৪০', acceptableAnswers: ['২৪০ সেমি', '২৪০'], explanation: '১ মিটার = ১০০ সেমি; তাই ২.৪ × ১০০ = ২৪০ সেমি।' },
  'triangles': { id: 'triangle-transfer', type: 'short-answer', responsePurpose: 'application', prompt: 'একটি ত্রিভুজের দুটি কোণ ৩৫° ও ৮৫°। তৃতীয় কোণ কত ডিগ্রি?', answer: '৬০', acceptableAnswers: ['৬০°', '৬০'], explanation: 'তিন কোণের যোগ ১৮০°; ১৮০° − ৩৫° − ৮৫° = ৬০°।' },
}

export function normalizeLessonAnswer(value: string): string {
  const latinDigits = value.replace(/[০-৯]/g, (digit) => String('০১২৩৪৫৬৭৮৯'.indexOf(digit)))
  return latinDigits.toLocaleLowerCase()
    .replace(/কিলোমিটার|সেন্টিমিটার|কিলোগ্রাম|ডিগ্রি|সেমি|মিটার|গ্রাম|কেজি|টাকা|জন|টি|মি|কিমি|°/g, '')
    .replace(/[\s,٬]/g, '')
    .replace(/[−–]/g, '-')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
}

function answerNumericValue(value: string): number | undefined {
  const normalized = normalizeLessonAnswer(value)
  if (/^[+-]?\d+\/[+-]?\d+$/.test(normalized)) {
    const parts = normalized.split('/')
    const denominator = Number(parts[1])
    if (!denominator) return undefined
    return Number(parts[0]) / denominator
  }
  if (/^[+-]?\d+(?:\.\d+)?$/.test(normalized)) return Number(normalized)
  return undefined
}

function equivalentMathAnswer(expected: string, response: string): boolean {
  const left = normalizeLessonAnswer(expected)
  const right = normalizeLessonAnswer(response)
  if (left === right) return true
  if (left.includes(':') || right.includes(':')) {
    const leftRatio = left.match(/^([+-]?\d+):([+-]?\d+)$/)
    const rightRatio = right.match(/^([+-]?\d+):([+-]?\d+)$/)
    if (!leftRatio || !rightRatio || Number(leftRatio[2]) === 0 || Number(rightRatio[2]) === 0) return false
    return Number(leftRatio[1]) * Number(rightRatio[2]) === Number(rightRatio[1]) * Number(leftRatio[2])
  }
  const a = answerNumericValue(left)
  const b = answerNumericValue(right)
  return a !== undefined && b !== undefined && Math.abs(a - b) < 1e-9
}

export function isLessonAnswerCorrect(question: LessonAssessmentQuestion, response: string): boolean {
  if (question.type === 'short-answer') {
    const accepted = question.acceptableAnswers ?? [question.answer]
    return accepted.some((answer) => equivalentMathAnswer(answer, response))
  }
  return question.answer === response
}

export function getLessonAnswerFeedback(question: LessonAssessmentQuestion, response: string): string | undefined {
  if (isLessonAnswerCorrect(question, response)) return undefined
  if (question.type === 'choice') {
    const tailored = question.distractorFeedback?.[response] ?? question.distractorFeedback?.[normalizeLessonAnswer(response)]
    if (tailored) return tailored
    return 'তুমি “' + response + '” বিকল্পটি বেছেছ। এই প্রশ্নে সেটি সঠিক নয়; সঠিক উত্তর “' + question.answer + '”। ব্যাখ্যাটি পড়ে দুই উত্তরের পার্থক্য মিলিয়ে দেখো।'
  }
  if (question.type === 'short-answer') return 'তুমি লিখেছ “' + response + '”। সংখ্যার মান, চিহ্ন ও একক আবার মিলিয়ে দেখো।'
  return undefined
}
function attachReasoningCheck(question: LessonAssessmentQuestion, lessonId: string): LessonAssessmentQuestion {
  if (question.type !== 'short-answer') return question
  const note = lessonTeachingNotes[lessonId]
  const lesson = lessonContent[lessonId]
  const distractors = [note?.commonError, lesson?.mistake].filter(
    (option): option is string => option !== undefined && option.trim().length > 0 && option.trim() !== question.explanation.trim(),
  )
  const options = Array.from(new Set([question.explanation, ...distractors]))
  for (const fallback of [
    'হিসাবের ধাপ না দেখে শুধু অনুমান করে উত্তর বেছে নাও।',
    'প্রশ্নে দেওয়া তথ্য ও চিহ্ন না মিলিয়ে উত্তর লেখো।',
  ]) {
    if (options.length >= 3) break
    if (!options.includes(fallback)) options.push(fallback)
  }
  return {
    ...question,
    reasoningPrompt: 'উত্তরের পক্ষে কোন ব্যাখ্যাটি সঠিক? একটি বেছে নাও।',
    reasoningOptions: options.slice(0, 3),
    reasoningAnswer: question.explanation,
  }
}
export function getLessonAssessment(lessonId: string, base: BaseQuestion, reviewVariant = 0): LessonAssessmentQuestion[] {
  const byId = new Map<string, LessonAssessmentQuestion>(
    practiceQuestions.map((q) => [q.id, {
      id: q.id,
      type: 'choice',
      prompt: q.prompt,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation,
      distractorFeedback: distractorFeedbackByPrompt[q.prompt],
    }]),
  )
  for (const question of extraQuestions) byId.set(question.id, { ...question, type: 'choice', distractorFeedback: question.distractorFeedback ?? distractorFeedbackByPrompt[question.prompt] })

  const mappedIds = questionIdsByLesson[lessonId] ?? []
  const shift = mappedIds.length ? ((Math.trunc(reviewVariant) % mappedIds.length) + mappedIds.length) % mappedIds.length : 0
  const rotatedIds = [...mappedIds.slice(shift), ...mappedIds.slice(0, shift)]
  const selected = rotatedIds.map((id) => byId.get(id)).filter((q): q is LessonAssessmentQuestion => Boolean(q))
  const seen = new Set([base.question])
  const unique = selected.filter((question) => {
    if (seen.has(question.prompt)) return false
    seen.add(question.prompt)
    return true
  }).slice(0, 3)

  if (unique.length < 3) {
    const topicByLesson: Record<string, string> = {
      'place-value': 'numbers', 'number-line': 'numbers', 'negative-numbers': 'numbers',
      'operations': 'arithmetic', 'multiplication-groups': 'arithmetic', 'factors-multiples': 'arithmetic',
      'order-of-operations': 'arithmetic', 'hcf-lcm': 'arithmetic', 'averages': 'arithmetic',
      'fraction-basics': 'fractions', 'equivalent-fractions': 'fractions', 'fraction-practice': 'fractions',
      'fraction-addition': 'fractions', 'fraction-multiply-divide': 'fractions',
      'decimals': 'decimals', 'decimal-operations': 'decimals', 'rounding-decimals': 'decimals',
      'percentages': 'percentages', 'ratio': 'ratio', 'proportion': 'ratio',
      'variables': 'algebra', 'linear-equations': 'algebra', 'two-step-equations': 'algebra',
      'shapes': 'geometry', 'perimeter-area': 'geometry', 'angles': 'geometry', 'unit-conversion': 'geometry', 'triangles': 'geometry',
    }
    const topic = topicByLesson[lessonId]
    for (const q of practiceQuestions) {
      if (unique.length >= 3) break
      if (q.topic !== topic || seen.has(q.prompt)) continue
      seen.add(q.prompt)
      unique.push({ id: q.id, prompt: q.prompt, options: q.options, answer: q.answer, explanation: q.explanation })
    }
  }

  const core: LessonAssessmentQuestion = { id: `${lessonId}-core`, type: 'choice', prompt: base.question, options: base.options, answer: base.answer, explanation: base.explanation, distractorFeedback: distractorFeedbackByPrompt[base.question] }
  const reviewTopics: Record<string, string> = {
    'place-value': 'numbers', 'number-line': 'numbers', 'negative-numbers': 'numbers',
    'operations': 'arithmetic', 'multiplication-groups': 'arithmetic', 'factors-multiples': 'arithmetic',
    'order-of-operations': 'arithmetic', 'hcf-lcm': 'arithmetic', 'averages': 'arithmetic',
    'fraction-basics': 'fractions', 'equivalent-fractions': 'fractions', 'fraction-practice': 'fractions',
    'fraction-addition': 'fractions', 'fraction-multiply-divide': 'fractions',
    'decimals': 'decimals', 'decimal-operations': 'decimals', 'rounding-decimals': 'decimals',
    'percentages': 'percentages', 'ratio': 'ratio', 'proportion': 'ratio',
    'variables': 'algebra', 'linear-equations': 'algebra', 'two-step-equations': 'algebra',
    'shapes': 'geometry', 'perimeter-area': 'geometry', 'angles': 'geometry', 'unit-conversion': 'geometry', 'triangles': 'geometry',
  }
  const constructedResponse = reviewVariant > 0 ? (() => {
    const topic = reviewTopics[lessonId]
    const usedIds = new Set([...mappedIds, ...unique.map((question) => question.id)])
    const usedPrompts = new Set([base.question, ...unique.map((question) => question.prompt)])
    const candidates = practiceQuestions.filter((question) =>
      question.topic === topic && !usedIds.has(question.id) && !usedPrompts.has(question.prompt),
    )
    if (candidates.length === 0) return applicationQuestions[lessonId]
    const candidate = candidates[(Math.trunc(reviewVariant) - 1) % candidates.length]
    return {
      id: lessonId + '-review-application-' + reviewVariant,
      type: 'short-answer' as const,
      responsePurpose: 'application' as const,
      prompt: 'বিকল্প না দেখে উত্তর লিখো: ' + candidate.prompt,
      answer: candidate.answer,
      acceptableAnswers: [candidate.answer],
      explanation: candidate.explanation,
    }
  })() : applicationQuestions[lessonId]
  const note = lessonTeachingNotes[lessonId]
  const orderedSteps: LessonAssessmentQuestion | undefined = note ? {
    id: lessonId + '-order-steps',
    type: 'ordered-steps',
    prompt: 'সমাধানের ধাপগুলো সঠিক ক্রমে সাজাও। উপরে/নিচে বোতাম ব্যবহার করো।',
    steps: (() => {
      const reversed = [...note.workedSteps].reverse()
      const offset = reversed.length ? Math.trunc(reviewVariant) % reversed.length : 0
      return [...reversed.slice(offset), ...reversed.slice(0, offset)]
    })(),
    correctOrder: [...note.workedSteps],
    answer: [...note.workedSteps].join('|'),
    explanation: 'সমাধানের ধাপ সাজানোর সময় আগের ধাপের ফল পরের ধাপে ব্যবহার হয়। সঠিক ক্রমে সাজিয়ে প্রতিটি ধাপের কারণও বোঝার চেষ্টা করো.',
  } : undefined
  const scoredApplication = constructedResponse ? attachReasoningCheck(constructedResponse, lessonId) : undefined
  return [core, ...unique, ...(scoredApplication ? [scoredApplication] : []), ...(orderedSteps ? [orderedSteps] : [])]
}
