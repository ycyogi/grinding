/**
 * LeetCode 1466. Reorder Routes to Make All Paths Lead to the City Zero
 * https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/
 *
 * Approach: build an undirected adjacency list from the tree, tagging
 * each direction of traversal with a cost: walking an edge in its
 * original direction (away from the eventual root during outward
 * traversal) costs 1 (needs reversal); walking it backward costs 0.
 * DFS/BFS outward from city 0, summing costs.
 *
 * Time:  O(n) - tree has n nodes, n - 1 edges
 * Space: O(n) - adjacency list, visited set, and stack/queue
 */
function minReorder(n: number, connections: number[][]): number {
  const adj: Array<Array<[number, number]>> = Array.from({ length: n }, () => []);

  for (const [a, b] of connections) {
    adj[a].push([b, 1]); // original direction a -> b: needs reversal if walked outward
    adj[b].push([a, 0]); // reverse direction b -> a: already points toward root
  }

  const visited = new Array<boolean>(n).fill(false);
  visited[0] = true;
  const stack: number[] = [0];
  let changes = 0;

  while (stack.length > 0) {
    const city = stack.pop() as number;

    for (const [neighbor, cost] of adj[city]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        changes += cost;
        stack.push(neighbor);
      }
    }
  }

  return changes;
}
if (require.main === module) {
  // Example usage:
  console.log(minReorder(6, [[0,1],[1,3],[2,3],[4,0],[4,5]])); // 3
  console.log(minReorder(5, [[1,0],[1,2],[3,2],[3,4]])); // 2
}

export { minReorder };
