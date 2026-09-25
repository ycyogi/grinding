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

// Example usage:
// console.log(combinationSum3(3, 7)); // [[1,2,4]]
// console.log(combinationSum3(3, 9)); // [[1,2,6],[1,3,5],[2,3,4]]

export { combinationSum3 };
