"""
LeetCode 1926. Nearest Exit from Entrance in Maze
https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/

Approach: single-source BFS from the entrance over the grid. BFS
guarantees the first border cell reached (that isn't the entrance)
is reached via the shortest path, since every move costs 1.

Time:  O(m * n) - each cell is enqueued and processed at most once
Space: O(m * n) - queue plus visited tracking
"""

from collections import deque
from typing import List


class Solution:
    def nearestExit(self, maze: List[List[str]], entrance: List[int]) -> int:
        m, n = len(maze), len(maze[0])
        start_row, start_col = entrance
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        visited = [[False] * n for _ in range(m)]
        visited[start_row][start_col] = True

        queue = deque([(start_row, start_col, 0)])

        while queue:
            row, col, steps = queue.popleft()

            for dr, dc in directions:
                new_row, new_col = row + dr, col + dc

                if (
                    new_row < 0
                    or new_row >= m
                    or new_col < 0
                    or new_col >= n
                    or visited[new_row][new_col]
                    or maze[new_row][new_col] == "+"
                ):
                    continue

                is_border = new_row == 0 or new_row == m - 1 or new_col == 0 or new_col == n - 1
                if is_border:
                    return steps + 1

                visited[new_row][new_col] = True
                queue.append((new_row, new_col, steps + 1))

        return -1


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(
        sol.nearestExit(
            [["+", "+", ".", "+"], [".", ".", ".", "+"], ["+", "+", "+", "."]], [1, 2]
        )
    )  # 1
    print(sol.nearestExit([["+", "+", "+"], [".", ".", "."], ["+", "+", "+"]], [1, 0]))  # 2

    # Edge cases
    assert_equal(sol.nearestExit([["."]], [0, 0]), -1, "single-cell maze, entrance is the only cell")

    assert_equal(
        sol.nearestExit([["+", "+", "+"], ["+", ".", "+"], ["+", "+", "+"]], [1, 1]),
        -1,
        "entrance boxed in on all 4 sides",
    )

    assert_equal(
        sol.nearestExit(
            [
                ["+", "+", "+", "+", "+"],
                ["+", ".", ".", ".", "+"],
                ["+", ".", "+", ".", "+"],
                ["+", ".", ".", ".", "+"],
                ["+", "+", "+", "+", "+"],
            ],
            [1, 1],
        ),
        -1,
        "fully enclosed inner room, no path to the outer border",
    )

    assert_equal(
        sol.nearestExit([[".", ".", ".", ".", "."]], [0, 0]),
        1,
        "single-row maze, entrance is itself on the border but excluded",
    )
