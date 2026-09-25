# 5. Reverse Vowels of a String

- **LeetCode:** [345. Reverse Vowels of a String](https://leetcode.com/problems/reverse-vowels-of-a-string/)
- **Difficulty:** Easy
- **Category:** Array / String
- **Pattern:** Two-pointer swap

## Problem

Given a string `s`, reverse only the vowels of the string and return it.

The vowels are `'a'`, `'e'`, `'i'`, `'o'`, `'u'`, and they can appear in
both lower and upper case, more than once.

**Example 1**
```
Input:  s = "IceCreAm"
Output: "AceCreIm"
Explanation: The vowels in "IceCreAm" are ['I', 'e', 'e', 'A']. Reversed,
they become ['A', 'e', 'e', 'I'], and inserted back at the same positions.
```

**Example 2**
```
Input:  s = "leetcode"
Output: "leotcede"
```

**Constraints**
- `1 <= s.length <= 3 * 10^5`
- `s` consists of printable ASCII characters.

## Approach

Use two pointers, `left` starting at index `0` and `right` starting at
the last index, moving toward each other:

1. Advance `left` forward while `s[left]` is not a vowel.
2. Move `right` backward while `s[right]` is not a vowel.
3. Once both `left` and `right` point at vowels (and `left < right`),
   swap the characters at those two positions, then move `left` forward
   one and `right` backward one.
4. Stop when `left >= right`.

Because strings are immutable in both JS/TS and Python, do the swapping
on a mutable character array (or list), then join it back into a string
at the end.

## Edge Cases

| Input | Expected | Why it matters |
|---|---|---|
| `s="grrl"` | `"grrl"` | No vowels at all — pointers cross without ever swapping. |
| `s="aeiou"` | `"uoiea"` | Every character is a vowel — degenerates to a full string reversal. |
| `s="a"` | `"a"` | Single-character string (minimum length) — loop body never runs. |
| `s="AEIOUaeiou"` | `"uoieaUOIEA"` | Mixed-case vowels; case must travel with the character being swapped in, not the position. |
| `s="xyzaxyz"` | `"xyzaxyz"` | Exactly one vowel, in the middle — both pointers converge on it and no swap happens. |

## Complexity

- **Time:** `O(n)` — each pointer moves across the string at most once,
  so the total work across both pointers is linear.
- **Space:** `O(n)` for the mutable character buffer used to perform the
  swaps (the two index pointers themselves are `O(1)` extra).
