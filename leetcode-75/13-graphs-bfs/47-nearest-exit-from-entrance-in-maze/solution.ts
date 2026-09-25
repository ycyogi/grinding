/**
 * LeetCode 1926. Nearest Exit from Entrance in Maze
 * https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/
 *
 * Approach: single-source BFS from the entrance over the grid. BFS
 * guarantees the first border cell reached (that isn't the entrance)
 * is reached via the shortest path, since every move costs 1.
 *
 * Time:  O(m * n) - each cell is enqueued and processed at most once
 * Space: O(m * n) - queue plus visited tracking
 */
function nearestExit(maze: string[][], entrance: number[]): number {
  const m = maze.length;
  const n = maze[0].length;
  const [startRow, startCol] = entrance;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const visited: boolean[][] = Array.from({ length: m }, () => new Array<boolean>(n).fill(false));
  visited[startRow][startCol] = true;

  const queue: Array<[number, number, number]> = [[startRow, startCol, 0]];
  let head = 0;

  while (head < queue.length) {
    const [row, col, steps] = queue[head++];

    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow < 0 ||
        newRow >= m ||
        newCol < 0 ||
        newCol >= n ||
        visited[newRow][newCol] ||
        maze[newRow][newCol] === '+'
      ) {
        continue;
      }

      const isBorder = newRow === 0 || newRow === m - 1 || newCol === 0 || newCol === n - 1;
      if (isBorder) return steps + 1;

      visited[newRow][newCol] = true;
      queue.push([newRow, newCol, steps + 1]);
    }
  }

  return -1;
}

// Example usage:
// console.log(nearestExit([["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], [1,2])); // 1
// console.log(nearestExit([["+","+","+"],[".",".","."],["+","+","+"]], [1,0])); // 2

export { nearestExit };
