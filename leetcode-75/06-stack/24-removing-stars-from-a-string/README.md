# 24. Removing Stars From a String

- **LeetCode:** [2390. Removing Stars From a String](https://leetcode.com/problems/removing-stars-from-a-string/)
- **Difficulty:** Medium
- **Category:** Stack
- **Pattern:** Stack-based cancellation

## Problem

You are given a string `s`, which contains stars `*`.

In one operation, you can:

- Choose a star in `s`.
- Remove the closest **non-star** character to its **left**, as well as
  remove the star itself.

Return the string after **all** stars have been removed.

**Note:**
- The input is generated such that the operation is always possible.
- It can be shown that the resulting string will always be unique.

**Example 1**
```
Input:  s = "leet**cod*e"
Output: "lecoe"
Explanation: the first '*' removes the 't' before it; the second '*'
then removes the 'e' before that; the third '*' removes the 'd' before
it. What remains, in order, is "lecoe" (see Approach for the full trace).
```

**Example 2**
```
Input:  s = "erase*****"
Output: ""
Explanation: each star removes the previous character; after 5 stars
remove the 5 preceding letters "erase", leaving an empty string.
```

**Constraints**
- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters and stars `*`.
- The operation above can be performed on `s`.

## Approach

Each star cancels exactly the most recently kept, non-star character —
which is a last-in-first-out relationship, so a stack is the natural
tool.

1. Initialize an empty stack (a list/array used as a stack).
2. Scan `s` left to right, one character at a time:
   - If the character is a regular lowercase letter, push it onto the
     stack.
   - If the character is a star `*`, pop the top of the stack (this
     removes the closest non-star character to the star's left, and the
     star itself is simply never pushed).
3. After processing the whole string, the stack contains exactly the
   surviving characters in order from bottom to top (i.e. left to
   right). Join the stack into a string and return it.

Tracing `"leet**cod*e"`: push `l,e,e,t` -> stack `[l,e,e,t]`; `*` pops
`t` -> `[l,e,e]`; `*` pops `e` -> `[l,e]`; push `c,o,d` -> `[l,e,c,o,d]`;
`*` pops `d` -> `[l,e,c,o]`; push `e` -> `[l,e,c,o,e]`. Result:
`"lecoe"`.

## Complexity

- **Time:** `O(n)` — every character causes exactly one push or one pop,
  so the whole string is processed in a single linear pass.
- **Space:** `O(n)` — the stack holds up to `n` characters in the worst
  case (a string with no stars).

## Edge Cases

| Input | Expected | Why it matters |
| --- | --- | --- |
| `s = "abc***"` | `""` | Consecutive stars remove multiple characters in a row (each pops the previous survivor). |
| `s = "a*"` | `""` | Minimal single-character-then-star case. |
| `s = "abcdef"` | `"abcdef"` | No stars at all: the string passes through unchanged. |
| `s = "ab*cd*"` | `"ac"` | Stars scattered non-adjacently, each removing a different, non-adjacent character. |
| `s = "ab*"` | `"a"` | Two-character prefix with a trailing star removing only the closest character. |

Note: the constraints guarantee "the operation above can be performed on `s`" — i.e. a star is never encountered with an empty stack (no star at the very start of a valid input), so that case is intentionally not exercised here.
