"""
LeetCode 1137. N-th Tribonacci Number
https://leetcode.com/problems/n-th-tribonacci-number/

Approach: rolling-variable DP. Each term only depends on the previous
three, so track a sliding window of three values instead of a full array.

Time:  O(n) - one pass computing each term once
Space: O(1) - three rolling variables
"""


class Solution:
    def tribonacci(self, n: int) -> int:
        if n == 0:
            return 0
        if n == 1 or n == 2:
            return 1

        a, b, c = 0, 1, 1
        for _ in range(3, n + 1):
            a, b, c = b, c, a + b + c

        return c


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.tribonacci(4))  # 4
    print(sol.tribonacci(25))  # 1389537

    # Edge cases
    assert_equal(sol.tribonacci(0), 0, "n=0 base case (T0)")
    assert_equal(sol.tribonacci(1), 1, "n=1 base case (T1)")
    assert_equal(sol.tribonacci(2), 1, "n=2 base case (T2)")
    assert_equal(sol.tribonacci(3), 2, "n=3, first value computed via the loop")
    assert_equal(sol.tribonacci(37), 2082876103, "n=37, max n per constraints")
