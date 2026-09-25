# 33. Maximum Depth of Binary Tree

- **LeetCode:** [104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- **Difficulty:** Easy
- **Category:** Binary Tree DFS
- **Pattern:** Bottom-up recursive DFS

## Problem

Given the `root` of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest
path from the root node down to the farthest leaf node.

**Example 1**
```
Input:  root = [3,9,20,null,null,15,7]

        3
       / \
      9  20
        /  \
       15   7

Output: 3
Explanation: the longest path is 3 -> 20 -> 15 (or 3 -> 20 -> 7), 3 nodes deep.
```

**Example 2**
```
Input:  root = [1,null,2]

    1
     \
      2

Output: 2
```

**Constraints**
- The number of nodes in the tree is in the range `[0, 10^4]`.
- `-100 <= Node.val <= 100`

## Approach

The depth of a tree rooted at any node is `1 +` the larger of its two
subtrees' depths — a natural fit for bottom-up recursive DFS:

1. Base case: if the current node is `null`, its depth is `0`.
2. Recursively compute the depth of the left subtree and the depth of
   the right subtree.
3. Return `1 + max(leftDepth, rightDepth)` — the current node counts as
   one level, plus whichever child subtree goes deeper.

The recursion naturally bottoms out at the leaves (where both children
are `null`, contributing depth `0`, so a leaf itself reports depth `1`)
and the answer bubbles back up to the root.

An iterative BFS level-order traversal (counting the number of levels
processed) is an equally valid `O(n)` alternative if recursion depth is a
concern for very unbalanced trees.

## Complexity

- **Time:** `O(n)` — every node is visited exactly once.
- **Space:** `O(h)` for the recursion call stack, where `h` is the
  tree's height — `O(log n)` for a balanced tree, up to `O(n)` for a
  completely skewed tree.
