"""
LeetCode 1161. Maximum Level Sum of a Binary Tree
https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/

Approach: BFS level order traversal, summing each level's node
values and tracking the level with the maximal sum (first one wins
on a tie because we scan levels in increasing order and only update
on a strictly greater sum).

Time:  O(n) - every node is visited once
Space: O(n) - queue holds up to the widest level of the tree
"""

from collections import deque
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def maxLevelSum(self, root: Optional[TreeNode]) -> int:
        queue = deque([root])
        current_level = 0
        best_level = 1
        best_sum = float("-inf")

        while queue:
            current_level += 1
            level_size = len(queue)
            level_sum = 0

            for _ in range(level_size):
                node = queue.popleft()
                level_sum += node.val

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            if level_sum > best_sum:
                best_sum = level_sum
                best_level = current_level

        return best_level


if __name__ == "__main__":
    sol = Solution()
    root = TreeNode(1, TreeNode(7, TreeNode(7), TreeNode(-8)), TreeNode(0))
    print(sol.maxLevelSum(root))  # 2

    root2 = TreeNode(989, None, TreeNode(10250, TreeNode(98693, None, TreeNode(-32127)), TreeNode(-89388)))
    print(sol.maxLevelSum(root2))  # 2
