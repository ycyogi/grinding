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
function assertEqual(actual: unknown, expected: unknown, label: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    console.error(`FAIL [${label}]: got ${a}, expected ${e}`);
  } else {
    console.log(`PASS [${label}]`);
  }
}

if (require.main === module) {
  // Example usage:
  console.log(maxVowels('abciiidef', 3)); // 3
  console.log(maxVowels('leetcode', 3)); // 2

  // Edge cases
  assertEqual(maxVowels('aeiou', 5), 5, 'k == s.length');
  assertEqual(maxVowels('bcdfg', 3), 0, 'no vowels at all');
  assertEqual(maxVowels('aeiouaeiou', 4), 4, 'all vowels');
  assertEqual(maxVowels('a', 1), 1, 'single-character vowel');
  assertEqual(maxVowels('xxaeioxx', 5), 4, 'vowels clustered off-center');
}

export { maxVowels };
