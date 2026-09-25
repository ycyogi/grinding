# 41. Search in a Binary Search Tree

- **LeetCode:** [700. Search in a Binary Search Tree](https://leetcode.com/problems/search-in-a-binary-search-tree/)
- **Difficulty:** Easy
- **Category:** Binary Search Tree
- **Pattern:** BST binary search

## Problem

You are given the `root` of a binary search tree (BST) and an integer
`val`. Find the node in the BST whose value equals `val` and return the
subtree rooted at that node. If no such node exists, return `null`.

**Example 1**
```
Input:  root = [4,2,7,1,3], val = 2

        4
       / \
      2   7
     / \
    1   3

Output: [2,1,3]
Explanation: The node with value 2 is returned, along with its subtree.
```

**Example 2**
```
Input:  root = [4,2,7,1,3], val = 5
Output: []
Explanation: No node has value 5, so null (empty tree) is returned.
```

**Constraints**
- The number of nodes in the tree is in the range `[1, 5000]`.
- `1 <= Node.val <= 10^7`
- `root` is a binary search tree.
- `1 <= val <= 10^7`

## Approach

Because the tree is a valid BST, we don't need a generic tree search —
at every node we can decide which single subtree could possibly contain
`val` and discard the other one entirely.

1. Start at `root`.
2. While the current node is not `null` and its value is not `val`:
   - If `val < node.val`, move to `node.left` (everything in the right
     subtree is guaranteed to be larger, so it can't contain `val`).
   - Otherwise (`val > node.val`), move to `node.right`.
3. Return the current node (either the match, or `null` if we fell off
   the tree).

This can be written iteratively (as above, `O(1)` extra space) or
recursively (`O(h)` call stack space); the iterative version is
preferred for BSTs since we never need to backtrack.

## Complexity

- **Time:** `O(h)` where `h` is the tree height — each step descends one
  level, discarding half the remaining search space (in the BST sense).
  Worst case `O(n)` for a degenerate (linked-list-shaped) tree; `O(log n)`
  for a balanced tree.
- **Space:** `O(1)` for the iterative version (no extra data structures);
  a recursive version would use `O(h)` stack space.
