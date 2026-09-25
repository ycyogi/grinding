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
  console.log(largestAltitude([-5, 1, 5, 0, -7])); // 1
  console.log(largestAltitude([-4, -3, -2, -1, 4, 3, 2])); // 0

  // Edge cases
  assertEqual(largestAltitude([-1]), 0, 'single negative gain');
  assertEqual(largestAltitude([5]), 5, 'single positive gain');
  assertEqual(largestAltitude([-1, -1, -1]), 0, 'monotonically decreasing');
  assertEqual(largestAltitude([1, 2, 3]), 6, 'monotonically increasing');
  assertEqual(largestAltitude([100, -100, 100]), 100, 'boundary gain values');
}

export { largestAltitude };
