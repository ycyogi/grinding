/**
 * LeetCode 547. Number of Provinces
 * https://leetcode.com/problems/number-of-provinces/
 *
 * Approach: isConnected is an adjacency matrix; a "province" is a
 * connected component. Run DFS from every unvisited city, marking all
 * cities reachable from it, and count how many DFS runs we start.
 *
 * Time:  O(n^2) - every matrix entry is inspected once overall
 * Space: O(n) - visited array + recursion stack
 */
function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  const visited = new Array<boolean>(n).fill(false);
  let provinces = 0;

  function dfs(city: number): void {
    visited[city] = true;
    for (let neighbor = 0; neighbor < n; neighbor++) {
      if (isConnected[city][neighbor] === 1 && !visited[neighbor]) {
        dfs(neighbor);
      }
    }
  }

  for (let city = 0; city < n; city++) {
    if (!visited[city]) {
      provinces++;
      dfs(city);
    }
  }

  return provinces;
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
  console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]])); // 2
  console.log(findCircleNum([[1,0,0],[0,1,0],[0,0,1]])); // 3

  // Edge cases
  assertEqual(findCircleNum([[1]]), 1, "n=1, single city");

  assertEqual(
    findCircleNum([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]),
    4,
    "identity matrix, all isolated"
  );

  assertEqual(
    findCircleNum([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ]),
    1,
    "fully connected"
  );

  assertEqual(
    findCircleNum([
      [1, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 1, 1],
      [0, 0, 1, 1],
    ]),
    1,
    "transitive chain, endpoints not directly connected"
  );

  assertEqual(
    findCircleNum([
      [1, 1, 1, 0, 0],
      [1, 1, 1, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1],
      [0, 0, 0, 1, 1],
    ]),
    2,
    "two components of uneven size"
  );
}

export { findCircleNum };
