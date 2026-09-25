"""
LeetCode 1207. Unique Number of Occurrences
https://leetcode.com/problems/unique-number-of-occurrences/

Approach: count occurrences of each value with a hash map, then check
whether the count values themselves are all distinct by putting them
into a set and comparing sizes.

Time:  O(n) - one pass to count, one pass over the distinct counts
Space: O(n) - the frequency map and the count set
"""

from collections import Counter
from typing import List


class Solution:
    def uniqueOccurrences(self, arr: List[int]) -> bool:
        counts = Counter(arr)
        return len(set(counts.values())) == len(counts)


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.uniqueOccurrences([1, 2, 2, 1, 1, 3]))  # True
    print(sol.uniqueOccurrences([1, 2]))  # False

    # Edge cases
    assert_equal(sol.uniqueOccurrences([7]), True, "single-element array")
    assert_equal(sol.uniqueOccurrences([2, 2, 2, 2]), True, "all elements the same")
    assert_equal(sol.uniqueOccurrences([1, 1, 2, 2]), False, "two values, same count")
    assert_equal(
        sol.uniqueOccurrences([-1, -1, -2, -3, -3, -3]), True, "negative numbers"
    )
    assert_equal(
        sol.uniqueOccurrences([1, 2, 3, 1, 2, 3]), False, "three values, same count"
    )
