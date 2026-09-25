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
  console.log(singleNumber([2, 2, 1])); // 1
  console.log(singleNumber([4, 1, 2, 1, 2])); // 4

  // Edge cases
  assertEqual(singleNumber([5]), 5, 'single-element array');
  assertEqual(singleNumber([-1, -1, -2]), -2, 'negative numbers');
  assertEqual(singleNumber([0, 0, 7]), 7, 'zero as a paired value');
  assertEqual(singleNumber([-30000, -30000, 30000]), 30000, 'singleton at upper bound');
  assertEqual(
    singleNumber([30000, -30000, 30000, -30000, -1]),
    -1,
    'both extremes paired, negative singleton'
  );
}

export { singleNumber };
