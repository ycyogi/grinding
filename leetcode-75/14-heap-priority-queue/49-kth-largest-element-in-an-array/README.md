# 49. Kth Largest Element in an Array

- **LeetCode:** [215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)
- **Difficulty:** Medium
- **Category:** Heap / Priority Queue
- **Pattern:** Min-heap of size k

## Problem

Given an integer array `nums` and an integer `k`, return the `k`-th
largest element in the array. Note that it is the `k`-th largest
element **in sorted order**, not the `k`-th distinct element.

You must solve it in `O(n log n)` time or better (a full sort is
allowed, but the expected/optimal approaches beat it in practice).

**Example 1**
```
Input:  nums = [3,2,1,5,6,4], k = 2
Output: 5
Explanation: Sorted descending: [6,5,4,3,2,1]. The 2nd largest is 5.
```

**Example 2**
```
Input:  nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
Explanation: Sorted descending: [6,5,5,4,3,3,2,2,1]. The 4th largest
(counting duplicates) is 4.
```

**Constraints**
- `1 <= k <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Approach

Maintain a **min-heap of size `k`** holding the `k` largest elements
seen so far. Once the heap has `k` elements, its root (the minimum of
those `k`) is always the smallest of the current top-`k`, so it's the
element to evict if a bigger one shows up.

1. Initialize an empty min-heap.
2. For each number in `nums`:
   - Push it onto the heap.
   - If the heap's size exceeds `k`, pop the minimum (the root).
3. After processing every number, the heap contains exactly the `k`
   largest elements of `nums`, and its root (minimum of that group) is
   the `k`-th largest element overall — return it.

Why this works: the heap only ever holds the top `k` candidates seen so
far; anything smaller than the current root can never make it into the
final top-`k`, so discarding it is safe.

**Alternative (also optimal in practice):** Quickselect (a partition
step from quicksort) finds the `k`-th largest in `O(n)` average time by
repeatedly partitioning around a pivot and recursing into only the half
that must contain the answer, but it has `O(n^2)` worst case without
randomization/median-of-medians safeguards. The heap approach is more
predictable and is the standard choice for this problem category.

## Complexity

- **Time:** `O(n log k)` — each of the `n` insertions/evictions on a
  heap of size at most `k` costs `O(log k)`. This beats sorting
  (`O(n log n)`) whenever `k` is small relative to `n`.
- **Space:** `O(k)` for the heap.
