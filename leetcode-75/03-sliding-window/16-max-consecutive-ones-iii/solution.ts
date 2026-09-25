/**
 * LeetCode 1004. Max Consecutive Ones III
 * https://leetcode.com/problems/max-consecutive-ones-iii/
 *
 * Approach: variable-size sliding window. Expand the right edge always;
 * shrink from the left only while the window holds more than k zeros.
 * The window is always valid (<= k zeros) when its length is measured.
 *
 * Time:  O(n) - left and right pointers each traverse the array once
 * Space: O(1) - a couple of pointers/counters
 */
function longestOnes(nums: number[], k: number): number {
  let left = 0;
  let zeros = 0;
  let maxLen = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;

    while (zeros > k) {
      if (nums[left] === 0) zeros--;
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
if (require.main === module) {
  // Example usage:
  console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)); // 6
  console.log(longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3)); // 10
}

export { longestOnes };
