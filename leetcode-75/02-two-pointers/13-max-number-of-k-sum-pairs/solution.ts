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

// Example usage:
// console.log(maxOperations([1, 2, 3, 4], 5));       // 2
// console.log(maxOperations([3, 1, 3, 4, 3], 6));     // 1

export { maxOperations };
