"""
LeetCode 1493. Longest Subarray of 1's After Deleting One Element
https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/

Approach: variable-size sliding window allowing at most one zero.
Since exactly one element must be deleted, the answer for each window
is (window length - 1); track the max of that value while sliding.

Time:  O(n) - left and right pointers each traverse the array once
Space: O(1) - a couple of pointers/counters
"""

from typing import List


class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        left = 0
        zeros = 0
        max_len = 0

        for right in range(len(nums)):
            if nums[right] == 0:
                zeros += 1

            while zeros > 1:
                if nums[left] == 0:
                    zeros -= 1
                left += 1

            max_len = max(max_len, right - left + 1 - 1)

        return max_len


if __name__ == "__main__":
    sol = Solution()
    print(sol.longestSubarray([1, 1, 0, 1]))  # 3
    print(sol.longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1]))  # 5
