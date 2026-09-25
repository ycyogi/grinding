# 39. Binary Tree Right Side View

- **LeetCode:** [199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)
- **Difficulty:** Medium
- **Category:** Binary Tree - BFS
- **Pattern:** BFS level order (last node per level)

## Problem

Given the `root` of a binary tree, imagine yourself standing on the right
side of it. Return the values of the nodes you can see, ordered from top
to bottom (i.e., what you'd see looking at the tree from the right).

**Example 1**
```
Input:  root = [1,2,3,null,5,null,4]

        1
       / \
      2   3
       \   \
        5   4

Output: [1,3,4]
```

**Example 2**
```
Input:  root = [1,2,3,4,null,null,null,5]

           1
          / \
         2   3
        /
       4
      /
     5

Output: [1,3,4,5]
Explanation: Even though node 4 has no right sibling at its level, it is
still the rightmost node visible at its level, and 5 is the rightmost
(only) node at the deepest level.
```

**Constraints**
- The number of nodes in the tree is in the range `[0, 100]`.
- `-100 <= Node.val <= 100`

## Approach

This is a level-order (BFS) traversal where, for each level, we only keep
the value of the **last** node processed at that level — that's the node
farthest to the right and therefore the one visible from the right side.

1. If `root` is `null`, return an empty array.
2. Initialize a queue with `root`.
3. While the queue is not empty:
   - Record the current queue length `levelSize` (the number of nodes at
     this level).
   - Loop `levelSize` times, dequeuing one node each time and enqueuing
     its children (left then right, if they exist).
   - After the inner loop, the last node dequeued in this pass was the
     rightmost node of the level — push its value onto the result.
4. Return the result array.

An equivalent DFS approach: traverse right child before left child,
tracking depth; the first time a given depth is reached, record that
node's value (since right is visited first, the first node seen at each
depth is the rightmost one).

## Complexity

- **Time:** `O(n)` — every node is enqueued and dequeued exactly once.
- **Space:** `O(n)` — the queue holds up to the widest level of the tree
  (up to `O(n)` for a fully "bushy" tree), plus `O(n)` for the output in
  the worst case (a tree that is a single right-leaning chain has one
  node per level).
