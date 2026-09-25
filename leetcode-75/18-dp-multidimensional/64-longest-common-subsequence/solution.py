"""
LeetCode 1143. Longest Common Subsequence
https://leetcode.com/problems/longest-common-subsequence/

Approach: 2D string-alignment DP. dp[i][j] = LCS length of the first i
chars of text1 and first j chars of text2; match extends the diagonal,
mismatch takes the best of dropping either character.

Time:  O(m * n) - every cell of the table filled once
Space: O(m * n) for the full table (reducible to O(n) with two rolling
       rows, since each row only depends on the row above it)
"""


class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

        return dp[m][n]


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.longestCommonSubsequence("abcde", "ace"))  # 3
    print(sol.longestCommonSubsequence("abc", "abc"))  # 3

    # Edge cases
    assert_equal(
        sol.longestCommonSubsequence("", "abc"),
        0,
        "one string empty (below stated constraint, but should degrade gracefully)",
    )
    assert_equal(
        sol.longestCommonSubsequence("abc", "xyz"), 0, "no common characters at all"
    )
    assert_equal(
        sol.longestCommonSubsequence("a", "a"),
        1,
        "minimum length, identical single character",
    )
    assert_equal(
        sol.longestCommonSubsequence("abcde", "bd"),
        2,
        "text2 is a non-contiguous subsequence of text1",
    )
    assert_equal(
        sol.longestCommonSubsequence("aaaa", "aa"),
        2,
        "repeated identical character, LCS capped by shorter string",
    )
