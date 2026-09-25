# 64. Longest Common Subsequence

- **LeetCode:** [1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
- **Difficulty:** Medium
- **Category:** Dynamic Programming (Multidimensional)
- **Pattern:** 2D grid DP (string alignment)

## Problem

Given two strings `text1` and `text2`, return the length of their
longest **common subsequence**. If there is no common subsequence,
return `0`.

A subsequence of a string is a new string generated from the original
string with some characters (can be none) deleted without changing the
relative order of the remaining characters.

- For example, `"ace"` is a subsequence of `"abcde"`.

A **common subsequence** of two strings is a subsequence that is common
to both strings.

**Example 1**
```
Input:  text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The longest common subsequence is "ace" and its length is 3.
```

**Example 2**
```
Input:  text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
```

**Constraints**
- `1 <= text1.length, text2.length <= 1000`
- `text1` and `text2` consist of only lowercase English characters.

## Approach

This is the canonical two-string alignment DP. Unlike the 1D DP problems
in this set, LCS genuinely needs information from an entire previous
row plus the current row being built (diagonal dependency), so — unlike
Unique Paths — the standard solution keeps the full table (or, as a
bonus optimization, two rolling rows) rather than a handful of scalars.

**State:** `dp[i][j]` = the length of the longest common subsequence of
`text1[0..i)` (the first `i` characters of `text1`) and `text2[0..j)`
(the first `j` characters of `text2`).

**Base cases:** `dp[0][j] = 0` for all `j`, and `dp[i][0] = 0` for all
`i` — an empty prefix has no common subsequence with anything.

**Transition:** Compare `text1[i-1]` (the `i`th character of `text1`)
with `text2[j-1]`:
- If they **match**: this character can extend any common subsequence
  found in the prefixes before it, so
  `dp[i][j] = dp[i-1][j-1] + 1`.
- If they **don't match**: this pair of characters can't both be part of
  the LCS ending here, so take the best of either dropping the current
  character of `text1` or of `text2`:
  `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.

**Answer:** `dp[m][n]`, where `m = text1.length`, `n = text2.length`.

Algorithm:
1. Allocate a `(m+1) x (n+1)` table initialized to `0`.
2. For `i` from `1` to `m`, for `j` from `1` to `n`:
   - If `text1[i-1] === text2[j-1]`: `dp[i][j] = dp[i-1][j-1] + 1`.
   - Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.
3. Return `dp[m][n]`.

**Bonus space optimization:** since row `i` only reads from row `i-1`
and the current row being filled left to right, the table can be
compressed to **two rolling rows** of size `n+1` (previous row and
current row), cutting space to `O(n)` while keeping the same `O(m*n)`
time. The full table is kept below for clarity, since `m, n <= 1000`
keeps `O(m*n)` well within limits.

## Complexity

- **Time:** `O(m * n)` — every cell of the table is filled once.
  Brute force enumerating all `2^m` subsequences of `text1` and checking
  each against `text2` would be exponential.
- **Space:** `O(m * n)` for the full table (can be reduced to `O(n)`
  with the two-rolling-rows optimization noted above, since only the
  previous row is ever needed).

## Edge Cases

| Input (`text1`, `text2`) | Expected | Why it matters |
| --- | --- | --- |
| `""`, `"abc"` | `0` | One string empty — even though the stated constraints require length `>= 1`, the base-case row/column of zeros should still handle this gracefully without special-casing. |
| `"abc"`, `"xyz"` | `0` | No common characters at all — every cell should fall back to `max(dp[i-1][j], dp[i][j-1])` and stay `0` throughout. |
| `"a"`, `"a"` | `1` | Minimum valid length (`1`) per constraints, identical single character. |
| `"abcde"`, `"bd"` | `2` | `text2` is a proper (non-contiguous) subsequence of `text1` — checks the "match extends diagonal" path chains correctly across skipped characters. |
| `"aaaa"`, `"aa"` | `2` | Repeated identical character — LCS length is capped by the shorter string, not inflated by extra matching opportunities. |
