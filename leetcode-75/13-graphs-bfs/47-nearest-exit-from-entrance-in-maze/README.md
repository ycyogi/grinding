# 47. Nearest Exit from Entrance in Maze

- **LeetCode:** [1926. Nearest Exit from Entrance in Maze](https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/)
- **Difficulty:** Medium
- **Category:** Graphs - BFS
- **Pattern:** Multi-cell BFS shortest path

## Problem

You are given an `m x n` matrix `maze` (0-indexed) with empty cells
(represented as `'.'`) and walls (represented as `'+'`). You are also
given the `entrance` of the maze, where `entrance = [entrancerow,
entrancecol]` denotes the row and column of the cell you are initially
standing at.

In one step, you can move one cell up, down, left, or right. You cannot
step into a cell with a wall, and you cannot step outside the maze.
Your goal is to find the nearest **exit** from the `entrance`. An exit
is defined as an empty cell that is at the **border** of the `maze`
(i.e., in the first row, last row, first column, or last column) and is
**not** the `entrance` cell itself.

Return the number of steps in the shortest path from the `entrance` to
the nearest exit, or `-1` if no such path exists.

**Example 1**
```
Input:  maze = [["+","+",".","+"],
                [".",".",".","+"],
                ["+","+","+","."]],
        entrance = [1,2]
Output: 1
Explanation: There are 3 exits in this maze at [1,0], [0,2], and [2,3].
Starting at entrance [1,2], you can reach [0,2] (first row, so it's on
the border) by moving 1 step up. That is the nearest exit, so the
answer is 1.
```

**Example 2**
```
Input:  maze = [["+","+","+"],
                [".",".","."],
                ["+","+","+"]],
        entrance = [1,0]
Output: 2
Explanation: There is 1 exit in this maze at [1,2]. Entrance [1,0] is
adjacent to the border already but is itself an entrance (not counted
as an exit even though it's on the border). The path entrance -> [1,1]
-> [1,2] takes 2 steps.
```

**Constraints**
- `maze.length == m`
- `maze[i].length == n`
- `1 <= m, n <= 100`
- `maze[i][j]` is either `'.'` or `'+'`.
- `entrance.length == 2`
- `0 <= entrancerow < m`
- `0 <= entrancecol < n`
- `entrance` will always be an empty cell.

## Approach

Classic shortest-path-on-a-grid problem — BFS guarantees the first time
we reach any cell is via the shortest path to it (since all moves cost
1).

1. Initialize a queue with `(entrancerow, entrancecol, 0)` (row, col,
   steps), and mark that cell visited (e.g., overwrite it in the grid
   with `'+'`, or use a separate visited matrix).
2. While the queue is not empty:
   - Dequeue `(row, col, steps)`.
   - For each of the 4 orthogonal directions:
     - Compute `(newRow, newCol)`. Skip if out of bounds, a wall
       (`'+'`), or already visited.
     - If `(newRow, newCol)` is on the border (row is `0` or `m - 1`,
       or col is `0` or `n - 1`), it's an exit (it can't be the
       entrance, since the entrance is never re-visited) — return
       `steps + 1`.
     - Otherwise, mark it visited and enqueue `(newRow, newCol, steps
       + 1)`.
3. If the queue empties out without finding a border cell, return `-1`.

## Complexity

- **Time:** `O(m * n)` — each cell is enqueued and processed at most
  once.
- **Space:** `O(m * n)` — the queue can hold up to all cells in the
  worst case, plus the visited tracking.
