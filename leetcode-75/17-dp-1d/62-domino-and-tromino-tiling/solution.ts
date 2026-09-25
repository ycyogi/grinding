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
  console.log(numTilings(3)); // 5
  console.log(numTilings(1)); // 1

  // Edge cases
  assertEqual(numTilings(1), 1, 'n=1 base case');
  assertEqual(numTilings(2), 2, 'n=2 base case');
  assertEqual(numTilings(3), 5, 'n=3, first value via the general recurrence');
  assertEqual(numTilings(4), 11, 'n=4, known tiling sequence');
  assertEqual(numTilings(5), 24, 'n=5, known tiling sequence');
}

export { numTilings };
