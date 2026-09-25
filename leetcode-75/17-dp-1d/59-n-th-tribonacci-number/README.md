# 59. N-th Tribonacci Number

- **LeetCode:** [1137. N-th Tribonacci Number](https://leetcode.com/problems/n-th-tribonacci-number/)
- **Difficulty:** Easy
- **Category:** Dynamic Programming (1D)
- **Pattern:** Rolling-variable DP

## Problem

The Tribonacci sequence `Tn` is defined as follows:

```
T0 = 0, T1 = 1, T2 = 1
Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0
```

Given `n`, return the value of `Tn`.

**Example 1**
```
Input:  n = 4
Output: 4
Explanation:
T3 = 0 + 1 + 1 = 2
T4 = 1 + 1 + 2 = 4
```

**Example 2**
```
Input:  n = 25
Output: 1389537
```

**Constraints**
- `0 <= n <= 37`
- The answer is guaranteed to fit within a 32-bit integer, i.e.
  `answer <= 2^31 - 1`.

## Approach

This is a direct DP recurrence, a three-term generalization of
Fibonacci.

**State:** `dp[i]` = the value of `Ti`.

**Base cases:** `dp[0] = 0`, `dp[1] = 1`, `dp[2] = 1`.

**Transition:** `dp[i] = dp[i-1] + dp[i-2] + dp[i-3]` for `i >= 3`.

Since each `dp[i]` only depends on the previous three values, there's no
need to keep a full array — track just the last three values in rolling
variables `a, b, c` (representing `T(i-3), T(i-2), T(i-1)` conceptually,
or more simply `a = T0, b = T1, c = T2` and slide the window forward)
and shift them each iteration:

1. Handle `n = 0` and `n = 1` directly (return `0` / `1`).
2. Initialize `a = 0, b = 1, c = 1` (representing `T0, T1, T2`).
3. For `i` from `3` to `n`: compute `next = a + b + c`, then shift
   `a = b, b = c, c = next`.
4. Return `c`.

## Complexity

- **Time:** `O(n)` — one pass computing each term once, versus naive
  triple recursion without memoization which is exponential, `O(3^n)`.
- **Space:** `O(1)` — only three rolling variables are kept, instead of
  an `O(n)` array of all computed terms.

## Edge Cases

| Input (`n`) | Expected | Why it matters |
| --- | --- | --- |
| `0` | `0` | First base case (`T0`) — must return immediately, no loop iterations. |
| `1` | `1` | Second base case (`T1`) — easy off-by-one target if the `n===1` check is missing. |
| `2` | `1` | Third base case (`T2`) — the last value returned without entering the rolling loop; `for i from 3 to n` must not run at all. |
| `3` | `2` | First value that actually exercises the loop (`i=3`): `T3 = T0+T1+T2 = 0+1+1 = 2`. |
| `37` | `2082876103` | Max `n` per constraints (`0 <= n <= 37`) — hand-traced the full recurrence to confirm it stays within the guaranteed 32-bit bound (`2147483647`). |
