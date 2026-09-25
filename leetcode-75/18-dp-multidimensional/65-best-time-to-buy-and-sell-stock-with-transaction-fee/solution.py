"""
LeetCode 714. Best Time to Buy and Sell Stock with Transaction Fee
https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/

Approach: two-state rolling DP (cash vs. holding a share). Each day's
cash/hold only depends on the previous day's values, so roll them
forward in scalars instead of arrays.

Time:  O(n) - one pass over the prices
Space: O(1) - two rolling variables (cash, hold)
"""

from typing import List


class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        cash = 0
        hold = -prices[0]

        for price in prices[1:]:
            new_cash = max(cash, hold + price - fee)
            new_hold = max(hold, cash - price)
            cash, hold = new_cash, new_hold

        return cash


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.maxProfit([1, 3, 2, 8, 4, 9], 2))  # 8
    print(sol.maxProfit([1, 3, 7, 5, 10, 3], 3))  # 6

    # Edge cases
    assert_equal(sol.maxProfit([5], 0), 0, "single day, no transaction possible")
    assert_equal(sol.maxProfit([10, 5], 0), 0, "price only drops, never trade")
    assert_equal(sol.maxProfit([1, 3], 5), 0, "raw profit smaller than fee")
    assert_equal(sol.maxProfit([1, 5], 0), 4, "fee=0 boundary, full profit kept")
    assert_equal(
        sol.maxProfit([3, 3, 3, 3], 1),
        0,
        "flat prices with positive fee, never worth trading",
    )
