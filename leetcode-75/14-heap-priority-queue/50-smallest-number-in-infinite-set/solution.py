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


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    s = SmallestInfiniteSet()
    s.addBack(2)
    print(s.popSmallest())  # 1
    print(s.popSmallest())  # 2
    print(s.popSmallest())  # 3
    s.addBack(1)
    print(s.popSmallest())  # 1
    print(s.popSmallest())  # 4

    # Edge cases
    s1 = SmallestInfiniteSet()
    assert_equal(
        [s1.popSmallest(), s1.popSmallest(), s1.popSmallest()],
        [1, 2, 3],
        "no addBack, sequential pops return 1,2,3",
    )

    s2 = SmallestInfiniteSet()
    s2.addBack(5)  # never popped yet, must be a no-op
    assert_equal(
        [s2.popSmallest(), s2.popSmallest(), s2.popSmallest(), s2.popSmallest(), s2.popSmallest()],
        [1, 2, 3, 4, 5],
        "addBack a number never yet popped is a no-op",
    )

    s3 = SmallestInfiniteSet()
    s3.addBack(1)  # num == next (1), still a no-op
    assert_equal(s3.popSmallest(), 1, "addBack equal to current frontier is a no-op")

    s4 = SmallestInfiniteSet()
    s4.popSmallest()
    s4.popSmallest()
    s4.popSmallest()  # consumes 1, 2, 3; next = 4
    s4.addBack(1)
    s4.addBack(1)  # duplicate, should not double-insert
    assert_equal(
        [s4.popSmallest(), s4.popSmallest()],
        [1, 4],
        "duplicate addBack of already-popped number only re-adds once",
    )

    s5 = SmallestInfiniteSet()
    s5.popSmallest()
    s5.popSmallest()
    s5.popSmallest()  # consumes 1, 2, 3; next = 4
    s5.addBack(2)
    s5.addBack(1)
    assert_equal(
        [s5.popSmallest(), s5.popSmallest(), s5.popSmallest()],
        [1, 2, 4],
        "re-added numbers come out in ascending order, frontier resumes correctly",
    )
