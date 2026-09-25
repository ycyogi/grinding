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


if __name__ == "__main__":
    sol = Solution()
    print(sol.closeStrings("abc", "bca"))  # True
    print(sol.closeStrings("cabbba", "abbccc"))  # True
    print(sol.closeStrings("cabbba", "aabbss"))  # False
