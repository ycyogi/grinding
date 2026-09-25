"""
LeetCode 2462. Total Cost to Hire K Workers
https://leetcode.com/problems/total-cost-to-hire-k-workers/

Approach: two min-heaps (via heapq), one for the front "candidates"
window and one for the back window, each refilled from two pointers
(left, right) as workers are hired. Each round, hire the cheaper of
the two heap roots (ties favor the front/left heap), then refill that
heap from its side if any unused workers remain.

Time:  O(n + k log(candidates)) - priming + k rounds of heap ops
Space: O(candidates) - the two heaps
"""

import heapq
from typing import List


class Solution:
    def totalCost(self, costs: List[int], k: int, candidates: int) -> int:
        n = len(costs)
        left_heap: List[int] = []
        right_heap: List[int] = []
        left, right = 0, n - 1

        for _ in range(candidates):
            if left <= right:
                heapq.heappush(left_heap, costs[left])
                left += 1
            if left <= right:
                heapq.heappush(right_heap, costs[right])
                right -= 1

        total = 0

        for _ in range(k):
            can_use_right = len(right_heap) > 0
            can_use_left = len(left_heap) > 0

            if can_use_right and (not can_use_left or right_heap[0] < left_heap[0]):
                total += heapq.heappop(right_heap)
                if left <= right:
                    heapq.heappush(right_heap, costs[right])
                    right -= 1
            else:
                total += heapq.heappop(left_heap)
                if left <= right:
                    heapq.heappush(left_heap, costs[left])
                    left += 1

        return total


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.totalCost([17, 12, 10, 2, 7, 2, 11, 20, 8], 3, 4))  # 11
    print(sol.totalCost([1, 2, 4, 1], 3, 3))  # 4

    # Edge cases
    assert_equal(sol.totalCost([1, 3, 5, 7, 9], 2, 3), 4, "candidates > n/2, windows overlap")
    assert_equal(sol.totalCost([1, 3, 5, 7, 9], 5, 2), 25, "k=costs.length, hire everyone")
    assert_equal(sol.totalCost([4, 2], 1, 2), 2, "candidates==costs.length, full overlap on round 1")
    assert_equal(sol.totalCost([2, 5, 5, 2], 2, 1), 4, "tie in cost between front and back, index tie-break")
    assert_equal(sol.totalCost([7], 1, 1), 7, "single worker array")
