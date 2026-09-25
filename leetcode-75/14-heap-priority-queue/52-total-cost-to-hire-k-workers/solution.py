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


if __name__ == "__main__":
    sol = Solution()
    print(sol.totalCost([17, 12, 10, 2, 7, 2, 11, 20, 8], 3, 4))  # 11
    print(sol.totalCost([1, 2, 4, 1], 3, 3))  # 4
