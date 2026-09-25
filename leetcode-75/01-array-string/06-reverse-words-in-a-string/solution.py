"""
LeetCode 151. Reverse Words in a String
https://leetcode.com/problems/reverse-words-in-a-string/

Approach: split on runs of whitespace, drop empty tokens (from
leading/trailing spaces), reverse the word list, and join with single
spaces.

Time:  O(n) - split/reverse/join are all linear
Space: O(n) - the list of words and the output string
"""


class Solution:
    def reverseWords(self, s: str) -> str:
        # str.split() with no arguments already splits on runs of
        # whitespace and discards empty tokens.
        words = s.split()
        return " ".join(reversed(words))


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.reverseWords("the sky is blue"))   # blue is sky the
    print(sol.reverseWords("  hello world  "))   # world hello
    print(sol.reverseWords("a good   example"))  # example good a

    # Edge cases
    assert_equal(sol.reverseWords("hello"), "hello", "single word, no spaces")
    assert_equal(sol.reverseWords("  hello  "), "hello", "single word with padding")
    assert_equal(sol.reverseWords("a   b   c   d"), "d c b a", "multiple words, multi-space runs")
    assert_equal(sol.reverseWords("abc123 def456"), "def456 abc123", "words containing digits")
    assert_equal(sol.reverseWords("  a  "), "a", "single-char word with padding")
