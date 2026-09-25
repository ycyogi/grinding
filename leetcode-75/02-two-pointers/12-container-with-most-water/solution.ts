/**
 * LeetCode 11. Container With Most Water
 * https://leetcode.com/problems/container-with-most-water/
 *
 * Approach: two pointers starting at both ends of the array. Track the
 * best area seen, and always move the pointer at the shorter line
 * inward - moving the taller line's pointer could never improve on an
 * already-checked pair.
 *
 * Time:  O(n) - each pointer moves inward at most n times total
 * Space: O(1) - a few scalar variables
 */
function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let best = 0;

  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    best = Math.max(best, width * h);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return best;
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
  console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
  console.log(maxArea([1, 1]));                       // 1

  // Edge cases
  assertEqual(maxArea([5, 2]), 2, 'min length n=2, distinct heights');
  assertEqual(maxArea([4, 4, 4, 4]), 12, 'all-equal heights, widest pair wins');
  assertEqual(maxArea([0, 0, 0]), 0, 'all-zero heights');
  assertEqual(maxArea([1, 2, 3, 4, 5]), 6, 'strictly increasing, optimal pair not the endpoints');
}

export { maxArea };
