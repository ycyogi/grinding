# 15. Maximum Number of Vowels in a Substring of Given Length

- **LeetCode:** [1456. Maximum Number of Vowels in a Substring of Given Length](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/)
- **Difficulty:** Medium
- **Category:** Sliding Window
- **Pattern:** Fixed-size sliding window

## Problem

Given a string `s` and an integer `k`, return the maximum number of vowel
letters in any substring of `s` with length `k`.

Vowel letters in English are `'a'`, `'e'`, `'i'`, `'o'`, and `'u'`.

**Example 1**
```
Input:  s = "abciiidef", k = 3
Output: 3
Explanation: the substring "iii" contains 3 vowel letters.
```

**Example 2**
```
Input:  s = "leetcode", k = 3
Output: 2
Explanation: "lee", "eet" and "ode" each contain 2 vowels, which is the max.
```

**Constraints**
- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters.
- `1 <= k <= s.length`

## Approach

Another fixed-size sliding window: track how many vowels are currently
inside the window instead of recounting from scratch for every substring.

1. Precompute a helper (a small set or lookup) that tells whether a
   character is a vowel.
2. Build the first window by scanning indices `0` to `k - 1`, counting how
   many are vowels. Store this as `count` and initialize `maxCount` to it.
3. Slide the window one character at a time from index `k` to the end of
   the string:
   - If the character entering the window (`s[i]`) is a vowel, increment
     `count`.
   - If the character leaving the window (`s[i - k]`) is a vowel,
     decrement `count`.
   - Update `maxCount` if `count` is now larger.
4. Return `maxCount` after the scan finishes.

Because only the entering/leaving characters change the vowel count, each
slide is `O(1)`, avoiding the `O(k)` rescan that a brute-force approach
(checking every window independently) would require.

## Complexity

- **Time:** `O(n)` — the string is scanned once to build the first window
  and once more to slide through the rest; brute force would be
  `O(n * k)`.
- **Space:** `O(1)` — only a running counter and a max tracker are used
  (the vowel lookup set has constant size).
