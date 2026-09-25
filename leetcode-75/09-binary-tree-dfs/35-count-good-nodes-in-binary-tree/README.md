# 35. Count Good Nodes in Binary Tree

- **LeetCode:** [1448. Count Good Nodes in Binary Tree](https://leetcode.com/problems/count-good-nodes-in-binary-tree/)
- **Difficulty:** Medium
- **Category:** Binary Tree DFS
- **Pattern:** Top-down DFS carrying the max-so-far

## Problem

Given a binary tree `root`, a node `X` in the tree is named **good** if
in the path from `root` to `X` there are no nodes with a value **greater
than** `X`.

Return the number of good nodes in the binary tree.

**Example 1**
```
Input:  root = [3,1,4,3,null,1,5]

          3
         / \
        1   4
       /   / \
      3   1   5

Output: 4
Explanation: the good nodes are: root node (3), node 4 (3 < 4),
node 5 (3,4 < 5), and the left node 3 (its path is 3 -> 1 -> 3; the
max before it, 3, is not greater than it, so it still counts as good).
```

**Example 2**
```
Input:  root = [3,3,null,4,2]

        3
       /
      3
       \
        4
       /
      2

Output: 3
Explanation: node 3 (root) is good. Node 3 (left child) is good since
3 >= 3. Node 4 is good since 4 >= 3. Node 2 is not good since 4 > 2.
```

**Constraints**
- The number of nodes in the binary tree is in the range `[1, 10^5]`.
- Each node's value is between `[-10^4, 10^4]`.

## Approach

A node is "good" exactly when its own value is greater than or equal to
the maximum value seen anywhere on the path from the root down to it
(inclusive of ancestors, not itself). This is naturally computed with a
**top-down** DFS that threads the running maximum down through the
recursion:

1. Define a recursive helper `dfs(node, maxSoFar)` where `maxSoFar` is
   the largest value seen on the path from the root to `node`'s parent.
2. Base case: if `node` is `null`, return `0` (contributes no good
   nodes).
3. Determine whether the current node is good: `node.val >= maxSoFar`.
   If so, add `1` to the count.
4. Update the running max for the children:
   `newMax = max(maxSoFar, node.val)`.
5. Recurse into the left and right children with `newMax`, summing their
   good-node counts with the current node's own contribution.
6. Kick off the recursion with `dfs(root, root.val)` (or
   `dfs(root, -Infinity)`, since the root is always good) and return the
   total.

## Complexity

- **Time:** `O(n)` — every node is visited exactly once.
- **Space:** `O(h)` for the recursion stack, where `h` is the tree's
  height (`O(log n)` balanced, `O(n)` worst-case skewed).
