# 48. Rotting Oranges

- **LeetCode:** [994. Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)
- **Difficulty:** Medium
- **Category:** Graphs - BFS
- **Pattern:** Multi-source BFS

## Problem

You are given an `m x n` grid where each cell can have one of three
values:

- `0` representing an empty cell,
- `1` representing a fresh orange, or
- `2` representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a
rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has
a fresh orange. If this is impossible, return `-1`.

**Example 1**
```
Input:  grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
Explanation:
Minute 0: [[2,1,1],[1,1,0],[0,1,1]]
Minute 1: [[2,2,1],[2,1,0],[0,1,1]]
Minute 2: [[2,2,2],[2,2,0],[0,1,1]]
Minute 3: [[2,2,2],[2,2,0],[0,2,1]]
Minute 4: [[2,2,2],[2,2,0],[0,2,2]]
All oranges are rotten after 4 minutes.
```

**Example 2**
```
Input:  grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is
never rotten, because rotting only spreads 4-directionally, and the
cell below it is empty (0), disconnecting it from any rotten orange.
```

**Constraints**
- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 10`
- `grid[i][j]` is `0`, `1`, or `2`.

## Approach

This is a **multi-source BFS**: instead of starting from a single cell,
we start from *every* rotten orange simultaneously, since they all rot
their neighbors in the same minute.

1. Scan the grid once: push the coordinates of every rotten orange
   (`2`) into a queue, and count the total number of fresh oranges
   (`1`).
2. If there are no fresh oranges to begin with, return `0` immediately.
3. Run a level-by-level (minute-by-minute) BFS:
   - While the queue is not empty and there are still fresh oranges
     left:
     - Record the current queue length (all cells at this "minute").
     - For each cell in that batch, check its 4 neighbors; for any
       neighbor that is a fresh orange, turn it rotten (`grid[r][c] =
       2`), decrement the fresh orange counter, and enqueue it.
     - After processing the whole batch, if we enqueued anything new,
       increment the minute counter.
4. After the BFS finishes, if the fresh orange counter is `0`, return
   the minute counter; otherwise, some oranges were unreachable, so
   return `-1`.

The key trick is starting the BFS with *all* rotten oranges in the
queue at once (rather than one), which makes the BFS "layers" line up
exactly with elapsed minutes.

## Complexity

- **Time:** `O(m * n)` — every cell is enqueued and processed at most
  once.
- **Space:** `O(m * n)` — the queue can hold up to all cells in the
  worst case.
