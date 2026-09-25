# 36. Path Sum III

- **LeetCode:** [437. Path Sum III](https://leetcode.com/problems/path-sum-iii/)
- **Difficulty:** Medium
- **Category:** Binary Tree DFS
- **Pattern:** DFS with a prefix-sum hash map

## Problem

Given the `root` of a binary tree and an integer `targetSum`, return the
number of paths where the sum of the values along the path equals
`targetSum`.

The path does **not** need to start or end at the root or a leaf, but it
must go **downwards** (traveling only from parent nodes to child nodes).

**Example 1**
```
Input:  root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8

              10
             /  \
            5   -3
           / \    \
          3   2   11
         / \   \
        3  -2   1

Output: 3
Explanation: the three paths that sum to 8 are 5 -> 3, 5 -> 2 -> 1,
and -3 -> 11.
```

**Example 2**
```
Input:  root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: 3
```

**Constraints**
- The number of nodes in the tree is in the range `[0, 1000]`.
- `-10^9 <= Node.val <= 10^9`
- `-1000 <= targetSum <= 1000`

## Approach

A brute-force solution would, for every node, start a fresh downward DFS
summing paths beginning exactly at that node — `O(n)` starting points
times `O(n)` path length gives `O(n^2)` in the worst case (a skewed
tree). We can do better with the **prefix sum** trick, borrowed from the
array "subarray sum equals K" problem, adapted to a tree:

1. Maintain a hash map `prefixCount` mapping a cumulative root-to-current
   sum to how many ancestors (on the current DFS path) have that exact
   cumulative sum. Initialize it with `{0: 1}` — representing the "empty
   prefix" so that a path starting at the root is counted correctly.
2. DFS from the root, carrying `currentSum` (the sum from the root down
   to the current node).
3. At each node, update `currentSum += node.val`.
4. The number of valid paths **ending at this node** equals
   `prefixCount[currentSum - targetSum] || 0` — because if some ancestor
   prefix summed to `currentSum - targetSum`, the nodes strictly between
   that ancestor and the current node sum to exactly `targetSum`. Add
   this to the running total.
5. Record the current node's own `currentSum` in `prefixCount` (increment
   its count by 1) before recursing into children, then recurse into the
   left and right subtrees.
6. **Backtrack**: after both children have been explored, decrement
   `prefixCount[currentSum]` by 1 (or remove it) — this node's prefix sum
   must not "leak" into sibling subtrees that don't share this path.
7. Return the total count accumulated across the whole traversal.

## Complexity

- **Time:** `O(n)` — each node is visited once, and hash map operations
  are `O(1)` on average (versus `O(n^2)` worst case for the brute-force
  "start DFS from every node" approach).
- **Space:** `O(n)` for the hash map in the worst case (a skewed tree
  where every node has a distinct prefix sum), plus `O(h)` for the
  recursion stack.

## Edge Cases

| Input | Expected output | Why it matters |
| --- | --- | --- |
| Chain `1 -> -1 -> 1` (all left children), `targetSum = 0` | `2` | Negative node values; two overlapping paths sum to `0` (`(1,-1)` and `(-1,1)`), testing the prefix-sum map handles negatives correctly. |
| Single node `0`, `targetSum = 0` | `1` | `targetSum = 0` with a zero-valued node — the trivial one-node path itself must count. |
| Root `100` with a detached chain `A(2) -> B(3)` off the root's left, `targetSum = 5` | `1` | The only valid path (`A -> B`) does **not** start at the root — checks the algorithm doesn't implicitly assume root-anchored paths. |
| Tree `0` with left child `0` and right child `0`, `targetSum = 0` | `5` | Symmetric zero-sum subtrees on both sides — verifies the backtracking step removes a node's prefix-sum contribution before moving to its sibling, so counts don't leak across branches. |
