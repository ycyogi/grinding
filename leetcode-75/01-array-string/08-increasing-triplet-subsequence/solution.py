"""
LeetCode 334. Increasing Triplet Subsequence
https://leetcode.com/problems/increasing-triplet-subsequence/

Approach: greedily track the smallest value seen so far (`first`) and
the smallest value seen so far that is greater than some earlier
`first` (`second`). Any number that beats both completes a triplet.

Time:  O(n) - single pass over nums
Space: O(1) - two scalar variables
"""

from typing import List


class Solution:
    def increasingTriplet(self, nums: List[int]) -> bool:
        first = float("inf")
        second = float("inf")

        for num in nums:
            if num <= first:
                first = num
            elif num <= second:
                second = num
            else:
                return True

        return False


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.increasingTriplet([1, 2, 3, 4, 5]))     # True
    print(sol.increasingTriplet([5, 4, 3, 2, 1]))     # False
    print(sol.increasingTriplet([2, 1, 5, 0, 4, 6]))  # True

    # Edge cases
    assert_equal(sol.increasingTriplet([2, 1]), False, "length-2 array")
    assert_equal(sol.increasingTriplet([7]), False, "single-element array")
    assert_equal(sol.increasingTriplet([1, 1, 1]), False, "all duplicates")
    assert_equal(sol.increasingTriplet([1, 2, 2, 3]), True, "duplicate middle value")
    assert_equal(sol.increasingTriplet([20, 100, 10, 12, 5, 13]), True, "early pair undercut later")
