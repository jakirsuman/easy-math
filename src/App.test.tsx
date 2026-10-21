import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import { learningPaths } from './data/curriculum'
import { lessonContent } from './data/lessonContent'
import { practiceQuestions } from './data/expandedQuestions'
import { getLessonAssessment } from './data/lessonAssessment'
import { lessonTeachingNotes } from './data/lessonTeachingNotes'

afterEach(() => cleanup())
beforeEach(() => localStorage.clear())

describe('Easy Math learning flow', () => {
  it('renders the Bengali dashboard and learning paths', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /হ্যালো, শিক্ষার্থী/ })).toBeInTheDocument()
    expect(screen.getByText('শেখার পথ')).toBeInTheDocument()
    expect(screen.getByText('ভগ্নাংশ, দশমিক ও শতকরা')).toBeInTheDocument()
  })

  it('requires mastery-check success before recording fraction lesson completion', async () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /শেখা শুরু করো/ }))
    expect(screen.getByRole('heading', { name: 'ভগ্নাংশের শুরু' })).toBeInTheDocument()
    const quickCheckOptions = Array.from(document.querySelectorAll('.discovery-options button'))
    fireEvent.click(quickCheckOptions.find((button) => button.textContent?.trim() === '৩/৪')!)
    fireEvent.click(screen.getByRole('button', { name: /উত্তর মিলিয়ে দেখি/ }))
    expect(screen.getByText(/ঠিক ধরেছ/)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /পাঠ শেষ করো/ })).not.toBeInTheDocument()
    const assessment = getLessonAssessment('fraction-basics', lessonContent['fraction-basics'])
    for (let index = 0; index < assessment.length; index += 1) {
      const question = assessment[index]
      const options = Array.from(document.querySelectorAll('.workshop-question .workshop-options button'))
      const correct = options.find((button) => button.textContent?.trim() === question.answer)
      expect(correct, question.id).toBeDefined()
      fireEvent.click(correct!)
      fireEvent.click(screen.getByRole('button', { name: /উত্তর যাচাই করি/ }))
      fireEvent.click(screen.getByRole('button', { name: index === assessment.length - 1 ? /ফলাফল দেখো/ : /পরের প্রশ্ন/ }))
    }
    expect(screen.getByText('পাঠের প্রাথমিক দক্ষতা যাচাই পাস')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /পাঠ শেষ করো/ }))
    expect(screen.getByText(/এই পাঠ আগেই শেষ করেছ/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('easy-math-progress-v1') || '{}').completedLessons).toContain('fraction-basics')
  })

  it('checks a practice answer and explains the result', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'অনুশীলন' })[0])
    fireEvent.click(screen.getByRole('button', { name: /১\/২/ }))
    fireEvent.click(screen.getByRole('button', { name: /উত্তর যাচাই/ }))
    expect(screen.getByText(/সঠিক উত্তর/)).toBeInTheDocument()
    expect(screen.getByText(/মোট ২টি সমান অংশের মধ্যে ১টি অংশ/)).toBeInTheDocument()
  })

  it('offers a five-question daily challenge and topic-filtered practice', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'অনুশীলন' })[0])
    fireEvent.click(screen.getByRole('button', { name: /দৈনিক চ্যালেঞ্জ/ }))
    expect(screen.getByText(/1 \/ 5টি প্রশ্ন/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /মিশ্র অনুশীলন/ }))
    fireEvent.change(screen.getByLabelText('বিষয় বেছে নাও'), { target: { value: 'decimals' } })
    expect(screen.getByText(/০\.৫-এর ভগ্নাংশ রূপ/)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`1 \\/ ${practiceQuestions.filter((item) => item.topic === 'decimals').length}টি প্রশ্ন`))).toBeInTheDocument()
  })

  it('shows a results summary after a daily challenge is completed', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'অনুশীলন' })[0])
    fireEvent.click(screen.getByRole('button', { name: /দৈনিক চ্যালেঞ্জ/ }))
    for (let i = 0; i < 5; i += 1) {
      fireEvent.click(screen.getAllByRole('button', { name: /^[ABC] / })[0])
      fireEvent.click(screen.getByRole('button', { name: /উত্তর যাচাই/ }))
      fireEvent.click(screen.getByRole('button', { name: i === 4 ? /ফলাফল দেখো/ : /পরের প্রশ্ন/ }))
    }
    expect(screen.getByText('আজকের চ্যালেঞ্জ সম্পন্ন')).toBeInTheDocument()
    expect(screen.getByText('নির্ভুলতা')).toBeInTheDocument()
  })


  it('opens the new decimal lesson and checks understanding with feedback', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'শিখি' })[0])
    fireEvent.click(screen.getByRole('button', { name: '১০–১১ বছর' }))
    fireEvent.click(screen.getByRole('button', { name: 'দশমিক সংখ্যা খুলুন' }))
    expect(screen.getByRole('heading', { name: 'দশমিক সংখ্যা' })).toBeInTheDocument()
    expect(screen.getByText(/দশমিক সংখ্যা দিয়ে পুরো জিনিসের সঙ্গে তার ছোট অংশও দেখানো যায়/)).toBeInTheDocument()
    expect(screen.getByLabelText('এককের ঘর')).toBeInTheDocument()
    expect(screen.getByLabelText('দশমাংশের ঘর')).toBeInTheDocument()
    expect(screen.getByLabelText('শতাংশের ঘর')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '০.৮৫' }))
    fireEvent.click(screen.getByRole('button', { name: /উত্তর যাচাই/ }))
    expect(screen.getByText(/সঠিক উত্তর/)).toBeInTheDocument()
    expect(screen.getByText(/০\.৬০ \+ ০\.২৫ = ০\.৮৫/)).toBeInTheDocument()
  })

  it('makes the added factors, fraction operations, proportion and angles lessons available', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'শিখি' })[0])
    fireEvent.click(screen.getByRole('button', { name: 'সব বয়সের পাঠ' }))
    expect(screen.getByRole('button', { name: 'গুণনীয়ক ও গুণিতক খুলুন' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ভগ্নাংশের যোগ ও বিয়োগ খুলুন' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'সমানুপাত ও একক দর খুলুন' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'কোণ ও ডিগ্রি খুলুন' })).toBeInTheDocument()
  })


  it('provides structured Bengali content and a knowledge check for every listed lesson', () => {
    const lessons = learningPaths.flatMap((path) => path.lessons)
    expect(lessons.length).toBeGreaterThanOrEqual(27)
    for (const lesson of lessons) {
      expect(lessonContent[lesson.id], `Missing content for ${lesson.id}`).toBeDefined()
      expect(lessonContent[lesson.id].steps.length).toBeGreaterThanOrEqual(3)
      expect(lessonContent[lesson.id].takeaways.length).toBeGreaterThanOrEqual(3)
      expect(lessonContent[lesson.id].options).toContain(lessonContent[lesson.id].answer)
    }
  })


  it('expands the question bank with unique, explainable questions for every topic', () => {
    expect(practiceQuestions.length).toBeGreaterThanOrEqual(85)
    expect(new Set(practiceQuestions.map((question) => question.id)).size).toBe(practiceQuestions.length)
    const topics = ['arithmetic', 'numbers', 'fractions', 'decimals', 'percentages', 'ratio', 'algebra', 'geometry']
    for (const topic of topics) {
      expect(practiceQuestions.filter((question) => question.topic === topic).length, `Insufficient practice for ${topic}`).toBeGreaterThanOrEqual(10)
    }
    for (const question of practiceQuestions) {
      expect(question.options).toContain(question.answer)
      expect(new Set(question.options).size).toBe(question.options.length)
      expect(question.explanation.trim().length).toBeGreaterThan(15)
    }
  })

  it('provides the new foundational lessons in the learning path', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'শিখি' })[0])
    fireEvent.click(screen.getByRole('button', { name: 'সব বয়সের পাঠ' }))
    expect(screen.getByRole('button', { name: 'ধনাত্মক ও ঋণাত্মক সংখ্যা খুলুন' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'গ.সা.গু. ও ল.সা.গু. খুলুন' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'ভগ্নাংশের গুণ ও ভাগ খুলুন' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'দুই ধাপের সমীকরণ খুলুন' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'একক রূপান্তর খুলুন' })).toBeInTheDocument()
  })

  it('offers interactive algebra and geometry models in Math Lab', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'ম্যাথ ল্যাব' })[0])
    expect(screen.getByRole('heading', { name: 'সমতার দুই পাশ' })).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('সমীকরণে যোগ করা সংখ্যা'), { target: { value: '5' } })
    expect(screen.getByText('x = 11 − 5 = 6')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'আয়তক্ষেত্র এক্সপ্লোরার' })).toBeInTheDocument()
    expect(screen.getByText('32 বর্গ সেমি')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('আয়তক্ষেত্রের দৈর্ঘ্য'), { target: { value: '10' } })
    expect(screen.getByText('40 বর্গ সেমি')).toBeInTheDocument()
  })

  it('teaches place value with manipulable hundreds, tens and ones', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'শিখি' })[0])
    fireEvent.click(screen.getByRole('button', { name: 'সংখ্যার স্থানীয় মান খুলুন' }))
    expect(screen.getByText('৩০০ + ৪০ + ২')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '৪০' }))
    fireEvent.click(screen.getByRole('button', { name: /উত্তর মিলিয়ে দেখি/ }))
    expect(screen.getByText(/ঠিক ধরেছ/)).toBeInTheDocument()
    expect(screen.getByText(/৪ দশক মানে ৪টি দশ/)).toBeInTheDocument()
  })

  it('shows place values from crore through thousandths', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'শিখি' })[0])
    fireEvent.click(screen.getByRole('button', { name: 'সংখ্যার স্থানীয় মান খুলুন' }))
    for (const label of ['কোটি', 'দশ লক্ষ', 'লক্ষ', 'দশ হাজার', 'হাজার', 'শতক', 'দশক', 'একক', 'দশমাংশ', 'শতাংশ', 'সহস্রাংশ']) {
      expect(screen.getByLabelText(label)).toBeInTheDocument()
    }
    expect(screen.getByText('দশমিকের পরের স্থানীয় মান')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('কোটি'), { target: { value: '2' } })
    fireEvent.change(screen.getByLabelText('যে ঘরের মান যাচাই করবে'), { target: { value: '0' } })
    expect(screen.getByText(/কোটি ঘরে/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '২,০০,০০,০০০' })).toBeInTheDocument()
  })

  it('lets learners explore shape properties instead of only reading definitions', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'শিখি' })[0])
    fireEvent.click(screen.getByRole('button', { name: 'আকার ও বৈশিষ্ট্য খুলুন' }))
    expect(screen.getByLabelText('আকার বেছে নাও')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('আকার বেছে নাও'), { target: { value: 'square' } })
    expect(screen.getByText(/চারটি বাহু সমান/)).toBeInTheDocument()
  })

  it('lets learners choose addition or subtraction for decimal operations', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'শিখি' })[0])
    fireEvent.click(screen.getByRole('button', { name: 'সব বয়সের পাঠ' }))
    fireEvent.click(screen.getByRole('button', { name: 'দশমিকের যোগ ও বিয়োগ খুলুন' }))
    expect(screen.getByLabelText('দশমিকের ক্রিয়া')).toHaveValue('+')
    fireEvent.change(screen.getByLabelText('দশমিকের ক্রিয়া'), { target: { value: '−' } })
    expect(screen.getByText('৩.১০')).toBeInTheDocument()
    expect(screen.getAllByText('৬.৪')).toHaveLength(2)
    expect(screen.getAllByText('৩.৩')).toHaveLength(2)
  })

  it('visualizes both addends in same-denominator fraction addition', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'শিখি' })[0])
    fireEvent.click(screen.getByRole('button', { name: 'সব বয়সের পাঠ' }))
    fireEvent.click(screen.getByRole('button', { name: 'ভগ্নাংশের যোগ ও বিয়োগ খুলুন' }))
    expect(screen.getAllByText(/প্রথম ভগ্নাংশ/).length).toBeGreaterThan(0)
    expect(screen.getByText('দ্বিতীয় ভগ্নাংশ')).toBeInTheDocument()
    expect(document.querySelectorAll('.fraction-visual-row .fraction-bar')).toHaveLength(2)
  })

  it('makes percentages visible as parts of a 100-cell grid', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'শিখি' })[0])
    fireEvent.click(screen.getByRole('button', { name: '১০–১১ বছর' }))
    fireEvent.click(screen.getByRole('button', { name: 'শতকরা খুলুন' }))
    expect(screen.getByLabelText('শতকরা হার')).toBeInTheDocument()
    expect(document.querySelectorAll('.percent-grid span')).toHaveLength(100)
  })

  it('teaches multiplication as equal groups with a visual model', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'শিখি' })[0])
    fireEvent.click(screen.getByRole('button', { name: 'গুণ মানে সমান দল খুলুন' }))
    expect(screen.getByText('১২টি', { selector: 'strong' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '১২' }))
    fireEvent.click(screen.getByRole('button', { name: /উত্তর মিলিয়ে দেখি/ }))
    expect(screen.getByText(/৪টি দলে ৩টি করে/)).toBeInTheDocument()
  })

  it('provides a five-question mastery check and deeper teaching notes for every lesson', () => {
    const lessons = learningPaths.flatMap((path) => path.lessons)
    for (const lesson of lessons) {
      const content = lessonContent[lesson.id]
      expect(lessonTeachingNotes[lesson.id], `Missing deep explanation for ${lesson.id}`).toBeDefined()
      expect(lessonTeachingNotes[lesson.id].workedSteps.length, lesson.id).toBeGreaterThanOrEqual(3)
      const assessment = getLessonAssessment(lesson.id, content)
      expect(assessment.length, `Expected five assessment questions for ${lesson.id}`).toBe(5)
      expect(assessment[0].prompt).toBe(content.question)
      for (const question of assessment) {
        expect(question.options).toContain(question.answer)
        expect(new Set(question.options).size, question.id).toBe(question.options.length)
        expect(question.explanation.trim().length).toBeGreaterThan(15)
      }
    }
  })

  it('requires at least 80 percent on a multi-question checkpoint before lesson completion', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'শিখি' })[0])
    fireEvent.click(screen.getByRole('button', { name: '১০–১১ বছর' }))
    fireEvent.click(screen.getByRole('button', { name: 'দশমিক সংখ্যা খুলুন' }))
    expect(screen.getByRole('heading', { name: 'শেখা যাচাই করি' })).toBeInTheDocument()
    expect(screen.getByText(/৫টি প্রশ্নের উত্তর দাও/)).toBeInTheDocument()
    const assessment = getLessonAssessment('decimals', lessonContent.decimals)
    for (let index = 0; index < assessment.length; index += 1) {
      const question = assessment[index]
      const options = Array.from(document.querySelectorAll('.workshop-question .workshop-options button'))
      const correct = options.find((button) => button.textContent?.trim() === question.answer)
      expect(correct, question.id).toBeDefined()
      fireEvent.click(correct!)
      fireEvent.click(screen.getByRole('button', { name: /উত্তর যাচাই করি/ }))
      fireEvent.click(screen.getByRole('button', { name: index === assessment.length - 1 ? /ফলাফল দেখো/ : /পরের প্রশ্ন/ }))
    }
    expect(screen.getByText('পাঠের প্রাথমিক দক্ষতা যাচাই পাস')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /পাঠ শেষ করো/ })).toBeEnabled()
  })

  it('renders the supplied Sopan wordmark in the app navigation', () => {
    render(<App />)
    const wordmark = screen.getByRole('img', { name: 'Sopan wordmark' })
    expect(wordmark).toHaveAttribute('src', '/sopan-wordmark.svg')
    expect(screen.getByRole('button', { name: 'সহজ গণিত হোম' })).toBeInTheDocument()
  })


  it('makes the full lesson row clickable and shows age-appropriate lessons by default', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'শিখি' })[0])
    expect(screen.getByText('সংখ্যা, যোগ-বিয়োগ, ভগ্নাংশ আর পরিচিত আকার দিয়ে শুরু করো।')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'সংখ্যার স্থানীয় মান খুলুন' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'দুই ধাপের সমীকরণ খুলুন' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'সংখ্যার স্থানীয় মান খুলুন' }))
    expect(screen.getByRole('heading', { name: 'সংখ্যার স্থানীয় মান' })).toBeInTheDocument()
    expect(screen.getByText('৮–৯ বছর')).toBeInTheDocument()
  })

})