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
  console.log(minCostClimbingStairs([10, 15, 20])); // 15
  console.log(
    minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])
  ); // 6

  // Edge cases
  assertEqual(minCostClimbingStairs([0, 0]), 0, 'min length, all-zero costs');
  assertEqual(
    minCostClimbingStairs([10, 15]),
    10,
    'min length, start at index 0 and jump straight to top'
  );
  assertEqual(
    minCostClimbingStairs([5, 5, 5, 5, 5]),
    10,
    'all-equal costs, start at index 1 and take two 2-step jumps'
  );
}

export { minCostClimbingStairs };
