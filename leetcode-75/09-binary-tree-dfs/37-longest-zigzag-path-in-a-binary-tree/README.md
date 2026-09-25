# 37. Longest ZigZag Path in a Binary Tree

- **LeetCode:** [1372. Longest ZigZag Path in a Binary Tree](https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/)
- **Difficulty:** Medium
- **Category:** Binary Tree DFS
- **Pattern:** DFS carrying direction + running zigzag length

## Problem

You are given the `root` of a binary tree.

A **ZigZag path** for a binary tree is defined as follows:
- Choose any node in the binary tree and a direction (right or left).
- If the current direction is right, move to the right child of the
  current node; otherwise, move to the left child.
- Change the direction from right to left or from left to right.
- Repeat steps 2 and 3 until you can't move in the tree.

The **zigzag length** is defined as the number of nodes visited **minus
1** (so a single node has a zigzag length of `0`).

Return the longest ZigZag path contained in that tree.

**Example 1**
```
Input:  root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1,null,1]
Output: 3
Explanation: the longest zigzag path has 4 nodes, alternating
right -> left -> right, giving a length of 3.
```

**Example 2**
```
Input:  root = [1,1,1,null,1,null,null,1,1,null,1]

        1
       / \
      1   1
       \
        1
       / \
      1   1
       \
        1

Output: 4
Explanation: starting at the root's left child and going
right -> left -> right visits 5 nodes total (root -> left child ->
right -> left -> right), for a zigzag length of 4.
```

**Constraints**
- The number of nodes in the tree is in the range `[1, 5 * 10^4]`.
- `1 <= Node.val <= 100`

## Approach

For every node, track two values: the length of the longest zigzag path
that reaches this node ending with a move **to the left**, and the
length of the longest one ending with a move **to the right**. This is a
post-order DFS where each call reports both values up to its parent:

1. Define a recursive helper `dfs(node)` that returns a pair
   `[leftLen, rightLen]` for the subtree rooted at `node`:
   - `leftLen` = length of the longest zigzag path, among paths that
     pass through `node`'s left child, that continues with a move
     `node -> node.left`.
   - `rightLen` = same, but for a move `node -> node.right`.
2. Base case: if `node` is `null`, return `[-1, -1]`. Using `-1` lets the
   "+1 for this step" arithmetic below naturally produce `0` when a real
   node has no child on that side (matching the rule that a lone node
   has zigzag length `0`).
3. For a non-null node, recursively call
   `[llLeft, lrLeft] = dfs(node.left)` and
   `[rlRight, rrRight] = dfs(node.right)`.
4. Because a zigzag must alternate direction at every step:
   - The longest zigzag ending with a move into `node.left` is
     `left = 1 + lrLeft` (one more step than the best path ending at
     `node.left` that arrived via a **right** turn — since the next turn
     must flip to left).
   - Symmetrically, `right = 1 + rlRight` (one more step than the best
     path ending at `node.right` that arrived via a **left** turn).
5. Update a running global maximum with `max(left, right)` at every
   node, since the overall best zigzag path can end anywhere, not just
   at a leaf.
6. Return `[left, right]` to the caller.
7. Kick off `dfs(root)` and return the global maximum found.

## Complexity

- **Time:** `O(n)` — every node is visited exactly once.
- **Space:** `O(h)` for the recursion stack, where `h` is the tree's
  height (`O(log n)` balanced, `O(n)` worst-case skewed).
