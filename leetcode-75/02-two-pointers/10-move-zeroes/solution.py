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


if __name__ == "__main__":
    sol = Solution()

    a = [0, 1, 0, 3, 12]
    sol.moveZeroes(a)
    print(a)  # [1, 3, 12, 0, 0]

    b = [0]
    sol.moveZeroes(b)
    print(b)  # [0]
