"""
LeetCode 452. Minimum Number of Arrows to Burst Balloons
https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/

Approach: sort balloons by end coordinate. Shoot an arrow at the end
of the first balloon in a cluster; any later balloon whose start is
still <= that arrow's position is already burst. As soon as a
balloon starts after the current arrow, a new arrow is needed,
placed at that balloon's end.

Time:  O(n log n) - dominated by sorting
Space: O(log n) - sort's internal space (O(1) extra beyond that)
"""

from typing import List


class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        if not points:
            return 0

        points.sort(key=lambda p: p[1])

        arrows = 1
        arrow_pos = points[0][1]

        for start, end in points[1:]:
            if start > arrow_pos:
                arrows += 1
                arrow_pos = end

        return arrows


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.findMinArrowShots([[10, 16], [2, 8], [1, 6], [7, 12]]))  # 2
    print(sol.findMinArrowShots([[1, 2], [3, 4], [5, 6], [7, 8]]))  # 4

    # Edge cases
    assert_equal(
        sol.findMinArrowShots([[1, 2], [2, 3]]), 1, "balloons touching at a point"
    )
    assert_equal(sol.findMinArrowShots([[5, 10]]), 1, "single balloon")
    assert_equal(
        sol.findMinArrowShots([[3, 6], [3, 6], [3, 6]]), 1, "identical balloons"
    )
    assert_equal(
        sol.findMinArrowShots([[1, 2], [2, 3], [3, 4], [4, 5]]),
        2,
        "chain of touching balloons needs more than one arrow",
    )
    assert_equal(
        sol.findMinArrowShots([[-2147483648, 2147483647]]),
        1,
        "extreme int32 boundary coordinates",
    )
