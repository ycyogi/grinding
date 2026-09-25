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


if __name__ == "__main__":
    sol = Solution()
    print(sol.isSubsequence("abc", "ahbgdc"))  # True
    print(sol.isSubsequence("axc", "ahbgdc"))  # False
    print(sol.isSubsequence("", "ahbgdc"))     # True
