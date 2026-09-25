/**
 * LeetCode 714. Best Time to Buy and Sell Stock with Transaction Fee
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
 *
 * Approach: two-state rolling DP (cash vs. holding a share). Each day's
 * cash/hold only depends on the previous day's values, so roll them
 * forward in scalars instead of arrays.
 *
 * Time:  O(n) - one pass over the prices
 * Space: O(1) - two rolling variables (cash, hold)
 */
function maxProfit(prices: number[], fee: number): number {
  let cash = 0;
  let hold = -prices[0];

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    const newCash = Math.max(cash, hold + price - fee);
    const newHold = Math.max(hold, cash - price);
    cash = newCash;
    hold = newHold;
  }

  return cash;
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
  console.log(maxProfit([1, 3, 2, 8, 4, 9], 2)); // 8
  console.log(maxProfit([1, 3, 7, 5, 10, 3], 3)); // 6

  // Edge cases
  assertEqual(maxProfit([5], 0), 0, 'single day, no transaction possible');
  assertEqual(maxProfit([10, 5], 0), 0, 'price only drops, never trade');
  assertEqual(maxProfit([1, 3], 5), 0, 'raw profit smaller than fee');
  assertEqual(maxProfit([1, 5], 0), 4, 'fee=0 boundary, full profit kept');
  assertEqual(
    maxProfit([3, 3, 3, 3], 1),
    0,
    'flat prices with positive fee, never worth trading'
  );
}

export { maxProfit };
