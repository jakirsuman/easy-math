const bengaliDigits: Record<string, string> = {
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
  '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
}

export function normalizeNumerals(value: string): string {
  return value.replace(/[০-৯]/g, (digit) => bengaliDigits[digit] ?? digit)
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim()
}

type Rational = { numerator: bigint; denominator: bigint }

function parseRational(value: string): Rational | null {
  const normalized = normalizeNumerals(value).replace(/,/g, '').replace(/\s+/g, '')
  if (!normalized) return null

  const fraction = normalized.match(/^([+-]?\d+)\/([+-]?\d+)$/)
  if (fraction) {
    const numerator = BigInt(fraction[1])
    const denominator = BigInt(fraction[2])
    if (denominator === 0n) return null
    return denominator < 0n
      ? { numerator: -numerator, denominator: -denominator }
      : { numerator, denominator }
  }

  const decimal = normalized.match(/^([+-]?)(\d*)(?:\.(\d+))?$/)
  if (!decimal || (!decimal[2] && !decimal[3])) return null
  const sign = decimal[1] === '-' ? -1n : 1n
  const whole = decimal[2] || '0'
  const fractional = decimal[3] || ''
  const denominator = 10n ** BigInt(fractional.length)
  const numerator = sign * (BigInt(whole) * denominator + BigInt(fractional || '0'))
  return { numerator, denominator }
}

/** Exact numeric comparison for integer, decimal, and fraction input. */
export function areEquivalentFractions(input: string, numerator: number, denominator: number): boolean {
  if (!Number.isInteger(numerator) || !Number.isInteger(denominator) || denominator === 0) return false
  const actual = parseRational(input)
  if (!actual) return false
  return actual.numerator * BigInt(denominator) === BigInt(numerator) * actual.denominator
}

export function isValidFractionInput(input: string): boolean {
  return parseRational(input) !== null
}
