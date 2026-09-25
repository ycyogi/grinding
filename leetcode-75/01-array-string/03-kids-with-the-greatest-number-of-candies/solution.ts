/**
 * LeetCode 1431. Kids With the Greatest Number of Candies
 * https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/
 *
 * Approach: find the current max in one pass, then check each kid against
 * `max` after adding extraCandies in a second pass.
 *
 * Time:  O(n) - two linear passes over candies
 * Space: O(1) extra (excluding the required output array)
 */
function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
  const max = Math.max(...candies);
  return candies.map((c) => c + extraCandies >= max);
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
  console.log(kidsWithCandies([2, 3, 5, 1, 3], 3)); // [true,true,true,false,true]
  console.log(kidsWithCandies([4, 2, 1, 1, 2], 1)); // [true,false,false,false,false]

  // Edge cases
  assertEqual(kidsWithCandies([1, 1], 1), [true, true], 'min n=2, all equal');
  assertEqual(kidsWithCandies([5, 5, 5, 5], 1), [true, true, true, true], 'all equal above min');
  assertEqual(kidsWithCandies([1, 100], 50), [false, true], 'extra insufficient to close gap');
  assertEqual(kidsWithCandies([100, 1], 1), [true, false], 'min extraCandies=1');
  assertEqual(kidsWithCandies([100, 100], 50), [true, true], 'max constraint values');
}

export { kidsWithCandies };
