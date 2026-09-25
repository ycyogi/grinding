/**
 * LeetCode 2390. Removing Stars From a String
 * https://leetcode.com/problems/removing-stars-from-a-string/
 *
 * Approach: stack-based cancellation. Push each regular character; on a
 * star, pop the stack (removing the closest surviving character to its
 * left). The final stack, read bottom to top, is the answer.
 *
 * Time:  O(n) - each character causes exactly one push or one pop
 * Space: O(n) - the stack holds up to n characters in the worst case
 */
function removeStars(s: string): string {
  const stack: string[] = [];

  for (const c of s) {
    if (c === '*') {
      stack.pop();
    } else {
      stack.push(c);
    }
  }

  return stack.join('');
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
  console.log(removeStars('leet**cod*e')); // "lecoe"
  console.log(removeStars('erase*****')); // ""

  // Edge cases
  assertEqual(removeStars('abc***'), '', 'consecutive stars remove all chars');
  assertEqual(removeStars('a*'), '', 'minimal single-char-then-star');
  assertEqual(removeStars('abcdef'), 'abcdef', 'no stars at all');
  assertEqual(removeStars('ab*cd*'), 'ac', 'scattered non-adjacent stars');
  assertEqual(removeStars('ab*'), 'a', 'two-char prefix, trailing star');
}

export { removeStars };
