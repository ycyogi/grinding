/**
 * LeetCode 994. Rotting Oranges
 * https://leetcode.com/problems/rotting-oranges/
 *
 * Approach: multi-source BFS starting from every rotten orange at
 * once, so each BFS "layer" corresponds exactly to one elapsed
 * minute. Track remaining fresh oranges; if any are left after the
 * BFS drains, they were unreachable.
 *
 * Time:  O(m * n) - each cell is enqueued and processed at most once
 * Space: O(m * n) - queue can hold up to all cells
 */
function orangesRotting(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const queue: Array<[number, number]> = [];
  let freshCount = 0;

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) freshCount++;
    }
  }

  if (freshCount === 0) return 0;

  let minutes = 0;
  let head = 0;

  while (head < queue.length && freshCount > 0) {
    const batchSize = queue.length - head;
    let rottedThisMinute = false;

    for (let i = 0; i < batchSize; i++) {
      const [row, col] = queue[head++];

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 &&
          newRow < m &&
          newCol >= 0 &&
          newCol < n &&
          grid[newRow][newCol] === 1
        ) {
          grid[newRow][newCol] = 2;
          freshCount--;
          queue.push([newRow, newCol]);
          rottedThisMinute = true;
        }
      }
    }

    if (rottedThisMinute) minutes++;
  }

  return freshCount === 0 ? minutes : -1;
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
  console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])); // 4
  console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]])); // -1

  // Edge cases (each call uses a fresh grid literal since the function mutates its input)
  assertEqual(orangesRotting([[2, 0], [0, 2]]), 0, "no fresh oranges at all");

  assertEqual(orangesRotting([[1, 1], [1, 1]]), -1, "fresh oranges only, no rotten source");

  assertEqual(orangesRotting([[1, 0, 2]]), -1, "fresh orange isolated by an empty cell, can never rot");

  assertEqual(orangesRotting([[2]]), 0, "single-cell grid, already rotten");

  assertEqual(
    orangesRotting([[2, 1, 1, 1, 2]]),
    2,
    "two rotten sources at both ends, multi-source BFS layering"
  );
}

export { orangesRotting };
