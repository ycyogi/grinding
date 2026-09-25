/**
 * LeetCode 435. Non-overlapping Intervals
 * https://leetcode.com/problems/non-overlapping-intervals/
 *
 * Approach: sort intervals by end coordinate, then greedily keep an
 * interval whenever it starts at or after the end of the last kept
 * interval. Otherwise it overlaps and must be removed; when removing,
 * keep the smaller previous end since that leaves the most room for
 * future intervals.
 *
 * Time:  O(n log n) - dominated by sorting
 * Space: O(log n) - sort's internal space (O(1) extra beyond that)
 */
function eraseOverlapIntervals(intervals: number[][]): number {
  if (intervals.length === 0) return 0;

  intervals.sort((a, b) => a[1] - b[1]);

  let removals = 0;
  let prevEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    if (start >= prevEnd) {
      prevEnd = end;
    } else {
      removals++;
    }
  }

  return removals;
}
function assertEqual(actual: unknown, expected: unknown, label: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    console.error(`FAIL [${label}]: got ${a}, expected ${e}`);
  } else {
    console.log(`PASS [${label}]`);
  }
}

if (require.main === module) {
  // Example usage:
  console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 1
  console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]])); // 2

  // Edge cases
  assertEqual(eraseOverlapIntervals([[1, 5]]), 0, 'single interval');
  assertEqual(
    eraseOverlapIntervals([[1, 2], [2, 3], [3, 4]]),
    0,
    'chain of touching intervals'
  );
  assertEqual(
    eraseOverlapIntervals([[1, 2], [2, 3]]),
    0,
    'two intervals touching at a point'
  );
  assertEqual(
    eraseOverlapIntervals([[5, 7], [5, 7], [5, 7], [5, 7]]),
    3,
    'four identical intervals'
  );
  assertEqual(
    eraseOverlapIntervals([[-5, -1], [-3, 0], [-2, 2]]),
    2,
    'negative-coordinate boundary values'
  );
}

export { eraseOverlapIntervals };
