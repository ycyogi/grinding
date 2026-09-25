# 17. Longest Subarray of 1's After Deleting One Element

- **LeetCode:** [1493. Longest Subarray of 1's After Deleting One Element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/)
- **Difficulty:** Medium
- **Category:** Sliding Window
- **Pattern:** Variable-size sliding window ("at most 1 zero")

## Problem

Given a binary array `nums`, you should delete exactly one element from
it. Return the size of the longest non-empty subarray containing only
`1`'s in the resulting array. If there is no such subarray, return `0`.

**Example 1**
```
Input:  nums = [1,1,0,1]
Output: 3
Explanation: delete the 0 to get [1,1,1], length 3.
```

**Example 2**
```
Input:  nums = [0,1,1,1,0,1,1,0,1]
Output: 5
Explanation: delete nums[4] (a 0) to get [0,1,1,1,1,1,0,1], the longest
run of 1's has length 5.
```

**Constraints**
- `1 <= nums.length <= 10^5`
- `nums[i]` is either `0` or `1`.

## Approach

Because exactly one element must be deleted no matter what, this reduces
to: find the longest window that contains **at most one** `0`, then
subtract `1` from its length (that one element — the zero if present,
otherwise any one of the ones — is the element we "delete").

This is the same "at most K" sliding window template as Max Consecutive
Ones III, with `K = 1`:

1. Keep `left = 0` and a counter `zeros` for zeros in the current window.
2. Expand `right` across the array; when `nums[right] == 0`, increment
   `zeros`.
3. While `zeros > 1`, shrink from the left: if `nums[left] == 0`
   decrement `zeros`, then advance `left`. This keeps at most one zero
   in the window `[left, right]` at all times.
4. The current window length is `right - left + 1`; since we must always
   delete exactly one element from it, the number of 1's we can keep
   from this window is `(right - left + 1) - 1`. Track the maximum of
   this value across all `right`.
5. Return the maximum found. (If the whole array is all 1's, the window
   never contains a zero, but we still subtract 1 because one element —
   a `1` — must be deleted; this is handled automatically since the
   formula always subtracts 1.)

## Complexity

- **Time:** `O(n)` — `left` and `right` each move forward across the
  array at most once, same as any "at most K" sliding window. Brute
  force testing every subarray (and every possible deleted index) would
  be `O(n^2)`.
- **Space:** `O(1)` — only pointers and a counter are used.
