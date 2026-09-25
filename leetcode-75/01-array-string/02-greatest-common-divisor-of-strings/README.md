# 2. Greatest Common Divisor of Strings

- **LeetCode:** [1071. Greatest Common Divisor of Strings](https://leetcode.com/problems/greatest-common-divisor-of-strings/)
- **Difficulty:** Easy
- **Category:** Array / String
- **Pattern:** String-divisibility check + numeric GCD

## Problem

For two strings `s` and `t`, we say `t` **divides** `s` if and only if
`s = t + t + ... + t` (`t` concatenated with itself one or more times).

Given two strings `str1` and `str2`, return the largest string `x` such
that `x` divides both `str1` and `str2`. If no such string exists, return
an empty string.

**Example 1**
```
Input:  str1 = "ABCABC", str2 = "ABC"
Output: "ABC"
```

**Example 2**
```
Input:  str1 = "ABABAB", str2 = "ABAB"
Output: "AB"
Explanation: "AB" repeated 3 times is "ABABAB"; repeated 2 times is "ABAB".
```

**Constraints**
- `1 <= str1.length, str2.length <= 1000`
- `str1` and `str2` consist of uppercase English letters.

## Approach

If a common "divisor" string `x` exists, then both `str1` and `str2` must
be built purely out of repeats of `x`. That forces `str1` and `str2` to
commute under concatenation: `str1 + str2 == str2 + str1`. This condition
is not just necessary but also sufficient — it's a classic string fact
(related to the periodicity lemma) that two strings have a common
"root" divisor exactly when they commute this way.

So the algorithm is:
1. Check whether `str1 + str2 === str2 + str1`. If not, no common divisor
   exists — return `""`.
2. If they do commute, the largest common divisor has length
   `gcd(len(str1), len(str2))` (the numeric greatest common divisor of the
   two lengths).
3. Return the prefix of `str1` (or `str2`, they'd agree) of that length.

Intuition for step 2: if `x` divides both strings, its length must divide
both `len(str1)` and `len(str2)`, so the *largest* possible length is
their numeric GCD, and the commuting check guarantees a divisor of
exactly that length actually works.

## Edge Cases

| Input | Expected | Why it matters |
|---|---|---|
| `str1="AAAAAA", str2="AAA"` | `"AAA"` | `str1` is an exact multiple of `str2`. |
| `str1="AAAAA", str2="AAAA"` | `"A"` | Coprime lengths (5, 4); the commuting check must still find the length-1 root. |
| `str1="A", str2="A"` | `"A"` | Minimum length (1) on both sides, equal strings. |
| `str1="AB", str2="BA"` | `""` | Same multiset of characters, different arrangement — a naive "shares characters" check would wrongly accept this; `str1+str2 != str2+str1`. |
| `str1="ABCDEF", str2="ABC"` | `""` | Same length ratio as a valid case, but different letters, so no divisor exists. |

## Complexity

- **Time:** `O(m + n)` — the concatenation/comparison in step 1 is
  `O(m + n)`, and computing the numeric GCD via the Euclidean algorithm is
  `O(log(min(m, n)))`, dominated by the string work.
- **Space:** `O(m + n)` for the two concatenated strings built during the
  commuting check.
