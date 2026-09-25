# 66. Edit Distance

- **LeetCode:** [72. Edit Distance](https://leetcode.com/problems/edit-distance/)
- **Difficulty:** Hard
- **Category:** Dynamic Programming (Multidimensional)
- **Pattern:** 2D grid DP (string alignment)

## Problem

Given two strings `word1` and `word2`, return the minimum number of
operations required to convert `word1` to `word2`.

You have the following three operations permitted on a word:
- Insert a character
- Delete a character
- Replace a character

**Example 1**
```
Input:  word1 = "horse", word2 = "ros"
Output: 3
Explanation:
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
```

**Example 2**
```
Input:  word1 = "intention", word2 = "execution"
Output: 5
Explanation:
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
```

**Constraints**
- `0 <= word1.length, word2.length <= 500`
- `word1` and `word2` consist of lowercase English letters.

## Approach

Like Longest Common Subsequence, this is a two-string alignment DP where
each cell genuinely depends on three different previous cells (left,
top, and diagonal), so the standard solution keeps a full 2D table
rather than a handful of rolling scalars.

**State:** `dp[i][j]` = the minimum number of operations to convert the
first `i` characters of `word1` into the first `j` characters of
`word2`.

**Base cases:**
- `dp[0][j] = j` — converting an empty `word1` prefix into the first `j`
  characters of `word2` takes `j` insertions.
- `dp[i][0] = i` — converting the first `i` characters of `word1` into
  an empty `word2` prefix takes `i` deletions.

**Transition:** compare `word1[i-1]` with `word2[j-1]`:
- If they **match**, no operation is needed for this pair of characters
  — carry over the answer for both prefixes shortened by one:
  ```
  dp[i][j] = dp[i-1][j-1]
  ```
- If they **don't match**, try all three allowed operations and take the
  cheapest, each costing `1` plus the cost of the resulting subproblem:
  - **Replace** `word1[i-1]` with `word2[j-1]`: `dp[i-1][j-1] + 1`.
  - **Delete** `word1[i-1]`: `dp[i-1][j] + 1`.
  - **Insert** `word2[j-1]` into `word1`: `dp[i][j-1] + 1`.
  ```
  dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
  ```

**Answer:** `dp[m][n]`, where `m = word1.length`, `n = word2.length`.

Algorithm:
1. Allocate an `(m+1) x (n+1)` table.
2. Fill row `0` with `0..n` and column `0` with `0..m` (base cases).
3. For `i` from `1` to `m`, for `j` from `1` to `n`:
   - If `word1[i-1] === word2[j-1]`: `dp[i][j] = dp[i-1][j-1]`.
   - Else: `dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])`.
4. Return `dp[m][n]`.

**Bonus space optimization:** since row `i` only reads row `i-1` and
values already computed in row `i` (to its left), this can be compressed
to two rolling rows of size `n+1`, reducing space to `O(n)` while
keeping `O(m*n)` time. The full table is used below for clarity, and
`m, n <= 500` keeps `O(m*n)` comfortably fast.

## Complexity

- **Time:** `O(m * n)` — every cell of the table is computed once from
  already-known neighbors.
- **Space:** `O(m * n)` for the full table (reducible to `O(n)` with the
  two-rolling-rows optimization, since each row only needs the row
  directly above it).
