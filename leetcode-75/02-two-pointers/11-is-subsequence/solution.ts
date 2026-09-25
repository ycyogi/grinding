/**
 * LeetCode 392. Is Subsequence
 * https://leetcode.com/problems/is-subsequence/
 *
 * Approach: two pointers, i over s and j over t. Advance j through t,
 * and whenever it matches the current character of s, advance i too.
 * s is a subsequence of t iff i reaches the end of s.
 *
 * Time:  O(|t|) - single pass over t
 * Space: O(1) - two index pointers
 */
function isSubsequence(s: string, t: string): boolean {
  let i = 0;

  for (let j = 0; j < t.length && i < s.length; j++) {
    if (t[j] === s[i]) {
      i++;
    }
  }

  return i === s.length;
}
if (require.main === module) {
  // Example usage:
  console.log(isSubsequence('abc', 'ahbgdc')); // true
  console.log(isSubsequence('axc', 'ahbgdc')); // false
  console.log(isSubsequence('', 'ahbgdc'));     // true
}

export { isSubsequence };
