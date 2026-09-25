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


if __name__ == "__main__":
    sol = Solution()
    print(sol.reverseWords("the sky is blue"))   # blue is sky the
    print(sol.reverseWords("  hello world  "))   # world hello
    print(sol.reverseWords("a good   example"))  # example good a
