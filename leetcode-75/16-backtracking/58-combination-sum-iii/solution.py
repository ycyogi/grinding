"""
LeetCode 216. Combination Sum III
https://leetcode.com/problems/combination-sum-iii/

Approach: backtracking over digits 1..9 in increasing order, tracking
how many numbers and how much sum remain, pruning as soon as the next
candidate would overshoot the remaining sum.

Time:  O(C(9, k) * k) - bounded combinations of 9 digits, k to copy each
Space: O(k) extra for recursion depth and the path buffer (excl. output)
"""

from typing import List


class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        result: List[List[int]] = []
        path: List[int] = []

        def backtrack(start: int, remaining_count: int, remaining_sum: int) -> None:
            if remaining_count == 0:
                if remaining_sum == 0:
                    result.append(path[:])
                return

            for candidate in range(start, 10):
                if candidate > remaining_sum:
                    break  # pruning: too big, and only grows from here

                path.append(candidate)
                backtrack(candidate + 1, remaining_count - 1, remaining_sum - candidate)
                path.pop()

        backtrack(1, k, n)
        return result


if __name__ == "__main__":
    sol = Solution()
    print(sol.combinationSum3(3, 7))  # [[1, 2, 4]]
    print(sol.combinationSum3(3, 9))  # [[1, 2, 6], [1, 3, 5], [2, 3, 4]]
