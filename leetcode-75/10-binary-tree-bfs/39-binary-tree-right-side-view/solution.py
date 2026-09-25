"""
LeetCode 199. Binary Tree Right Side View
https://leetcode.com/problems/binary-tree-right-side-view/

Approach: BFS level order traversal. For each level, keep only the
value of the last node dequeued (the rightmost node at that depth).

Time:  O(n) - every node is visited once
Space: O(n) - queue holds up to the widest level; output holds one
              value per level
"""

from collections import deque
from typing import List, Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        if root is None:
            return []

        result = []
        queue = deque([root])

        while queue:
            level_size = len(queue)
            rightmost_value = 0

            for _ in range(level_size):
                node = queue.popleft()
                rightmost_value = node.val

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            result.append(rightmost_value)

        return result


if __name__ == "__main__":
    sol = Solution()
    root = TreeNode(1, TreeNode(2, None, TreeNode(5)), TreeNode(3, None, TreeNode(4)))
    print(sol.rightSideView(root))  # [1, 3, 4]

    root2 = TreeNode(1, TreeNode(2, TreeNode(4, TreeNode(5))), TreeNode(3))
    print(sol.rightSideView(root2))  # [1, 3, 4, 5]
