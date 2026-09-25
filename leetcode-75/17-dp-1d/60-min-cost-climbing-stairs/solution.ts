/**
 * LeetCode 746. Min Cost Climbing Stairs
 * https://leetcode.com/problems/min-cost-climbing-stairs/
 *
 * Approach: rolling-variable DP where dp[i] = min cost to reach step i.
 * dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]); answer is dp[n].
 *
 * Time:  O(n) - one pass computing each dp value once
 * Space: O(1) - two rolling variables instead of a full dp array
 */
function minCostClimbingStairs(cost: number[]): number {
  const n = cost.length;
  let prev2 = 0; // dp[0]
  let prev1 = 0; // dp[1]

  for (let i = 2; i <= n; i++) {
    const curr = Math.min(prev1 + cost[i - 1], prev2 + cost[i - 2]);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}
if (require.main === module) {
  // Example usage:
  console.log(minCostClimbingStairs([10, 15, 20])); // 15
  console.log(
    minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])
  ); // 6
}

export { minCostClimbingStairs };
