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


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.uniquePaths(3, 7))  # 28
    print(sol.uniquePaths(3, 2))  # 3

    # Edge cases
    assert_equal(sol.uniquePaths(1, 1), 1, "m=1, n=1: start equals end")
    assert_equal(
        sol.uniquePaths(1, 5), 1, "m=1: single row, only path is straight right"
    )
    assert_equal(
        sol.uniquePaths(5, 1), 1, "n=1: single column, only path is straight down"
    )
