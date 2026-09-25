"""
LeetCode 2542. Maximum Subsequence Score
https://leetcode.com/problems/maximum-subsequence-score/

Approach: sort indices by nums2 descending so that, while scanning,
the current nums2 value is always the minimum among everything
processed so far. Maintain a min-heap (via heapq) of the k largest
nums1 values seen so far (with a running sum); whenever the heap
holds exactly k values, sum * currentNums2 is a valid candidate score.

Time:  O(n log n) - dominated by the initial sort
Space: O(n) - sorted pairs, plus O(k) for the heap
"""

import heapq
from typing import List


class Solution:
    def maxScore(self, nums1: List[int], nums2: List[int], k: int) -> int:
        pairs = sorted(zip(nums1, nums2), key=lambda p: -p[1])

        heap: List[int] = []
        total = 0
        best = 0

        for n1, n2 in pairs:
            heapq.heappush(heap, n1)
            total += n1

            if len(heap) > k:
                total -= heapq.heappop(heap)

            if len(heap) == k:
                best = max(best, total * n2)

        return best


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.maxScore([1, 3, 3, 2], [2, 1, 3, 4], 3))  # 12
    print(sol.maxScore([4, 2, 3, 1, 1], [7, 5, 10, 9, 6], 1))  # 30

    # Edge cases
    assert_equal(sol.maxScore([1, 2, 3], [3, 2, 1], 3), 6, "k=n, must select every index")
    assert_equal(sol.maxScore([5, 2, 9], [1, 10, 2], 1), 20, "k=1, reduces to max pairwise product")
    assert_equal(sol.maxScore([3, 1, 2], [5, 5, 5], 2), 25, "all nums2 values tied")
    assert_equal(sol.maxScore([0, 0, 0], [3, 1, 2], 2), 0, "all nums1 values are 0")
    assert_equal(sol.maxScore([10, 10], [0, 5], 2), 0, "nums2 includes the boundary value 0")
