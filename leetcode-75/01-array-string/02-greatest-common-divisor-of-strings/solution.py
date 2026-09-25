"""
LeetCode 1071. Greatest Common Divisor of Strings
https://leetcode.com/problems/greatest-common-divisor-of-strings/

Approach: two strings share a common "divisor" string exactly when they
commute under concatenation (str1 + str2 == str2 + str1). When they do,
the largest divisor is the prefix of length gcd(len1, len2).

Time:  O(m + n) - dominated by building/comparing the concatenated strings
Space: O(m + n) - the two concatenated strings
"""

from math import gcd


class Solution:
    def gcdOfStrings(self, str1: str, str2: str) -> str:
        if str1 + str2 != str2 + str1:
            return ""

        gcd_len = gcd(len(str1), len(str2))
        return str1[:gcd_len]


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.gcdOfStrings("ABCABC", "ABC"))   # ABC
    print(sol.gcdOfStrings("ABABAB", "ABAB"))  # AB
    print(sol.gcdOfStrings("LEET", "CODE"))    # (empty string)

    # Edge cases
    assert_equal(sol.gcdOfStrings("AAAAAA", "AAA"), "AAA", "str1 exact multiple of str2")
    assert_equal(sol.gcdOfStrings("AAAAA", "AAAA"), "A", "coprime lengths, same char")
    assert_equal(sol.gcdOfStrings("A", "A"), "A", "minimum length both sides")
    assert_equal(sol.gcdOfStrings("AB", "BA"), "", "same chars, different arrangement")
    assert_equal(sol.gcdOfStrings("ABCDEF", "ABC"), "", "different letters, no divisor")
