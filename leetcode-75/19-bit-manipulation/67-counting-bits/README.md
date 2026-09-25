# 67. Counting Bits

- **LeetCode:** [338. Counting Bits](https://leetcode.com/problems/counting-bits/)
- **Difficulty:** Easy
- **Category:** Bit Manipulation
- **Pattern:** DP + lowest set bit trick

## Problem

Given an integer `n`, return an array `ans` of length `n + 1` such that
for each `i` (`0 <= i <= n`), `ans[i]` is the number of `1`'s in the
binary representation of `i`.

**Example 1**
```
Input:  n = 2
Output: [0,1,1]
Explanation: 0 --> 0, 1 --> 1, 2 --> 10
```

**Example 2**
```
Input:  n = 5
Output: [0,1,1,2,1,2]
Explanation: 0 --> 0, 1 --> 1, 2 --> 10, 3 --> 11, 4 --> 100, 5 --> 101
```

**Constraints**
- `0 <= n <= 10^5`

## Approach

A naive solution counts bits for every number independently in
`O(log i)` time each, giving `O(n log n)` overall. We can do better by
reusing previously computed answers.

Key trick: `i & (i - 1)` clears the lowest set bit of `i` (e.g.
`0b1100 & 0b1011 = 0b1000`). That means `i` always has exactly one more
set bit than `i & (i - 1)`, and `i & (i - 1)` is always a smaller number
whose answer we've already computed.

So build the array bottom-up:
1. `ans[0] = 0`.
2. For `i` from `1` to `n`: `ans[i] = ans[i & (i - 1)] + 1`.

(An equally valid recurrence uses the last bit instead:
`ans[i] = ans[i >> 1] + (i & 1)`, dropping the lowest bit by shifting
right and adding back 1 if that dropped bit was a `1`.)

## Complexity

- **Time:** `O(n)` — each `ans[i]` is computed in `O(1)` from an already
  computed smaller value, instead of recounting bits from scratch
  (`O(n log n)` brute force).
- **Space:** `O(n)` for the output array (`O(1)` extra beyond the output).
