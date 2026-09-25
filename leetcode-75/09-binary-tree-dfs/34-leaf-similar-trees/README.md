# 34. Leaf-Similar Trees

- **LeetCode:** [872. Leaf-Similar Trees](https://leetcode.com/problems/leaf-similar-trees/)
- **Difficulty:** Easy
- **Category:** Binary Tree DFS
- **Pattern:** DFS to collect a leaf sequence, then compare

## Problem

Consider all the leaves of a binary tree, from left to right order, the
values of those leaves form a **leaf value sequence**.

Two binary trees are considered **leaf-similar** if their leaf value
sequences are the same.

Return `true` if and only if the two given trees with head nodes `root1`
and `root2` are leaf-similar.

**Example 1**
```
Input:  root1 = [3,5,1,6,2,9,8,null,null,7,4]
        root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
Output: true
Explanation: both trees' leaves, read left to right, are [6,7,4,9,8].
```

**Example 2**
```
Input:  root1 = [1,2,3]
        root2 = [1,3,2]
Output: false
Explanation: root1's leaves left to right are [2,3]; root2's are [3,2].
```

**Constraints**
- The number of nodes in each tree will be in the range `[1, 200]`.
- Both of the given trees will have values in the range `[0, 200]`.

## Approach

Compute each tree's leaf sequence independently with a DFS, then compare
the two sequences directly:

1. Write a DFS helper that walks a tree (pre-order works fine, since it
   naturally visits left subtree before right subtree) and appends a
   node's value to a list whenever that node is a **leaf** (both `left`
   and `right` are `null`).
2. Run the helper on `root1` to get `leaves1`, and on `root2` to get
   `leaves2`.
3. Return `true` if `leaves1` and `leaves2` are equal element-for-element
   (same length and same values in the same order), `false` otherwise.

Recursing left-before-right at every node guarantees the leaves are
collected in the correct left-to-right order without any extra sorting
or indexing.

## Complexity

- **Time:** `O(n + m)` — every node of both trees is visited once, where
  `n` and `m` are the node counts of `root1` and `root2`.
- **Space:** `O(n + m)` for the two leaf-value lists, plus `O(h1 + h2)`
  for the recursion stacks (heights of the two trees).

## Edge Cases

| Input | Expected output | Why it matters |
| --- | --- | --- |
| Single node `5` vs. single node `5` | `true` | Minimum size (`n = 1`) — the root itself is the only leaf, and its own value forms the whole sequence. |
| Single node `5` vs. single node `6` | `false` | Same shape, single differing value — smallest possible mismatch. |
| Different shapes, same leaf sequence `[2,3]` | `true` | Confirms comparison is purely about the leaf sequence, not tree structure/depth. |
| `[5,6,7]` vs. `[5,7,6]` | `false` | Same values, same depth, but leaves visited in a different left-to-right order. |
