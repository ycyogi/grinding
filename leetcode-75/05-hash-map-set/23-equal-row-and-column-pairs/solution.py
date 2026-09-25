"""
LeetCode 2352. Equal Row and Column Pairs
https://leetcode.com/problems/equal-row-and-column-pairs/

Approach: hash each row into a tuple signature and count occurrences.
For each column, build the same kind of signature and add however many
rows already share it, instead of comparing every row/column pair
directly (O(n^3)).

Time:  O(n^2) - building row and column signatures is O(n) each, n of them
Space: O(n^2) - the row-signature frequency map
"""

from collections import Counter
from typing import List


class Solution:
    def equalPairs(self, grid: List[List[int]]) -> int:
        n = len(grid)
        row_count = Counter(tuple(row) for row in grid)

        total = 0
        for j in range(n):
            col = tuple(grid[i][j] for i in range(n))
            total += row_count.get(col, 0)

        return total


if __name__ == "__main__":
    sol = Solution()
    print(sol.equalPairs([[3, 2, 1], [1, 7, 6], [2, 7, 7]]))  # 1
    print(
        sol.equalPairs(
            [[3, 1, 2, 2], [1, 4, 4, 5], [2, 4, 2, 2], [2, 4, 2, 2]]
        )
    )  # 3
