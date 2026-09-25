/**
 * LeetCode 338. Counting Bits
 * https://leetcode.com/problems/counting-bits/
 *
 * Approach: DP using the lowest-set-bit trick. i & (i - 1) clears the
 * lowest set bit of i, so ans[i] = ans[i & (i - 1)] + 1.
 *
 * Time:  O(n) - each entry computed in O(1) from a smaller entry
 * Space: O(n) for the output array (O(1) extra beyond the output)
 */
function countBits(n: number): number[] {
  const ans: number[] = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    ans[i] = ans[i & (i - 1)] + 1;
  }

  return ans;
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
  console.log(countBits(2)); // [0,1,1]
  console.log(countBits(5)); // [0,1,1,2,1,2]

  // Edge cases
  assertEqual(countBits(0), [0], 'n=0 minimum size');
  assertEqual(countBits(1), [0, 1], 'n=1');
  assertEqual(countBits(8), [0, 1, 1, 2, 1, 2, 2, 3, 1], 'n=8 powers of two have count 1');
  const big = countBits(100000);
  assertEqual(big.length, 100001, 'n=100000 output length');
  assertEqual(big[100000], 6, 'n=100000 popcount of upper bound');
}

export { countBits };
