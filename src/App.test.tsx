import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import App from './App'

afterEach(() => cleanup())
beforeEach(() => localStorage.clear())

describe('Easy Math learning flow', () => {
  it('renders the Bengali dashboard and learning paths', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /হ্যালো, শিক্ষার্থী/ })).toBeInTheDocument()
    expect(screen.getByText('শেখার পথ')).toBeInTheDocument()
    expect(screen.getByText('ভগ্নাংশ, দশমিক ও শতকরা')).toBeInTheDocument()
  })

  it('opens the fraction lesson and records completion locally', async () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /শেখা শুরু করো/ }))
    expect(screen.getByRole('heading', { name: 'ভগ্নাংশের শুরু' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /পাঠ শেষ করো/ }))
    expect(screen.getByText(/তুমি এই পাঠটি সম্পন্ন করেছ/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('easy-math-progress-v1') || '{}').completedLessons).toContain('fraction-basics')
  })

  it('checks a practice answer and explains the result', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'অনুশীলন' })[0])
    fireEvent.click(screen.getByRole('button', { name: /১\/২/ }))
    fireEvent.click(screen.getByRole('button', { name: /উত্তর যাচাই/ }))
    expect(screen.getByText('সঠিক উত্তর!')).toBeInTheDocument()
    expect(screen.getByText(/মোট ২টি সমান অংশের মধ্যে ১টি অংশ/)).toBeInTheDocument()
  })

  it('offers a five-question daily challenge and topic-filtered practice', () => {
    render(<App />)
    fireEvent.click(screen.getAllByRole('button', { name: 'অনুশীলন' })[0])
    fireEvent.click(screen.getByRole('button', { name: /দৈনিক চ্যালেঞ্জ/ }))
    expect(screen.getByText('1 / 5টি প্রশ্ন')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('বিষয় বেছে নাও'), { target: { value: 'decimals' } })
    expect(screen.getByText(/৩\.৪ \+ ০\.৬ = কত\?/)).toBeInTheDocument()
    expect(screen.getByText('1 / 3টি প্রশ্ন')).toBeInTheDocument()
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

})
