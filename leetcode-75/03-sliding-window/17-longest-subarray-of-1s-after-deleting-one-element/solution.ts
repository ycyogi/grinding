/**
 * LeetCode 1493. Longest Subarray of 1's After Deleting One Element
 * https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/
 *
 * Approach: variable-size sliding window allowing at most one zero.
 * Since exactly one element must be deleted, the answer for each window
 * is (window length - 1); track the max of that value while sliding.
 *
 * Time:  O(n) - left and right pointers each traverse the array once
 * Space: O(1) - a couple of pointers/counters
 */
function longestSubarray(nums: number[]): number {
  let left = 0;
  let zeros = 0;
  let maxLen = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;

    while (zeros > 1) {
      if (nums[left] === 0) zeros--;
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1 - 1);
  }

  return maxLen;
}
if (require.main === module) {
  // Example usage:
  console.log(longestSubarray([1, 1, 0, 1])); // 3
  console.log(longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1])); // 5
}

export { longestSubarray };
