# 62. Domino and Tromino Tiling

- **LeetCode:** [790. Domino and Tromino Tiling](https://leetcode.com/problems/domino-and-tromino-tiling/)
- **Difficulty:** Medium
- **Category:** Dynamic Programming (1D)
- **Pattern:** Rolling-variable DP derived from a two-state recurrence

## Problem

You have two types of tiles: a `2 x 1` domino shape and a tromino shape
(an L-shaped tile made of 3 unit squares). You may rotate these shapes.

```
Domino:      Tromino (4 rotations):
XX           X.   XX   .X   XX
             XX   X.   XX   .X
```

Given an integer `n`, return the number of ways to tile a `2 x n` board.
Your answer may be very large, so return it **modulo `10^9 + 7`**.

In a tiling, every square must be covered by exactly one tile. Tiles
cannot overlap and cannot extend outside the board.

**Example 1**
```
Input:  n = 3
Output: 5
Explanation: The five different ways are shown in the LeetCode
illustration; they correspond to all the ways to fully cover a 2x3
board using dominoes and/or L-trominoes.
```

**Example 2**
```
Input:  n = 1
Output: 1
Explanation: A 2x1 column can only be covered by a single vertical
domino, so there is exactly 1 way.
```

**Constraints**
- `1 <= n <= 1000`

## Approach

The tricky part of this board-tiling problem is that a tromino can leave
a single cell of a column uncovered while covering one cell of the next
column, so a plain "one column at a time, fully covered" DP isn't enough
— we need to also track boards where the last column is *partially*
covered by a tromino sticking out.

**Two states:**
- `full[i]` = number of ways to completely tile a `2 x i` board.
- `partial[i]` = number of ways to tile a `2 x i` board where one extra
  cell sticks out past column `i` (i.e. exactly one of the two cells in
  column `i` is filled, by a tromino leaning into column `i+1`).

**Transitions**, building column `i` from smaller boards:
- To fully tile up to column `i`, either:
  - place a vertical domino filling all of column `i`:
    contributes `full[i-1]`,
  - place two horizontal dominoes spanning columns `i-1, i`:
    contributes `full[i-2]`,
  - complete a tromino that was left sticking out from a `partial`
    board, and it can stick out in 2 mirrored orientations:
    contributes `2 * partial[i-1]`.
  ```
  full[i] = full[i-1] + full[i-2] + 2 * partial[i-1]
  ```
- To leave one cell sticking out at column `i`, extend a fully tiled
  `2 x (i-2)` board with an L-tromino, or extend a `partial[i-1]` board
  with a single domino cell:
  ```
  partial[i] = full[i-2] + partial[i-1]
  ```

**Base cases:** `full[0] = 1` (empty board, one way — do nothing),
`full[1] = 1`, `partial[1] = 0` (can't leave a cell sticking out with
only 1 column and pieces that need 2+ cells... more precisely,
`partial[0] = 0`).

Substituting `partial[i-1] = full[i-3] + partial[i-2]` back into the
`full` recurrence simplifies everything to a single sequence in `full`
alone:
```
full[i] = 2 * full[i-1] + full[i-3]   for i >= 3
```
with `full[0] = 1, full[1] = 1, full[2] = 2`. (Verify: `full[2] = 2`
since a `2x2` board can be tiled by two vertical dominoes or two
horizontal dominoes — no tromino combination fits without overhang.)

This collapses the two-state DP into a single 1D recurrence that only
needs the last **three** values, so track them in three rolling
variables instead of a full table, taking everything modulo `10^9 + 7`
to keep numbers bounded.

Algorithm:
1. Handle `n == 0` -> 1, `n == 1` -> 1, `n == 2` -> 2 directly.
2. Otherwise set `a, b, c = full[0], full[1], full[2] = 1, 1, 2`.
3. For `i` from `3` to `n`: `next = (2 * c + a) % MOD`; shift
   `a = b, b = c, c = next`.
4. Return `c`.

## Complexity

- **Time:** `O(n)` — one pass computing each term of the simplified
  recurrence once. A naive recursive brute force enumerating every tile
  placement would be exponential.
- **Space:** `O(1)` — three rolling variables instead of an `O(n)` table
  for `full`/`partial`.
