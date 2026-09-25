"""
LeetCode 1372. Longest ZigZag Path in a Binary Tree
https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/

Approach: post-order DFS returning, for each node, the length of the
longest zigzag path ending there via a move to the left and via a
move to the right. Since a zigzag must alternate direction,
left(node) = 1 + right(node.left) and right(node) = 1 + left(node.right).
Track the global max at every node.

Time:  O(n) - every node is visited once
Space: O(h) - recursion stack, h = tree height
"""

from typing import Optional, Tuple


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def longestZigZag(self, root: Optional[TreeNode]) -> int:
        self.max_len = 0

        def dfs(node: Optional[TreeNode]) -> Tuple[int, int]:
            if node is None:
                return (-1, -1)

            _, left_from_right = dfs(node.left)
            right_from_left, _ = dfs(node.right)

            left = 1 + left_from_right
            right = 1 + right_from_left

            self.max_len = max(self.max_len, left, right)

            return (left, right)

        dfs(root)

        return self.max_len


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    tree = TreeNode(
        1,
        TreeNode(1, None, TreeNode(1, TreeNode(1, None, TreeNode(1)), TreeNode(1))),
        TreeNode(1),
    )
    print(sol.longestZigZag(tree))  # 4

    # Edge cases
    assert_equal(sol.longestZigZag(TreeNode(1)), 0, "single node")
    assert_equal(sol.longestZigZag(TreeNode(1, TreeNode(2))), 1, "root with only a left child")
    assert_equal(sol.longestZigZag(TreeNode(1, None, TreeNode(2))), 1, "root with only a right child")

    # Pure 5-node zigzag chain: root -right-> n1 -left-> n2 -right-> n3 -left-> n4
    n4 = TreeNode(5)
    n3 = TreeNode(4, n4)
    n2 = TreeNode(3, None, n3)
    n1 = TreeNode(2, n2)
    zigzag_chain = TreeNode(1, None, n1)
    assert_equal(sol.longestZigZag(zigzag_chain), 4, "5-node pure zigzag chain")
