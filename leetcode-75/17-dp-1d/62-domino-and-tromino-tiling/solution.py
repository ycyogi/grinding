"""
LeetCode 790. Domino and Tromino Tiling
https://leetcode.com/problems/domino-and-tromino-tiling/

Approach: derive a two-state recurrence (full vs. one-cell-sticking-out
"partial" boards), then substitute to collapse it into the single 1D
recurrence full[i] = 2*full[i-1] + full[i-3], rolled with 3 variables.

Time:  O(n) - one pass computing each term once
Space: O(1) - three rolling variables instead of a full dp table
"""

MOD = 1_000_000_007


class Solution:
    def numTilings(self, n: int) -> int:
        if n == 0:
            return 1
        if n == 1:
            return 1
        if n == 2:
            return 2

        a, b, c = 1, 1, 2  # full[i-3], full[i-2], full[i-1]
        for _ in range(3, n + 1):
            a, b, c = b, c, (2 * c + a) % MOD

        return c


if __name__ == "__main__":
    sol = Solution()
    print(sol.numTilings(3))  # 5
    print(sol.numTilings(1))  # 1
