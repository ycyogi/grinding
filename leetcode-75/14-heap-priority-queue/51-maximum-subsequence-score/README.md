# 51. Maximum Subsequence Score

- **LeetCode:** [2542. Maximum Subsequence Score](https://leetcode.com/problems/maximum-subsequence-score/)
- **Difficulty:** Medium
- **Category:** Heap / Priority Queue
- **Pattern:** Sort + min-heap sliding

## Problem

You are given two 0-indexed integer arrays `nums1` and `nums2` of equal
length `n`, and an integer `k`. You must choose a subsequence of
indices from `nums1` of length `k`.

For chosen indices `i0, i1, ..., ik-1`, your **score** is defined as:

- The sum of the selected elements from `nums1` **multiplied by** the
  minimum of the selected elements from `nums2`, i.e.
  `(nums1[i0] + nums1[i1] + ... + nums1[ik-1]) * min(nums2[i0],
  nums2[i1], ..., nums2[ik-1])`.

Return the maximum possible score achievable by choosing exactly `k`
indices.

**Example 1**
```
Input:  nums1 = [1,3,3,2], nums2 = [2,1,3,4], k = 3
Output: 12
Explanation: Choosing indices 0, 1, and 3 gives sum = 1+3+2 = 6 and
min(nums2) = min(2,1,4) = 1, score = 6. Choosing indices 0, 2, and 3
gives sum = 1+3+2 = 6, min = min(2,3,4) = 2, score = 12 — this is the
maximum.
```

**Example 2**
```
Input:  nums1 = [4,2,3,1,1], nums2 = [7,5,10,9,6], k = 1
Output: 30
Explanation: Choosing index 2 alone gives sum = 3, min(nums2) = 10,
score = 30, which is the maximum single-index score.
```

**Constraints**
- `n == nums1.length == nums2.length`
- `1 <= n <= 10^5`
- `0 <= nums1[i], nums2[j] <= 10^5`
- `1 <= k <= n`

## Approach

The score depends on the **minimum** `nums2` value among the chosen
indices, so a good strategy is to fix "what the minimum is" by
processing indices in decreasing order of `nums2`: at the moment we
process index `i`, every index processed so far (including `i`) has a
`nums2` value `>= nums2[i]`, so `nums2[i]` is a valid candidate for the
minimum of any subset drawn from what's been processed so far.

1. Pair up `(nums1[i], nums2[i])` for each index and sort these pairs
   by `nums2` in **descending** order.
2. Walk through the sorted pairs, maintaining:
   - A running `sum` of the `nums1` values currently "in play".
   - A **min-heap** of the `nums1` values currently in play, capped at
     size `k` (so we can cheaply evict the smallest `nums1` value when
     we have too many).
3. For each pair `(n1, n2)` in the sorted order:
   - Push `n1` onto the heap and add it to `sum`.
   - If the heap's size exceeds `k`, pop the minimum `nums1` value from
     the heap and subtract it from `sum` (we keep the `k` largest
     `nums1` values seen so far, to maximize the sum for a fixed
     minimum multiplier).
   - If the heap's size is now exactly `k`, we have a valid candidate
     subsequence: its score is `sum * n2` (since `n2` is the smallest
     `nums2` value among everything processed so far, including
     everything currently in the heap). Update the running maximum.
4. Return the maximum score found.

## Complexity

- **Time:** `O(n log n)` — dominated by the initial sort; the heap
  operations contribute `O(n log k)`, which is no worse.
- **Space:** `O(n)` for the sorted pairs, plus `O(k)` for the heap.
