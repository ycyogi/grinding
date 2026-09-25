"""
LeetCode 338. Counting Bits
https://leetcode.com/problems/counting-bits/

Approach: DP using the lowest-set-bit trick. i & (i - 1) clears the
lowest set bit of i, so ans[i] = ans[i & (i - 1)] + 1.

Time:  O(n) - each entry computed in O(1) from a smaller entry
Space: O(n) for the output array (O(1) extra beyond the output)
"""

from typing import List


class Solution:
    def countBits(self, n: int) -> List[int]:
        ans = [0] * (n + 1)

        for i in range(1, n + 1):
            ans[i] = ans[i & (i - 1)] + 1

        return ans


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.countBits(2))  # [0, 1, 1]
    print(sol.countBits(5))  # [0, 1, 1, 2, 1, 2]

    # Edge cases
    assert_equal(sol.countBits(0), [0], "n=0 minimum size")
    assert_equal(sol.countBits(1), [0, 1], "n=1")
    assert_equal(
        sol.countBits(8),
        [0, 1, 1, 2, 1, 2, 2, 3, 1],
        "n=8 powers of two have count 1",
    )
    big = sol.countBits(100000)
    assert_equal(len(big), 100001, "n=100000 output length")
    assert_equal(big[100000], 6, "n=100000 popcount of upper bound")
