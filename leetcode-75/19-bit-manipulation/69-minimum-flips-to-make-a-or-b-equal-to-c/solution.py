"""
LeetCode 1318. Minimum Flips to Make a OR b Equal to c
https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/

Approach: examine a, b, c one bit at a time. If the target bit is 1,
pay 1 flip only when both a and b bits are 0. If the target bit is 0,
pay for every 1 bit among a and b (0, 1, or 2 flips) since both must
become 0.

Time:  O(log(max(a, b, c))) - a constant number of bit positions
Space: O(1) - a running counter and shifting integers
"""


class Solution:
    def minFlips(self, a: int, b: int, c: int) -> int:
        flips = 0

        while a > 0 or b > 0 or c > 0:
            a_bit = a & 1
            b_bit = b & 1
            c_bit = c & 1

            if c_bit == 1:
                flips += 1 if a_bit == 0 and b_bit == 0 else 0
            else:
                flips += a_bit + b_bit

            a >>= 1
            b >>= 1
            c >>= 1

        return flips


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.minFlips(2, 6, 5))  # 3
    print(sol.minFlips(4, 2, 7))  # 1

    # Edge cases
    assert_equal(sol.minFlips(0, 0, 0), 0, "all zero")
    assert_equal(sol.minFlips(1, 1, 0), 2, "both bits set, target 0 (2 flips)")
    assert_equal(sol.minFlips(1, 0, 0), 1, "one bit set, target 0")
    assert_equal(sol.minFlips(0, 0, 8), 1, "c has a bit beyond a/b length")
    assert_equal(sol.minFlips(8, 0, 0), 1, "a has a bit beyond b/c length")
