/**
 * LeetCode 643. Maximum Average Subarray I
 * https://leetcode.com/problems/maximum-average-subarray-i/
 *
 * Approach: fixed-size sliding window. Sum the first k elements, then
 * slide the window one step at a time, adding the entering element and
 * subtracting the leaving element to keep the window sum in O(1) per step.
 *
 * Time:  O(n) - each element is added to and removed from the window once
 * Space: O(1) - only a running sum and a max tracker are kept
 */
function findMaxAverage(nums: number[], k: number): number {
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }

  let maxSum = windowSum;

  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    if (windowSum > maxSum) maxSum = windowSum;
  }

  return maxSum / k;
}
if (require.main === module) {
  // Example usage:
  console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4)); // 12.75
  console.log(findMaxAverage([5], 1)); // 5
}

export { findMaxAverage };
