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


if __name__ == "__main__":
    sol = Solution()
    print(sol.countBits(2))  # [0, 1, 1]
    print(sol.countBits(5))  # [0, 1, 1, 2, 1, 2]
