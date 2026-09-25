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


if __name__ == "__main__":
    sol = Solution()
    print(sol.tribonacci(4))  # 4
    print(sol.tribonacci(25))  # 1389537
