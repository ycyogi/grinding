/**
 * LeetCode 345. Reverse Vowels of a String
 * https://leetcode.com/problems/reverse-vowels-of-a-string/
 *
 * Approach: two pointers starting at each end of the string, skipping
 * non-vowels, swapping whenever both point at a vowel, and moving inward.
 *
 * Time:  O(n) - each pointer traverses the string at most once
 * Space: O(n) - mutable character array used for the swaps
 */
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);

function reverseVowels(s: string): string {
  const chars = s.split('');
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    if (!VOWELS.has(chars[left])) {
      left++;
      continue;
    }
    if (!VOWELS.has(chars[right])) {
      right--;
      continue;
    }
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }

  return chars.join('');
}
if (require.main === module) {
  // Example usage:
  console.log(reverseVowels('IceCreAm')); // "AceCreIm"
  console.log(reverseVowels('leetcode')); // "leotcede"
}

export { reverseVowels };
