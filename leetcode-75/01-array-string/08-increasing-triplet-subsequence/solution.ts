/**
 * LeetCode 334. Increasing Triplet Subsequence
 * https://leetcode.com/problems/increasing-triplet-subsequence/
 *
 * Approach: greedily track the smallest value seen so far (`first`) and
 * the smallest value seen so far that is greater than some earlier
 * `first` (`second`). Any number that beats both completes a triplet.
 *
 * Time:  O(n) - single pass over nums
 * Space: O(1) - two scalar variables
 */
function increasingTriplet(nums: number[]): boolean {
  let first = Infinity;
  let second = Infinity;

  for (const num of nums) {
    if (num <= first) {
      first = num;
    } else if (num <= second) {
      second = num;
    } else {
      return true;
    }
  }

  return false;
}
if (require.main === module) {
  // Example usage:
  console.log(increasingTriplet([1, 2, 3, 4, 5])); // true
  console.log(increasingTriplet([5, 4, 3, 2, 1])); // false
  console.log(increasingTriplet([2, 1, 5, 0, 4, 6])); // true
}

export { increasingTriplet };
