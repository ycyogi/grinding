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
  console.log(isSubsequence('abc', 'ahbgdc')); // true
  console.log(isSubsequence('axc', 'ahbgdc')); // false
  console.log(isSubsequence('', 'ahbgdc'));     // true

  // Edge cases
  assertEqual(isSubsequence('', ''), true, 'both empty');
  assertEqual(isSubsequence('a', ''), false, 'non-empty s, empty t');
  assertEqual(isSubsequence('abc', 'abc'), true, 's equals t exactly');
  assertEqual(isSubsequence('abcd', 'abc'), false, 's longer than t');
  assertEqual(isSubsequence('aaa', 'aaaa'), true, 'repeated char, enough occurrences');
  assertEqual(isSubsequence('aaa', 'aa'), false, 'repeated char, one short');
}

export { isSubsequence };
