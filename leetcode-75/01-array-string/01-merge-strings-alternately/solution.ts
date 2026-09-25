/**
 * LeetCode 1768. Merge Strings Alternately
 * https://leetcode.com/problems/merge-strings-alternately/
 *
 * Approach: two-pointer merge, alternating characters from each string,
 * then letting whichever string is exhausted first just stop contributing
 * while the other keeps going.
 *
 * Time:  O(m + n) - each character is visited exactly once
 * Space: O(m + n) - output buffer (O(1) extra beyond the output)
 */
function mergeAlternately(word1: string, word2: string): string {
  const result: string[] = [];
  let i = 0;
  let j = 0;

  while (i < word1.length || j < word2.length) {
    if (i < word1.length) result.push(word1[i++]);
    if (j < word2.length) result.push(word2[j++]);
  }

  return result.join('');
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
  console.log(mergeAlternately('abc', 'pqr')); // "apbqcr"
  console.log(mergeAlternately('ab', 'pqrs')); // "apbqrs"
  console.log(mergeAlternately('abcd', 'pq')); // "apbqcd"

  // Edge cases
  assertEqual(mergeAlternately('a', 'b'), 'ab', 'min length both sides');
  assertEqual(mergeAlternately('a', 'bcde'), 'abcde', 'word1 exhausted immediately');
  assertEqual(mergeAlternately('abcd', 'e'), 'aebcd', 'word2 exhausted immediately');
  assertEqual(mergeAlternately('aaa', 'bbb'), 'ababab', 'equal lengths, no leftover');
}

export { mergeAlternately };
