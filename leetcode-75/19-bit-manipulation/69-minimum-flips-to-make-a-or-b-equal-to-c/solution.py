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


if __name__ == "__main__":
    sol = Solution()
    print(sol.minFlips(2, 6, 5))  # 3
    print(sol.minFlips(4, 2, 7))  # 1
