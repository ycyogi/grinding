/**
 * LeetCode 724. Find Pivot Index
 * https://leetcode.com/problems/find-pivot-index/
 *
 * Approach: compute the total sum once, then sweep left to right with a
 * running left sum, deriving the right sum as totalSum - leftSum - nums[i]
 * instead of recomputing it from scratch at every index.
 *
 * Time:  O(n) - one pass for the total, one pass for the scan
 * Space: O(1) - a couple of running totals
 */
function pivotIndex(nums: number[]): number {
  const totalSum = nums.reduce((sum, n) => sum + n, 0);
  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) {
    const rightSum = totalSum - leftSum - nums[i];
    if (leftSum === rightSum) return i;
    leftSum += nums[i];
  }

  return -1;
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
  console.log(pivotIndex([1, 7, 3, 6, 5, 6])); // 3
  console.log(pivotIndex([1, 2, 3])); // -1

  // Edge cases
  assertEqual(pivotIndex([5]), 0, 'single-element array');
  assertEqual(pivotIndex([0, -1, 1]), 0, 'pivot at index 0');
  assertEqual(pivotIndex([1, -1, 5]), 2, 'pivot at last index');
  assertEqual(pivotIndex([2, 3, 4]), -1, 'no valid pivot');
  assertEqual(pivotIndex([0, 0, 0, 0]), 0, 'all-zero array, leftmost pivot');
}

export { pivotIndex };
