"""
LeetCode 283. Move Zeroes
https://leetcode.com/problems/move-zeroes/

Approach: slow pointer `insert_pos` tracks where the next non-zero
element belongs; fast pointer `i` scans the array and swaps each
non-zero value into place, pushing zeros rightward as it goes.

Time:  O(n) - single pass over nums
Space: O(1) - in-place swaps only
"""

from typing import List


class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """Do not return anything, modify nums in-place instead."""
        insert_pos = 0

        for i in range(len(nums)):
            if nums[i] != 0:
                nums[insert_pos], nums[i] = nums[i], nums[insert_pos]
                insert_pos += 1


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()

    a = [0, 1, 0, 3, 12]
    sol.moveZeroes(a)
    print(a)  # [1, 3, 12, 0, 0]

    b = [0]
    sol.moveZeroes(b)
    print(b)  # [0]

    # Edge cases
    c = [5]
    sol.moveZeroes(c)
    assert_equal(c, [5], "single non-zero element")

    d = [0, 0, 0]
    sol.moveZeroes(d)
    assert_equal(d, [0, 0, 0], "all zeros")

    e = [1, 2, 3]
    sol.moveZeroes(e)
    assert_equal(e, [1, 2, 3], "already all non-zero")

    f = [1, 2, 0, 0]
    sol.moveZeroes(f)
    assert_equal(f, [1, 2, 0, 0], "zeros already at the end")

    g = [-1, 0, -2, 0, 3]
    sol.moveZeroes(g)
    assert_equal(g, [-1, -2, 3, 0, 0], "negative numbers not confused with zero")
