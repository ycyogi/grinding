# 57. Letter Combinations of a Phone Number

- **LeetCode:** [17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)
- **Difficulty:** Medium
- **Category:** Backtracking
- **Pattern:** Backtracking over a fixed digit-to-letters mapping

## Problem

Given a string `digits` containing digits from `2` to `9` inclusive,
return all possible letter combinations that the number could represent.
Return the answer in **any order**.

A mapping of digits to letters (just like on telephone buttons) is given
below. Note that `1` does not map to any letters.

```
2 -> "abc"    3 -> "def"    4 -> "ghi"
5 -> "jkl"    6 -> "mno"    7 -> "pqrs"
8 -> "tuv"    9 -> "wxyz"
```

**Example 1**
```
Input:  digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

**Example 2**
```
Input:  digits = ""
Output: []
```

**Constraints**
- `0 <= digits.length <= 4`
- `digits[i]` is a digit in the range `['2', '9']`.

## Approach

This is a classic backtracking / decision-tree problem: at each digit we
choose one of its 3-4 letters, then recurse into the next digit. The
depth of the tree equals `digits.length`, and each node branches into as
many children as the current digit has letters.

Decision tree for `"23"`:
```
                root
        a        b        c        (digit '2')
      / | \    / | \    / | \
     d  e  f  d  e  f  d  e  f      (digit '3')
```
Each root-to-leaf path spells one combination (`"ad"`, `"ae"`, ...,
`"cf"`), giving `3 * 3 = 9` leaves — matching the expected output.

Algorithm:
1. If `digits` is empty, return `[]` immediately (no combinations, not
   even `[""]`).
2. Build the digit -> letters map.
3. Backtrack with a `path` (array/string builder) and an index `i` into
   `digits`:
   - Base case: if `i == digits.length`, `path` is a complete combination
     — add a copy of it to the results and return.
   - Otherwise, look up the letters for `digits[i]`. For each letter:
     append it to `path`, recurse with `i + 1`, then remove it (undo the
     choice) before trying the next letter — this is the "backtrack"
     step that lets the same `path` buffer be reused across branches.
4. Return the collected results.

No pruning is needed here since every path of full length is valid — the
"prune" for the empty-string edge case is handled up front.

## Complexity

- **Time:** `O(4^n * n)`, where `n = digits.length` — in the worst case
  every digit maps to 4 letters (7 and 9), so there are up to `4^n`
  combinations, each of length `n` to build/copy. This is optimal since
  the output itself can be that large; there's no faster-than-brute-force
  approach when you must enumerate every combination.
- **Space:** `O(n)` for the recursion depth and the `path` buffer,
  excluding the output (the output itself is `O(4^n * n)`).

## Edge Cases

| Input (`digits`) | Expected | Why it matters |
| --- | --- | --- |
| `""` | `[]` | Empty digits — must return an empty array, **not** `[""]`; the empty-input short-circuit is the whole point of this edge case. |
| `"2"` | `["a","b","c"]` | Single digit with 3 letters — checks the base case fires after depth 1 with no extra/missing combinations. |
| `"7"` | `["p","q","r","s"]` | Single digit with 4 letters (max branching factor) — smallest input that exercises the widest fan-out. |
| `"23"` | `["ad","ae","af","bd","be","bf","cd","ce","cf"]` | Already covered by the original example; order is deterministic here since letters are iterated from a fixed string, not a set. |
