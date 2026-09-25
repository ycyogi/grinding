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

// Example usage:
// console.log(uniquePaths(3, 7)); // 28
// console.log(uniquePaths(3, 2)); // 3

export { uniquePaths };
