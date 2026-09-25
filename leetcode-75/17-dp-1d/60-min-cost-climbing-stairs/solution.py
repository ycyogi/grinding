"""
LeetCode 746. Min Cost Climbing Stairs
https://leetcode.com/problems/min-cost-climbing-stairs/

Approach: rolling-variable DP where dp[i] = min cost to reach step i.
dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]); answer is dp[n].

Time:  O(n) - one pass computing each dp value once
Space: O(1) - two rolling variables instead of a full dp array
"""

from typing import List


class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        n = len(cost)
        prev2, prev1 = 0, 0  # dp[0], dp[1]

        for i in range(2, n + 1):
            curr = min(prev1 + cost[i - 1], prev2 + cost[i - 2])
            prev2, prev1 = prev1, curr

        return prev1


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.minCostClimbingStairs([10, 15, 20]))  # 15
    print(
        sol.minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])
    )  # 6

    # Edge cases
    assert_equal(sol.minCostClimbingStairs([0, 0]), 0, "min length, all-zero costs")
    assert_equal(
        sol.minCostClimbingStairs([10, 15]),
        10,
        "min length, start at index 0 and jump straight to top",
    )
    assert_equal(
        sol.minCostClimbingStairs([5, 5, 5, 5, 5]),
        10,
        "all-equal costs, start at index 1 and take two 2-step jumps",
    )
