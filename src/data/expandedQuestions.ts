import { starterQuestions } from './curriculum'

/**
 * Extended Bengali-first practice bank.
 * Keep every prompt self-contained, give exactly one unambiguous answer,
 * and explain the reasoning rather than only repeating the answer.
 */
export const expandedQuestions = [
  { id: 'extra-n26', topic: 'numbers', prompt: '৩,৫০৭ সংখ্যাটিতে ৫-এর স্থানীয় মান কত?', options: ['৫', '৫০', '৫০০'], answer: '৫০০', explanation: '৫ শতকের ঘরে আছে, তাই এর স্থানীয় মান ৫ × ১০০ = ৫০০।' },
  { id: 'extra-n27', topic: 'numbers', prompt: 'কোন সংখ্যাটি বড়?', options: ['৪,০৮৯', '৪,০৯৮', '৪,০৮০'], answer: '৪,০৯৮', explanation: 'হাজার ও শতকের অঙ্ক সমান। দশকের ঘরে ৯ থাকায় ৪,০৯৮ বড়।' },
  { id: 'extra-n28', topic: 'numbers', prompt: '১,০০০-এর ঠিক আগের পূর্ণ সংখ্যা কোনটি?', options: ['৯৯৮', '৯৯৯', '১,০০১'], answer: '৯৯৯', explanation: '১,০০০ থেকে ১ বিয়োগ করলে ৯৯৯ হয়।' },
  { id: 'extra-n29', topic: 'numbers', prompt: '২, ৩ ও ৭ অঙ্ক একবার করে ব্যবহার করে সবচেয়ে ছোট তিন অঙ্কের সংখ্যা কোনটি?', options: ['২৩৭', '২৭৩', '৩২৭'], answer: '২৩৭', explanation: 'সবচেয়ে ছোট সংখ্যা পেতে সবচেয়ে ছোট অঙ্ক ২ শতকের ঘরে, তারপর ৩ ও ৭ বসে।' },
  { id: 'extra-n30', topic: 'numbers', prompt: '−৩, ০ ও ২-কে ছোট থেকে বড় সাজালে কোনটি সঠিক?', options: ['২, ০, −৩', '−৩, ০, ২', '০, −৩, ২'], answer: '−৩, ০, ২', explanation: 'সংখ্যারেখায় বাম থেকে ডানে সংখ্যা বাড়ে। ঋণাত্মক −৩, শূন্যের বামে থাকে।' },
  { id: 'extra-n31', topic: 'numbers', prompt: '−৫ + ৮ = কত?', options: ['−১৩', '৩', '১৩'], answer: '৩', explanation: '−৫ থেকে ডানে ৮ ধাপ এগোলে ৩-এ পৌঁছাই; তাই −৫ + ৮ = ৩।' },
  { id: 'extra-n32', topic: 'numbers', prompt: 'সংখ্যারেখায় ২ থেকে ৭ ঘর বাঁয়ে গেলে কোন সংখ্যায় পৌঁছাবে?', options: ['−৫', '−৪', '৯'], answer: '−৫', explanation: 'বাঁয়ে গেলে প্রতি ধাপে ১ করে কমে: ২ − ৭ = −৫।' },
  { id: 'extra-n33', topic: 'numbers', prompt: '৬,৪০৮ সংখ্যাটির বিস্তৃত রূপ কোনটি?', options: ['৬,০০০ + ৪০০ + ৮', '৬,০০০ + ৪০ + ৮', '৬০০ + ৪০ + ৮'], answer: '৬,০০০ + ৪০০ + ৮', explanation: '৬ হাজারের ঘরে, ৪ শতকের ঘরে, দশকের ঘরে ০ এবং এককের ঘরে ৮।' },

  { id: 'extra-a26', topic: 'arithmetic', prompt: '১৪৫ + ২৭৮ = কত?', options: ['৪১৩', '৪২৩', '৪৩৩'], answer: '৪২৩', explanation: '১৪৫ + ২০০ = ৩৪৫; এরপর ৭৮ যোগ করলে ৪২৩।' },
  { id: 'extra-a27', topic: 'arithmetic', prompt: '৬০০ − ২৭৫ = কত?', options: ['৩২৫', '৩৩৫', '৪২৫'], answer: '৩২৫', explanation: '৬০০ − ২০০ = ৪০০, তারপর ৭৫ বিয়োগ করলে ৩২৫।' },
  { id: 'extra-a28', topic: 'arithmetic', prompt: '২৪ × ৬ = কত?', options: ['১২৪', '১৩৪', '১৪৪'], answer: '১৪৪', explanation: '২০ × ৬ = ১২০ এবং ৪ × ৬ = ২৪; মোট ১৪৪।' },
  { id: 'extra-a29', topic: 'arithmetic', prompt: '৯৩৬ ÷ ৯ = কত?', options: ['১০৪', '১০৬', '১১৪'], answer: '১০৪', explanation: '৯ × ১০৪ = ৯৩৬, তাই ভাগফল ১০৪।' },
  { id: 'extra-a30', topic: 'arithmetic', prompt: '৩ + ৪ × ২ = কত?', options: ['১৪', '১১', '১০'], answer: '১১', explanation: 'যোগের আগে গুণ করতে হয়: ৪ × ২ = ৮, তারপর ৩ + ৮ = ১১।' },
  { id: 'extra-a31', topic: 'arithmetic', prompt: '(৩ + ৪) × ২ = কত?', options: ['১১', '১৪', '১৮'], answer: '১৪', explanation: 'প্রথমে বন্ধনীর কাজ: ৩ + ৪ = ৭; তারপর ৭ × ২ = ১৪।' },
  { id: 'extra-a32', topic: 'arithmetic', prompt: 'একটি বাক্সে ১২টি পেন্সিল। এমন ৭টি বাক্সে মোট কতটি পেন্সিল?', options: ['৭২টি', '৮৪টি', '৯৬টি'], answer: '৮৪টি', explanation: 'প্রতি বাক্সে ১২টি, তাই ১২ × ৭ = ৮৪টি পেন্সিল।' },
  { id: 'extra-a33', topic: 'arithmetic', prompt: '৪৮টি খাতা ৬ জনের মধ্যে সমান ভাগ করলে প্রত্যেকে কয়টি পাবে?', options: ['৬টি', '৮টি', '৯টি'], answer: '৮টি', explanation: 'সমান ভাগ মানে ভাগ: ৪৮ ÷ ৬ = ৮টি খাতা।' },

  { id: 'extra-f26', topic: 'fractions', prompt: '১/৩ + ১/৩ = কত?', options: ['২/৬', '২/৩', '১/৬'], answer: '২/৩', explanation: 'হর একই, তাই লব যোগ করি: ১ + ১ = ২; হর ৩-ই থাকে।' },
  { id: 'extra-f27', topic: 'fractions', prompt: '৩/৪ − ১/৪ = কত?', options: ['২/৪', '২/৮', '৪/৪'], answer: '২/৪', explanation: 'হর একই বলে লব বিয়োগ করি: (৩ − ১)/৪ = ২/৪ = ১/২।' },
  { id: 'extra-f28', topic: 'fractions', prompt: '১২-এর ২/৩ অংশ কত?', options: ['৬', '৮', '৯'], answer: '৮', explanation: 'প্রথমে ১২ ÷ ৩ = ৪; তারপর ৪ × ২ = ৮।' },
  { id: 'extra-f29', topic: 'fractions', prompt: '১/২ × ৩/৪ = কত?', options: ['৩/৮', '৪/৬', '১/৪'], answer: '৩/৮', explanation: 'লবের সঙ্গে লব এবং হরের সঙ্গে হর গুণ করি: (১ × ৩)/(২ × ৪) = ৩/৮।' },
  { id: 'extra-f30', topic: 'fractions', prompt: '১/২ ÷ ১/৪ = কত?', options: ['১/৮', '২', '৪'], answer: '২', explanation: 'অর্ধেকের মধ্যে এক-চতুর্থাংশের ২টি অংশ থাকে। হিসাবেও ১/২ × ৪/১ = ২।' },
  { id: 'extra-f31', topic: 'fractions', prompt: 'কোনটি বড়?', options: ['৫/৮', '৩/৪', 'দুটিই সমান'], answer: '৩/৪', explanation: '৩/৪ = ৬/৮; আর ৬/৮, ৫/৮-এর চেয়ে বড়।' },
  { id: 'extra-f32', topic: 'fractions', prompt: '৬/৯ সরল করলে কোন ভগ্নাংশটি পাওয়া যায়?', options: ['২/৩', '৩/২', '১/৩'], answer: '২/৩', explanation: 'লব ও হর দুটিকে ৩ দিয়ে ভাগ করলে ৬/৯ = ২/৩।' },
  { id: 'extra-f33', topic: 'fractions', prompt: '১ পূর্ণ ২/৫-কে অপ্রকৃত ভগ্নাংশে লিখলে কত?', options: ['৫/৭', '৭/৫', '৩/৫'], answer: '৭/৫', explanation: '১ পূর্ণ = ৫/৫; এর সঙ্গে ২/৫ যোগ করলে ৭/৫ হয়।' },

  { id: 'extra-d26', topic: 'decimals', prompt: '২.৩৫ + ১.৪ = কত?', options: ['৩.৭৫', '৩.৭৯', '৪.৭৫'], answer: '৩.৭৫', explanation: 'দশমিক বিন্দু মিলিয়ে লিখি: ২.৩৫ + ১.৪০ = ৩.৭৫।' },
  { id: 'extra-d27', topic: 'decimals', prompt: '৫ − ২.৬৮ = কত?', options: ['২.২২', '২.৩২', '৩.৩২'], answer: '২.৩২', explanation: '৫.০০ − ২.৬৮ = ২.৩২। প্রয়োজনে ৫-কে ৫.০০ হিসেবে লেখো।' },
  { id: 'extra-d28', topic: 'decimals', prompt: '০.৭ × ১০ = কত?', options: ['০.০৭', '০.৭', '৭'], answer: '৭', explanation: '১০ দিয়ে গুণ করলে দশমিক বিন্দু এক ঘর ডানে সরে: ০.৭ → ৭।' },
  { id: 'extra-d29', topic: 'decimals', prompt: '৩.৬ ÷ ০.৬ = কত?', options: ['০.৬', '৬', '৬০'], answer: '৬', explanation: 'ভাজ্য ও ভাজক দুটিকে ১০ দিয়ে গুণ করলে ৩৬ ÷ ৬ = ৬।' },
  { id: 'extra-d30', topic: 'decimals', prompt: '১.২৫ সংখ্যাটিতে শতকাংশের অঙ্ক কোনটি?', options: ['১', '২', '৫'], answer: '৫', explanation: 'দশমিকের পর প্রথম অঙ্ক দশমাংশ, দ্বিতীয় অঙ্ক শতকাংশ। এখানে দ্বিতীয় অঙ্ক ৫।' },
  { id: 'extra-d31', topic: 'decimals', prompt: '৪.৬৭-কে নিকটতম দশমিকে পূর্ণ করলে কত?', options: ['৪.৬', '৪.৭', '৫.০'], answer: '৪.৭', explanation: 'শতকাংশের অঙ্ক ৭, যা ৫ বা বেশি; তাই দশমাংশ ৬ থেকে ৭ হবে।' },
  { id: 'extra-d32', topic: 'decimals', prompt: 'কোন সংখ্যাটি বড়?', options: ['০.০৯', '০.৯', 'দুটিই সমান'], answer: '০.৯', explanation: '০.৯ = ০.৯০ এবং ০.০৯ নয় শতকাংশ; ০.৯০ বড়।' },
  { id: 'extra-d33', topic: 'decimals', prompt: '১/৪-এর দশমিক রূপ কোনটি?', options: ['০.২৫', '০.৪', '০.১৪'], answer: '০.২৫', explanation: '১ ÷ ৪ = ০.২৫; অর্থাৎ এক-চতুর্থাংশ ০.২৫।' },

  { id: 'extra-p26', topic: 'percentages', prompt: '২৪০-এর ২৫% কত?', options: ['৪০', '৬০', '৮০'], answer: '৬০', explanation: '২৫% হলো এক-চতুর্থাংশ; ২৪০ ÷ ৪ = ৬০।' },
  { id: 'extra-p27', topic: 'percentages', prompt: '২০০-এর ১৫% কত?', options: ['১৫', '২৫', '৩০'], answer: '৩০', explanation: '১০% = ২০ এবং ৫% = ১০; তাই ১৫% = ২০ + ১০ = ৩০।' },
  { id: 'extra-p28', topic: 'percentages', prompt: '৫০০ টাকার পণ্যে ১০% ছাড় দিলে দাম কত থাকবে?', options: ['৪০০ টাকা', '৪৫০ টাকা', '৪৯০ টাকা'], answer: '৪৫০ টাকা', explanation: 'ছাড় = ৫০০-এর ১০% = ৫০ টাকা; পরিশোধের দাম ৫০০ − ৫০ = ৪৫০ টাকা।' },
  { id: 'extra-p29', topic: 'percentages', prompt: '২০টি প্রশ্নের মধ্যে ১৮টির উত্তর সঠিক হলে নির্ভুলতা কত?', options: ['৮০%', '৯০%', '৯৫%'], answer: '৯০%', explanation: '১৮/২০ × ১০০ = ৯০%।' },
  { id: 'extra-p30', topic: 'percentages', prompt: '৪০%-এর ভগ্নাংশ রূপ কোনটি?', options: ['২/৫', '৪/৫', '১/৪'], answer: '২/৫', explanation: '৪০% = ৪০/১০০; লব ও হর ২০ দিয়ে ভাগ করলে ২/৫।' },
  { id: 'extra-p31', topic: 'percentages', prompt: 'একটি দাম ৮০ টাকা থেকে বেড়ে ১০০ টাকা হলো। শতকরা কত বেড়েছে?', options: ['২০%', '২৫%', '৩০%'], answer: '২৫%', explanation: 'বৃদ্ধি ২০ টাকা। মূল দাম ৮০, তাই ২০/৮০ × ১০০ = ২৫%।' },
  { id: 'extra-p32', topic: 'percentages', prompt: '৫০-এর ১২% কত?', options: ['৫', '৬', '১২'], answer: '৬', explanation: '৫০ × ১২/১০০ = ৬।' },
  { id: 'extra-p33', topic: 'percentages', prompt: '১,০০০ টাকার ওপর ৫% কর হলে করের পরিমাণ কত?', options: ['৫ টাকা', '৫০ টাকা', '১০০ টাকা'], answer: '৫০ টাকা', explanation: '১,০০০ × ৫/১০০ = ৫০ টাকা।' },

  { id: 'extra-r26', topic: 'ratio', prompt: 'লাল ও নীল বলের অনুপাত ৩:৫ এবং মোট বল ৩২টি। লাল বল কয়টি?', options: ['১২টি', '১৫টি', '২০টি'], answer: '১২টি', explanation: 'মোট অংশ ৩ + ৫ = ৮; এক অংশ ৩২ ÷ ৮ = ৪; লাল বল ৩ × ৪ = ১২টি।' },
  { id: 'extra-r27', topic: 'ratio', prompt: '৫টি কলমের দাম ১০০ টাকা হলে ৮টি কলমের দাম কত?', options: ['১৪০ টাকা', '১৬০ টাকা', '১৮০ টাকা'], answer: '১৬০ টাকা', explanation: 'একটি কলম ১০০ ÷ ৫ = ২০ টাকা; ৮টি কলমের দাম ৮ × ২০ = ১৬০ টাকা।' },
  { id: 'extra-r28', topic: 'ratio', prompt: '১২:১৮ অনুপাত সরল করলে কত?', options: ['২:৩', '৩:২', '৬:৯'], answer: '২:৩', explanation: 'উভয় অংশকে ৬ দিয়ে ভাগ করলে ১২:১৮ = ২:৩।' },
  { id: 'extra-r29', topic: 'ratio', prompt: 'একটি গাড়ি ৩ ঘণ্টায় ১২০ কিমি যায়। গড় গতি কত?', options: ['৩০ কিমি/ঘণ্টা', '৪০ কিমি/ঘণ্টা', '৬০ কিমি/ঘণ্টা'], answer: '৪০ কিমি/ঘণ্টা', explanation: 'গতি = দূরত্ব ÷ সময় = ১২০ ÷ ৩ = ৪০ কিমি/ঘণ্টা।' },
  { id: 'extra-r30', topic: 'ratio', prompt: '৪:১৪ অনুপাতের সরল রূপ কোনটি?', options: ['২:৭', '৪:৭', '৭:২'], answer: '২:৭', explanation: 'উভয় অংশকে ২ দিয়ে ভাগ করলে ৪:১৪ = ২:৭।' },
  { id: 'extra-r31', topic: 'ratio', prompt: 'মানচিত্রে ১ সেমি ৫ কিমি বোঝায়। ৪ সেমি দূরত্ব বাস্তবে কত?', options: ['৯ কিমি', '২০ কিমি', '২৫ কিমি'], answer: '২০ কিমি', explanation: 'প্রতি সেমিতে ৫ কিমি, তাই ৪ × ৫ = ২০ কিমি।' },
  { id: 'extra-r32', topic: 'ratio', prompt: 'পানি ও সিরাপের অনুপাত ৩:১। মিশ্রণটি ২০ কাপ হলে সিরাপ কত কাপ?', options: ['৫ কাপ', '১০ কাপ', '১৫ কাপ'], answer: '৫ কাপ', explanation: 'মোট অংশ ৩ + ১ = ৪; এক অংশ ২০ ÷ ৪ = ৫ কাপ, আর সিরাপ ১ অংশ।' },
  { id: 'extra-r33', topic: 'ratio', prompt: 'অনুপাত ২:৩-এ প্রথম পরিমাণ ১০ হলে দ্বিতীয় পরিমাণ কত?', options: ['১২', '১৫', '২০'], answer: '১৫', explanation: '২ অংশ = ১০, তাই ১ অংশ = ৫। দ্বিতীয় পরিমাণ ৩ অংশ = ১৫।' },

  { id: 'extra-al26', topic: 'algebra', prompt: 'x − ৭ = ১২ হলে x কত?', options: ['৫', '১৯', '৮৪'], answer: '১৯', explanation: 'x-কে একা করতে দুই পাশে ৭ যোগ করি: x = ১২ + ৭ = ১৯।' },
  { id: 'extra-al27', topic: 'algebra', prompt: '৩x = ২৭ হলে x কত?', options: ['৮', '৯', '২৪'], answer: '৯', explanation: 'দুই পাশকে ৩ দিয়ে ভাগ করলে x = ২৭ ÷ ৩ = ৯।' },
  { id: 'extra-al28', topic: 'algebra', prompt: 'x ÷ ৪ = ৬ হলে x কত?', options: ['১০', '২৪', '২'], answer: '২৪', explanation: 'ভাগের বিপরীত প্রক্রিয়া গুণ: x = ৬ × ৪ = ২৪।' },
  { id: 'extra-al29', topic: 'algebra', prompt: '২x + ৩ = ১৫ হলে x কত?', options: ['৬', '৯', '১২'], answer: '৬', explanation: 'দুই পাশ থেকে ৩ বিয়োগ করলে ২x = ১২; এরপর ২ দিয়ে ভাগ করলে x = ৬।' },
  { id: 'extra-al30', topic: 'algebra', prompt: '৪y − ৮ = ১২ হলে y কত?', options: ['১', '৫', '৮'], answer: '৫', explanation: 'দুই পাশে ৮ যোগ করলে ৪y = ২০; ৪ দিয়ে ভাগ করলে y = ৫।' },
  { id: 'extra-al31', topic: 'algebra', prompt: '৩a + ২a সরল করলে কী হবে?', options: ['৫a', '৫a²', '৬a'], answer: '৫a', explanation: 'একই চলক a-এর সহগ ৩ ও ২ যোগ করি: ৩a + ২a = ৫a।' },
  { id: 'extra-al32', topic: 'algebra', prompt: 'x = ৩ হলে ২x + ৫-এর মান কত?', options: ['৮', '১১', '১৩'], answer: '১১', explanation: 'x-এর জায়গায় ৩ বসাই: ২ × ৩ + ৫ = ৬ + ৫ = ১১।' },
  { id: 'extra-al33', topic: 'algebra', prompt: 'x + y = ১০ এবং x = ৪ হলে y কত?', options: ['৪', '৬', '১৪'], answer: '৬', explanation: 'x + y = ১০ এবং x = ৪, তাই y = ১০ − ৪ = ৬।' },

  { id: 'extra-g26', topic: 'geometry', prompt: 'ত্রিভুজের দুটি কোণ ৫০° ও ৬০°। তৃতীয় কোণ কত?', options: ['৬০°', '৭০°', '৮০°'], answer: '৭০°', explanation: 'ত্রিভুজের তিন কোণের যোগ ১৮০°; ১৮০° − ৫০° − ৬০° = ৭০°।' },
  { id: 'extra-g27', topic: 'geometry', prompt: 'একটি বর্গের বাহু ৬ সেমি হলে পরিসীমা কত?', options: ['১২ সেমি', '২৪ সেমি', '৩৬ সেমি'], answer: '২৪ সেমি', explanation: 'বর্গের চারটি সমান বাহু, তাই পরিসীমা = ৪ × ৬ = ২৪ সেমি।' },
  { id: 'extra-g28', topic: 'geometry', prompt: 'দৈর্ঘ্য ৮ সেমি ও প্রস্থ ৩ সেমি আয়তক্ষেত্রের ক্ষেত্রফল কত?', options: ['১১ বর্গ সেমি', '২২ বর্গ সেমি', '২৪ বর্গ সেমি'], answer: '২৪ বর্গ সেমি', explanation: 'আয়তক্ষেত্রের ক্ষেত্রফল = দৈর্ঘ্য × প্রস্থ = ৮ × ৩ = ২৪ বর্গ সেমি।' },
  { id: 'extra-g29', topic: 'geometry', prompt: 'সমকোণের পরিমাপ কত?', options: ['৪৫°', '৯০°', '১৮০°'], answer: '৯০°', explanation: 'সমকোণ ঠিক ৯০ ডিগ্রি।' },
  { id: 'extra-g30', topic: 'geometry', prompt: 'ঘনকের কয়টি তল থাকে?', options: ['৪টি', '৬টি', '৮টি'], answer: '৬টি', explanation: 'ঘনকের ওপর, নিচ, সামনে, পেছনে, ডানে ও বাঁয়ে—মোট ৬টি বর্গাকার তল থাকে।' },
  { id: 'extra-g31', topic: 'geometry', prompt: 'সমবাহু ত্রিভুজের বৈশিষ্ট্য কোনটি?', options: ['তিনটি বাহু সমান', 'দুটি বাহু সমান', 'কোনো বাহু সমান নয়'], answer: 'তিনটি বাহু সমান', explanation: 'সমবাহু ত্রিভুজের তিনটি বাহুর দৈর্ঘ্যই সমান; প্রতিটি কোণও ৬০°।' },
  { id: 'extra-g32', topic: 'geometry', prompt: '২.৫ মিটার কত সেন্টিমিটার?', options: ['২৫ সেমি', '২৫০ সেমি', '২,৫০০ সেমি'], answer: '২৫০ সেমি', explanation: '১ মিটার = ১০০ সেমি, তাই ২.৫ × ১০০ = ২৫০ সেমি।' },
  { id: 'extra-g33', topic: 'geometry', prompt: '৩ সেমি বাহুবিশিষ্ট ঘনকের আয়তন কত?', options: ['৯ ঘন সেমি', '১৮ ঘন সেমি', '২৭ ঘন সেমি'], answer: '২৭ ঘন সেমি', explanation: 'ঘনকের আয়তন = বাহু × বাহু × বাহু = ৩ × ৩ × ৩ = ২৭ ঘন সেমি।' },
] as const

export const practiceQuestions = [...starterQuestions, ...expandedQuestions]
