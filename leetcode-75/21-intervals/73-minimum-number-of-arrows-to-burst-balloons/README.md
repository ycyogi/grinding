# 73. Minimum Number of Arrows to Burst Balloons

- **LeetCode:** [452. Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/)
- **Difficulty:** Medium
- **Category:** Intervals
- **Pattern:** Sort by end + greedy arrow placement

## Problem

There are some spherical balloons taped onto a flat wall that represents
the XY-plane. The balloons are represented as a 2D integer array
`points` where `points[i] = [xstart, xend]` denotes a balloon whose
horizontal diameter stretches between `xstart` and `xend`. You do not
know the exact y-coordinates of the balloons.

Arrows can be shot up directly vertically (in the positive y-direction)
from different points along the x-axis. A balloon with `xstart` and
`xend` is **burst** by an arrow shot at `x` if `xstart <= x <= xend`.
There is no limit to the number of arrows that can be shot. A shot
arrow keeps traveling up infinitely, bursting any balloons it passes
through.

Given the array `points`, return the **minimum** number of arrows that
must be shot to burst all balloons.

**Example 1**
```
Input:  points = [[10,16],[2,8],[1,6],[7,12]]
Output: 2
Explanation: One arrow at x = 6 bursts [2,8] and [1,6].
Another arrow at x = 11 bursts [10,16] and [7,12].
```

**Example 2**
```
Input:  points = [[1,2],[3,4],[5,6],[7,8]]
Output: 4
Explanation: No two balloons overlap, so one arrow is needed per balloon.
```

**Constraints**
- `1 <= points.length <= 10^5`
- `points[i].length == 2`
- `-2^31 <= xstart < xend <= 2^31 - 1`

## Approach

This is a variant of the same greedy idea as "Non-overlapping
Intervals": sort by end coordinate and greedily decide when a new arrow
is required.

1. Sort balloons by their `xend`, ascending.
2. Shoot the first arrow at the end of the first (in sorted order)
   balloon: `arrowPos = points[0][1]`. Count `arrows = 1`.
3. For each subsequent balloon `[start, end]`:
   - If `start > arrowPos`, the current arrow doesn't reach this
     balloon (it starts after where the arrow was shot) — a new arrow
     is needed: increment `arrows` and move `arrowPos = end` (shoot the
     new arrow at *this* balloon's end, which is optimal because ending
     as early as possible maximizes the chance of also bursting future
     balloons).
   - Otherwise (`start <= arrowPos`), the existing arrow already bursts
     this balloon — no new arrow needed, and `arrowPos` stays where it
     was (do **not** move it forward to this balloon's larger end).
4. Return `arrows`.

Note: with coordinates up to `2^31 - 1`, be mindful of integer overflow
in languages with fixed-width integers (not an issue in JavaScript's
doubles or Python's arbitrary-precision integers).

## Complexity

- **Time:** `O(n log n)` — dominated by the sort; the greedy scan is
  `O(n)`.
- **Space:** `O(log n)` for the sort's internal space, `O(1)` extra
  otherwise.

## Edge Cases

| Input | Expected Output | Why it matters |
|---|---|---|
| `[[1,2],[2,3]]` | `1` | Balloons touching at a single point *are* poppable by one shared arrow — the opposite convention from problem 72's "touching is not overlapping" rule. |
| `[[5,10]]` | `1` | Minimum-size input (single balloon). |
| `[[3,6],[3,6],[3,6]]` | `1` | All-identical balloons; one arrow bursts every one of them. |
| `[[1,2],[2,3],[3,4],[4,5]]` | `2` | A chain of touching balloons does *not* always collapse to one arrow — an arrow at `x=2` only reaches `[1,2]` and `[2,3]`; `[3,4]` and `[4,5]` need a second arrow at `x=4`. |
| `[[-2147483648, 2147483647]]` | `1` | Extreme `int32` boundary coordinates; sanity-checks there's no overflow at the widest possible range. |
