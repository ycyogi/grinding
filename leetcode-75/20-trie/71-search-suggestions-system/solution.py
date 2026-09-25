"""
LeetCode 1268. Search Suggestions System
https://leetcode.com/problems/search-suggestions-system/

Approach: sort products lexicographically so any prefix's matches form
a contiguous block. Maintain a two-pointer window [left, right] over
the sorted array that only shrinks as searchWord's prefix grows one
character at a time; take up to the first 3 products in the window
after each character.

Time:  O(n log n + n + m) - sort dominates; pointers move O(n) total
       across the whole run; m = len(searchWord) for the output loop
Space: O(m) for the output beyond sorting
"""

from typing import List


class Solution:
    def suggestedProducts(
        self, products: List[str], searchWord: str
    ) -> List[List[str]]:
        sorted_products = sorted(products)
        left, right = 0, len(sorted_products) - 1
        result: List[List[str]] = []

        for i, ch in enumerate(searchWord):
            while left <= right and (
                len(sorted_products[left]) <= i or sorted_products[left][i] != ch
            ):
                left += 1
            while left <= right and (
                len(sorted_products[right]) <= i or sorted_products[right][i] != ch
            ):
                right -= 1

            result.append(sorted_products[left : min(left + 3, right + 1)])

        return result


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(
        sol.suggestedProducts(
            ["mobile", "mouse", "moneypot", "monitor", "mousepad"], "mouse"
        )
    )
    # [["mobile","moneypot","monitor"], ["mobile","moneypot","monitor"],
    #  ["mouse","mousepad"], ["mouse","mousepad"], ["mouse","mousepad"]]
    print(sol.suggestedProducts(["havana"], "havana"))
    # [["havana"], ["havana"], ["havana"], ["havana"], ["havana"], ["havana"]]

    # Edge cases
    assert_equal(
        sol.suggestedProducts(["ab", "abc"], "abcde"),
        [["ab", "abc"], ["ab", "abc"], ["abc"], [], []],
        "searchWord longer than any product",
    )
    assert_equal(
        sol.suggestedProducts(["x"], "xy"),
        [["x"], []],
        "single product, searchWord longer than it",
    )
    assert_equal(
        sol.suggestedProducts(["zebra", "zoo"], "a"),
        [[]],
        "no product matches even the first character",
    )
