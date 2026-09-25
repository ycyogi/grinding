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


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.canPlaceFlowers([1, 0, 0, 0, 1], 1))  # True
    print(sol.canPlaceFlowers([1, 0, 0, 0, 1], 2))  # False

    # Edge cases
    assert_equal(sol.canPlaceFlowers([1, 0, 1, 0, 1], 0), True, "n=0 always satisfiable")
    assert_equal(sol.canPlaceFlowers([0], 1), True, "single empty plot")
    assert_equal(sol.canPlaceFlowers([1], 1), False, "single occupied plot")
    assert_equal(sol.canPlaceFlowers([1, 0, 0, 1], 1), False, "gap of exactly 2 is insufficient")
    assert_equal(sol.canPlaceFlowers([0, 0], 2), False, "two adjacent empties fit only 1 flower")
    assert_equal(sol.canPlaceFlowers([0, 0, 0], 2), True, "three empties fit max of 2 flowers")
