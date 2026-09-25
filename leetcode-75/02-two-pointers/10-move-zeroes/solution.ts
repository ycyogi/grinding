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
if (require.main === module) {
  // Example usage:
  const a = [0, 1, 0, 3, 12];
  moveZeroes(a);
  console.log(a); // [1, 3, 12, 0, 0]
  const b = [0];
  moveZeroes(b);
  console.log(b); // [0]
}

export { moveZeroes };
