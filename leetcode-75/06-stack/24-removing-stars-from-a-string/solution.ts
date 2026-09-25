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

// Example usage:
// console.log(removeStars('leet**cod*e')); // "lecoe"
// console.log(removeStars('erase*****')); // ""

export { removeStars };
