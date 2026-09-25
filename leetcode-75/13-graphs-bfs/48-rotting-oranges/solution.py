"""
LeetCode 994. Rotting Oranges
https://leetcode.com/problems/rotting-oranges/

Approach: multi-source BFS starting from every rotten orange at
once, so each BFS "layer" corresponds exactly to one elapsed
minute. Track remaining fresh oranges; if any are left after the
BFS drains, they were unreachable.

Time:  O(m * n) - each cell is enqueued and processed at most once
Space: O(m * n) - queue can hold up to all cells
"""

from collections import deque
from typing import List


class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        queue = deque()
        fresh_count = 0

        for r in range(m):
            for c in range(n):
                if grid[r][c] == 2:
                    queue.append((r, c))
                elif grid[r][c] == 1:
                    fresh_count += 1

        if fresh_count == 0:
            return 0

        minutes = 0

        while queue and fresh_count > 0:
            batch_size = len(queue)
            rotted_this_minute = False

            for _ in range(batch_size):
                row, col = queue.popleft()

                for dr, dc in directions:
                    new_row, new_col = row + dr, col + dc

                    if (
                        0 <= new_row < m
                        and 0 <= new_col < n
                        and grid[new_row][new_col] == 1
                    ):
                        grid[new_row][new_col] = 2
                        fresh_count -= 1
                        queue.append((new_row, new_col))
                        rotted_this_minute = True

            if rotted_this_minute:
                minutes += 1

        return minutes if fresh_count == 0 else -1


if __name__ == "__main__":
    sol = Solution()
    print(sol.orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]))  # 4
    print(sol.orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]]))  # -1
