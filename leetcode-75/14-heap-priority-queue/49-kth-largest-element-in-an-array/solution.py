"""
LeetCode 215. Kth Largest Element in an Array
https://leetcode.com/problems/kth-largest-element-in-an-array/

Approach: maintain a min-heap of size k holding the k largest
elements seen so far (via Python's heapq module). Push every element,
and whenever the heap grows past size k, pop the minimum. At the end,
the heap's root is the k-th largest element overall.

Time:  O(n log k) - n insertions/evictions on a heap of size <= k
Space: O(k) - the heap
"""

import heapq
from typing import List


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        heap: List[int] = []

        for num in nums:
            heapq.heappush(heap, num)
            if len(heap) > k:
                heapq.heappop(heap)

        return heap[0]


if __name__ == "__main__":
    sol = Solution()
    print(sol.findKthLargest([3, 2, 1, 5, 6, 4], 2))  # 5
    print(sol.findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4))  # 4
