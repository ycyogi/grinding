"""
LeetCode 136. Single Number
https://leetcode.com/problems/single-number/

Approach: XOR every number together. Pairs cancel out to 0 (x ^ x = 0),
and XORing with 0 is a no-op (x ^ 0 = x), so only the single leftover
value survives.

Time:  O(n) - one pass over the array
Space: O(1) - a single accumulator variable
"""

from typing import List


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        result = 0

        for num in nums:
            result ^= num

        return result


if __name__ == "__main__":
    sol = Solution()
    print(sol.singleNumber([2, 2, 1]))  # 1
    print(sol.singleNumber([4, 1, 2, 1, 2]))  # 4
