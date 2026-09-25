"""
LeetCode 605. Can Place Flowers
https://leetcode.com/problems/can-place-flowers/

Approach: greedy left-to-right scan. Plant a flower in any empty plot
whose left and right neighbors are also empty (or off the edge of the
bed) as soon as possible; planting early never blocks a later planting.

Time:  O(m) - one pass over the flowerbed
Space: O(1) - a couple of scalar counters (bed is mutated in place)
"""

from typing import List


class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        need = n
        length = len(flowerbed)

        for i in range(length):
            if need <= 0:
                break

            left_empty = i == 0 or flowerbed[i - 1] == 0
            right_empty = i == length - 1 or flowerbed[i + 1] == 0

            if flowerbed[i] == 0 and left_empty and right_empty:
                flowerbed[i] = 1
                need -= 1

        return need <= 0


if __name__ == "__main__":
    sol = Solution()
    print(sol.canPlaceFlowers([1, 0, 0, 0, 1], 1))  # True
    print(sol.canPlaceFlowers([1, 0, 0, 0, 1], 2))  # False
