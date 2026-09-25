/**
 * LeetCode 1732. Find the Highest Altitude
 * https://leetcode.com/problems/find-the-highest-altitude/
 *
 * Approach: running prefix sum. Accumulate the altitude point by point
 * from the gain array, tracking the maximum altitude seen so far.
 *
 * Time:  O(n) - one pass over the gain array
 * Space: O(1) - a running total and a max tracker
 */
function largestAltitude(gain: number[]): number {
  let altitude = 0;
  let maxAltitude = 0;

  for (const g of gain) {
    altitude += g;
    if (altitude > maxAltitude) maxAltitude = altitude;
  }

  return maxAltitude;
}

// Example usage:
// console.log(largestAltitude([-5, 1, 5, 0, -7])); // 1
// console.log(largestAltitude([-4, -3, -2, -1, 4, 3, 2])); // 0

export { largestAltitude };
