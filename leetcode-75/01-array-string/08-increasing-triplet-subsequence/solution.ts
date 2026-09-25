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
  console.log(increasingTriplet([1, 2, 3, 4, 5])); // true
  console.log(increasingTriplet([5, 4, 3, 2, 1])); // false
  console.log(increasingTriplet([2, 1, 5, 0, 4, 6])); // true

  // Edge cases
  assertEqual(increasingTriplet([2, 1]), false, 'length-2 array');
  assertEqual(increasingTriplet([7]), false, 'single-element array');
  assertEqual(increasingTriplet([1, 1, 1]), false, 'all duplicates');
  assertEqual(increasingTriplet([1, 2, 2, 3]), true, 'duplicate middle value');
  assertEqual(increasingTriplet([20, 100, 10, 12, 5, 13]), true, 'early pair undercut later');
}

export { increasingTriplet };
