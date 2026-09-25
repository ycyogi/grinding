/**
 * LeetCode 72. Edit Distance
 * https://leetcode.com/problems/edit-distance/
 *
 * Approach: 2D string-alignment DP. dp[i][j] = min ops to convert the
 * first i chars of word1 into the first j chars of word2; matching chars
 * carry the diagonal forward, mismatches take 1 + best of replace/
 * delete/insert.
 *
 * Time:  O(m * n) - every cell of the table computed once
 * Space: O(m * n) for the full table (reducible to O(n) with two rolling
 *        rows, since each row only depends on the row above it)
 */
function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}
if (require.main === module) {
  // Example usage:
  console.log(minDistance('horse', 'ros')); // 3
  console.log(minDistance('intention', 'execution')); // 5
}

export { minDistance };
