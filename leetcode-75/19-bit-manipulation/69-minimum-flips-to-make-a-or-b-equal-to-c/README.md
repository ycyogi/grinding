# 69. Minimum Flips to Make a OR b Equal to c

- **LeetCode:** [1318. Minimum Flips to Make a OR b Equal to c](https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/)
- **Difficulty:** Medium
- **Category:** Bit Manipulation
- **Pattern:** Bit-by-bit comparison

## Problem

Given 3 non-negative integers `a`, `b`, and `c`, return the minimum
number of flips required in some bits of `a` and `b` so that
`(a OR b) == c`. A "flip" changes a single bit from `0` to `1` or from
`1` to `0` in the binary representation of `a` or `b`.

**Example 1**
```
Input:  a = 2, b = 6, c = 5
Output: 3
Explanation: a = 010, b = 110, c = 101.
Bit 0: a and b are both 0 but c needs 1, so flip one bit there (1 flip).
Bit 1: a and b are both 1 but c needs 0, so flip both bits (2 flips).
Bit 2 already matches. Total: 1 + 2 = 3 flips.
```

**Example 2**
```
Input:  a = 4, b = 2, c = 7
Output: 1
Explanation: a = 100, b = 010, c = 111.
Only bit 0 is wrong (a and b both 0, c needs 1); flip one bit there.
Total: 1 flip.
```

**Constraints**
- `1 <= a, b, c <= 10^9`

## Approach

Process the numbers one bit at a time using shifts. For each bit
position, look at bit `a_i`, `b_i` of `a` and `b`, and bit `c_i` of `c`:

- If `c_i == 1`: we need `a_i OR b_i == 1`. If both `a_i` and `b_i` are
  `0`, we must flip exactly one of them to `1` — that costs `1` flip.
  Otherwise (at least one is already `1`) it costs `0`.
- If `c_i == 0`: we need `a_i OR b_i == 0`, i.e. both bits must be `0`.
  Every `1` bit among `a_i` and `b_i` needs to be flipped to `0` — that
  costs `a_i + b_i` flips (0, 1, or 2).

Sum these costs over all bit positions, looping while any of `a`, `b`,
`c` still has bits remaining (about 30 iterations for the given
constraints). Extract each bit with `& 1` and advance with a right
shift.

## Complexity

- **Time:** `O(log(max(a, b, c)))` — a constant number of bit positions
  (~30 for the given constraints) are examined once each.
- **Space:** `O(1)` — only a running counter and shifting integers.
