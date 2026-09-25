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
if (require.main === module) {
  // Example usage:
  console.log(minEatingSpeed([3, 6, 7, 11], 8)); // 4
  console.log(minEatingSpeed([30, 11, 23, 4, 20], 5)); // 30
}

export { minEatingSpeed };
