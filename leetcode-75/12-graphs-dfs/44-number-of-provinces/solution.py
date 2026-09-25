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


if __name__ == "__main__":
    sol = Solution()
    print(sol.findCircleNum([[1, 1, 0], [1, 1, 0], [0, 0, 1]]))  # 2
    print(sol.findCircleNum([[1, 0, 0], [0, 1, 0], [0, 0, 1]]))  # 3
