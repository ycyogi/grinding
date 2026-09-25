"""
LeetCode 443. String Compression
https://leetcode.com/problems/string-compression/

Approach: two pointers over the same list - `read` scans consecutive
runs of the same character, `write` writes the compressed run
(character, then digits of the count if > 1) back into the front of
the list in place.

Time:  O(n) - read pointer visits every character once
Space: O(1) - compression happens in place
"""

from typing import List


class Solution:
    def compress(self, chars: List[str]) -> int:
        read = 0
        write = 0
        n = len(chars)

        while read < n:
            group_char = chars[read]
            group_start = read

            while read < n and chars[read] == group_char:
                read += 1

            count = read - group_start
            chars[write] = group_char
            write += 1

            if count > 1:
                for digit in str(count):
                    chars[write] = digit
                    write += 1

        return write


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()

    c1 = ["a", "a", "b", "b", "c", "c", "c"]
    n1 = sol.compress(c1)
    print(n1, c1[:n1])  # 6 ['a', '2', 'b', '2', 'c', '3']

    c2 = ["a"]
    n2 = sol.compress(c2)
    print(n2, c2[:n2])  # 1 ['a']

    c3 = ["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]
    n3 = sol.compress(c3)
    print(n3, c3[:n3])  # 4 ['a', 'b', '1', '2']

    # Edge cases
    c4 = ["a"] * 10
    n4 = sol.compress(c4)
    assert_equal((n4, c4[:n4]), (3, ["a", "1", "0"]), "run of exactly 10 (two-digit boundary)")

    c5 = ["b"] * 9
    n5 = sol.compress(c5)
    assert_equal((n5, c5[:n5]), (2, ["b", "9"]), "run of exactly 9 (single-digit boundary)")

    c6 = ["a", "b", "c"]
    n6 = sol.compress(c6)
    assert_equal((n6, c6[:n6]), (3, ["a", "b", "c"]), "no repeated characters at all")

    c7 = ["a", "b", "a", "b"]
    n7 = sol.compress(c7)
    assert_equal((n7, c7[:n7]), (4, ["a", "b", "a", "b"]), "alternating characters")

    c8 = ["c"] * 11 + ["d"]
    n8 = sol.compress(c8)
    assert_equal((n8, c8[:n8]), (4, ["c", "1", "1", "d"]), "run of 11 followed by a singleton")
