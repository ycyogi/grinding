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


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


def _normalize(result):
    """Sort each inner list so order-independent output can be compared."""
    return [sorted(part) for part in result]


if __name__ == "__main__":
    sol = Solution()
    print(sol.findDifference([1, 2, 3], [2, 4, 6]))  # [[1, 3], [4, 6]]
    print(sol.findDifference([1, 2, 3, 3], [1, 1, 2, 2]))  # [[3], []]

    # Edge cases
    assert_equal(
        _normalize(sol.findDifference([1, 2, 3], [1, 2, 3])),
        [[], []],
        "identical arrays",
    )
    assert_equal(
        _normalize(sol.findDifference([1, 2], [3, 4])),
        [[1, 2], [3, 4]],
        "completely disjoint arrays",
    )
    assert_equal(
        _normalize(sol.findDifference([5, 5, 5], [5, 5])),
        [[], []],
        "duplicates-only input",
    )
    assert_equal(
        _normalize(sol.findDifference([1, 2, 3, 4], [2, 3])),
        [[1, 4], []],
        "one array is a subset of the other",
    )
    assert_equal(
        _normalize(sol.findDifference([-1, -2, -3], [-2, -4])),
        [[-3, -1], [-4]],
        "negative numbers",
    )
