# 11. Is Subsequence

- **LeetCode:** [392. Is Subsequence](https://leetcode.com/problems/is-subsequence/)
- **Difficulty:** Easy
- **Category:** Two Pointers
- **Pattern:** Two-pointer greedy matching

## Problem

Given two strings `s` and `t`, return `true` if `s` is a subsequence of
`t`, or `false` otherwise.

A subsequence of a string is a new string that is formed from the
original string by deleting some (can be none) of the characters without
disturbing the relative positions of the remaining characters (i.e.,
`"ace"` is a subsequence of `"abcde"` while `"aec"` is not).

**Example 1**
```
Input:  s = "abc", t = "ahbgdc"
Output: true
```

**Example 2**
```
Input:  s = "axc", t = "ahbgdc"
Output: false
```

**Constraints**
- `0 <= s.length <= 100`
- `0 <= t.length <= 10^4`
- `s` and `t` consist only of lowercase English letters.
- Follow up: if there are lots of incoming `s`'s, say `s1, s2, ..., sk`
  where `k >= 10^9`, and you want to check one by one if `t` has its
  subsequence, how would you change your code?

## Approach

Use two pointers, `i` for `s` and `j` for `t`, both starting at `0`:

1. Walk `j` through `t` from left to right.
2. Whenever `t[j] === s[i]`, that character of `s` has been matched —
   advance `i` as well.
3. Regardless of whether it matched, advance `j` every step.
4. Stop early if `i` reaches `s.length` (every character has been
   matched, so `s` is definitely a subsequence).
5. At the end, `s` is a subsequence of `t` if and only if `i ===
   s.length` — i.e., every character of `s` was matched in order.

This greedy approach works because for subsequence matching, always
taking the *earliest* possible match in `t` for the current character of
`s` can never do worse than waiting for a later occurrence — it only
leaves more of `t` available for the remaining characters of `s`.

**Follow-up note:** when checking many different `s`'s against the same
fixed `t`, precompute, for each of the 26 letters, a sorted list of
indices in `t` where that letter occurs. Then for each `s`, binary-search
for the next valid index in `t` at or after the current position for each
character — this turns each subsequence check into `O(|s| log |t|)`
instead of `O(|t|)`, which is a big win when `t` is large and there are
many queries.

## Complexity

- **Time:** `O(|t|)` — the two-pointer scan visits each character of `t`
  at most once (and stops early if `s` is fully matched).
- **Space:** `O(1)` — only the two index pointers are used, no extra data
  structures.
