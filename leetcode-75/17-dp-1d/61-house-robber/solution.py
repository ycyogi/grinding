"""
LeetCode 198. House Robber
https://leetcode.com/problems/house-robber/

Approach: rolling-variable DP. dp[i] = max money from the first i
houses; dp[i] = max(dp[i-1], dp[i-2] + nums[i-1]) (skip vs rob current).

Time:  O(n) - one pass over the houses
Space: O(1) - two rolling variables instead of a full dp array
"""

from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
        prev2, prev1 = 0, 0  # best excluding / including the previous house

        for num in nums:
            curr = max(prev1, prev2 + num)
            prev2, prev1 = prev1, curr

        return prev1


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.rob([1, 2, 3, 1]))  # 4
    print(sol.rob([2, 7, 9, 3, 1]))  # 12

    # Edge cases
    assert_equal(sol.rob([5]), 5, "single house, must rob it")
    assert_equal(sol.rob([5, 10]), 10, "two houses, pick the max not the sum")
    assert_equal(sol.rob([4, 4, 4, 4]), 8, "all houses equal, even count")
    assert_equal(sol.rob([4, 4, 4]), 8, "all houses equal, odd count")
