/**
 * LeetCode 62. Unique Paths
 * https://leetcode.com/problems/unique-paths/
 *
 * Approach: grid DP where dp[i][j] = dp[i-1][j] + dp[i][j-1], rolled down
 * to a single 1D row updated in place since each row only needs the row
 * above it and the value just computed to its left.
 *
 * Time:  O(m * n) - every cell computed once
 * Space: O(n) - one rolling row instead of a full 2D table
 */
function uniquePaths(m: number, n: number): number {
  const row: number[] = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      row[j] += row[j - 1];
    }
  }

  return row[n - 1];
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
  console.log(uniquePaths(3, 7)); // 28
  console.log(uniquePaths(3, 2)); // 3

  // Edge cases
  assertEqual(uniquePaths(1, 1), 1, 'm=1, n=1: start equals end');
  assertEqual(uniquePaths(1, 5), 1, 'm=1: single row, only path is straight right');
  assertEqual(uniquePaths(5, 1), 1, 'n=1: single column, only path is straight down');
}

export { uniquePaths };
