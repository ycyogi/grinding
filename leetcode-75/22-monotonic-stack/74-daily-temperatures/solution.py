"""
LeetCode 739. Daily Temperatures
https://leetcode.com/problems/daily-temperatures/

Approach: monotonic decreasing stack of indices. Push each day's
index; whenever the current temperature exceeds the temperature at
the index on top of the stack, pop it and record the day gap.

Time:  O(n) - each index pushed and popped at most once (amortized)
Space: O(n) - stack + output array in the worst case
"""

from typing import List


class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        answer = [0] * n
        stack: List[int] = []  # indices, temperatures strictly decreasing

        for i, temp in enumerate(temperatures):
            while stack and temp > temperatures[stack[-1]]:
                j = stack.pop()
                answer[j] = i - j
            stack.append(i)

        return answer


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))
    # [1, 1, 4, 2, 1, 1, 0, 0]
    print(sol.dailyTemperatures([30, 40, 50, 60]))
    # [1, 1, 1, 0]

    # Edge cases
    assert_equal(
        sol.dailyTemperatures([100, 90, 80, 70]), [0, 0, 0, 0], "strictly decreasing"
    )
    assert_equal(
        sol.dailyTemperatures([30, 40, 50, 60, 70]),
        [1, 1, 1, 1, 0],
        "strictly increasing",
    )
    assert_equal(sol.dailyTemperatures([50]), [0], "single element")
    assert_equal(
        sol.dailyTemperatures([70, 70, 70, 70]), [0, 0, 0, 0], "all equal temperatures"
    )
    assert_equal(
        sol.dailyTemperatures([70, 70, 75]), [2, 1, 0], "plateau then rise"
    )
