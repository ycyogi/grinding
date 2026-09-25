# 9. String Compression

- **LeetCode:** [443. String Compression](https://leetcode.com/problems/string-compression/)
- **Difficulty:** Medium
- **Category:** Array / String
- **Pattern:** In-place two-pointer (read/write) run-length encoding

## Problem

Given an array of characters `chars`, compress it in-place using the
following algorithm:

Begin with an empty string `s`. For each group of **consecutive
repeating characters** in `chars`:
- If the group's length is 1, append the character to `s`.
- Otherwise, append the character followed by the group's length.

The compressed string `s` should not be returned separately — it should
be stored **in the input character array `chars`**. Note that group
lengths that are 10 or longer will be split into multiple characters in
`chars` (each digit written separately).

After you are done modifying the input array, return the new length of
the array.

You must write an algorithm that uses only `O(1)` extra space.

**Example 1**
```
Input:  chars = ["a","a","b","b","c","c","c"]
Output: 6, chars is modified to ["a","2","b","2","c","3"]
```

**Example 2**
```
Input:  chars = ["a"]
Output: 1, chars is modified to ["a"]
```

**Example 3**
```
Input:  chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: 4, chars is modified to ["a","b","1","2"]
Explanation: the group "bbbbbbbbbbbb" has 12 b's, which is compressed to
"b12", written as the individual characters 'b', '1', '2'.
```

**Constraints**
- `1 <= chars.length <= 2000`
- `chars[i]` is a printable ASCII character.

## Approach

Use two pointers over the same array: a `read` pointer that scans through
groups of consecutive identical characters, and a `write` pointer that
writes the compressed output back into the front of the same array (this
is always safe since the compressed output is never longer than the
original group).

1. Initialize `read = 0`, `write = 0`.
2. While `read < chars.length`:
   a. Record `groupChar = chars[read]` and let `groupStart = read`.
   b. Advance `read` while `chars[read] === groupChar` (counting the
      group length as `read - groupStart`).
   c. Write `groupChar` at `chars[write]`, then increment `write`.
   d. If the group's count is greater than 1, convert the count to a
      string and write each digit character into successive
      `chars[write]` slots, incrementing `write` each time.
3. Return `write` (the new logical length of the array).

Because `write` never advances faster than `read` (a group of length `k`
is written as at most `1 + digits(k)` characters, and `1 + digits(k) <= k`
for all `k >= 1`, checked directly for small `k` and true in general
since digit count grows logarithmically), it's always safe to write
in-place without clobbering characters not yet read.

## Edge Cases

| Input | Expected | Why it matters |
|---|---|---|
| `["a"]*10` | length `3`, `["a","1","0"]` | A run of exactly 10 — the count first crosses into two digits. |
| `["b"]*9` | length `2`, `["b","9"]` | A run of exactly 9 — the single-digit boundary just below 10. |
| `["a","b","c"]` | length `3`, `["a","b","c"]` | No repeated characters at all — nothing compresses, every group has length 1. |
| `["a","b","a","b"]` | length `4`, `["a","b","a","b"]` | Alternating characters — every run has length 1 even though characters repeat overall. |
| `["c"]*11 + ["d"]` | length `4`, `["c","1","1","d"]` | A run just above the two-digit boundary (11), immediately followed by a singleton. |

## Complexity

- **Time:** `O(n)` — the `read` pointer visits every character exactly
  once; writing the (at most) few digits of a count is amortized `O(1)`
  per character since digit counts are bounded by `log10(n)`.
- **Space:** `O(1)` — compression happens in place in the input array;
  only a handful of scalar counters are used.
