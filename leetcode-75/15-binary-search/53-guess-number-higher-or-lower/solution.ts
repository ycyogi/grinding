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
  __pick = 6;
  console.log(guessNumber(10)); // 6
  __pick = 1;
  console.log(guessNumber(1)); // 1

  // Edge cases
  __pick = 1;
  assertEqual(guessNumber(1), 1, 'n=1, pick=1 (smallest window)');
  __pick = 1;
  assertEqual(guessNumber(2), 1, 'n=2, pick=1 (lower bound of 2-window)');
  __pick = 2;
  assertEqual(guessNumber(2), 2, 'n=2, pick=2 (upper bound of 2-window)');
  __pick = 1;
  assertEqual(
    guessNumber(2147483647),
    1,
    'n=2^31-1, pick=1 (max n, answer at start)'
  );
  __pick = 2147483647;
  assertEqual(
    guessNumber(2147483647),
    2147483647,
    'n=2^31-1, pick=2^31-1 (max n, answer at end)'
  );
}

export { guessNumber };
