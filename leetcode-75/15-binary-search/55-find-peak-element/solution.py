"""
LeetCode 162. Find Peak Element
https://leetcode.com/problems/find-peak-element/

Approach: binary search on the slope of the array. If nums[mid] <
nums[mid + 1] the array is rising, so a peak lies to the right;
otherwise it lies at mid or to the left.

Time:  O(log n) - the search window halves each iteration
Space: O(1) - only index variables are used
"""

from typing import List


class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        lo, hi = 0, len(nums) - 1

        while lo < hi:
            mid = lo + (hi - lo) // 2
            if nums[mid] < nums[mid + 1]:
                lo = mid + 1
            else:
                hi = mid

        return lo


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.findPeakElement([1, 2, 3, 1]))  # 2
    print(sol.findPeakElement([1, 2, 1, 3, 5, 6, 4]))  # 1 or 5

    # Edge cases
    assert_equal(sol.findPeakElement([1]), 0, "single-element array is trivially a peak")
    assert_equal(
        sol.findPeakElement([1, 2, 3, 4, 5]),
        4,
        "strictly ascending, peak at the last index",
    )
    assert_equal(
        sol.findPeakElement([5, 4, 3, 2, 1]),
        0,
        "strictly descending, peak at index 0",
    )
    assert_equal(sol.findPeakElement([1, 3, 2]), 1, "small interior peak")
