"""
LeetCode 72. Edit Distance
https://leetcode.com/problems/edit-distance/

Approach: 2D string-alignment DP. dp[i][j] = min ops to convert the
first i chars of word1 into the first j chars of word2; matching chars
carry the diagonal forward, mismatches take 1 + best of replace/
delete/insert.

Time:  O(m * n) - every cell of the table computed once
Space: O(m * n) for the full table (reducible to O(n) with two rolling
       rows, since each row only depends on the row above it)
"""


class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(
                        dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]
                    )

        return dp[m][n]


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.minDistance("horse", "ros"))  # 3
    print(sol.minDistance("intention", "execution"))  # 5

    # Edge cases
    assert_equal(sol.minDistance("", ""), 0, "both strings empty")
    assert_equal(
        sol.minDistance("", "abc"), 3, "word1 empty, distance = length of word2"
    )
    assert_equal(
        sol.minDistance("abc", ""), 3, "word2 empty, distance = length of word1"
    )
    assert_equal(sol.minDistance("abc", "abc"), 0, "identical strings, no edits needed")
    assert_equal(sol.minDistance("a", "b"), 1, "single-character mismatch, one replace")
