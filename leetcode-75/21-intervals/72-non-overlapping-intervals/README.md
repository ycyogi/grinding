# 72. Non-overlapping Intervals

- **LeetCode:** [435. Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/)
- **Difficulty:** Medium
- **Category:** Intervals
- **Pattern:** Sort by end + greedy keep/remove

## Problem

Given an array of intervals `intervals` where
`intervals[i] = [starti, endi]`, return the minimum number of intervals
you need to remove to make the rest of the intervals non-overlapping.

Note that intervals which only touch at a point, e.g. `[1,2]` and
`[2,3]`, are **not** considered overlapping.

**Example 1**
```
Input:  intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are
non-overlapping.
```

**Example 2**
```
Input:  intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the
intervals non-overlapping.
```

**Constraints**
- `1 <= intervals.length <= 10^5`
- `intervals[i].length == 2`
- `-5 * 10^4 <= starti < endi <= 5 * 10^4`

## Approach

This is the classic "activity selection" greedy problem in disguise:
maximizing the number of intervals we *keep* (non-overlapping) is
equivalent to minimizing the number we *remove* — remove count =
`total - kept`.

1. Sort the intervals by their **end** coordinate, ascending. Sorting by
   end (rather than start) is what makes the greedy choice provably
   optimal: always preferring the interval that frees up the earliest
   "next available start" leaves the most room for future intervals.
2. Walk through the sorted intervals, tracking `prevEnd` — the end of
   the last interval we decided to keep. Initialize it to the first
   interval's end (the first interval is always kept).
3. For each subsequent interval `[start, end]`:
   - If `start >= prevEnd`, it doesn't overlap the last kept interval —
     keep it, and update `prevEnd = end`.
   - Otherwise it overlaps — remove it (increment a `removals`
     counter) and **do not** update `prevEnd` (keep the smaller,
     previously-kept end, since a smaller end leaves more room for
     future intervals — this is the greedy insight: between two
     overlapping intervals, always discard the one with the larger
     end).
4. Return `removals`.

## Complexity

- **Time:** `O(n log n)` — dominated by the sort; the single greedy
  scan afterward is `O(n)`.
- **Space:** `O(log n)` to `O(n)` for the sort's internal stack/buffer
  (implementation dependent), `O(1)` extra otherwise.

## Edge Cases

| Input | Expected Output | Why it matters |
|---|---|---|
| `[[1,5]]` | `0` | Minimum-size input (single interval); nothing to compare against. |
| `[[1,2],[2,3],[3,4]]` | `0` | A chain of intervals that only touch at endpoints — confirms touching is *not* overlapping across multiple pairs, not just one. |
| `[[1,2],[2,3]]` | `0` | The exact touching case named in the problem statement (`start == prevEnd` is kept, not removed). |
| `[[5,7],[5,7],[5,7],[5,7]]` | `3` | All-equal intervals; only one can ever be kept, so 3 of 4 must go. |
| `[[-5,-1],[-3,0],[-2,2]]` | `2` | Negative-coordinate boundary values; sorted by end, only the first-ending interval can be kept (both others start before it ends). |
