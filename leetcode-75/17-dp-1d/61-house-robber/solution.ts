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
  console.log(rob([1, 2, 3, 1])); // 4
  console.log(rob([2, 7, 9, 3, 1])); // 12

  // Edge cases
  assertEqual(rob([5]), 5, 'single house, must rob it');
  assertEqual(rob([5, 10]), 10, 'two houses, pick the max not the sum');
  assertEqual(rob([4, 4, 4, 4]), 8, 'all houses equal, even count');
  assertEqual(rob([4, 4, 4]), 8, 'all houses equal, odd count');
}

export { rob };
