/**
 * LeetCode 1071. Greatest Common Divisor of Strings
 * https://leetcode.com/problems/greatest-common-divisor-of-strings/
 *
 * Approach: two strings share a common "divisor" string exactly when they
 * commute under concatenation (str1 + str2 === str2 + str1). When they do,
 * the largest divisor is the prefix of length gcd(len1, len2).
 *
 * Time:  O(m + n) - dominated by building/comparing the concatenated strings
 * Space: O(m + n) - the two concatenated strings
 */
function gcdOfStrings(str1: string, str2: string): string {
  if (str1 + str2 !== str2 + str1) return '';

  const gcdLen = gcd(str1.length, str2.length);
  return str1.slice(0, gcdLen);
}

function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

// Example usage:
// console.log(gcdOfStrings('ABCABC', 'ABC'));   // "ABC"
// console.log(gcdOfStrings('ABABAB', 'ABAB'));   // "AB"
// console.log(gcdOfStrings('LEET', 'CODE'));     // ""

export { gcdOfStrings };
