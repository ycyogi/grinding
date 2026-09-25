/**
 * LeetCode 2300. Successful Pairs of Spells and Potions
 * https://leetcode.com/problems/successful-pairs-of-spells-and-potions/
 *
 * Approach: sort potions, then for each spell binary search for the
 * leftmost potion whose product with the spell meets `success`; every
 * potion from that index onward also qualifies.
 *
 * Time:  O((n + m) log m) - sort potions once, binary search per spell
 * Space: O(n) for the output array (sort can be done in place)
 */
function successfulPairs(
  spells: number[],
  potions: number[],
  success: number
): number[] {
  const sorted = [...potions].sort((a, b) => a - b);
  const m = sorted.length;
  const pairs: number[] = new Array(spells.length);

  for (let i = 0; i < spells.length; i++) {
    const s = spells[i];
    let lo = 0;
    let hi = m;

    while (lo < hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      if (s * sorted[mid] >= success) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }

    pairs[i] = m - lo;
  }

  return pairs;
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
  console.log(successfulPairs([5, 1, 3], [1, 2, 3, 4, 5], 7)); // [4, 0, 3]
  console.log(successfulPairs([3, 1, 2], [8, 5, 8], 16)); // [2, 0, 2]

  // Edge cases
  assertEqual(
    successfulPairs([3], [4], 12),
    [1],
    'product exactly equals success (boundary)'
  );
  assertEqual(
    successfulPairs([3], [4], 13),
    [0],
    'product one below success (boundary)'
  );
  assertEqual(
    successfulPairs([2], [5, 5, 5], 10),
    [3],
    'all potions equal, product exactly hits threshold'
  );
  assertEqual(
    successfulPairs([100000], [100000], 10000000000),
    [1],
    'max constraint values, product exactly 1e10'
  );
  assertEqual(
    successfulPairs([1], [1], 1),
    [1],
    'minimum constraint values (n=m=success=1)'
  );
}

export { successfulPairs };
