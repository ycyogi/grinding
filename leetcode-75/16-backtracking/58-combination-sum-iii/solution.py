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


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.combinationSum3(3, 7))  # [[1, 2, 4]]
    print(sol.combinationSum3(3, 9))  # [[1, 2, 6], [1, 3, 5], [2, 3, 4]]

    # Edge cases
    # Order is deterministic (ascending-candidate backtracking), so exact
    # list equality is valid here -- no sorting needed.
    assert_equal(
        sol.combinationSum3(9, 1),
        [],
        "k=9, n=1: min sum of 9 distinct digits is 45, so no combinations",
    )
    assert_equal(
        sol.combinationSum3(9, 45),
        [[1, 2, 3, 4, 5, 6, 7, 8, 9]],
        "k=9, n=45: unique max case, only combination is all of 1-9",
    )
    assert_equal(
        sol.combinationSum3(2, 1),
        [],
        "k=2, n=1: min sum of 2 distinct digits is 3, so no combinations",
    )
    assert_equal(
        sol.combinationSum3(2, 17),
        [[8, 9]],
        "k=2, n=17: max possible sum for k=2, only one combination",
    )
