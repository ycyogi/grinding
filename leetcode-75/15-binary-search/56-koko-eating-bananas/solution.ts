/**
 * LeetCode 875. Koko Eating Bananas
 * https://leetcode.com/problems/koko-eating-bananas/
 *
 * Approach: binary search on the answer (eating speed k). hours(k) is
 * monotonically non-increasing in k, so binary search for the smallest k
 * where hours(k) <= h.
 *
 * Time:  O(n log m) - O(log m) speeds tried, each scanning n piles
 * Space: O(1) - only scalar variables beyond the input
 */
function minEatingSpeed(piles: number[], h: number): number {
  const hoursNeeded = (k: number): number => {
    let hours = 0;
    for (const pile of piles) {
      hours += Math.ceil(pile / k);
    }
    return hours;
  };

  let lo = 1;
  let hi = Math.max(...piles);

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (hoursNeeded(mid) <= h) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  return lo;
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
  console.log(minEatingSpeed([3, 6, 7, 11], 8)); // 4
  console.log(minEatingSpeed([30, 11, 23, 4, 20], 5)); // 30

  // Edge cases
  assertEqual(minEatingSpeed([5], 1), 5, 'single pile, h=1');
  assertEqual(
    minEatingSpeed([3, 6, 7, 11], 4),
    11,
    'h == piles.length, k must be max(piles)'
  );
  assertEqual(minEatingSpeed([1], 1), 1, 'minimum piles and h');
  assertEqual(
    minEatingSpeed([1000000000], 1),
    1000000000,
    'single pile at max constraint value'
  );
}

export { minEatingSpeed };
