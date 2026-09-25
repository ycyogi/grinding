"""
LeetCode 2336. Smallest Number in Infinite Set
https://leetcode.com/problems/smallest-number-in-infinite-set/

Approach: track a watermark `next` for the smallest never-popped
integer, plus a min-heap (via heapq, with a companion membership set)
of numbers explicitly added back via addBack. popSmallest prefers the
heap's minimum if present, otherwise returns and advances `next`.

Time:  O(log m) per call - m is the number of re-added elements
Space: O(m) - heap + membership set
"""

import heapq
from typing import List


class SmallestInfiniteSet:
    def __init__(self):
        self.next = 1
        self.heap: List[int] = []
        self.in_heap = set()

    def popSmallest(self) -> int:
        if self.heap:
            smallest = heapq.heappop(self.heap)
            self.in_heap.discard(smallest)
            return smallest

        value = self.next
        self.next += 1
        return value

    def addBack(self, num: int) -> None:
        if num < self.next and num not in self.in_heap:
            heapq.heappush(self.heap, num)
            self.in_heap.add(num)


if __name__ == "__main__":
    s = SmallestInfiniteSet()
    s.addBack(2)
    print(s.popSmallest())  # 1
    print(s.popSmallest())  # 2
    print(s.popSmallest())  # 3
    s.addBack(1)
    print(s.popSmallest())  # 1
    print(s.popSmallest())  # 4
