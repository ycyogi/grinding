/**
 * LeetCode 1143. Longest Common Subsequence
 * https://leetcode.com/problems/longest-common-subsequence/
 *
 * Approach: 2D string-alignment DP. dp[i][j] = LCS length of the first i
 * chars of text1 and first j chars of text2; match extends the diagonal,
 * mismatch takes the best of dropping either character.
 *
 * Time:  O(m * n) - every cell of the table filled once
 * Space: O(m * n) for the full table (reducible to O(n) with two rolling
 *        rows, since each row only depends on the row above it)
 */
function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
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
  console.log(longestCommonSubsequence('abcde', 'ace')); // 3
  console.log(longestCommonSubsequence('abc', 'abc')); // 3

  // Edge cases
  assertEqual(
    longestCommonSubsequence('', 'abc'),
    0,
    'one string empty (below stated constraint, but should degrade gracefully)'
  );
  assertEqual(
    longestCommonSubsequence('abc', 'xyz'),
    0,
    'no common characters at all'
  );
  assertEqual(
    longestCommonSubsequence('a', 'a'),
    1,
    'minimum length, identical single character'
  );
  assertEqual(
    longestCommonSubsequence('abcde', 'bd'),
    2,
    'text2 is a non-contiguous subsequence of text1'
  );
  assertEqual(
    longestCommonSubsequence('aaaa', 'aa'),
    2,
    'repeated identical character, LCS capped by shorter string'
  );
}

export { longestCommonSubsequence };
