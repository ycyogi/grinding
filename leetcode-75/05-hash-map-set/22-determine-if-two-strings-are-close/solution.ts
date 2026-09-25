/**
 * LeetCode 1657. Determine if Two Strings Are Close
 * https://leetcode.com/problems/determine-if-two-strings-are-close/
 *
 * Approach: swapping characters means only frequencies (not positions)
 * matter; renaming characters means only the multiset of frequency
 * values (not which letter has which frequency) matters. So two strings
 * are close iff they use the same set of characters and have the same
 * sorted list of character frequencies.
 *
 * Time:  O(n + m) - linear scans to count, sorting is over a constant
 *        alphabet size (26 letters)
 * Space: O(1) - frequency arrays are bounded by the 26-letter alphabet
 */
function closeStrings(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) return false;

  const freq1 = new Array(26).fill(0);
  const freq2 = new Array(26).fill(0);
  const a = 'a'.charCodeAt(0);

  for (const c of word1) freq1[c.charCodeAt(0) - a]++;
  for (const c of word2) freq2[c.charCodeAt(0) - a]++;

  for (let i = 0; i < 26; i++) {
    if ((freq1[i] === 0) !== (freq2[i] === 0)) return false;
  }

  const sorted1 = [...freq1].sort((x, y) => x - y);
  const sorted2 = [...freq2].sort((x, y) => x - y);

  for (let i = 0; i < 26; i++) {
    if (sorted1[i] !== sorted2[i]) return false;
  }

  return true;
}
if (require.main === module) {
  // Example usage:
  console.log(closeStrings('abc', 'bca')); // true
  console.log(closeStrings('cabbba', 'abbccc')); // true
  console.log(closeStrings('cabbba', 'aabbss')); // false
}

export { closeStrings };
