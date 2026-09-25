# 21. Unique Number of Occurrences

- **LeetCode:** [1207. Unique Number of Occurrences](https://leetcode.com/problems/unique-number-of-occurrences/)
- **Difficulty:** Easy
- **Category:** Hash Map / Set
- **Pattern:** Frequency count + uniqueness check

## Problem

Given an array of integers `arr`, return `true` if the number of
occurrences of each value in the array is **unique**, or `false`
otherwise.

**Example 1**
```
Input:  arr = [1,2,2,1,1,3]
Output: true
Explanation: 1 occurs 3 times, 2 occurs 2 times, 3 occurs 1 time. All
three occurrence counts (3, 2, 1) are different.
```

**Example 2**
```
Input:  arr = [1,2]
Output: false
Explanation: 1 and 2 both occur exactly once, so their occurrence counts
are not unique.
```

**Constraints**
- `1 <= arr.length <= 1000`
- `-1000 <= arr[i] <= 1000`

## Approach

Two hash-based passes: one to count occurrences, one to check that the
counts themselves have no duplicates.

1. Build a frequency map (`value -> count`) by scanning `arr` once,
   incrementing the count for each value seen.
2. Take all the count values out of the map and put them into a set.
3. Compare the size of that set to the number of distinct values in the
   frequency map (i.e. the number of entries in the map). If a count
   value repeated across two or more distinct array values, the set
   will have fewer elements than the map has entries — in that case
   return `false`. If the sizes match, every count is unique, so
   return `true`.

## Complexity

- **Time:** `O(n)` — one pass to build the frequency map, and a second
  pass over the (at most `n`) distinct counts to build the uniqueness
  set.
- **Space:** `O(n)` — the frequency map and the count set can each hold
  up to `n` entries in the worst case.

## Edge Cases

| Input | Expected | Why it matters |
| --- | --- | --- |
| `arr = [7]` | `true` | Minimum-size input: a single distinct value with count `1` is trivially unique. |
| `arr = [2,2,2,2]` | `true` | All elements the same: only one count value exists, so it's trivially unique. |
| `arr = [1,1,2,2]` | `false` | Two distinct values sharing the same occurrence count (`2` each). |
| `arr = [-1,-1,-2,-3,-3,-3]` | `true` | Negative numbers with distinct counts (`2`, `1`, `3`). |
| `arr = [1,2,3,1,2,3]` | `false` | Three distinct values that all share the same count (`2` each). |
