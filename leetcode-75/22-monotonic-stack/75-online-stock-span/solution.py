"""
LeetCode 901. Online Stock Span
https://leetcode.com/problems/online-stock-span/

Approach: monotonic non-increasing stack of (price, span) pairs.
Each next() call pops every stack entry whose price is <= today's
price, folding its span into today's, since those days are now
covered by today's larger-or-equal price too.

Time:  O(1) amortized per call - each entry pushed once, popped once
Space: O(n) for the stack in the worst case
"""

from typing import List, Tuple


class StockSpanner:
    def __init__(self) -> None:
        self.stack: List[Tuple[int, int]] = []  # (price, span)

    def next(self, price: int) -> int:
        span = 1

        while self.stack and self.stack[-1][0] <= price:
            _, prev_span = self.stack.pop()
            span += prev_span

        self.stack.append((price, span))
        return span


if __name__ == "__main__":
    spanner = StockSpanner()
    print(spanner.next(100))  # 1
    print(spanner.next(80))  # 1
    print(spanner.next(60))  # 1
    print(spanner.next(70))  # 2
    print(spanner.next(60))  # 1
    print(spanner.next(75))  # 4
    print(spanner.next(85))  # 6
