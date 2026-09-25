"""
LeetCode 62. Unique Paths
https://leetcode.com/problems/unique-paths/

Approach: grid DP where dp[i][j] = dp[i-1][j] + dp[i][j-1], rolled down
to a single 1D row updated in place since each row only needs the row
above it and the value just computed to its left.

Time:  O(m * n) - every cell computed once
Space: O(n) - one rolling row instead of a full 2D table
"""


class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        row = [1] * n

        for _ in range(1, m):
            for j in range(1, n):
                row[j] += row[j - 1]

        return row[-1]


if __name__ == "__main__":
    sol = Solution()
    print(sol.uniquePaths(3, 7))  # 28
    print(sol.uniquePaths(3, 2))  # 3
