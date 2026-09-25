# 6. Reverse Words in a String

- **LeetCode:** [151. Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/)
- **Difficulty:** Medium
- **Category:** Array / String
- **Pattern:** Tokenize + reverse order

## Problem

Given an input string `s`, reverse the order of the **words**.

A word is defined as a sequence of non-space characters. The words in `s`
will be separated by at least one space. Return a string of the words in
reverse order, concatenated with a single space between each word.

Note: `s` may contain leading or trailing spaces, or multiple spaces
between two words. The returned string should only have a single space
separating words; it should not contain any leading or trailing spaces.

**Example 1**
```
Input:  s = "the sky is blue"
Output: "blue is sky the"
```

**Example 2**
```
Input:  s = "  hello world  "
Output: "world hello"
Explanation: leading/trailing spaces are removed from the reversed string.
```

**Example 3**
```
Input:  s = "a good   example"
Output: "example good a"
Explanation: multiple spaces between words are reduced to a single space.
```

**Constraints**
- `1 <= s.length <= 10^4`
- `s` contains English letters, digits, and spaces `' '`.
- There is at least one word in `s`.

## Approach

1. Split `s` on runs of whitespace (a regex like `/\s+/` handles single or
   multiple spaces uniformly).
2. Filter out any empty strings produced by leading/trailing whitespace.
3. Reverse the resulting list of words.
4. Join the reversed list with a single space.

This cleanly handles all the edge cases (leading spaces, trailing spaces,
multiple interior spaces) in one pass instead of special-casing them.

**Follow-up (in-place, O(1) extra space):** in languages with mutable
fixed-size char arrays (like C++), you can do this without extra space by
(a) reversing the entire character array, (b) reversing each word back to
normal order in place, and (c) doing a second pass to collapse multiple
spaces into one and trim the ends. JS/TS strings are immutable and
Python strings are immutable too, so the split/reverse/join approach
above is the idiomatic and effectively optimal solution in both
languages.

## Edge Cases

| Input | Expected | Why it matters |
|---|---|---|
| `s="hello"` | `"hello"` | Single word, no spaces at all — nothing to reverse or trim. |
| `s="  hello  "` | `"hello"` | Single word buried in leading/trailing spaces. |
| `s="a   b   c   d"` | `"d c b a"` | Several words separated by runs of multiple spaces. |
| `s="abc123 def456"` | `"def456 abc123"` | Words containing digits, per the constraint that `s` may hold letters and digits. |
| `s="  a  "` | `"a"` | Single-character word surrounded by padding. |

## Complexity

- **Time:** `O(n)` — splitting, filtering, reversing, and joining are all
  linear in the length of `s`.
- **Space:** `O(n)` for the list of words and the output string.
