# 14. Maximum Average Subarray I

- **LeetCode:** [643. Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/)
- **Difficulty:** Easy
- **Category:** Sliding Window
- **Pattern:** Fixed-size sliding window

## Problem

You are given an integer array `nums` consisting of `n` elements, and an
integer `k`. Find a contiguous subarray whose length is equal to `k` that
has the maximum average value, and return this value. Any answer with a
calculation error less than `10^-5` will be accepted.

**Example 1**
```
Input:  nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75
Explanation: max average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
```

**Example 2**
```
Input:  nums = [5], k = 1
Output: 5.00000
```

**Constraints**
- `n == nums.length`
- `1 <= k <= n <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

## Approach

This is the canonical fixed-size sliding window problem: instead of
recomputing the sum of every length-`k` window from scratch (brute force,
`O(n * k)`), maintain a running window sum and slide it one element at a
time.

1. Compute `windowSum` as the sum of the first `k` elements. This is the
   average for the window starting at index `0`; track it as the current
   `maxSum`.
2. Slide the window from left to right: for each new right boundary `i`
   (from `k` to `n - 1`), add `nums[i]` (the element entering the window)
   and subtract `nums[i - k]` (the element leaving the window). This
   updates `windowSum` to be the sum of the current length-`k` window in
   `O(1)`.
3. After each slide, compare `windowSum` to `maxSum` and keep the larger
   one.
4. Once every window has been visited, divide `maxSum` by `k` to get the
   maximum average.

The key insight is that adjacent windows overlap in `k - 1` elements, so
each slide only needs to account for the one element that left and the
one that entered, rather than re-summing the whole window.

## Complexity

- **Time:** `O(n)` — each element enters and leaves the window exactly
  once. Brute force recomputation of every window's sum would be
  `O(n * k)`.
- **Space:** `O(1)` — only a running sum and a max tracker are kept,
  regardless of input size.

## Edge Cases

| Input | Expected | Why it matters |
| --- | --- | --- |
| `nums = [3,-2,5], k = 3` | `2.0` | `k == n`: only one window exists (the whole array). |
| `nums = [-5,3,-1,7,-2], k = 1` | `7.0` | `k == 1`: window degenerates to a single element; answer is just `max(nums)`. |
| `nums = [-1,-2,-3,-4], k = 2` | `-1.5` | All-negative input; the "best" average is still negative, checks no accidental clamping to 0. |
| `nums = [10000,10000,-10000], k = 2` | `10000.0` | Boundary values at `+/-10^4`; also confirms sums don't need extra precision handling. |
| `nums = [-7], k = 1` | `-7.0` | Minimum-size input (`n == 1`), single negative element. |
