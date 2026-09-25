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
if (require.main === module) {
  // Example usage:
  console.log(kidsWithCandies([2, 3, 5, 1, 3], 3)); // [true,true,true,false,true]
  console.log(kidsWithCandies([4, 2, 1, 1, 2], 1)); // [true,false,false,false,false]
}

export { kidsWithCandies };
