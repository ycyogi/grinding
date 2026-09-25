"""
LeetCode 1466. Reorder Routes to Make All Paths Lead to the City Zero
https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/

Approach: build an undirected adjacency list from the tree, tagging
each direction of traversal with a cost: walking an edge in its
original direction (away from the eventual root during outward
traversal) costs 1 (needs reversal); walking it backward costs 0.
DFS/BFS outward from city 0, summing costs.

Time:  O(n) - tree has n nodes, n - 1 edges
Space: O(n) - adjacency list, visited set, and stack/queue
"""

from typing import List


class Solution:
    def minReorder(self, n: int, connections: List[List[int]]) -> int:
        adj = [[] for _ in range(n)]

        for a, b in connections:
            adj[a].append((b, 1))  # original direction a -> b: needs reversal if walked outward
            adj[b].append((a, 0))  # reverse direction b -> a: already points toward root

        visited = [False] * n
        visited[0] = True
        stack = [0]
        changes = 0

        while stack:
            city = stack.pop()

            for neighbor, cost in adj[city]:
                if not visited[neighbor]:
                    visited[neighbor] = True
                    changes += cost
                    stack.append(neighbor)

        return changes


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.minReorder(6, [[0, 1], [1, 3], [2, 3], [4, 0], [4, 5]]))  # 3
    print(sol.minReorder(5, [[1, 0], [1, 2], [3, 2], [3, 4]]))  # 2

    # Edge cases
    assert_equal(sol.minReorder(1, []), 0, "n=1, no edges")
    assert_equal(sol.minReorder(2, [[1, 0]]), 0, "n=2, single edge already toward city 0")
    assert_equal(sol.minReorder(2, [[0, 1]]), 1, "n=2, single edge points away from city 0")
    assert_equal(
        sol.minReorder(5, [[1, 0], [2, 0], [3, 0], [4, 0]]),
        0,
        "star graph, every edge already points toward 0",
    )
    assert_equal(
        sol.minReorder(5, [[0, 1], [0, 2], [0, 3], [0, 4]]),
        4,
        "star graph, every edge points away from 0",
    )
