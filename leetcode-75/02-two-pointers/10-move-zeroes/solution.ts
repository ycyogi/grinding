/**
 * LeetCode 283. Move Zeroes
 * https://leetcode.com/problems/move-zeroes/
 *
 * Approach: slow pointer `insertPos` tracks where the next non-zero
 * element belongs; fast pointer `i` scans the array and swaps each
 * non-zero value into place, pushing zeros rightward as it goes.
 *
 * Time:  O(n) - single pass over nums
 * Space: O(1) - in-place swaps only
 */
function moveZeroes(nums: number[]): void {
  let insertPos = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[insertPos], nums[i]] = [nums[i], nums[insertPos]];
      insertPos++;
    }
  }
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
  const a = [0, 1, 0, 3, 12];
  moveZeroes(a);
  console.log(a); // [1, 3, 12, 0, 0]
  const b = [0];
  moveZeroes(b);
  console.log(b); // [0]

  // Edge cases
  const c = [5];
  moveZeroes(c);
  assertEqual(c, [5], 'single non-zero element');

  const d = [0, 0, 0];
  moveZeroes(d);
  assertEqual(d, [0, 0, 0], 'all zeros');

  const e2 = [1, 2, 3];
  moveZeroes(e2);
  assertEqual(e2, [1, 2, 3], 'already all non-zero');

  const f = [1, 2, 0, 0];
  moveZeroes(f);
  assertEqual(f, [1, 2, 0, 0], 'zeros already at the end');

  const g = [-1, 0, -2, 0, 3];
  moveZeroes(g);
  assertEqual(g, [-1, -2, 3, 0, 0], 'negative numbers not confused with zero');
}

export { moveZeroes };
