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


if __name__ == "__main__":
    counter = RecentCounter()
    print(counter.ping(1))     # 1
    print(counter.ping(100))   # 2
    print(counter.ping(3001))  # 3
    print(counter.ping(3002))  # 3
