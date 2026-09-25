/**
 * LeetCode 1207. Unique Number of Occurrences
 * https://leetcode.com/problems/unique-number-of-occurrences/
 *
 * Approach: count occurrences of each value with a hash map, then check
 * whether the count values themselves are all distinct by putting them
 * into a set and comparing sizes.
 *
 * Time:  O(n) - one pass to count, one pass over the distinct counts
 * Space: O(n) - the frequency map and the count set
 */
function uniqueOccurrences(arr: number[]): boolean {
  const counts = new Map<number, number>();
  for (const n of arr) {
    counts.set(n, (counts.get(n) ?? 0) + 1);
  }

  const uniqueCounts = new Set(counts.values());
  return uniqueCounts.size === counts.size;
}

// Example usage:
// console.log(uniqueOccurrences([1, 2, 2, 1, 1, 3])); // true
// console.log(uniqueOccurrences([1, 2])); // false

export { uniqueOccurrences };
