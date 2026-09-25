/**
 * LeetCode 198. House Robber
 * https://leetcode.com/problems/house-robber/
 *
 * Approach: rolling-variable DP. dp[i] = max money from the first i
 * houses; dp[i] = max(dp[i-1], dp[i-2] + nums[i-1]) (skip vs rob current).
 *
 * Time:  O(n) - one pass over the houses
 * Space: O(1) - two rolling variables instead of a full dp array
 */
function rob(nums: number[]): number {
  let prev2 = 0; // best excluding the previous house
  let prev1 = 0; // best including up through the previous house

  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}
if (require.main === module) {
  // Example usage:
  console.log(rob([1, 2, 3, 1])); // 4
  console.log(rob([2, 7, 9, 3, 1])); // 12
}

export { rob };
