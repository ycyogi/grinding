# 1. Merge Strings Alternately

- **LeetCode:** [1768. Merge Strings Alternately](https://leetcode.com/problems/merge-strings-alternately/)
- **Difficulty:** Easy
- **Category:** Array / String
- **Pattern:** Two-pointer merge

## Problem

You are given two strings `word1` and `word2`. Merge the strings by adding
letters in alternating order, starting with `word1`. If one string is
longer than the other, append the extra letters onto the end of the
merged string.

Return the merged string.

**Example 1**
```
Input:  word1 = "abc", word2 = "pqr"
Output: "apbqcr"
```

**Example 2**
```
Input:  word1 = "ab", word2 = "pqrs"
Output: "apbqrs"
Explanation: after "ap" and "bq", word1 is exhausted, so "rs" is appended.
```

**Constraints**
- `1 <= word1.length, word2.length <= 100`
- `word1` and `word2` consist of lowercase English letters.

## Approach

Walk both strings with two indices `i` and `j` at the same time. On each
step, if `i` is still in range append `word1[i]`, then if `j` is still in
range append `word2[j]`. Stop once both indices have run past the end of
their strings — this naturally handles the "append the remainder" rule
without a separate pass.

Build the result in a list/array and join at the end rather than
concatenating strings in a loop, since repeated string concatenation is
O(n) per operation in most languages and would make the whole loop O(n²).

## Edge Cases

| Input | Expected | Why it matters |
|---|---|---|
| `word1="a", word2="b"` | `"ab"` | Minimum length (1) on both sides. |
| `word1="a", word2="bcde"` | `"abcde"` | `word1` exhausted almost immediately; rest of `word2` must be appended in order. |
| `word1="abcd", word2="e"` | `"aebcd"` | `word2` exhausted almost immediately; rest of `word1` must be appended in order. |
| `word1="aaa", word2="bbb"` | `"ababab"` | Equal lengths, no leftover tail on either side. |

## Complexity

- **Time:** `O(m + n)` — every character of both strings is visited once.
- **Space:** `O(m + n)` for the output buffer (excluding the output, extra
  space used is `O(1)`).
