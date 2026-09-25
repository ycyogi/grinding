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


if __name__ == "__main__":
    sol = Solution()
    tree = TreeNode(
        10,
        TreeNode(5, TreeNode(3, TreeNode(3), TreeNode(-2)), TreeNode(2, None, TreeNode(1))),
        TreeNode(-3, None, TreeNode(11)),
    )
    print(sol.pathSum(tree, 8))  # 3
