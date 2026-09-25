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
if (require.main === module) {
  // Example usage:
  console.log(tribonacci(4)); // 4
  console.log(tribonacci(25)); // 1389537
}

export { tribonacci };
