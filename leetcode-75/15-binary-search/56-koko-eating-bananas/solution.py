"""
LeetCode 875. Koko Eating Bananas
https://leetcode.com/problems/koko-eating-bananas/

Approach: binary search on the answer (eating speed k). hours(k) is
monotonically non-increasing in k, so binary search for the smallest k
where hours(k) <= h.

Time:  O(n log m) - O(log m) speeds tried, each scanning n piles
Space: O(1) - only scalar variables beyond the input
"""

import math
from typing import List


class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        def hours_needed(k: int) -> int:
            return sum(math.ceil(pile / k) for pile in piles)

        lo, hi = 1, max(piles)

        while lo < hi:
            mid = lo + (hi - lo) // 2
            if hours_needed(mid) <= h:
                hi = mid
            else:
                lo = mid + 1

        return lo


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.minEatingSpeed([3, 6, 7, 11], 8))  # 4
    print(sol.minEatingSpeed([30, 11, 23, 4, 20], 5))  # 30

    # Edge cases
    assert_equal(sol.minEatingSpeed([5], 1), 5, "single pile, h=1")
    assert_equal(
        sol.minEatingSpeed([3, 6, 7, 11], 4),
        11,
        "h == piles.length, k must be max(piles)",
    )
    assert_equal(sol.minEatingSpeed([1], 1), 1, "minimum piles and h")
    assert_equal(
        sol.minEatingSpeed([1000000000], 1),
        1000000000,
        "single pile at max constraint value",
    )
