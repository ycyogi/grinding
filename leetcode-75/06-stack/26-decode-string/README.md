# 26. Decode String

- **LeetCode:** [394. Decode String](https://leetcode.com/problems/decode-string/)
- **Difficulty:** Medium
- **Category:** Stack
- **Pattern:** Stack of (previous-string, repeat-count) pairs for nested brackets

## Problem

Given an encoded string, return its decoded string.

The encoding rule is: `k[encoded_string]`, where the `encoded_string`
inside the square brackets is repeated exactly `k` times. Note that `k`
is guaranteed to be a positive integer.

You may assume that the input string is always valid: no extra white
spaces, square brackets are well-formed, etc. Furthermore, you may
assume that the original data does not contain any digits — digits are
only for those repeat numbers, `k`. For example, there will not be
input like `3a` or `2[4]`.

**Example 1**
```
Input:  s = "3[a]2[bc]"
Output: "aaabcbc"
```

**Example 2**
```
Input:  s = "3[a2[c]]"
Output: "accaccacc"
Explanation: the inner "2[c]" decodes to "cc" first, giving "3[acc]",
which then repeats "acc" three times.
```

**Constraints**
- `1 <= s.length <= 30`
- `s` consists of lowercase English letters, digits, and square
  brackets `'['` and `']'`.
- `s` is guaranteed to be **a valid** input.
- All the integers in `s` are in the range `[1, 300]`.

## Approach

Brackets nest, and the innermost bracket must always be decoded before
the one enclosing it — a last-in-first-out relationship — so this is a
stack problem. The specific technique is a **stack of
`(previousString, repeatCount)` pairs**: whenever we open a new bracket,
we "freeze" the string built so far and the multiplier that will apply
to whatever comes inside, and resume building a fresh string for the
bracket's contents.

Maintain a `currentString` (the string being built at the current
nesting level, starts as `""`) and a `currentNum` (the number being
parsed, starts as `0`), plus a stack.

Scan `s` left to right, one character at a time:

- **Digit:** a number can be multiple digits (e.g. `"12"`), so
  accumulate it: `currentNum = currentNum * 10 + digit`.
- **`'['`:** we're about to enter a new nesting level. Push the pair
  `(currentString, currentNum)` onto the stack — this remembers what to
  prepend and how many times to repeat once this bracket closes. Then
  reset `currentString = ""` and `currentNum = 0` to start building the
  bracket's contents fresh.
- **A letter:** append it to `currentString`.
- **`']'`:** we've finished a bracket's contents. Pop `(prevString, num)`
  from the stack, and set
  `currentString = prevString + currentString.repeat(num)` — this
  glues the just-finished, repeated substring onto whatever came before
  this bracket at the outer level.

After the whole string is scanned, `currentString` holds the fully
decoded result (there's nothing left on the stack because the input is
guaranteed well-formed).

Tracing `"3[a2[c]]"`: digit `3` -> `currentNum=3`; `[` -> push
`("", 3)`, reset; letter `a` -> `currentString="a"`; digit `2` ->
`currentNum=2`; `[` -> push `("a", 2)`, reset; letter `c` ->
`currentString="c"`; `]` -> pop `("a", 2)`, `currentString = "a" +
"c"*2 = "acc"`; `]` -> pop `("", 3)`, `currentString = "" + "acc"*3 =
"accaccacc"`.

## Complexity

- **Time:** `O(maxK * n)` where `n` is the length of `s` and `maxK` is
  the largest repeat count — in the worst case, building the repeated
  strings dominates, since each character can be duplicated up to the
  product of all enclosing repeat counts. For the given constraints
  (`s.length <= 30`, `k <= 300`) this is small in practice.
- **Space:** `O(maxK * n)` for the same reason — the stack holds
  intermediate strings, and the final decoded string can be much longer
  than the input.

## Edge Cases

| Input | Expected | Why it matters |
| --- | --- | --- |
| `s = "1[a]"` | `"a"` | Minimal repeat count (`k == 1`). |
| `s = "10[a]"` | `"a" * 10` (`"aaaaaaaaaa"`) | Multi-digit repeat count parsed correctly (`currentNum` must accumulate digit by digit, not just use the last digit). |
| `s = "100[leetcode]"` | `"leetcode" * 100` | Larger multi-digit count within the stated `k <= 300` bound, on a multi-character word. |
| `s = "xyz"` | `"xyz"` | No brackets at all: the string must pass through unchanged. |
| `s = "2[ab3[cd]]"` | `"abcdcdcdabcdcdcd"` | Nested brackets combined with a multi-digit inner count, verifying the stack correctly splices multiple nesting levels. |
