"""
LeetCode 1456. Maximum Number of Vowels in a Substring of Given Length
https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/

Approach: fixed-size sliding window tracking a running vowel count.
Build the count for the first window, then slide one character at a
time, adjusting the count by the entering/leaving character only.

Time:  O(n) - each character is examined a constant number of times
Space: O(1) - a fixed-size vowel set plus a couple of counters
"""

VOWELS = set("aeiou")


class Solution:
    def maxVowels(self, s: str, k: int) -> int:
        count = sum(1 for c in s[:k] if c in VOWELS)
        max_count = count

        for i in range(k, len(s)):
            if s[i] in VOWELS:
                count += 1
            if s[i - k] in VOWELS:
                count -= 1
            max_count = max(max_count, count)

        return max_count


if __name__ == "__main__":
    sol = Solution()
    print(sol.maxVowels("abciiidef", 3))  # 3
    print(sol.maxVowels("leetcode", 3))  # 2
