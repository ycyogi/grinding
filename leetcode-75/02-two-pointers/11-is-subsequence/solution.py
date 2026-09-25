"""
LeetCode 392. Is Subsequence
https://leetcode.com/problems/is-subsequence/

Approach: two pointers, i over s and j over t. Advance j through t,
and whenever it matches the current character of s, advance i too.
s is a subsequence of t iff i reaches the end of s.

Time:  O(|t|) - single pass over t
Space: O(1) - two index pointers
"""


class Solution:
    def isSubsequence(self, s: str, t: str) -> bool:
        i = 0
        n = len(s)

        for ch in t:
            if i < n and ch == s[i]:
                i += 1

        return i == n


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.isSubsequence("abc", "ahbgdc"))  # True
    print(sol.isSubsequence("axc", "ahbgdc"))  # False
    print(sol.isSubsequence("", "ahbgdc"))     # True

    # Edge cases
    assert_equal(sol.isSubsequence("", ""), True, "both empty")
    assert_equal(sol.isSubsequence("a", ""), False, "non-empty s, empty t")
    assert_equal(sol.isSubsequence("abc", "abc"), True, "s equals t exactly")
    assert_equal(sol.isSubsequence("abcd", "abc"), False, "s longer than t")
    assert_equal(sol.isSubsequence("aaa", "aaaa"), True, "repeated char, enough occurrences")
    assert_equal(sol.isSubsequence("aaa", "aa"), False, "repeated char, one short")
