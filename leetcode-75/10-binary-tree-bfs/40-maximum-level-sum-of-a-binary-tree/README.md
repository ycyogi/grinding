# 40. Maximum Level Sum of a Binary Tree

- **LeetCode:** [1161. Maximum Level Sum of a Binary Tree](https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/)
- **Difficulty:** Medium
- **Category:** Binary Tree - BFS
- **Pattern:** BFS level order sum

## Problem

Given the `root` of a binary tree, the level of its root is `1`, the
level of its children is `2`, and so on.

Return the smallest level `x` such that the sum of all the values of
nodes at level `x` is maximal.

**Example 1**
```
Input:  root = [1,7,0,7,-8,null,null]

           1
          / \
         7   0
        / \
       7  -8

Level 1: 1
Level 2: 7 + 0 = 7
Level 3: 7 + (-8) = -1

Output: 2
```

**Example 2**
```
Input:  root = [989,null,10250,98693,-89388,null,null,null,-32127]
Output: 2
Explanation: Level 2 (10250 + 98693 + -89388 = 19555) has the largest
sum among all levels.
```

**Constraints**
- The number of nodes in the tree is in the range `[1, 10^4]`.
- `-10^5 <= Node.val <= 10^5`

## Approach

Straightforward BFS level-order traversal, summing values level by
level and tracking the best (level, sum) pair seen so far.

1. Initialize a queue with `root`, `bestLevel = 1`, `bestSum = -Infinity`,
   and `currentLevel = 0`.
2. While the queue is not empty:
   - Increment `currentLevel`.
   - Record the current queue length `levelSize`.
   - Sum the `val` of all `levelSize` nodes dequeued in this pass,
     enqueuing each node's children along the way.
   - If this level's sum is strictly greater than `bestSum`, update
     `bestSum = levelSum` and `bestLevel = currentLevel`. Using strict
     `>` (not `>=`) automatically keeps the *smallest* level on ties,
     since levels are processed in increasing order.
3. Return `bestLevel`.

## Complexity

- **Time:** `O(n)` — every node is visited exactly once during the BFS.
- **Space:** `O(n)` — the queue can hold up to the widest level of the
  tree in the worst case (e.g., a complete binary tree's last level has
  roughly `n/2` nodes).
