/**
 * LeetCode 790. Domino and Tromino Tiling
 * https://leetcode.com/problems/domino-and-tromino-tiling/
 *
 * Approach: derive a two-state recurrence (full vs. one-cell-sticking-out
 * "partial" boards), then substitute to collapse it into the single 1D
 * recurrence full[i] = 2*full[i-1] + full[i-3], rolled with 3 variables.
 *
 * Time:  O(n) - one pass computing each term once
 * Space: O(1) - three rolling variables instead of a full dp table
 */
const MOD = 1_000_000_007;

function numTilings(n: number): number {
  if (n === 0) return 1;
  if (n === 1) return 1;
  if (n === 2) return 2;

  let a = 1; // full[i-3]
  let b = 1; // full[i-2]
  let c = 2; // full[i-1]

  for (let i = 3; i <= n; i++) {
    const next = (2 * c + a) % MOD;
    a = b;
    b = c;
    c = next;
  }

  return c;
}

// Example usage:
// console.log(numTilings(3)); // 5
// console.log(numTilings(1)); // 1

export { numTilings };
