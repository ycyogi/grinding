"""
LeetCode 374. Guess Number Higher or Lower
https://leetcode.com/problems/guess-number-higher-or-lower/

Approach: binary search over [1, n], using the oracle's -1/0/1 response
to shrink the window each step until it collapses onto the picked number.

Time:  O(log n) - the search window halves every call to guess()
Space: O(1) - only pointer variables are kept
"""

# On LeetCode, `guess` is provided by the judge and compares `num` against a
# hidden `pick`. This stub exists only so the file is runnable standalone.
_pick = 1


def guess(num: int) -> int:
    if num > _pick:
        return -1
    if num < _pick:
        return 1
    return 0


class Solution:
    def guessNumber(self, n: int) -> int:
        lo, hi = 1, n

        while lo <= hi:
            mid = lo + (hi - lo) // 2
            result = guess(mid)

            if result == 0:
                return mid
            elif result == -1:
                hi = mid - 1
            else:
                lo = mid + 1

        return -1  # unreachable given valid input


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    _pick = 6
    print(sol.guessNumber(10))  # 6
    _pick = 1
    print(sol.guessNumber(1))  # 1

    # Edge cases
    _pick = 1
    assert_equal(sol.guessNumber(1), 1, "n=1, pick=1 (smallest window)")
    _pick = 1
    assert_equal(sol.guessNumber(2), 1, "n=2, pick=1 (lower bound of 2-window)")
    _pick = 2
    assert_equal(sol.guessNumber(2), 2, "n=2, pick=2 (upper bound of 2-window)")
    _pick = 1
    assert_equal(
        sol.guessNumber(2147483647), 1, "n=2^31-1, pick=1 (max n, answer at start)"
    )
    _pick = 2147483647
    assert_equal(
        sol.guessNumber(2147483647),
        2147483647,
        "n=2^31-1, pick=2^31-1 (max n, answer at end)",
    )
