/**
 * LeetCode 136. Single Number
 * https://leetcode.com/problems/single-number/
 *
 * Approach: XOR every number together. Pairs cancel out to 0 (x ^ x = 0),
 * and XORing with 0 is a no-op (x ^ 0 = x), so only the single leftover
 * value survives.
 *
 * Time:  O(n) - one pass over the array
 * Space: O(1) - a single accumulator variable
 */
function singleNumber(nums: number[]): number {
  let result = 0;

  for (const num of nums) {
    result ^= num;
  }

  return result;
}
if (require.main === module) {
  // Example usage:
  console.log(singleNumber([2, 2, 1])); // 1
  console.log(singleNumber([4, 1, 2, 1, 2])); // 4
}

export { singleNumber };
