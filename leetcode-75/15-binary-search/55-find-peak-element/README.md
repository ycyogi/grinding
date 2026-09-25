# 55. Find Peak Element

- **LeetCode:** [162. Find Peak Element](https://leetcode.com/problems/find-peak-element/)
- **Difficulty:** Medium
- **Category:** Binary Search
- **Pattern:** Binary search on slope direction

## Problem

A peak element is an element that is strictly greater than its
neighbors.

Given a 0-indexed integer array `nums`, find a peak element, and return
its index. If the array contains multiple peaks, return the index to
**any of the peaks**.

You may imagine that `nums[-1] = nums[n] = -infinity`. In other words, an
element is always considered to be strictly greater than a neighbor that
is outside the array.

You must write an algorithm that runs in `O(log n)` time.

**Example 1**
```
Input:  nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the
index number 2.
```

**Example 2**
```
Input:  nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the
peak element is 2, or index number 5 where the peak element is 6.
```

**Constraints**
- `1 <= nums.length <= 1000`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `nums[i] != nums[i + 1]` for all valid `i` (no two adjacent elements are
  equal).

## Approach

A linear scan comparing each element to its neighbors finds a peak in
`O(n)`, but the problem demands `O(log n)`, which is the signal to binary
search on the *slope* of the array rather than search for a specific
value.

Key insight: since `nums[-1]` and `nums[n]` are treated as `-infinity`,
the array always contains at least one peak. Pick the midpoint `mid`:
- If `nums[mid] < nums[mid + 1]`, the array is rising at `mid`, so a peak
  must exist somewhere to the right (worst case, the rightmost element
  itself is a peak because it's greater than the implicit `-infinity`
  beyond it). Discard the left half: `lo = mid + 1`.
- Otherwise (`nums[mid] > nums[mid + 1]`), the array is falling at `mid`,
  so a peak must exist at `mid` or to its left. Discard the right half:
  `hi = mid`.

Repeat until `lo == hi`; that index is guaranteed to be a peak. Because
adjacent elements are never equal, every comparison is strict and the
window always shrinks.

## Complexity

- **Time:** `O(log n)` — each step halves the search window by following
  the ascending slope toward a peak, versus `O(n)` for a linear scan that
  checks every element against its neighbors.
- **Space:** `O(1)` — only a couple of index variables are used.
