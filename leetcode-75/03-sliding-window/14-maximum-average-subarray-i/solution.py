"""
LeetCode 643. Maximum Average Subarray I
https://leetcode.com/problems/maximum-average-subarray-i/

Approach: fixed-size sliding window. Sum the first k elements, then
slide the window one step at a time, adding the entering element and
subtracting the leaving element to keep the window sum in O(1) per step.

Time:  O(n) - each element is added to and removed from the window once
Space: O(1) - only a running sum and a max tracker are kept
"""

from typing import List


class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        window_sum = sum(nums[:k])
        max_sum = window_sum

        for i in range(k, len(nums)):
            window_sum += nums[i] - nums[i - k]
            max_sum = max(max_sum, window_sum)

        return max_sum / k


if __name__ == "__main__":
    sol = Solution()
    print(sol.findMaxAverage([1, 12, -5, -6, 50, 3], 4))  # 12.75
    print(sol.findMaxAverage([5], 1))  # 5.0
