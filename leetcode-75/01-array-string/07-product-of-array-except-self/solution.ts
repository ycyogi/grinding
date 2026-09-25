/**
 * LeetCode 238. Product of Array Except Self
 * https://leetcode.com/problems/product-of-array-except-self/
 *
 * Approach: fill the output array with prefix products on a left-to-right
 * pass, then multiply in a running suffix product on a right-to-left pass.
 * Avoids division entirely so it works even when nums contains zeros.
 *
 * Time:  O(n) - two linear passes over nums
 * Space: O(1) extra (excluding the required output array)
 */
function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const answer = new Array<number>(n).fill(1);

  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }

  return answer;
}

// Example usage:
// console.log(productExceptSelf([1, 2, 3, 4]));      // [24,12,8,6]
// console.log(productExceptSelf([-1, 1, 0, -3, 3])); // [0,0,9,0,0]

export { productExceptSelf };
