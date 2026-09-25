# 45. Reorder Routes to Make All Paths Lead to the City Zero

- **LeetCode:** [1466. Reorder Routes to Make All Paths Lead to the City Zero](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/)
- **Difficulty:** Medium
- **Category:** Graphs - DFS
- **Pattern:** Tree DFS with edge direction tracking

## Problem

There are `n` cities numbered from `0` to `n - 1` and `n - 1` roads such
that there is only one way to travel between two different cities (this
network forms a tree if we ignore direction). Last year, the ministry
decided to orient the roads in one direction, since they are too narrow.

Roads are represented by `connections` where
`connections[i] = [a_i, b_i]` represents a road from city `a_i` to city
`b_i`.

This year, there is a big event and all cities *must* be able to reach
the capital, city `0`. Your task is to reorient (change direction of)
the minimum number of roads so that each city can reach city `0`.

Return the minimum number of edges that need to be changed.

It's guaranteed that every city can reach city `0` after reorienting.

**Example 1**
```
Input:  n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]

    3 <- 1 <- 0 <- 4 -> 5
    ^
    |
    2

Output: 3
Explanation: Change the direction of edges [1,3], [2,3], and [4,5] so
that every city can reach city 0. The road [4,0] already points at 0
and needs no change.
```

**Example 2**
```
Input:  n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
Output: 2
Explanation: Change the direction of edges [3,2] and [3,4] so cities
2, 3, and 4 can all reach city 0 (via 1). Roads [1,0] and [1,2] already
point in a direction that helps reach 0.
```

**Constraints**
- `2 <= n <= 5 * 10^4`
- `connections.length == n - 1`
- `connections[i].length == 2`
- `0 <= a_i, b_i <= n - 1`
- `a_i != b_i`

## Approach

Ignoring direction, the roads form a tree rooted (conceptually) at city
`0`. For every city to reach `0`, every edge on the path from that city
up to `0` must point *toward* `0` (i.e., from child to parent). Any
edge currently pointing *away* from `0` (parent to child) must be
reversed. So we need to count, over all tree edges, how many point
"the wrong way" when the tree is rooted at `0`.

1. Build an undirected adjacency list, but tag each edge with whether
   traversing it in a given direction requires a reversal:
   - For each `[a, b]` in `connections` (meaning the original road goes
     `a -> b`): add `(b, cost=1)` to `adj[a]` (if we walk from `a` to
     `b` while exploring outward from the root, that means the road
     currently points the same way we're walking — away from `0` — so
     it costs `1` to fix), and add `(a, cost=0)` to `adj[b]` (walking
     from `b` to `a` outward from the root means the road already
     points back toward the root — no cost).
2. Run BFS (or DFS) starting at city `0`, treating the graph as
   undirected via the adjacency list built above. Maintain a `visited`
   set (crucial since the underlying graph is undirected — without it
   we'd immediately backtrack along the edge we just came from).
3. Each time we move from a visited node to a new node, add the edge's
   associated cost (`0` or `1`) to a running total.
4. After the traversal finishes (every node is reachable, per the
   problem's guarantee), return the running total.

## Complexity

- **Time:** `O(n)` — the graph is a tree with `n` nodes and `n - 1`
  edges; BFS/DFS visits each node and edge a constant number of times.
- **Space:** `O(n)` — adjacency list storage plus the visited set and
  BFS queue / DFS stack.
