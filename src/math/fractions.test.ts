import { describe, expect, it } from 'vitest'
import { areEquivalentFractions, isValidFractionInput, normalizeNumerals } from './fractions'

describe('Bengali numeral normalization', () => {
  it('converts Bengali digits to Latin digits', () => {
    expect(normalizeNumerals(' ২/৪ ')).toBe('2/4')
  })
})

describe('fraction answer validation', () => {
  it('accepts equivalent fractions exactly', () => {
    expect(areEquivalentFractions('২/৪', 1, 2)).toBe(true)
    expect(areEquivalentFractions('0.5', 1, 2)).toBe(true)
    expect(areEquivalentFractions('3/6', 1, 2)).toBe(true)
  })

  it('rejects incorrect answers and invalid denominators', () => {
    expect(areEquivalentFractions('2/3', 1, 2)).toBe(false)
    expect(areEquivalentFractions('1/0', 1, 2)).toBe(false)
    expect(areEquivalentFractions('hello', 1, 2)).toBe(false)
  })

  it('recognizes valid numeric input', () => {
    expect(isValidFractionInput('১.২৫')).toBe(true)
    expect(isValidFractionInput('2/0')).toBe(false)
  })
})
