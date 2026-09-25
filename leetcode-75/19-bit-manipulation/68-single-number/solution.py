"""
LeetCode 136. Single Number
https://leetcode.com/problems/single-number/

Approach: XOR every number together. Pairs cancel out to 0 (x ^ x = 0),
and XORing with 0 is a no-op (x ^ 0 = x), so only the single leftover
value survives.

Time:  O(n) - one pass over the array
Space: O(1) - a single accumulator variable
"""

from typing import List


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        result = 0

        for num in nums:
            result ^= num

        return result


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.singleNumber([2, 2, 1]))  # 1
    print(sol.singleNumber([4, 1, 2, 1, 2]))  # 4

    # Edge cases
    assert_equal(sol.singleNumber([5]), 5, "single-element array")
    assert_equal(sol.singleNumber([-1, -1, -2]), -2, "negative numbers")
    assert_equal(sol.singleNumber([0, 0, 7]), 7, "zero as a paired value")
    assert_equal(
        sol.singleNumber([-30000, -30000, 30000]), 30000, "singleton at upper bound"
    )
    assert_equal(
        sol.singleNumber([30000, -30000, 30000, -30000, -1]),
        -1,
        "both extremes paired, negative singleton",
    )
