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

// Example usage:
// console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 1
// console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]])); // 2

export { eraseOverlapIntervals };
