"""
LeetCode 450. Delete Node in a BST
https://leetcode.com/problems/delete-node-in-a-bst/

Approach: use BST ordering to locate the key in O(h). Once found:
no children -> remove it; one child -> splice it out with its child;
two children -> replace its value with its inorder successor (the
min of the right subtree) and recursively delete that successor
from the right subtree (which then has at most one child).

Time:  O(h) - h is tree height (O(log n) balanced, O(n) worst case)
Space: O(h) - recursion call stack
"""

from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:
        if root is None:
            return None

        if key < root.val:
            root.left = self.deleteNode(root.left, key)
        elif key > root.val:
            root.right = self.deleteNode(root.right, key)
        else:
            # Found the node to delete.
            if root.left is None:
                return root.right
            if root.right is None:
                return root.left

            # Two children: find the inorder successor (min of right subtree).
            successor = root.right
            while successor.left is not None:
                successor = successor.left

            root.val = successor.val
            root.right = self.deleteNode(root.right, successor.val)

        return root


if __name__ == "__main__":
    sol = Solution()
    root = TreeNode(5, TreeNode(3, TreeNode(2), TreeNode(4)), TreeNode(6, None, TreeNode(7)))

    result = sol.deleteNode(root, 3)
    # Valid BST with 3 removed, e.g. root -> 5, left -> 4 (with left child 2), right -> 6 -> 7
    print(result.val, result.left.val, result.right.val)  # 5 4 6

    unchanged = sol.deleteNode(root, 0)
    print(unchanged.val)  # 5 (key not present, tree unchanged)
