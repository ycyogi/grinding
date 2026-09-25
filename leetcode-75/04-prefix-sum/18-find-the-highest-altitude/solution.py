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


if __name__ == "__main__":
    sol = Solution()
    print(sol.largestAltitude([-5, 1, 5, 0, -7]))  # 1
    print(sol.largestAltitude([-4, -3, -2, -1, 4, 3, 2]))  # 0
