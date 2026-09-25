"""
LeetCode 236. Lowest Common Ancestor of a Binary Tree
https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/

Approach: bottom-up DFS. A node's search returns itself immediately
if it equals p or q (a node is its own descendant). Otherwise it
recurses into both children: if both sides return non-null, this
node is the split point and thus the LCA; otherwise propagate
whichever single non-null result was found (or None).

Time:  O(n) - each node visited at most once
Space: O(h) - recursion stack, h = tree height
"""

from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def lowestCommonAncestor(
        self, root: "TreeNode", p: "TreeNode", q: "TreeNode"
    ) -> "TreeNode":
        def dfs(node: Optional[TreeNode]) -> Optional[TreeNode]:
            if node is None or node is p or node is q:
                return node

            left = dfs(node.left)
            right = dfs(node.right)

            if left is not None and right is not None:
                return node

            return left if left is not None else right

        return dfs(root)


if __name__ == "__main__":
    sol = Solution()
    n7, n4 = TreeNode(7), TreeNode(4)
    n6, n2 = TreeNode(6), TreeNode(2, n7, n4)
    n5 = TreeNode(5, n6, n2)
    n0, n8 = TreeNode(0), TreeNode(8)
    n1 = TreeNode(1, n0, n8)
    root = TreeNode(3, n5, n1)

    print(sol.lowestCommonAncestor(root, n5, n1).val)  # 3
    print(sol.lowestCommonAncestor(root, n5, n4).val)  # 5
