# 25. Asteroid Collision

- **LeetCode:** [735. Asteroid Collision](https://leetcode.com/problems/asteroid-collision/)
- **Difficulty:** Medium
- **Category:** Stack
- **Pattern:** Stack simulation with conditional resolution

## Problem

We are given an array `asteroids` of integers representing asteroids in
a row. For each asteroid, the absolute value represents its size, and
the sign represents its direction (positive meaning right, negative
meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two
asteroids meet, the smaller one will explode. If both are the same
size, both will explode. Two asteroids moving in the same direction will
never meet.

**Example 1**
```
Input:  asteroids = [5,10,-5]
Output: [5,10]
Explanation: the 10 and -5 collide, resulting in 10 (the -5 explodes
since it is smaller). The 5 and 10 never collide (same direction).
```

**Example 2**
```
Input:  asteroids = [8,-8]
Output: []
Explanation: the 8 and -8 collide and both explode (equal size).
```

**Constraints**
- `2 <= asteroids.length <= 10^4`
- `-1000 <= asteroids[i] <= 1000`
- `asteroids[i] != 0`

## Approach

Only a moving-right asteroid followed later by a moving-left asteroid
can ever collide (right-then-left is the only direction pair that
converges), and any chain of collisions resolves in last-in-first-out
order — the most recently surviving asteroid is the next one a new
left-mover would hit. That LIFO structure is exactly a stack.

1. Initialize an empty stack of surviving asteroid sizes (with sign).
2. Iterate through `asteroids` left to right. For each asteroid `a`:
   - If `a > 0` (moving right), it can never collide with anything
     already in the stack in this step (nothing behind it moving right
     catches up, and the stack only reflects survivors so far), so push
     it directly.
   - If `a < 0` (moving left), it may collide with asteroids at the top
     of the stack that are moving right. Repeat while the stack is
     non-empty, its top is positive, and the top's size is smaller than
     `abs(a)`: pop the top (it explodes) and continue checking the new
     top against the same incoming `a`.
   - After that loop, resolve based on what remains:
     - If the stack is empty, or its top is negative (moving left, so
       no collision), push `a` — it survived everything in its path.
     - Else if the top's size equals `abs(a)` exactly, both explode: pop
       the top and do **not** push `a`.
     - Else (the top is positive and strictly larger than `abs(a)`), `a`
       explodes on impact: do not push it, and leave the stack as is.
3. After processing every asteroid, the stack (bottom to top) is the
   final state, in original left-to-right order.

## Complexity

- **Time:** `O(n)` — although a single left-moving asteroid can pop
  multiple stack entries, each asteroid is pushed at most once and
  popped at most once overall, so the total work across the whole scan
  is linear (amortized analysis).
- **Space:** `O(n)` — the stack holds up to `n` surviving asteroids in
  the worst case (e.g. all moving the same direction).

## Edge Cases

| Input | Expected | Why it matters |
| --- | --- | --- |
| `asteroids = [10,-4,-3,-2]` | `[10]` | Chain reaction: one large survivor destroys several incoming asteroids of decreasing size in sequence. |
| `asteroids = [1,2,3]` | `[1,2,3]` | All moving right (same direction): nothing ever collides. |
| `asteroids = [-1,-2,-3]` | `[-1,-2,-3]` | All moving left (same direction): nothing ever collides. |
| `asteroids = [3,-3]` | `[]` | Equal-size collision: both asteroids explode, leaving nothing. |
| `asteroids = [1,-2,3,-4]` | `[-2,-4]` | Mixed sequence: a right-mover is destroyed by a bigger left-mover, then a fresh right/left pair is added after — no residual state leaks between collisions. |
