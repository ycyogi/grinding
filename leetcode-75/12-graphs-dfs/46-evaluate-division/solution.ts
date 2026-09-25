/**
 * LeetCode 399. Evaluate Division
 * https://leetcode.com/problems/evaluate-division/
 *
 * Approach: model each equation Ai / Bi = v as a weighted directed
 * edge Ai -> Bi (weight v) and its inverse Bi -> Ai (weight 1 / v).
 * For each query, DFS from the numerator variable, multiplying edge
 * weights, until the denominator variable is reached or the search
 * is exhausted.
 *
 * Time:  O(Q * (V + E)) - Q queries, each may traverse the whole graph
 * Space: O(V + E) - adjacency list, plus O(V) visited set per query
 */
function calcEquation(
  equations: string[][],
  values: number[],
  queries: string[][]
): number[] {
  const graph = new Map<string, Array<[string, number]>>();

  const addEdge = (from: string, to: string, weight: number): void => {
    if (!graph.has(from)) graph.set(from, []);
    graph.get(from)!.push([to, weight]);
  };

  for (let i = 0; i < equations.length; i++) {
    const [a, b] = equations[i];
    const value = values[i];
    addEdge(a, b, value);
    addEdge(b, a, 1 / value);
  }

  const dfs = (
    current: string,
    target: string,
    visited: Set<string>,
    product: number
  ): number => {
    if (!graph.has(current)) return -1.0;
    if (current === target) return product;

    visited.add(current);

    for (const [neighbor, weight] of graph.get(current)!) {
      if (!visited.has(neighbor)) {
        const result = dfs(neighbor, target, visited, product * weight);
        if (result !== -1.0) return result;
      }
    }

    return -1.0;
  };

  return queries.map(([c, d]) => {
    if (!graph.has(c) || !graph.has(d)) return -1.0;
    if (c === d) return 1.0;
    return dfs(c, d, new Set<string>(), 1.0);
  });
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

function roundArr(arr: number[]): number[] {
  return arr.map((x) => Math.round(x * 1e5) / 1e5);
}

if (require.main === module) {
  // Example usage:
  console.log(calcEquation([["a","b"],["b","c"]], [2.0,3.0], [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]));
  // [6, 0.5, -1, 1, -1]

  // Edge cases
  assertEqual(
    calcEquation([["a", "b"], ["b", "c"]], [2.0, 3.0], [["a", "f"]]),
    [-1.0],
    "query variable not in the graph at all"
  );

  assertEqual(
    calcEquation([["a", "b"], ["b", "c"]], [2.0, 3.0], [["b", "b"]]),
    [1.0],
    "c==d and variable exists in the graph"
  );

  assertEqual(
    calcEquation([["a", "b"], ["b", "c"]], [2.0, 3.0], [["z", "z"]]),
    [-1.0],
    "c==d but variable doesn't exist in the graph"
  );

  assertEqual(
    calcEquation([["a", "b"], ["c", "d"]], [2.0, 3.0], [["a", "c"]]),
    [-1.0],
    "disconnected components, no path between existing variables"
  );

  assertEqual(
    roundArr(calcEquation([["a", "b"], ["b", "c"]], [2.0, 3.0], [["c", "a"]])),
    roundArr([1 / 6]),
    "reverse chain division through inverse edges (floating point)"
  );
}

export { calcEquation };
