"""
LeetCode 1431. Kids With the Greatest Number of Candies
https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/

Approach: find the current max in one pass, then check each kid against
`max` after adding extraCandies in a second pass.

Time:  O(n) - two linear passes over candies
Space: O(1) extra (excluding the required output array)
"""

from typing import List


class Solution:
    def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:
        max_candies = max(candies)
        return [c + extraCandies >= max_candies for c in candies]


if __name__ == "__main__":
    sol = Solution()
    print(sol.kidsWithCandies([2, 3, 5, 1, 3], 3))  # [True, True, True, False, True]
    print(sol.kidsWithCandies([4, 2, 1, 1, 2], 1))  # [True, False, False, False, False]
