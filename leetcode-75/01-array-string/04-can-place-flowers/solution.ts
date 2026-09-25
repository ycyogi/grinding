/**
 * LeetCode 605. Can Place Flowers
 * https://leetcode.com/problems/can-place-flowers/
 *
 * Approach: greedy left-to-right scan. Plant a flower in any empty plot
 * whose left and right neighbors are also empty (or off the edge of the
 * bed) as soon as possible; planting early never blocks a later planting.
 *
 * Time:  O(m) - one pass over the flowerbed
 * Space: O(1) - a couple of scalar counters (bed is mutated in place)
 */
function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  let need = n;
  const len = flowerbed.length;

  for (let i = 0; i < len && need > 0; i++) {
    const leftEmpty = i === 0 || flowerbed[i - 1] === 0;
    const rightEmpty = i === len - 1 || flowerbed[i + 1] === 0;

    if (flowerbed[i] === 0 && leftEmpty && rightEmpty) {
      flowerbed[i] = 1;
      need--;
    }
  }

  return need <= 0;
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
  console.log(canPlaceFlowers([1, 0, 0, 0, 1], 1)); // true
  console.log(canPlaceFlowers([1, 0, 0, 0, 1], 2)); // false

  // Edge cases
  assertEqual(canPlaceFlowers([1, 0, 1, 0, 1], 0), true, 'n=0 always satisfiable');
  assertEqual(canPlaceFlowers([0], 1), true, 'single empty plot');
  assertEqual(canPlaceFlowers([1], 1), false, 'single occupied plot');
  assertEqual(canPlaceFlowers([1, 0, 0, 1], 1), false, 'gap of exactly 2 is insufficient');
  assertEqual(canPlaceFlowers([0, 0], 2), false, 'two adjacent empties fit only 1 flower');
  assertEqual(canPlaceFlowers([0, 0, 0], 2), true, 'three empties fit max of 2 flowers');
}

export { canPlaceFlowers };
