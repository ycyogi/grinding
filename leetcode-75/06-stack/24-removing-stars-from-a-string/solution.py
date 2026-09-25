"""
LeetCode 2390. Removing Stars From a String
https://leetcode.com/problems/removing-stars-from-a-string/

Approach: stack-based cancellation. Push each regular character; on a
star, pop the stack (removing the closest surviving character to its
left). The final stack, read bottom to top, is the answer.

Time:  O(n) - each character causes exactly one push or one pop
Space: O(n) - the stack holds up to n characters in the worst case
"""


class Solution:
    def removeStars(self, s: str) -> str:
        stack = []

        for c in s:
            if c == "*":
                stack.pop()
            else:
                stack.append(c)

        return "".join(stack)


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.removeStars("leet**cod*e"))  # lecoe
    print(sol.removeStars("erase*****"))  # (empty string)

    # Edge cases
    assert_equal(sol.removeStars("abc***"), "", "consecutive stars remove all chars")
    assert_equal(sol.removeStars("a*"), "", "minimal single-char-then-star")
    assert_equal(sol.removeStars("abcdef"), "abcdef", "no stars at all")
    assert_equal(sol.removeStars("ab*cd*"), "ac", "scattered non-adjacent stars")
    assert_equal(sol.removeStars("ab*"), "a", "two-char prefix, trailing star")
