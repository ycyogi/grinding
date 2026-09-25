# 54. Successful Pairs of Spells and Potions

- **LeetCode:** [2300. Successful Pairs of Spells and Potions](https://leetcode.com/problems/successful-pairs-of-spells-and-potions/)
- **Difficulty:** Medium
- **Category:** Binary Search
- **Pattern:** Sort + binary search for a threshold

## Problem

You are given two positive integer arrays `spells` and `potions`, of
length `n` and `m` respectively, where `spells[i]` represents the
strength of the `i`th spell and `potions[j]` represents the strength of
the `j`th potion.

You are also given an integer `success`. A spell and potion pair is
considered *successful* if the product of their strengths is at least
`success`.

Return an integer array `pairs` of length `n` where `pairs[i]` is the
number of potions that will form a successful pair with the `i`th spell.

**Example 1**
```
Input:  spells = [5,1,3], potions = [1,2,3,4,5], success = 7
Output: [4,0,3]
Explanation:
- 5 * [1,2,3,4,5] = [5,10,15,20,25]. 4 products meet or exceed 7.
- 1 * [1,2,3,4,5] = [1,2,3,4,5]. 0 products meet or exceed 7.
- 3 * [1,2,3,4,5] = [3,6,9,12,15]. 3 products meet or exceed 7.
```

**Example 2**
```
Input:  spells = [3,1,2], potions = [8,5,8], success = 16
Output: [2,0,2]
Explanation:
- 3 * [8,5,8] = [24,15,24]. 2 products meet or exceed 16.
- 1 * [8,5,8] = [8,5,8]. 0 products meet or exceed 16.
- 2 * [8,5,8] = [16,10,16]. 2 products meet or exceed 16.
```

**Constraints**
- `n == spells.length`
- `m == potions.length`
- `1 <= n, m <= 10^5`
- `1 <= spells[i], potions[i] <= 10^5`
- `1 <= success <= 10^10`

## Approach

Brute force would compute every spell-potion product, `O(n * m)`, which is
too slow for `n, m` up to `10^5`.

Instead, sort `potions`. For a fixed spell strength `s`, we need to count
potions `p` such that `s * p >= success`, i.e. `p >= success / s`. Since
`potions` is sorted ascending, all potions from some index `idx` onward
satisfy this — `idx` is the first position where
`potions[idx] >= ceil(success / s)`, found with a binary search
(lower bound). The count of successful potions for that spell is then
`m - idx`.

To avoid floating point division issues with the threshold, compare using
multiplication instead: binary search for the leftmost index `idx` such
that `spells[i] * potions[idx] >= success`, comparing as 64-bit values
since `spells[i] * potions[j]` can be up to `10^10`.

Algorithm:
1. Sort `potions` ascending.
2. For each spell `s` in `spells`:
   - Binary search over `potions` for the leftmost index `idx` where
     `s * potions[idx] >= success`.
   - `pairs[i] = potions.length - idx`.
3. Return `pairs`.

## Complexity

- **Time:** `O((n + m) log m)` — sorting potions is `O(m log m)`, and each
  of the `n` spells runs an `O(log m)` binary search. Far better than the
  brute-force `O(n * m)` of checking every pair directly.
- **Space:** `O(m)` for the sorted copy of potions (or `O(log m)` extra if
  sorting in place), plus `O(n)` for the output array.

## Edge Cases

| Input | Expected | Why it matters |
| --- | --- | --- |
| `spells=[3], potions=[4], success=12` | `[1]` | Product exactly equals `success` — the `>=` boundary must count as successful. |
| `spells=[3], potions=[4], success=13` | `[0]` | Product one below `success` — the boundary must *not* count. |
| `spells=[2], potions=[5,5,5], success=10` | `[3]` | All potions equal and product exactly hits the threshold — every potion must be included, not just one. |
| `spells=[100000], potions=[100000], success=10000000000` | `[1]` | Max constraint values (`spells[i], potions[i] <= 1e5`, `success <= 1e10`) — product hits `1e10` exactly, checks no overflow/precision loss at the upper bound. |
| `spells=[1], potions=[1], success=1` | `[1]` | Minimum constraint values (`n=m=1`, `success=1`) — smallest possible valid input. |
