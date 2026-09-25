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


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    root = TreeNode(1, TreeNode(2, None, TreeNode(5)), TreeNode(3, None, TreeNode(4)))
    print(sol.rightSideView(root))  # [1, 3, 4]

    root2 = TreeNode(1, TreeNode(2, TreeNode(4, TreeNode(5))), TreeNode(3))
    print(sol.rightSideView(root2))  # [1, 3, 4, 5]

    # Edge cases
    assert_equal(sol.rightSideView(None), [], "empty tree")

    assert_equal(sol.rightSideView(TreeNode(1)), [1], "single node")

    left_chain = TreeNode(1, TreeNode(2, TreeNode(3, TreeNode(4))))
    assert_equal(sol.rightSideView(left_chain), [1, 2, 3, 4], "pure left chain")

    switch_over = TreeNode(
        1,
        TreeNode(2, None, TreeNode(6, None, TreeNode(7))),
        TreeNode(3),
    )
    assert_equal(sol.rightSideView(switch_over), [1, 3, 6, 7], "visibility switches to deeper left branch")

    negatives = TreeNode(-100, TreeNode(-50), TreeNode(-75))
    assert_equal(sol.rightSideView(negatives), [-100, -75], "boundary negative values")
