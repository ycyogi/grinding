# 44. Number of Provinces

- **LeetCode:** [547. Number of Provinces](https://leetcode.com/problems/number-of-provinces/)
- **Difficulty:** Medium
- **Category:** Graphs - DFS
- **Pattern:** Connected components (DFS/Union-Find)

## Problem

There are `n` cities. Some of them are connected, while some are not. If
city `a` is directly connected to city `b`, and city `b` is directly
connected to city `c`, then city `a` is connected to city `c` (even
though they are not directly connected).

A **province** is a group of directly or indirectly connected cities and
no other cities outside of the group.

You are given an `n x n` matrix `isConnected` where
`isConnected[i][j] = 1` if the `i`-th city and the `j`-th city are
directly connected, and `isConnected[i][j] = 0` otherwise.

Return the total number of provinces.

**Example 1**
```
Input:  isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
Explanation: Cities 0 and 1 are directly connected (one province);
city 2 is isolated (a second province).
```

**Example 2**
```
Input:  isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
Explanation: No city is connected to any other, so each city is its
own province.
```

**Constraints**
- `1 <= n <= 200`
- `n == isConnected.length == isConnected[i].length`
- `isConnected[i][j]` is `1` or `0`.
- `isConnected[i][i] == 1`
- `isConnected[i][j] == isConnected[j][i]`

## Approach

`isConnected` is really an adjacency matrix for an undirected graph
where cities are nodes. A "province" is exactly a **connected
component** of this graph, so the answer is just the number of
connected components.

1. Initialize a `visited` boolean array of size `n`, all `false`, and a
   counter `provinces = 0`.
2. For each city `i` from `0` to `n - 1`:
   - If city `i` hasn't been visited, it's the start of a brand-new
     province: increment `provinces`, then run a DFS (or BFS) from `i`,
     marking every city reachable from it (via `isConnected[i][j] == 1`
     edges) as visited.
3. Return `provinces`.

The DFS from a city `i` looks at row `isConnected[i]`, and for every
column `j` where `isConnected[i][j] == 1` and `j` is unvisited, marks
`j` visited and recurses into it.

(A Union-Find/DSU implementation is an equally valid and common
alternative: union every pair `(i, j)` with `isConnected[i][j] == 1`,
then count the number of distinct roots.)

## Edge Cases

| Input | Expected Output | Why it matters |
|---|---|---|
| `isConnected = [[1]]` (`n = 1`) | `1` | Smallest valid input; a single city is trivially its own (only) province. |
| `isConnected = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]` (identity matrix, all isolated) | `4` | No off-diagonal edges at all — every city is its own province; confirms the loop doesn't undercount when DFS from each city does nothing. |
| `isConnected = [[1,1,1],[1,1,1],[1,1,1]]` (fully connected) | `1` | Every city directly connected to every other; a single DFS from city 0 must mark the whole matrix visited. |
| `isConnected = [[1,1,0,0],[1,1,1,0],[0,1,1,1],[0,0,1,1]]` (a 4-city chain: 0-1, 1-2, 2-3, with city 0 and city 3 *not* directly connected) | `1` | Provinces are transitive even when the matrix itself has no direct `1` between the endpoints — tests that DFS actually chains through intermediate cities rather than only looking at direct pairs. |
| `isConnected = [[1,1,1,0,0],[1,1,1,0,0],[1,1,1,0,0],[0,0,0,1,1],[0,0,0,1,1]]` (two components of uneven size: 3 cities + 2 cities) | `2` | Multiple components of different sizes in one input — checks the outer loop correctly restarts DFS for the second group after finishing the first. |

## Complexity

- **Time:** `O(n^2)` — we inspect every entry of the `n x n` matrix once
  across all DFS calls combined (each city's row is scanned when it is
  first visited).
- **Space:** `O(n)` for the `visited` array and the DFS recursion stack.
