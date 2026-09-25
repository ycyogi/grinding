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


if __name__ == "__main__":
    sol = Solution()
    print(sol.maxProfit([1, 3, 2, 8, 4, 9], 2))  # 8
    print(sol.maxProfit([1, 3, 7, 5, 10, 3], 3))  # 6
