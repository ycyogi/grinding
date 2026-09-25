/**
 * LeetCode 2352. Equal Row and Column Pairs
 * https://leetcode.com/problems/equal-row-and-column-pairs/
 *
 * Approach: hash each row into a joined-string signature and count
 * occurrences. For each column, build the same kind of signature and
 * add however many rows already share it, instead of comparing every
 * row/column pair directly (O(n^3)).
 *
 * Time:  O(n^2) - building row and column signatures is O(n) each, n of them
 * Space: O(n^2) - the row-signature frequency map
 */
function equalPairs(grid: number[][]): number {
  const n = grid.length;
  const rowCount = new Map<string, number>();

  for (const row of grid) {
    const key = row.join(',');
    rowCount.set(key, (rowCount.get(key) ?? 0) + 1);
  }

  let total = 0;
  for (let j = 0; j < n; j++) {
    const col: number[] = [];
    for (let i = 0; i < n; i++) col.push(grid[i][j]);
    const key = col.join(',');
    total += rowCount.get(key) ?? 0;
  }

  return total;
}

// Example usage:
// console.log(equalPairs([[3,2,1],[1,7,6],[2,7,7]])); // 1
// console.log(equalPairs([[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]])); // 3

export { equalPairs };
