"""
LeetCode 11. Container With Most Water
https://leetcode.com/problems/container-with-most-water/

Approach: two pointers starting at both ends of the array. Track the
best area seen, and always move the pointer at the shorter line
inward - moving the taller line's pointer could never improve on an
already-checked pair.

Time:  O(n) - each pointer moves inward at most n times total
Space: O(1) - a few scalar variables
"""

from typing import List


class Solution:
    def maxArea(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        best = 0

        while left < right:
            width = right - left
            h = min(height[left], height[right])
            best = max(best, width * h)

            if height[left] < height[right]:
                left += 1
            else:
                right -= 1

        return best


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))  # 49
    print(sol.maxArea([1, 1]))                        # 1

    # Edge cases
    assert_equal(sol.maxArea([5, 2]), 2, "min length n=2, distinct heights")
    assert_equal(sol.maxArea([4, 4, 4, 4]), 12, "all-equal heights, widest pair wins")
    assert_equal(sol.maxArea([0, 0, 0]), 0, "all-zero heights")
    assert_equal(sol.maxArea([1, 2, 3, 4, 5]), 6, "strictly increasing, optimal pair not the endpoints")
