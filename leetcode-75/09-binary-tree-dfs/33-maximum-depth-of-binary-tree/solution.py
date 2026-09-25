"""
LeetCode 104. Maximum Depth of Binary Tree
https://leetcode.com/problems/maximum-depth-of-binary-tree/

Approach: bottom-up recursive DFS. The depth of a subtree is
1 + max(depth of left child, depth of right child), bottoming out at
None (depth 0).

Time:  O(n) - every node is visited once
Space: O(h) - recursion stack, h = tree height (O(log n) balanced,
       O(n) worst case skewed)
"""

from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0

        left_depth = self.maxDepth(root.left)
        right_depth = self.maxDepth(root.right)

        return 1 + max(left_depth, right_depth)


if __name__ == "__main__":
    sol = Solution()
    tree = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
    print(sol.maxDepth(tree))  # 3
    print(sol.maxDepth(TreeNode(1, None, TreeNode(2))))  # 2
    print(sol.maxDepth(None))  # 0
