/**
 * LeetCode 1679. Max Number of K-Sum Pairs
 * https://leetcode.com/problems/max-number-of-k-sum-pairs/
 *
 * Approach: sort nums, then use two pointers converging from the outside
 * in. If the pair sums to k, count it and move both pointers inward; if
 * the sum is too small, advance left; if too big, retreat right.
 *
 * Time:  O(n log n) - dominated by the sort
 * Space: O(1) extra beyond the sort's own internal space
 */
function maxOperations(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);

  let left = 0;
  let right = nums.length - 1;
  let count = 0;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === k) {
      count++;
      left++;
      right--;
    } else if (sum < k) {
      left++;
    } else {
      right--;
    }
  }

  return count;
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
  console.log(maxOperations([1, 2, 3, 4], 5));       // 2
  console.log(maxOperations([3, 1, 3, 4, 3], 6));     // 1

  // Edge cases
  assertEqual(maxOperations([1, 2, 3], 100), 0, 'no pair reaches k');
  assertEqual(maxOperations([4, 4, 4, 4], 8), 2, 'all elements identical');
  assertEqual(maxOperations([3, 3, 3], 6), 1, 'odd count of matching value');
  assertEqual(maxOperations([1, 4], 5), 1, 'minimal length-2 array that matches');
  assertEqual(maxOperations([1, 2], 5), 0, 'minimal length-2 array, no match');
}

export { maxOperations };
