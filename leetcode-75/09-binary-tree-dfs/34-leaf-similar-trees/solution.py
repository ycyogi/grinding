"""
LeetCode 872. Leaf-Similar Trees
https://leetcode.com/problems/leaf-similar-trees/

Approach: DFS each tree (left before right) to collect its leaf
values in left-to-right order, then compare the two sequences.

Time:  O(n + m) - every node of both trees is visited once
Space: O(n + m) for the leaf lists, plus O(h1 + h2) recursion stack
"""

from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        def get_leaves(node: Optional[TreeNode], leaves: List[int]) -> None:
            if node is None:
                return
            if node.left is None and node.right is None:
                leaves.append(node.val)
                return
            get_leaves(node.left, leaves)
            get_leaves(node.right, leaves)

        leaves1: List[int] = []
        leaves2: List[int] = []
        get_leaves(root1, leaves1)
        get_leaves(root2, leaves2)

        return leaves1 == leaves2


if __name__ == "__main__":
    sol = Solution()
    t1 = TreeNode(1, TreeNode(2), TreeNode(3))
    t2 = TreeNode(1, TreeNode(3), TreeNode(2))
    print(sol.leafSimilar(t1, t1))  # True (same tree)
    print(sol.leafSimilar(t1, t2))  # False
