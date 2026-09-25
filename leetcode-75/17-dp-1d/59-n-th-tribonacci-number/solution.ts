/**
 * LeetCode 1137. N-th Tribonacci Number
 * https://leetcode.com/problems/n-th-tribonacci-number/
 *
 * Approach: rolling-variable DP. Each term only depends on the previous
 * three, so track a sliding window of three values instead of a full array.
 *
 * Time:  O(n) - one pass computing each term once
 * Space: O(1) - three rolling variables
 */
function tribonacci(n: number): number {
  if (n === 0) return 0;
  if (n === 1 || n === 2) return 1;

  let a = 0;
  let b = 1;
  let c = 1;

  for (let i = 3; i <= n; i++) {
    const next = a + b + c;
    a = b;
    b = c;
    c = next;
  }

  return c;
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
  console.log(tribonacci(4)); // 4
  console.log(tribonacci(25)); // 1389537

  // Edge cases
  assertEqual(tribonacci(0), 0, 'n=0 base case (T0)');
  assertEqual(tribonacci(1), 1, 'n=1 base case (T1)');
  assertEqual(tribonacci(2), 1, 'n=2 base case (T2)');
  assertEqual(tribonacci(3), 2, 'n=3, first value computed via the loop');
  assertEqual(tribonacci(37), 2082876103, 'n=37, max n per constraints');
}

export { tribonacci };
