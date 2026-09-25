# 23. Equal Row and Column Pairs

- **LeetCode:** [2352. Equal Row and Column Pairs](https://leetcode.com/problems/equal-row-and-column-pairs/)
- **Difficulty:** Medium
- **Category:** Hash Map / Set
- **Pattern:** Sequence signature counting

## Problem

Given a `0`-indexed `n x n` integer matrix `grid`, return the number of
pairs `(Ri, Cj)` such that row `Ri` and column `Cj` are equal.

A row and column pair is considered equal if they contain the same
elements **in the same order** (i.e. an equal array).

**Example 1**
```
Input:  grid = [[3,2,1],[1,7,6],[2,7,7]]
Output: 1
Explanation: row 0 is [3,2,1] and column 0 is [3,1,2] - not equal, etc.
The only match is row 2 = [2,7,7] and column 1 = [2,7,7].
```

**Example 2**
```
Input:  grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
Output: 3
Explanation: column 0 is [3,1,2,2], equal to row 0. Column 2 is
[2,4,2,2], equal to both row 2 and row 3. That gives 3 matching pairs
total: (row 0, col 0), (row 2, col 2), (row 3, col 2).
```

**Constraints**
- `n == grid.length == grid[i].length`
- `1 <= n <= 200`
- `1 <= grid[i][j] <= 10^5`

## Approach

Comparing every row against every column directly is `O(n^2)` pairs,
each comparison costing `O(n)`, for `O(n^3)` overall. Instead, turn each
row into a hashable "signature" (e.g. a string joining its values with a
separator, or a tuple), count how many times each row-signature occurs,
then for each column compute its signature and look up how many rows
already matched it.

1. Build a frequency map `rowCount` where the key is a row's sequence
   (joined into a string like `"3,2,1"` to make it hashable, or a
   tuple in languages with native tuple hashing) and the value is how
   many rows produce that exact sequence.
2. For each column index `j`, build the column's sequence by reading
   `grid[i][j]` for `i` from `0` to `n - 1`, and form the same kind of
   signature.
3. Look up that column signature in `rowCount`; if present, add its
   count to the running answer (every row with that exact sequence
   pairs with this column).
4. After processing all columns, return the accumulated total.

Joining values with a separator (rather than plain concatenation) avoids
false matches like row `[1, 23]` colliding with row `[12, 3]`.

## Complexity

- **Time:** `O(n^2)` — building all row signatures takes `O(n^2)`
  (n rows, each of length n), and building/looking up all column
  signatures is also `O(n^2)`. This beats the `O(n^3)` brute-force
  pairwise comparison.
- **Space:** `O(n^2)` — the frequency map can store up to `n` distinct
  row signatures, each of length up to `n`.
