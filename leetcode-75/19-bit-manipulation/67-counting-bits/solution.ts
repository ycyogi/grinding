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

// Example usage:
// console.log(countBits(2)); // [0,1,1]
// console.log(countBits(5)); // [0,1,1,2,1,2]

export { countBits };
