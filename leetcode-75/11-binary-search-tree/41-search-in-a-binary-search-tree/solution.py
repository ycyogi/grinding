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


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


def _serialize(node):
    """Turn a TreeNode subtree into a plain nested tuple for comparison."""
    if node is None:
        return None
    return (node.val, _serialize(node.left), _serialize(node.right))


if __name__ == "__main__":
    sol = Solution()
    root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(7))

    found = sol.searchBST(root, 2)
    print(found.val if found else None)  # 2

    not_found = sol.searchBST(root, 5)
    print(not_found)  # None

    # Edge cases
    assert_equal(_serialize(sol.searchBST(TreeNode(5), 5)), (5, None, None), "single node, match")
    assert_equal(_serialize(sol.searchBST(TreeNode(5), 3)), None, "single node, no match")
    assert_equal(_serialize(sol.searchBST(root, 4)), _serialize(root), "match is the root itself")

    right_chain = TreeNode(1, None, TreeNode(2, None, TreeNode(3, None, TreeNode(4))))
    assert_equal(_serialize(sol.searchBST(right_chain, 4)), (4, None, None), "deepest leaf of a right-only chain")

    assert_equal(
        _serialize(sol.searchBST(root, 6)),
        None,
        "value falls in a gap, descends right then left before running off",
    )
