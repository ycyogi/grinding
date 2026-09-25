"""
LeetCode 399. Evaluate Division
https://leetcode.com/problems/evaluate-division/

Approach: model each equation Ai / Bi = v as a weighted directed
edge Ai -> Bi (weight v) and its inverse Bi -> Ai (weight 1 / v).
For each query, DFS from the numerator variable, multiplying edge
weights, until the denominator variable is reached or the search
is exhausted.

Time:  O(Q * (V + E)) - Q queries, each may traverse the whole graph
Space: O(V + E) - adjacency list, plus O(V) visited set per query
"""

from collections import defaultdict
from typing import Dict, List, Set, Tuple


class Solution:
    def calcEquation(
        self,
        equations: List[List[str]],
        values: List[float],
        queries: List[List[str]],
    ) -> List[float]:
        graph: Dict[str, List[Tuple[str, float]]] = defaultdict(list)

        for (a, b), value in zip(equations, values):
            graph[a].append((b, value))
            graph[b].append((a, 1 / value))

        def dfs(current: str, target: str, visited: Set[str], product: float) -> float:
            if current not in graph:
                return -1.0
            if current == target:
                return product

            visited.add(current)

            for neighbor, weight in graph[current]:
                if neighbor not in visited:
                    result = dfs(neighbor, target, visited, product * weight)
                    if result != -1.0:
                        return result

            return -1.0

        answers = []
        for c, d in queries:
            if c not in graph or d not in graph:
                answers.append(-1.0)
            elif c == d:
                answers.append(1.0)
            else:
                answers.append(dfs(c, d, set(), 1.0))

        return answers


if __name__ == "__main__":
    sol = Solution()
    print(
        sol.calcEquation(
            [["a", "b"], ["b", "c"]],
            [2.0, 3.0],
            [["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]],
        )
    )  # [6.0, 0.5, -1.0, 1.0, -1.0]

    print(
        sol.calcEquation(
            [["a", "b"], ["b", "c"], ["bc", "cd"]],
            [1.5, 2.5, 5.0],
            [["a", "c"], ["c", "b"], ["bc", "cd"], ["cd", "bc"]],
        )
    )  # [3.75, 0.4, 5.0, 0.2]
