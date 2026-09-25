"""
LeetCode 1004. Max Consecutive Ones III
https://leetcode.com/problems/max-consecutive-ones-iii/

Approach: variable-size sliding window. Expand the right edge always;
shrink from the left only while the window holds more than k zeros.
The window is always valid (<= k zeros) when its length is measured.

Time:  O(n) - left and right pointers each traverse the array once
Space: O(1) - a couple of pointers/counters
"""

from typing import List


class Solution:
    def longestOnes(self, nums: List[int], k: int) -> int:
        left = 0
        zeros = 0
        max_len = 0

        for right in range(len(nums)):
            if nums[right] == 0:
                zeros += 1

            while zeros > k:
                if nums[left] == 0:
                    zeros -= 1
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len


if __name__ == "__main__":
    sol = Solution()
    print(sol.longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2))  # 6
    print(
        sol.longestOnes(
            [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3
        )
    )  # 10
