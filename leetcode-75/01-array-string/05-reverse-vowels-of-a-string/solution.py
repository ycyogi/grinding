"""
LeetCode 345. Reverse Vowels of a String
https://leetcode.com/problems/reverse-vowels-of-a-string/

Approach: two pointers starting at each end of the string, skipping
non-vowels, swapping whenever both point at a vowel, and moving inward.

Time:  O(n) - each pointer traverses the string at most once
Space: O(n) - mutable character list used for the swaps
"""

VOWELS = set("aeiouAEIOU")


class Solution:
    def reverseVowels(self, s: str) -> str:
        chars = list(s)
        left, right = 0, len(chars) - 1

        while left < right:
            if chars[left] not in VOWELS:
                left += 1
                continue
            if chars[right] not in VOWELS:
                right -= 1
                continue
            chars[left], chars[right] = chars[right], chars[left]
            left += 1
            right -= 1

        return "".join(chars)


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.reverseVowels("IceCreAm"))  # AceCreIm
    print(sol.reverseVowels("leetcode"))  # leotcede

    # Edge cases
    assert_equal(sol.reverseVowels("grrl"), "grrl", "no vowels at all")
    assert_equal(sol.reverseVowels("aeiou"), "uoiea", "all vowels, full reversal")
    assert_equal(sol.reverseVowels("a"), "a", "single-character string")
    assert_equal(sol.reverseVowels("AEIOUaeiou"), "uoieaUOIEA", "mixed-case vowels")
    assert_equal(sol.reverseVowels("xyzaxyz"), "xyzaxyz", "single vowel in the middle")
