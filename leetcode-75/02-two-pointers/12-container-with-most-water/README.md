# 12. Container With Most Water

- **LeetCode:** [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/)
- **Difficulty:** Medium
- **Category:** Two Pointers
- **Pattern:** Two-pointer shrink-from-the-outside

## Problem

You are given an integer array `height` of length `n`. There are `n`
vertical lines drawn such that the two endpoints of the `i`-th line are
`(i, 0)` and `(i, height[i])`.

Find two lines that, together with the x-axis, form a container that
holds the most water.

Return the maximum amount of water a container can store.

Note: you may not slant the container — it's formed by two vertical
lines and the segment of the x-axis between them.

**Example 1**
```
Input:  height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: the lines at index 1 (height 8) and index 8 (height 7) form
a container of width 8-1=7 and height min(8,7)=7, holding 49 units of water.
```

**Example 2**
```
Input:  height = [1,1]
Output: 1
```

**Constraints**
- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`

## Approach

Brute force checks every pair of lines, `O(n^2)`. The optimal approach
uses two pointers starting at the two ends of the array and moves them
inward:

1. Set `left = 0`, `right = n - 1`, `maxArea = 0`.
2. While `left < right`:
   - Compute the area for the current pair:
     `width = right - left`, `h = min(height[left], height[right])`,
     `area = width * h`. Update `maxArea` if this is bigger.
   - Move inward whichever pointer points at the **shorter** line:
     if `height[left] < height[right]`, do `left++`; otherwise `right--`.
3. Return `maxArea` once `left` meets `right`.

Why it's safe to discard the shorter line's current pointer position:
the area for any container is bounded by `width * min(leftHeight,
rightHeight)`. If we move the pointer at the *taller* line inward
instead, the width only shrinks while the limiting height can only stay
the same or get smaller (since it was already capped by the shorter
line) — so that move could never produce a better result than what we
already checked. Moving the shorter line's pointer, on the other hand,
is the only move that has a chance of finding a taller limiting height
to compensate for the reduced width. So the greedy "always move the
shorter side" rule never discards a potentially optimal pair.

## Edge Cases

| Input | Expected | Why it matters |
|---|---|---|
| `height=[5,2]` | `2` | Minimum length `n=2` with distinct heights — width is fixed at 1. |
| `height=[4,4,4,4]` | `12` | All-equal heights — the widest pair should win, and equal heights must not stall the pointer movement. |
| `height=[0,0,0]` | `0` | All-zero heights — no container can ever hold water. |
| `height=[1,2,3,4,5]` | `6` | Strictly increasing heights — the optimal pair (`2` and `5`, area `3*2=6`) is not the two array endpoints. |

## Complexity

- **Time:** `O(n)` — each pointer moves inward at most `n` times total,
  so the two-pointer scan does one pass over the array. Contrast with the
  brute-force `O(n^2)` check of every pair.
- **Space:** `O(1)` — only a few scalar variables are used.
