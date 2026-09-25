/**
 * LeetCode 151. Reverse Words in a String
 * https://leetcode.com/problems/reverse-words-in-a-string/
 *
 * Approach: split on runs of whitespace, drop empty tokens (from
 * leading/trailing spaces), reverse the word list, and join with single
 * spaces.
 *
 * Time:  O(n) - split/filter/reverse/join are all linear
 * Space: O(n) - the array of words and the output string
 */
function reverseWords(s: string): string {
  return s
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .reverse()
    .join(' ');
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
  console.log(reverseWords('the sky is blue'));   // "blue is sky the"
  console.log(reverseWords('  hello world  '));   // "world hello"
  console.log(reverseWords('a good   example'));  // "example good a"

  // Edge cases
  assertEqual(reverseWords('hello'), 'hello', 'single word, no spaces');
  assertEqual(reverseWords('  hello  '), 'hello', 'single word with padding');
  assertEqual(reverseWords('a   b   c   d'), 'd c b a', 'multiple words, multi-space runs');
  assertEqual(reverseWords('abc123 def456'), 'def456 abc123', 'words containing digits');
  assertEqual(reverseWords('  a  '), 'a', 'single-char word with padding');
}

export { reverseWords };
