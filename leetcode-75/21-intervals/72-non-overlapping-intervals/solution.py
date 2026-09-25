"""
LeetCode 435. Non-overlapping Intervals
https://leetcode.com/problems/non-overlapping-intervals/

Approach: sort intervals by end coordinate, then greedily keep an
interval whenever it starts at or after the end of the last kept
interval. Otherwise it overlaps and must be removed; when removing,
keep the smaller previous end since that leaves the most room for
future intervals.

Time:  O(n log n) - dominated by sorting
Space: O(log n) - sort's internal space (O(1) extra beyond that)
"""

from typing import List


class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        if not intervals:
            return 0

        intervals.sort(key=lambda interval: interval[1])

        removals = 0
        prev_end = intervals[0][1]

        for start, end in intervals[1:]:
            if start >= prev_end:
                prev_end = end
            else:
                removals += 1

        return removals


if __name__ == "__main__":
    sol = Solution()
    print(sol.eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]))  # 1
    print(sol.eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]))  # 2
