/**
 * LeetCode 162. Find Peak Element
 * https://leetcode.com/problems/find-peak-element/
 *
 * Approach: binary search on the slope of the array. If nums[mid] <
 * nums[mid + 1] the array is rising, so a peak lies to the right;
 * otherwise it lies at mid or to the left.
 *
 * Time:  O(log n) - the search window halves each iteration
 * Space: O(1) - only index variables are used
 */
function findPeakElement(nums: number[]): number {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] < nums[mid + 1]) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  return lo;
}
if (require.main === module) {
  // Example usage:
  console.log(findPeakElement([1, 2, 3, 1])); // 2
  console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); // 1 or 5
}

export { findPeakElement };
