# 38. Lowest Common Ancestor of a Binary Tree

- **LeetCode:** [236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)
- **Difficulty:** Medium
- **Category:** Binary Tree DFS
- **Pattern:** Bottom-up recursive search returning the ancestor as soon as it's found

## Problem

Given a binary tree, find the lowest common ancestor (LCA) of two given
nodes `p` and `q` in the tree.

According to the definition of LCA: "The lowest common ancestor is
defined between two nodes `p` and `q` as the lowest node in the tree
that has both `p` and `q` as descendants (where we allow **a node to be
a descendant of itself**)."

**Example 1**
```
Input:  root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: the LCA of nodes 5 and 1 is 3, the root, since 5 lives in
the left subtree and 1 lives in the right subtree.
```

**Example 2**
```
Input:  root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: the LCA of nodes 5 and 4 is 5, since a node can be a
descendant of itself and 4 is in 5's subtree.
```

**Constraints**
- The number of nodes in the tree is in the range `[2, 10^5]`.
- `-10^9 <= Node.val <= 10^9`
- All `Node.val` are unique.
- `p != q`
- `p` and `q` will both exist in the tree.

## Approach

Use a single bottom-up DFS pass that, for any subtree, reports either
"neither target found," "one of the targets found (and here it is),"
or implicitly signals "both targets found in this subtree" by having
both recursive calls come back non-null at the same node:

1. Base case: if `node` is `null`, or `node` is exactly `p` or exactly
   `q`, return `node` itself. Returning early on a match is valid
   because a node counts as its own descendant, so finding `p` (or `q`)
   is immediately a candidate answer to propagate upward.
2. Recurse into the left subtree: `left = dfs(node.left)`.
3. Recurse into the right subtree: `right = dfs(node.right)`.
4. Combine the results:
   - If both `left` and `right` are non-null, it means `p` was found on
     one side and `q` on the other (or one of them is this node's
     ancestor already resolved) — so `node` itself is the LCA. Return
     `node`.
   - If only `left` is non-null, both targets (or the only target found
     so far) live in the left subtree — propagate `left` upward.
   - Symmetrically, if only `right` is non-null, propagate `right`.
   - If both are `null`, neither target is in this subtree — propagate
     `null`.
5. The call `dfs(root)` returns the LCA directly.

The key insight is that the first node where the search results from
both children are non-null is exactly the split point where `p` and `q`
diverge into different subtrees — which by definition is their lowest
common ancestor. If one target is an ancestor of the other, the
recursion naturally returns that ancestor itself without needing a
special case, because step 1 returns immediately upon matching `p` or
`q`.

## Complexity

- **Time:** `O(n)` — in the worst case every node is visited once before
  both targets are located.
- **Space:** `O(h)` for the recursion stack, where `h` is the tree's
  height (`O(log n)` balanced, `O(n)` worst-case skewed).

## Edge Cases

| Input | Expected output | Why it matters |
| --- | --- | --- |
| 2-node tree, `p = root`, `q = root.left` | `root` | Minimum size (`n = 2`) — `p` is the root itself, must return immediately without descending further. |
| Chain `A -> B -> C`, `p = B`, `q = C` | `B` | `p` is an ancestor of `q` — the LCA is `p` itself, per the "a node is its own descendant" rule. |
| Same chain, `p = C`, `q = B` (arguments swapped) | `B` | Confirms the result doesn't depend on which of `p`/`q` is passed first. |
| Balanced tree, `p` and `q` in different subtrees of the root | `root` | Standard split case with a fresh `p`/`q` pair, confirming both-sides-non-null detection at the true split point. |
