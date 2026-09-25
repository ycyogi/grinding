# 16. Max Consecutive Ones III

- **LeetCode:** [1004. Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii/)
- **Difficulty:** Medium
- **Category:** Sliding Window
- **Pattern:** Variable-size sliding window

## Problem

Given a binary array `nums` and an integer `k`, return the maximum number
of consecutive `1`'s in the array if you can flip at most `k` `0`'s.

**Example 1**
```
Input:  nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: flip the two 0's at indices 5 and 8 (0-indexed) to get
[1,1,1,0,0,1,1,1,1,1,1], with 6 consecutive 1's starting at index 5.
```

**Example 2**
```
Input:  nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
```

**Constraints**
- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`.
- `0 <= k <= nums.length`

## Approach

This is a variable-size ("at most K") sliding window: grow the window by
moving the right edge forward, and shrink it from the left only when a
constraint is violated.

1. Keep two pointers `left` and `right`, both starting at `0`, and a
   counter `zeros` for how many `0`'s are currently inside the window.
2. Expand the window by moving `right` across the array. Whenever
   `nums[right]` is `0`, increment `zeros`.
3. If `zeros` exceeds `k`, the window has more zeros than we're allowed
   to flip, so shrink it from the left: while `zeros > k`, if
   `nums[left]` is `0` decrement `zeros`, then advance `left`. This keeps
   the window's zero count at most `k` at all times.
4. After adjusting (the window `[left, right]` is always valid, i.e. it
   contains at most `k` zeros), the window length `right - left + 1` is a
   candidate answer — keep the running maximum.
5. Continue until `right` reaches the end of the array; return the max
   window length found.

Because `left` only ever moves forward and never resets, each index is
visited by `left` and `right` at most once, keeping the whole scan
linear instead of the `O(n^2)` brute force of testing every subarray.

## Complexity

- **Time:** `O(n)` — both pointers traverse the array at most once each,
  for `O(2n) = O(n)` total work. Brute force checking every subarray
  would be `O(n^2)`.
- **Space:** `O(1)` — only a handful of counters/pointers are used.
