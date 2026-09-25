"""
LeetCode 724. Find Pivot Index
https://leetcode.com/problems/find-pivot-index/

Approach: compute the total sum once, then sweep left to right with a
running left sum, deriving the right sum as totalSum - leftSum - nums[i]
instead of recomputing it from scratch at every index.

Time:  O(n) - one pass for the total, one pass for the scan
Space: O(1) - a couple of running totals
"""

from typing import List


class Solution:
    def pivotIndex(self, nums: List[int]) -> int:
        total_sum = sum(nums)
        left_sum = 0

        for i, num in enumerate(nums):
            right_sum = total_sum - left_sum - num
            if left_sum == right_sum:
                return i
            left_sum += num

        return -1


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.pivotIndex([1, 7, 3, 6, 5, 6]))  # 3
    print(sol.pivotIndex([1, 2, 3]))  # -1

    # Edge cases
    assert_equal(sol.pivotIndex([5]), 0, "single-element array")
    assert_equal(sol.pivotIndex([0, -1, 1]), 0, "pivot at index 0")
    assert_equal(sol.pivotIndex([1, -1, 5]), 2, "pivot at last index")
    assert_equal(sol.pivotIndex([2, 3, 4]), -1, "no valid pivot")
    assert_equal(sol.pivotIndex([0, 0, 0, 0]), 0, "all-zero array, leftmost pivot")
