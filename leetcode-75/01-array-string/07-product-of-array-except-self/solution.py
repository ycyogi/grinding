"""
LeetCode 238. Product of Array Except Self
https://leetcode.com/problems/product-of-array-except-self/

Approach: fill the output list with prefix products on a left-to-right
pass, then multiply in a running suffix product on a right-to-left pass.
Avoids division entirely so it works even when nums contains zeros.

Time:  O(n) - two linear passes over nums
Space: O(1) extra (excluding the required output list)
"""

from typing import List


class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        answer = [1] * n

        prefix = 1
        for i in range(n):
            answer[i] = prefix
            prefix *= nums[i]

        suffix = 1
        for i in range(n - 1, -1, -1):
            answer[i] *= suffix
            suffix *= nums[i]

        return answer


if __name__ == "__main__":
    sol = Solution()
    print(sol.productExceptSelf([1, 2, 3, 4]))       # [24, 12, 8, 6]
    print(sol.productExceptSelf([-1, 1, 0, -3, 3]))  # [0, 0, 9, 0, 0]
