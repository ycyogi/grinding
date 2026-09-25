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
if (require.main === module) {
  // Example usage:
  console.log(reverseWords('the sky is blue'));   // "blue is sky the"
  console.log(reverseWords('  hello world  '));   // "world hello"
  console.log(reverseWords('a good   example'));  // "example good a"
}

export { reverseWords };
