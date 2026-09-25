"""
LeetCode 1679. Max Number of K-Sum Pairs
https://leetcode.com/problems/max-number-of-k-sum-pairs/

Approach: sort nums, then use two pointers converging from the outside
in. If the pair sums to k, count it and move both pointers inward; if
the sum is too small, advance left; if too big, retreat right.

Time:  O(n log n) - dominated by the sort
Space: O(1) extra beyond the sort's own internal space
"""

from typing import List


class Solution:
    def maxOperations(self, nums: List[int], k: int) -> int:
        nums.sort()

        left, right = 0, len(nums) - 1
        count = 0

        while left < right:
            total = nums[left] + nums[right]

            if total == k:
                count += 1
                left += 1
                right -= 1
            elif total < k:
                left += 1
            else:
                right -= 1

        return count


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.maxOperations([1, 2, 3, 4], 5))       # 2
    print(sol.maxOperations([3, 1, 3, 4, 3], 6))    # 1

    # Edge cases
    assert_equal(sol.maxOperations([1, 2, 3], 100), 0, "no pair reaches k")
    assert_equal(sol.maxOperations([4, 4, 4, 4], 8), 2, "all elements identical")
    assert_equal(sol.maxOperations([3, 3, 3], 6), 1, "odd count of matching value")
    assert_equal(sol.maxOperations([1, 4], 5), 1, "minimal length-2 array that matches")
    assert_equal(sol.maxOperations([1, 2], 5), 0, "minimal length-2 array, no match")
