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
  console.log(findPeakElement([1, 2, 3, 1])); // 2
  console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4])); // 1 or 5

  // Edge cases
  assertEqual(findPeakElement([1]), 0, 'single-element array is trivially a peak');
  assertEqual(
    findPeakElement([1, 2, 3, 4, 5]),
    4,
    'strictly ascending, peak at the last index'
  );
  assertEqual(
    findPeakElement([5, 4, 3, 2, 1]),
    0,
    'strictly descending, peak at index 0'
  );
  assertEqual(findPeakElement([1, 3, 2]), 1, 'small interior peak');
}

export { findPeakElement };
