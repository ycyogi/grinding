"""
LeetCode 394. Decode String
https://leetcode.com/problems/decode-string/

Approach: stack of (previous_string, repeat_count) pairs. On '[', push
the string built so far and the pending repeat count, then start a
fresh string for the bracket's contents. On ']', pop the pair and
splice the repeated contents back onto the outer string. Digits
accumulate a possibly multi-digit repeat count; letters append.

Time:  O(maxK * n) - dominated by building the repeated output strings
Space: O(maxK * n) - the stack and the decoded string can grow with
       the product of nested repeat counts
"""

from typing import List, Tuple


class Solution:
    def decodeString(self, s: str) -> str:
        stack: List[Tuple[str, int]] = []
        current_string = ""
        current_num = 0

        for c in s:
            if c.isdigit():
                current_num = current_num * 10 + int(c)
            elif c == "[":
                stack.append((current_string, current_num))
                current_string = ""
                current_num = 0
            elif c == "]":
                prev_string, num = stack.pop()
                current_string = prev_string + current_string * num
            else:
                current_string += c

        return current_string


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.decodeString("3[a]2[bc]"))  # aaabcbc
    print(sol.decodeString("3[a2[c]]"))  # accaccacc
    print(sol.decodeString("2[abc]3[cd]ef"))  # abcabccdcdcdef

    # Edge cases
    assert_equal(sol.decodeString("1[a]"), "a", "minimal repeat count k == 1")
    assert_equal(sol.decodeString("10[a]"), "a" * 10, "multi-digit repeat count")
    assert_equal(
        sol.decodeString("100[leetcode]"),
        "leetcode" * 100,
        "large multi-digit repeat count, multi-char word",
    )
    assert_equal(sol.decodeString("xyz"), "xyz", "no brackets at all")
    assert_equal(
        sol.decodeString("2[ab3[cd]]"),
        "abcdcdcdabcdcdcd",
        "nested brackets with multi-digit inner count",
    )
