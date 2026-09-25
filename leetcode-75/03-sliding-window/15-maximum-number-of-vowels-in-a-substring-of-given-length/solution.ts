/**
 * LeetCode 1456. Maximum Number of Vowels in a Substring of Given Length
 * https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/
 *
 * Approach: fixed-size sliding window tracking a running vowel count.
 * Build the count for the first window, then slide one character at a
 * time, adjusting the count by the entering/leaving character only.
 *
 * Time:  O(n) - each character is examined a constant number of times
 * Space: O(1) - a fixed-size vowel set plus a couple of counters
 */
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

function maxVowels(s: string, k: number): number {
  let count = 0;
  for (let i = 0; i < k; i++) {
    if (VOWELS.has(s[i])) count++;
  }

  let maxCount = count;

  for (let i = k; i < s.length; i++) {
    if (VOWELS.has(s[i])) count++;
    if (VOWELS.has(s[i - k])) count--;
    if (count > maxCount) maxCount = count;
  }

  return maxCount;
}
if (require.main === module) {
  // Example usage:
  console.log(maxVowels('abciiidef', 3)); // 3
  console.log(maxVowels('leetcode', 3)); // 2
}

export { maxVowels };
