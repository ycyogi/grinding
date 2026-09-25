# 18. Find the Highest Altitude

- **LeetCode:** [1732. Find the Highest Altitude](https://leetcode.com/problems/find-the-highest-altitude/)
- **Difficulty:** Easy
- **Category:** Prefix Sum
- **Pattern:** Running sum / prefix sum

## Problem

There is a biker going on a road trip. The road trip consists of `n + 1`
points at different altitudes. The biker starts his trip on point `0`
with altitude equal to `0`.

You are given an integer array `gain` of length `n` where `gain[i]` is
the **net gain in altitude** between points `i` and `i + 1` for all
`0 <= i < n`. Return the highest altitude of a point.

**Example 1**
```
Input:  gain = [-5,1,5,0,-7]
Output: 1
Explanation: the altitudes are [0,-5,-4,1,1,-6], the highest is 1.
```

**Example 2**
```
Input:  gain = [-4,-3,-2,-1,4,3,2]
Output: 0
Explanation: the altitudes are [0,-4,-7,-9,-10,-6,-3,-1], the highest is 0
(the starting point).
```

**Constraints**
- `n == gain.length`
- `1 <= n <= 100`
- `-100 <= gain[i] <= 100`

## Approach

This is a direct application of a running prefix sum. The altitude at
point `i + 1` is the altitude at point `i` plus `gain[i]`, so a single
pass that accumulates the sum while tracking the maximum seen so far
gives the answer without ever materializing the full altitude array.

1. Initialize `altitude = 0` (the starting point) and `maxAltitude = 0`
   (since point 0 is a candidate answer too).
2. For each value `g` in `gain`, add it to `altitude` to move to the
   next point, then update `maxAltitude` if `altitude` is now larger.
3. Return `maxAltitude` after processing every gain value.

There's no need to build and store an explicit prefix-sum array — a
single running variable is enough since only the maximum is needed, not
every intermediate value.

## Complexity

- **Time:** `O(n)` — one pass over the `gain` array.
- **Space:** `O(1)` — a running altitude and a max tracker; no auxiliary
  array is built.
