import { practiceQuestions } from './expandedQuestions'

export type LessonAssessmentQuestion = {
  id: string
  prompt: string
  options: readonly string[]
  answer: string
  explanation: string
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

export function getLessonAssessment(lessonId: string, base: BaseQuestion): LessonAssessmentQuestion[] {
  const byId = new Map<string, LessonAssessmentQuestion>(
    practiceQuestions.map((q) => [q.id, {
      id: q.id,
      prompt: q.prompt,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation,
    }]),
  )
  for (const question of extraQuestions) byId.set(question.id, question)

  const selected = (questionIdsByLesson[lessonId] ?? []).map((id) => byId.get(id)).filter((q): q is LessonAssessmentQuestion => Boolean(q))
  const seen = new Set([base.question])
  const unique = selected.filter((question) => {
    if (seen.has(question.prompt)) return false
    seen.add(question.prompt)
    return true
  }).slice(0, 4)

  if (unique.length < 4) {
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
      if (unique.length >= 4) break
      if (q.topic !== topic || seen.has(q.prompt)) continue
      seen.add(q.prompt)
      unique.push({ id: q.id, prompt: q.prompt, options: q.options, answer: q.answer, explanation: q.explanation })
    }
  }

  return [{ id: `${lessonId}-core`, prompt: base.question, options: base.options, answer: base.answer, explanation: base.explanation }, ...unique]
}
