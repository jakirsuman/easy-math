export const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14] as const
const DAY_MS = 24 * 60 * 60 * 1000

export type SpacedReviewRecord = {
  dueAt: number
  intervalIndex: number
  completedReviews: number
}

/** The first review becomes due one day after a lesson is mastered. */
export function scheduleFirstReview(completedAt = Date.now()): SpacedReviewRecord {
  return {
    dueAt: completedAt + REVIEW_INTERVAL_DAYS[0] * DAY_MS,
    intervalIndex: 0,
    completedReviews: 0,
  }
}

/** On a successful review, schedule the next revisit at 3, 7, then 14 days. */
export function advanceReviewSchedule(record: SpacedReviewRecord, reviewedAt = Date.now()): SpacedReviewRecord {
  const intervalIndex = Math.min(record.intervalIndex + 1, REVIEW_INTERVAL_DAYS.length - 1)
  return {
    dueAt: reviewedAt + REVIEW_INTERVAL_DAYS[intervalIndex] * DAY_MS,
    intervalIndex,
    completedReviews: record.completedReviews + 1,
  }
}

export function isReviewDue(record: SpacedReviewRecord | undefined, now = Date.now()): boolean {
  return Boolean(record && record.dueAt <= now)
}
