"""
LeetCode 2300. Successful Pairs of Spells and Potions
https://leetcode.com/problems/successful-pairs-of-spells-and-potions/

Approach: sort potions, then for each spell binary search for the
leftmost potion whose product with the spell meets `success`; every
potion from that index onward also qualifies.

Time:  O((n + m) log m) - sort potions once, binary search per spell
Space: O(n) for the output array (sort can be done in place)
"""

from bisect import bisect_left
from typing import List


class Solution:
    def successfulPairs(
        self, spells: List[int], potions: List[int], success: int
    ) -> List[int]:
        sorted_potions = sorted(potions)
        m = len(sorted_potions)
        pairs = []

        for s in spells:
            lo, hi = 0, m
            while lo < hi:
                mid = lo + (hi - lo) // 2
                if s * sorted_potions[mid] >= success:
                    hi = mid
                else:
                    lo = mid + 1
            pairs.append(m - lo)

        return pairs


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.successfulPairs([5, 1, 3], [1, 2, 3, 4, 5], 7))  # [4, 0, 3]
    print(sol.successfulPairs([3, 1, 2], [8, 5, 8], 16))  # [2, 0, 2]

    # Edge cases
    assert_equal(
        sol.successfulPairs([3], [4], 12),
        [1],
        "product exactly equals success (boundary)",
    )
    assert_equal(
        sol.successfulPairs([3], [4], 13),
        [0],
        "product one below success (boundary)",
    )
    assert_equal(
        sol.successfulPairs([2], [5, 5, 5], 10),
        [3],
        "all potions equal, product exactly hits threshold",
    )
    assert_equal(
        sol.successfulPairs([100000], [100000], 10000000000),
        [1],
        "max constraint values, product exactly 1e10",
    )
    assert_equal(
        sol.successfulPairs([1], [1], 1),
        [1],
        "minimum constraint values (n=m=success=1)",
    )
