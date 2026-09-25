"""
LeetCode 17. Letter Combinations of a Phone Number
https://leetcode.com/problems/letter-combinations-of-a-phone-number/

Approach: backtracking over the digit-to-letters mapping, building one
letter at a time and undoing the choice after exploring each branch.

Time:  O(4^n * n) - up to 4 letters per digit, n digits, n to copy each path
Space: O(n) extra for recursion depth and the path buffer (excl. output)
"""

from typing import List

DIGIT_LETTERS = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
}


class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []

        result: List[str] = []
        path: List[str] = []

        def backtrack(i: int) -> None:
            if i == len(digits):
                result.append("".join(path))
                return

            for letter in DIGIT_LETTERS[digits[i]]:
                path.append(letter)
                backtrack(i + 1)
                path.pop()

        backtrack(0)
        return result


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.letterCombinations("23"))
    # ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']
    print(sol.letterCombinations(""))  # []

    # Edge cases
    # Order is deterministic (letters are iterated from a fixed string), so
    # exact list equality is valid here -- no sorting needed.
    assert_equal(sol.letterCombinations(""), [], 'empty digits returns [], not [""]')
    assert_equal(sol.letterCombinations("2"), ["a", "b", "c"], "single digit, 3 letters")
    assert_equal(
        sol.letterCombinations("7"),
        ["p", "q", "r", "s"],
        "single digit, 4 letters (max branching)",
    )
    assert_equal(
        sol.letterCombinations("23"),
        ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"],
        "two digits, full 3x3 combination set",
    )
