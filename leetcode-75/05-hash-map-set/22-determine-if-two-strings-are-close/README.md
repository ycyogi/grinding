# 22. Determine if Two Strings Are Close

- **LeetCode:** [1657. Determine if Two Strings Are Close](https://leetcode.com/problems/determine-if-two-strings-are-close/)
- **Difficulty:** Medium
- **Category:** Hash Map / Set
- **Pattern:** Character-frequency signature comparison

## Problem

Two strings are considered **close** if you can attain one from the
other using the following operations, any number of times, in any order:

1. Swap any two **existing** characters (e.g. `"abcde"` -> `"aecdb"`).
2. Transform **every** occurrence of one existing character into another
   **existing** character, and do the same with the other character (e.g.
   all `'a'`s become `'b'`s and all the `'b'`s become `'a'`s at the same
   time).

You may use both operations as many times as necessary, on either
string.

Given two strings, `word1` and `word2`, return `true` if `word1` and
`word2` are close, and `false` otherwise.

**Example 1**
```
Input:  word1 = "abc", word2 = "bca"
Output: true
Explanation: swap characters to get from one to the other: "abc" -> "acb"
-> "bca".
```

**Example 2**
```
Input:  word1 = "cabbba", word2 = "abbccc"
Output: true
Explanation: word1 has frequencies a:1, b:3, c:2; word2 has frequencies
a:1, b:2, c:3. Renaming b <-> c turns word1's frequencies into
a:1, c:3, b:2, matching word2's multiset of frequencies {1,2,3} over the
same set of characters {a,b,c}.
```

**Constraints**
- `1 <= word1.length, word2.length <= 10^5`
- `word1` and `word2` consist of lowercase English letters.

## Approach

Operation 1 (swapping characters within a string) means the actual
*positions* of characters never matter — only how many times each
character occurs. Operation 2 (renaming one character to another
throughout the string) means the specific character *labels* attached to
each frequency don't matter either — only the **multiset of frequency
values**, and which set of characters is used, matter.

This gives a clean characterization: two strings are close if and only
if:

1. They use exactly the **same set of distinct characters**, and
2. The **multiset of character frequencies** is the same for both
   (e.g. frequencies `{a:1, b:3, c:2}` and `{a:1, b:2, c:3}` have the
   same multiset `{1, 2, 3}`, just assigned to different letters, which
   operation 2 can fix).

Algorithm:

1. Build a frequency map for `word1` and one for `word2` (e.g. counting
   only over the 26 lowercase letters).
2. Compare the **set of characters with non-zero frequency** in each map
   — if they differ, return `false` immediately (renaming can't invent
   or remove a character that isn't present in both).
3. Extract the frequency values from each map into a list, sort both
   lists, and compare them element-by-element — if they don't match,
   return `false`.
4. If both checks pass, return `true`.

## Complexity

- **Time:** `O(n + m + k log k)` where `n` and `m` are the string
  lengths and `k` is the alphabet size (here a constant, 26), dominated
  by the linear scans to build frequency maps and the sort of the
  frequency lists (`O(26 log 26)`, effectively constant). Overall this
  is `O(n + m)`.
- **Space:** `O(k)` — the frequency maps and sorted frequency lists are
  bounded by the 26-letter alphabet, independent of string length.
