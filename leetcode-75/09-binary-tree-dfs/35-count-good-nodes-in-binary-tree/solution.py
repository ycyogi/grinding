"""
LeetCode 1448. Count Good Nodes in Binary Tree
https://leetcode.com/problems/count-good-nodes-in-binary-tree/

Approach: top-down DFS threading the max value seen so far on the
root-to-node path. A node is good when its value >= that running
max; the running max is then updated for its children.

Time:  O(n) - every node is visited once
Space: O(h) - recursion stack, h = tree height
"""


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def goodNodes(self, root: TreeNode) -> int:
        def dfs(node, max_so_far):
            if node is None:
                return 0

            count = 1 if node.val >= max_so_far else 0
            new_max = max(max_so_far, node.val)

            count += dfs(node.left, new_max)
            count += dfs(node.right, new_max)

            return count

        return dfs(root, float("-inf"))


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    tree = TreeNode(3, TreeNode(1, TreeNode(3)), TreeNode(4, TreeNode(1), TreeNode(5)))
    print(sol.goodNodes(tree))  # 4

    tree2 = TreeNode(3, TreeNode(3, None, TreeNode(4, TreeNode(2))))
    print(sol.goodNodes(tree2))  # 3

    # Edge cases
    assert_equal(sol.goodNodes(TreeNode(5)), 1, "single node")

    all_equal_chain = TreeNode(5, TreeNode(5, TreeNode(5)))
    assert_equal(sol.goodNodes(all_equal_chain), 3, "all-equal chain, ties count as good")

    decreasing_chain = TreeNode(5, TreeNode(3, TreeNode(1)))
    assert_equal(sol.goodNodes(decreasing_chain), 1, "strictly decreasing chain, only root is good")

    negative_values = TreeNode(-1, TreeNode(-5), TreeNode(0))
    assert_equal(sol.goodNodes(negative_values), 2, "negative values, root and right child are good")

    mixed_tree = TreeNode(3, TreeNode(3, None, TreeNode(4, TreeNode(2))))
    assert_equal(sol.goodNodes(mixed_tree), 3, "README example 2: mixed-shape tree")
