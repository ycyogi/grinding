"""
LeetCode 1768. Merge Strings Alternately
https://leetcode.com/problems/merge-strings-alternately/

Approach: two-pointer merge, alternating characters from each string,
then letting whichever string is exhausted first just stop contributing
while the other keeps going.

Time:  O(m + n) - each character is visited exactly once
Space: O(m + n) - output buffer (O(1) extra beyond the output)
"""


class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        result = []
        i = j = 0

        while i < len(word1) or j < len(word2):
            if i < len(word1):
                result.append(word1[i])
                i += 1
            if j < len(word2):
                result.append(word2[j])
                j += 1

        return "".join(result)


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.mergeAlternately("abc", "pqr"))  # apbqcr
    print(sol.mergeAlternately("ab", "pqrs"))  # apbqrs
    print(sol.mergeAlternately("abcd", "pq"))  # apbqcd

    # Edge cases
    assert_equal(sol.mergeAlternately("a", "b"), "ab", "min length both sides")
    assert_equal(sol.mergeAlternately("a", "bcde"), "abcde", "word1 exhausted immediately")
    assert_equal(sol.mergeAlternately("abcd", "e"), "aebcd", "word2 exhausted immediately")
    assert_equal(sol.mergeAlternately("aaa", "bbb"), "ababab", "equal lengths, no leftover")
