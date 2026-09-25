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
if (require.main === module) {
  // Example usage:
  console.log(pivotIndex([1, 7, 3, 6, 5, 6])); // 3
  console.log(pivotIndex([1, 2, 3])); // -1
}

export { pivotIndex };
