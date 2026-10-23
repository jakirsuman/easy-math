export const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14] as const
const DAY_MS = 24 * 60 * 60 * 1000

export type SpacedReviewRecord = {
  dueAt: number
  intervalIndex: number
  completedReviews: number
  lastReviewedAt?: number
  lastScore?: number
  lastTotal?: number
}

/** The first review becomes due one day after a lesson is mastered. */
export function scheduleFirstReview(completedAt = Date.now()): SpacedReviewRecord {
  return {
    dueAt: completedAt + REVIEW_INTERVAL_DAYS[0] * DAY_MS,
    intervalIndex: 0,
    completedReviews: 0,
  }
}

/**
 * On a successful review, strong performance advances the interval. A passing
 * but imperfect score repeats the current interval to reinforce the weak recall.
 * When score/total are omitted, preserve the original advance-by-default behavior.
 */
export function advanceReviewSchedule(
  record: SpacedReviewRecord,
  reviewedAt = Date.now(),
  score?: number,
  total?: number,
): SpacedReviewRecord {
  const currentIndex = Math.max(0, Math.min(REVIEW_INTERVAL_DAYS.length - 1, Math.trunc(record.intervalIndex)))
  const perfectRecall = score === undefined || total === undefined || (total > 0 && score >= total)
  const intervalIndex = perfectRecall
    ? Math.min(currentIndex + 1, REVIEW_INTERVAL_DAYS.length - 1)
    : currentIndex
  return {
    dueAt: reviewedAt + REVIEW_INTERVAL_DAYS[intervalIndex] * DAY_MS,
    intervalIndex,
    completedReviews: record.completedReviews + 1,
    lastReviewedAt: reviewedAt,
    ...(Number.isFinite(score) && Number.isFinite(total) && total! > 0
      ? { lastScore: Math.max(0, Math.min(total!, score!)), lastTotal: total }
      : {}),
  }
}

export function isReviewDue(record: SpacedReviewRecord | undefined, now = Date.now()): boolean {
  return Boolean(record && record.dueAt <= now)
}
