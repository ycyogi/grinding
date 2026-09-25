# 46. Evaluate Division

- **LeetCode:** [399. Evaluate Division](https://leetcode.com/problems/evaluate-division/)
- **Difficulty:** Medium
- **Category:** Graphs - DFS
- **Pattern:** Weighted graph traversal

## Problem

You are given an array of variable pairs `equations` and an array of
real numbers `values`, where `equations[i] = [Ai, Bi]` and `values[i]`
together represent the equation `Ai / Bi = values[i]`. Each `Ai` or
`Bi` is a string representing a single variable.

You are also given some `queries`, where `queries[j] = [Cj, Dj]`
represents the `j`-th query where you must find the answer for
`Cj / Dj = ?`.

Return the answers to all queries. If a single answer cannot be
determined, return `-1.0` for that query. If the answer does not exist
because at least one of `Cj` or `Dj` does not appear in any of the
input equations, that query's answer is also `-1.0`.

**Note:** The input is always valid — there are no contradictions and
no divide-by-zero situations.

**Example 1**
```
Input:  equations = [["a","b"],["b","c"]], values = [2.0,3.0],
        queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.0, 0.5, -1.0, 1.0, -1.0]
Explanation:
  a / b = 2.0, b / c = 3.0
  a / c = (a / b) * (b / c) = 2.0 * 3.0 = 6.0
  b / a = 1 / (a / b) = 1 / 2.0 = 0.5
  a / e = -1.0 (e is not in the graph)
  a / a = 1.0 (same variable, exists in the graph)
  x / x = -1.0 (x is not in the graph at all)
```

**Example 2**
```
Input:  equations = [["a","b"],["b","c"],["bc","cd"]],
        values = [1.5,2.5,5.0],
        queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
Output: [3.75, 0.4, 5.0, 0.2]
```

**Constraints**
- `1 <= equations.length <= 20`
- `equations[i].length == 2`
- `1 <= Ai.length, Bi.length <= 5`
- `values.length == equations.length`
- `0.0 < values[i] <= 20.0`
- `1 <= queries.length <= 20`
- `queries[i].length == 2`
- `1 <= Cj.length, Dj.length <= 5`
- `Ai, Bi, Cj, Dj` consist of lowercase English letters and digits.

## Approach

Model each equation `Ai / Bi = values[i]` as a **weighted, directed
edge** in a graph: `Ai -> Bi` with weight `values[i]`, and its inverse
`Bi -> Ai` with weight `1 / values[i]` (dividing by `Bi/Ai` the other
way around). A query `Cj / Dj` is then just "what's the product of edge
weights along a path from `Cj` to `Dj`?" — and since the graph is built
from consistent equations, any path between two connected nodes gives
the same product.

1. **Build the graph:** a map from variable to a list of
   `(neighbor, weight)` pairs, adding both directions for every
   equation as described above.
2. **For each query `[Cj, Dj]`:**
   - If `Cj` or `Dj` was never seen in any equation, the answer is
     `-1.0` immediately.
   - If `Cj === Dj` (and it exists in the graph), the answer is `1.0`.
   - Otherwise, run a DFS (or BFS) from `Cj`, multiplying edge weights
     along the way, until `Dj` is reached (using a `visited` set to
     avoid cycles) or the search is exhausted. If `Dj` is found, the
     accumulated product is the answer; if the search exhausts without
     reaching `Dj`, the answer is `-1.0` (the two variables are in
     disconnected parts of the graph).
3. Collect the answer for every query, in order, into the result array.

## Complexity

- **Time:** `O(Q * (V + E))` where `Q` is the number of queries, `V` is
  the number of distinct variables, and `E` is the number of equations
  — each query potentially triggers a full graph traversal. Given the
  tiny constraints (`<= 20` equations and queries), this is fast in
  practice even though a more advanced approach (Union-Find with
  weighted ratios) could answer each query in closer to `O(α(V))` after
  `O(V + E)` preprocessing.
- **Space:** `O(V + E)` for the adjacency list, plus `O(V)` for the
  visited set / recursion stack per query.
