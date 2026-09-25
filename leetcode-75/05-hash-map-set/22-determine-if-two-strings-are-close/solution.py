"""
LeetCode 1657. Determine if Two Strings Are Close
https://leetcode.com/problems/determine-if-two-strings-are-close/

Approach: swapping characters means only frequencies (not positions)
matter; renaming characters means only the multiset of frequency
values (not which letter has which frequency) matters. So two strings
are close iff they use the same set of characters and have the same
sorted list of character frequencies.

Time:  O(n + m) - linear scans to count, sorting is over a constant
       alphabet size (26 letters)
Space: O(1) - frequency counters are bounded by the 26-letter alphabet
"""

from collections import Counter


class Solution:
    def closeStrings(self, word1: str, word2: str) -> bool:
        if len(word1) != len(word2):
            return False

        count1 = Counter(word1)
        count2 = Counter(word2)

        if set(count1.keys()) != set(count2.keys()):
            return False

        return sorted(count1.values()) == sorted(count2.values())


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.closeStrings("abc", "bca"))  # True
    print(sol.closeStrings("cabbba", "abbccc"))  # True
    print(sol.closeStrings("cabbba", "aabbss"))  # False

    # Edge cases
    assert_equal(sol.closeStrings("abc", "aab"), False, "different character sets")
    assert_equal(
        sol.closeStrings("aaaa", "bbbb"),
        False,
        "single distinct char each, but different chars",
    )
    assert_equal(sol.closeStrings("a", "a"), True, "length-1, identical")
    assert_equal(sol.closeStrings("a", "b"), False, "length-1, different chars")
    assert_equal(
        sol.closeStrings("aabbcc", "abcabc"), True, "same char set, permuted"
    )
