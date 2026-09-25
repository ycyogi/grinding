"""
LeetCode 700. Search in a Binary Search Tree
https://leetcode.com/problems/search-in-a-binary-search-tree/

Approach: exploit the BST ordering property - at each node, compare
val against node.val to decide whether the answer could only live in
the left subtree, the right subtree, or has been found, discarding
the other subtree entirely at each step.

Time:  O(h) - h is tree height (O(log n) balanced, O(n) worst case)
Space: O(1) - iterative, no extra data structures
"""

from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:
        node = root

        while node is not None and node.val != val:
            node = node.left if val < node.val else node.right

        return node


if __name__ == "__main__":
    sol = Solution()
    root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7))

    found = sol.searchBST(root, 2)
    print(found.val if found else None)  # 2

    not_found = sol.searchBST(root, 5)
    print(not_found)  # None
