"""
LeetCode 2215. Find the Difference of Two Arrays
https://leetcode.com/problems/find-the-difference-of-two-arrays/

Approach: build a hash set from each array, then compute the two-way
set difference using O(1) average membership checks instead of a
brute-force nested-loop comparison.

Time:  O(m + n) - building the sets and filtering each is linear
Space: O(m + n) - two sets plus the output lists
"""

from typing import List


class Solution:
    def findDifference(
        self, nums1: List[int], nums2: List[int]
    ) -> List[List[int]]:
        set1 = set(nums1)
        set2 = set(nums2)

        return [list(set1 - set2), list(set2 - set1)]


if __name__ == "__main__":
    sol = Solution()
    print(sol.findDifference([1, 2, 3], [2, 4, 6]))  # [[1, 3], [4, 6]]
    print(sol.findDifference([1, 2, 3, 3], [1, 1, 2, 2]))  # [[3], []]
