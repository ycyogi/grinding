"""
LeetCode 437. Path Sum III
https://leetcode.com/problems/path-sum-iii/

Approach: DFS while maintaining a hash map of root-to-current prefix
sums seen on the current path. At each node, the number of valid
paths ending there is the count of ancestor prefixes equal to
currentSum - targetSum. Backtrack the map entry after visiting a
node's subtrees so sums don't leak across sibling branches.

Time:  O(n) - each node visited once, O(1) average map operations
Space: O(n) for the prefix-sum map, O(h) recursion stack
"""

from collections import defaultdict
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        prefix_count = defaultdict(int)
        prefix_count[0] = 1
        self.total = 0

        def dfs(node: Optional[TreeNode], current_sum: int) -> None:
            if node is None:
                return

            current_sum += node.val

            self.total += prefix_count[current_sum - targetSum]

            prefix_count[current_sum] += 1

            dfs(node.left, current_sum)
            dfs(node.right, current_sum)

            # Backtrack: remove this node's contribution before returning.
            prefix_count[current_sum] -= 1

        dfs(root, 0)

        return self.total


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    tree = TreeNode(
        10,
        TreeNode(5, TreeNode(3, TreeNode(3), TreeNode(-2)), TreeNode(2, None, TreeNode(1))),
        TreeNode(-3, None, TreeNode(11)),
    )
    print(sol.pathSum(tree, 8))  # 3

    # Edge cases
    # Chain 1 -> -1 -> 1 (all left children), targetSum = 0.
    # Paths summing to 0: (1,-1) and (-1,1) -> 2.
    negative_chain = TreeNode(1, TreeNode(-1, TreeNode(1)))
    assert_equal(sol.pathSum(negative_chain, 0), 2, "negative values, targetSum=0")

    assert_equal(sol.pathSum(TreeNode(0), 0), 1, "single zero-valued node, targetSum=0")

    # Root 100 (irrelevant) with a detached chain A(2) -> B(3) off its left.
    # Only A->B sums to 5; no root-anchored path does.
    off_root_chain = TreeNode(100, TreeNode(2, TreeNode(3)))
    assert_equal(sol.pathSum(off_root_chain, 5), 1, "valid path does not start at the root")

    # Symmetric zero tree: root 0, left child 0, right child 0, targetSum = 0.
    # 5 valid downward paths: [root], [root,left], [root,right], [left], [right].
    symmetric_zero_tree = TreeNode(0, TreeNode(0), TreeNode(0))
    assert_equal(sol.pathSum(symmetric_zero_tree, 0), 5, "symmetric zero-sum subtrees, no leakage across siblings")
