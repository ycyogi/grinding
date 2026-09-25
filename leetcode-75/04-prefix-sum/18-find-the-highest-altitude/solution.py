"""
LeetCode 1732. Find the Highest Altitude
https://leetcode.com/problems/find-the-highest-altitude/

Approach: running prefix sum. Accumulate the altitude point by point
from the gain array, tracking the maximum altitude seen so far.

Time:  O(n) - one pass over the gain array
Space: O(1) - a running total and a max tracker
"""

from typing import List


class Solution:
    def largestAltitude(self, gain: List[int]) -> int:
        altitude = 0
        max_altitude = 0

        for g in gain:
            altitude += g
            max_altitude = max(max_altitude, altitude)

        return max_altitude


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.largestAltitude([-5, 1, 5, 0, -7]))  # 1
    print(sol.largestAltitude([-4, -3, -2, -1, 4, 3, 2]))  # 0

    # Edge cases
    assert_equal(sol.largestAltitude([-1]), 0, "single negative gain")
    assert_equal(sol.largestAltitude([5]), 5, "single positive gain")
    assert_equal(sol.largestAltitude([-1, -1, -1]), 0, "monotonically decreasing")
    assert_equal(sol.largestAltitude([1, 2, 3]), 6, "monotonically increasing")
    assert_equal(sol.largestAltitude([100, -100, 100]), 100, "boundary gain values")
