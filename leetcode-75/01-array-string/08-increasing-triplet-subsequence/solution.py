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


if __name__ == "__main__":
    sol = Solution()
    print(sol.increasingTriplet([1, 2, 3, 4, 5]))     # True
    print(sol.increasingTriplet([5, 4, 3, 2, 1]))     # False
    print(sol.increasingTriplet([2, 1, 5, 0, 4, 6]))  # True
