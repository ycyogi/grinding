"""
LeetCode 933. Number of Recent Calls
https://leetcode.com/problems/number-of-recent-calls/

Approach: maintain a FIFO queue of request timestamps. Since t is
strictly increasing across calls, once a timestamp falls below
t - 3000 it can be popped off the front for good and never needs to
be reconsidered.

Time:  O(1) amortized per ping - each timestamp is pushed once and
       popped at most once over the life of the counter
Space: O(n) for the timestamps currently within the 3000ms window
"""

from collections import deque


class RecentCounter:
    def __init__(self):
        self.requests: deque[int] = deque()

    def ping(self, t: int) -> int:
        self.requests.append(t)

        while self.requests[0] < t - 3000:
            self.requests.popleft()

        return len(self.requests)


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    counter = RecentCounter()
    print(counter.ping(1))     # 1
    print(counter.ping(100))   # 2
    print(counter.ping(3001))  # 3
    print(counter.ping(3002))  # 3

    # Edge cases
    c1 = RecentCounter()
    assert_equal(c1.ping(1), 1, "single ping")

    c2 = RecentCounter()
    assert_equal(c2.ping(1), 1, "inclusive lower bound: ping(1)")
    assert_equal(c2.ping(3001), 2, "inclusive lower bound: ping(3001) keeps t=1")

    c3 = RecentCounter()
    assert_equal(c3.ping(1), 1, "exclusive boundary: ping(1)")
    assert_equal(c3.ping(3002), 1, "exclusive boundary: ping(3002) drops t=1")

    c4 = RecentCounter()
    assert_equal(c4.ping(1), 1, "sparse pings: ping(1)")
    assert_equal(c4.ping(5000), 1, "sparse pings: ping(5000)")
    assert_equal(c4.ping(10000), 1, "sparse pings: ping(10000)")

    c5 = RecentCounter()
    assert_equal(c5.ping(1), 1, "clustered pings: ping(1)")
    assert_equal(c5.ping(2), 2, "clustered pings: ping(2)")
    assert_equal(c5.ping(3), 3, "clustered pings: ping(3)")
