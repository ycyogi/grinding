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

// Example usage:
// console.log(canPlaceFlowers([1, 0, 0, 0, 1], 1)); // true
// console.log(canPlaceFlowers([1, 0, 0, 0, 1], 2)); // false

export { canPlaceFlowers };
