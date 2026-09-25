# 74. Daily Temperatures

- **LeetCode:** [739. Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)
- **Difficulty:** Medium
- **Category:** Monotonic Stack
- **Pattern:** Monotonic decreasing stack of indices

## Problem

Given an array of integers `temperatures` representing the daily
temperatures, return an array `answer` such that `answer[i]` is the
number of days you have to wait after the `i`-th day to get a warmer
temperature. If there is no future day for which this is possible, keep
`answer[i] == 0` instead.

**Example 1**
```
Input:  temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
```

**Example 2**
```
Input:  temperatures = [30,40,50,60]
Output: [1,1,1,0]
```

**Constraints**
- `1 <= temperatures.length <= 10^5`
- `30 <= temperatures[i] <= 100`

## Approach

Brute force checks, for every day, every future day until a warmer one
is found — `O(n²)` worst case (e.g. strictly decreasing temperatures).
We can do it in one pass with a monotonic stack.

Maintain a stack of **indices** whose temperatures are in strictly
decreasing order from bottom to top (i.e. the temperature at the index
on top of the stack is the smallest of those still "waiting" for a
warmer day).

Walk through the array left to right with index `i` and temperature
`t`:
1. While the stack is non-empty **and** `t` is greater than the
   temperature at the index on top of the stack: pop that index `j` off
   the stack — day `i` is the answer for day `j`, so set
   `answer[j] = i - j`.
2. Push `i` onto the stack (it's now waiting for a future warmer day).

Any index still on the stack at the end never found a warmer day, so its
`answer` entry correctly stays `0` (the array's initial value).

Each index is pushed exactly once and popped at most once, so the total
work across the whole scan is linear.

## Complexity

- **Time:** `O(n)` — each index is pushed and popped from the stack at
  most once, despite the nested `while` loop (amortized analysis),
  versus `O(n²)` for the brute-force nested-loop approach.
- **Space:** `O(n)` for the stack in the worst case (e.g. strictly
  decreasing temperatures, where nothing gets popped until the end)
  plus the output array.
