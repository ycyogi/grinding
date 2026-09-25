/**
 * LeetCode 374. Guess Number Higher or Lower
 * https://leetcode.com/problems/guess-number-higher-or-lower/
 *
 * Approach: binary search over [1, n], using the oracle's -1/0/1 response
 * to shrink the window each step until it collapses onto the picked number.
 *
 * Time:  O(log n) - the search window halves every call to guess()
 * Space: O(1) - only pointer variables are kept
 */

// On LeetCode, `guess` is provided by the judge and compares `num` against a
// hidden `pick`. This stub exists only so the file is runnable standalone.
let __pick = 1;
function guess(num: number): number {
  if (num > __pick) return -1;
  if (num < __pick) return 1;
  return 0;
}

function guessNumber(n: number): number {
  let lo = 1;
  let hi = n;

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    const result = guess(mid);

    if (result === 0) return mid;
    if (result === -1) hi = mid - 1;
    else lo = mid + 1;
  }

  return -1; // unreachable given valid input
}
if (require.main === module) {
  // Example usage:
  __pick = 6;
  console.log(guessNumber(10)); // 6
  __pick = 1;
  console.log(guessNumber(1)); // 1
}

export { guessNumber };
