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


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    spanner = StockSpanner()
    print(spanner.next(100))  # 1
    print(spanner.next(80))  # 1
    print(spanner.next(60))  # 1
    print(spanner.next(70))  # 2
    print(spanner.next(60))  # 1
    print(spanner.next(75))  # 4
    print(spanner.next(85))  # 6

    # Edge cases

    # Scenario: strictly increasing prices
    s1 = StockSpanner()
    assert_equal(s1.next(10), 1, "increasing: day1")
    assert_equal(s1.next(20), 2, "increasing: day2")
    assert_equal(s1.next(30), 3, "increasing: day3")
    assert_equal(s1.next(40), 4, "increasing: day4")

    # Scenario: strictly decreasing prices
    s2 = StockSpanner()
    assert_equal(s2.next(40), 1, "decreasing: day1")
    assert_equal(s2.next(30), 1, "decreasing: day2")
    assert_equal(s2.next(20), 1, "decreasing: day3")
    assert_equal(s2.next(10), 1, "decreasing: day4")

    # Scenario: all-equal prices
    s3 = StockSpanner()
    assert_equal(s3.next(50), 1, "equal prices: day1")
    assert_equal(s3.next(50), 2, "equal prices: day2")
    assert_equal(s3.next(50), 3, "equal prices: day3")

    # Scenario: single call on a fresh spanner
    s4 = StockSpanner()
    assert_equal(s4.next(100), 1, "single call")

    # Scenario: down then back up to match the earlier price exactly
    s5 = StockSpanner()
    assert_equal(s5.next(50), 1, "down-up: day1")
    assert_equal(s5.next(30), 1, "down-up: day2")
    assert_equal(s5.next(50), 3, "down-up: day3 (two-level absorption)")
