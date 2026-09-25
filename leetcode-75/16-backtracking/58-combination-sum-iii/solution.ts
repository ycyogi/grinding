/**
 * LeetCode 216. Combination Sum III
 * https://leetcode.com/problems/combination-sum-iii/
 *
 * Approach: backtracking over digits 1..9 in increasing order, tracking
 * how many numbers and how much sum remain, pruning as soon as the next
 * candidate would overshoot the remaining sum.
 *
 * Time:  O(C(9, k) * k) - bounded combinations of 9 digits, k to copy each
 * Space: O(k) extra for recursion depth and the path buffer (excl. output)
 */
function combinationSum3(k: number, n: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  const backtrack = (
    start: number,
    remainingCount: number,
    remainingSum: number
  ): void => {
    if (remainingCount === 0) {
      if (remainingSum === 0) result.push([...path]);
      return;
    }

    for (let candidate = start; candidate <= 9; candidate++) {
      if (candidate > remainingSum) break; // pruning: too big, and only grows

      path.push(candidate);
      backtrack(candidate + 1, remainingCount - 1, remainingSum - candidate);
      path.pop();
    }
  };

  backtrack(1, k, n);
  return result;
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
  console.log(combinationSum3(3, 7)); // [[1,2,4]]
  console.log(combinationSum3(3, 9)); // [[1,2,6],[1,3,5],[2,3,4]]

  // Edge cases
  // Order is deterministic (ascending-candidate backtracking), so exact
  // array equality is valid here -- no sorting needed.
  assertEqual(
    combinationSum3(9, 1),
    [],
    'k=9, n=1: min sum of 9 distinct digits is 45, so no combinations'
  );
  assertEqual(
    combinationSum3(9, 45),
    [[1, 2, 3, 4, 5, 6, 7, 8, 9]],
    'k=9, n=45: unique max case, only combination is all of 1-9'
  );
  assertEqual(
    combinationSum3(2, 1),
    [],
    'k=2, n=1: min sum of 2 distinct digits is 3, so no combinations'
  );
  assertEqual(
    combinationSum3(2, 17),
    [[8, 9]],
    'k=2, n=17: max possible sum for k=2, only one combination'
  );
}

export { combinationSum3 };
