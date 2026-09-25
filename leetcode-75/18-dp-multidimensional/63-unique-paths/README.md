# 63. Unique Paths

- **LeetCode:** [62. Unique Paths](https://leetcode.com/problems/unique-paths/)
- **Difficulty:** Medium
- **Category:** Dynamic Programming (Multidimensional)
- **Pattern:** Grid DP with rolling 1D row

## Problem

There is a robot on an `m x n` grid. The robot is initially located at
the top-left corner (i.e. `grid[0][0]`). The robot tries to move to the
bottom-right corner (i.e. `grid[m-1][n-1]`). The robot can only move
either down or right at any point in time.

Given the two integers `m` and `n`, return the number of possible unique
paths that the robot can take to reach the bottom-right corner.

**Example 1**
```
Input:  m = 3, n = 7
Output: 28
```

**Example 2**
```
Input:  m = 3, n = 2
Output: 3
Explanation: From the top-left corner, there are a total of 3 ways to
reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
```

**Constraints**
- `1 <= m, n <= 100`
- The answer is guaranteed to be less than or equal to `2 * 10^9`.

## Approach

**State:** `dp[i][j]` = the number of unique paths from the top-left
corner `(0, 0)` to cell `(i, j)`.

**Base cases:** `dp[0][j] = 1` for all `j` (only one way to reach any
cell in the top row: move right the whole time), and `dp[i][0] = 1` for
all `i` (only one way to reach any cell in the left column: move down
the whole time).

**Transition:** The robot can only arrive at `(i, j)` from directly
above `(i-1, j)` or directly to the left `(i, j-1)`, so the number of
ways to reach `(i, j)` is the sum of the ways to reach those two cells:
```
dp[i][j] = dp[i-1][j] + dp[i][j-1]
```

**Answer:** `dp[m-1][n-1]`.

A full `m x n` table works, but since row `i` only depends on row `i-1`
(and the current row being built left-to-right), we only need to keep
**one row** of size `n` at a time:

1. Initialize `row = [1, 1, ..., 1]` (length `n`), representing the top
   row (`dp[0][*] = 1`).
2. For each subsequent row `i` from `1` to `m-1`:
   - `row[0]` stays `1` (left column is always reachable in exactly one
     way).
   - For `j` from `1` to `n-1`: `row[j] = row[j] + row[j-1]` — here
     `row[j]` on the right-hand side is still the *previous* row's value
     (not yet overwritten this pass) representing `dp[i-1][j]`, and
     `row[j-1]` is the *current* row's value already updated in this
     pass, representing `dp[i][j-1]`.
3. Return `row[n-1]`.

(This is the same combinatorial quantity as `C(m+n-2, m-1)`, choosing
which of the `m+n-2` total moves are "down" moves, but the DP
formulation above is the standard interview-expected approach.)

## Complexity

- **Time:** `O(m * n)` — every cell of the grid is computed once.
- **Space:** `O(n)` — one rolling row of size `n`, instead of the full
  `O(m * n)` 2D table.
