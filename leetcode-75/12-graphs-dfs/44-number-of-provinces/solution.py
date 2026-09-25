"""
LeetCode 547. Number of Provinces
https://leetcode.com/problems/number-of-provinces/

Approach: isConnected is an adjacency matrix; a "province" is a
connected component. Run DFS from every unvisited city, marking all
cities reachable from it, and count how many DFS runs we start.

Time:  O(n^2) - every matrix entry is inspected once overall
Space: O(n) - visited array + recursion stack
"""

from typing import List


class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        visited = [False] * n
        provinces = 0

        def dfs(city: int) -> None:
            visited[city] = True
            for neighbor in range(n):
                if isConnected[city][neighbor] == 1 and not visited[neighbor]:
                    dfs(neighbor)

        for city in range(n):
            if not visited[city]:
                provinces += 1
                dfs(city)

        return provinces


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.findCircleNum([[1, 1, 0], [1, 1, 0], [0, 0, 1]]))  # 2
    print(sol.findCircleNum([[1, 0, 0], [0, 1, 0], [0, 0, 1]]))  # 3

    # Edge cases
    assert_equal(sol.findCircleNum([[1]]), 1, "n=1, single city")

    assert_equal(
        sol.findCircleNum(
            [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1],
            ]
        ),
        4,
        "identity matrix, all isolated",
    )

    assert_equal(
        sol.findCircleNum(
            [
                [1, 1, 1],
                [1, 1, 1],
                [1, 1, 1],
            ]
        ),
        1,
        "fully connected",
    )

    assert_equal(
        sol.findCircleNum(
            [
                [1, 1, 0, 0],
                [1, 1, 1, 0],
                [0, 1, 1, 1],
                [0, 0, 1, 1],
            ]
        ),
        1,
        "transitive chain, endpoints not directly connected",
    )

    assert_equal(
        sol.findCircleNum(
            [
                [1, 1, 1, 0, 0],
                [1, 1, 1, 0, 0],
                [1, 1, 1, 0, 0],
                [0, 0, 0, 1, 1],
                [0, 0, 0, 1, 1],
            ]
        ),
        2,
        "two components of uneven size",
    )
