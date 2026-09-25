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
