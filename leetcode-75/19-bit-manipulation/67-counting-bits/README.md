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

## Edge Cases

| Input | Expected Output | Why it matters |
|---|---|---|
| `n = 0` | `[0]` | Minimum-size input (constraint floor); array of length 1. |
| `n = 1` | `[0,1]` | Smallest case exercising the recurrence once. |
| `n = 8` | `[0,1,1,2,1,2,2,3,1]` | Verifies every power of two (`1,2,4,8`) always has bit-count `1`. |
| `n = 100000` | `ans.length === 100001` and `ans[100000] === 6` | Upper constraint bound; `100000 = 0b11000011010100000` has 6 set bits. |
