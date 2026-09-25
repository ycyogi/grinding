# 53. Guess Number Higher or Lower

- **LeetCode:** [374. Guess Number Higher or Lower](https://leetcode.com/problems/guess-number-higher-or-lower/)
- **Difficulty:** Easy
- **Category:** Binary Search
- **Pattern:** Binary search against an external oracle

## Problem

We are playing the Guess Game. The game is as follows:

I pick a number from `1` to `n`. You have to guess which number I picked.

Every time you guess wrong, I tell you whether the number I picked is
higher or lower than your guess.

You call a pre-defined API `int guess(int num)`, which returns three
possible results:
- `-1`: your guess is higher than the number I picked (i.e. `num > pick`).
- `1`: your guess is lower than the number I picked (i.e. `num < pick`).
- `0`: your guess is equal to the number I picked (i.e. `num == pick`).

Return the number that I picked.

**Example 1**
```
Input:  n = 10, pick = 6
Output: 6
```

**Example 2**
```
Input:  n = 1, pick = 1
Output: 1
```

**Constraints**
- `1 <= n <= 2^31 - 1`
- `1 <= pick <= n`

**Note:** `guess` is provided by the LeetCode judge — you only implement
`guessNumber(n)`, which calls `guess` to find the picked number.

## Approach

This is a textbook binary search where the "comparator" is a remote oracle
instead of an array lookup. Maintain a search window `[lo, hi]` that is
guaranteed to contain `pick`, starting at `[1, n]`.

1. Compute `mid = lo + (hi - lo) / 2` (avoids overflow versus `(lo + hi) / 2`
   in languages with fixed-width integers).
2. Call `guess(mid)`:
   - `0` → `mid` is the answer, return it.
   - `-1` → `mid` is too high, so the answer is in `[lo, mid - 1]`.
   - `1` → `mid` is too low, so the answer is in `[mid + 1, hi]`.
3. Repeat until the window collapses onto the answer.

Each call halves the remaining search space, so the loop terminates in
`O(log n)` calls.

## Complexity

- **Time:** `O(log n)` — classic binary search halves the range each
  iteration; brute force calling `guess` on every number from `1` to `n`
  would be `O(n)`.
- **Space:** `O(1)` — only a few pointer variables are kept.

## Edge Cases

| Input (`n`, `pick`) | Expected | Why it matters |
| --- | --- | --- |
| `n=1, pick=1` | `1` | Smallest possible window — `lo == hi` on the very first iteration. |
| `n=2, pick=1` | `1` | Two-element window, pick sits at the *lower* bound — checks `hi = mid - 1` doesn't overshoot. |
| `n=2, pick=2` | `2` | Two-element window, pick sits at the *upper* bound — checks `lo = mid + 1` reaches it. |
| `n=2147483647, pick=1` | `1` | Max `n` (`2^31 - 1`) with the answer at the very start — stresses the mid-point formula against overflow/precision at the upper constraint bound. |
| `n=2147483647, pick=2147483647` | `2147483647` | Max `n` with the answer at the very end — same overflow stress, opposite direction. |
