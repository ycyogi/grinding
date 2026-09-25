/**
 * LeetCode 1372. Longest ZigZag Path in a Binary Tree
 * https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/
 *
 * Approach: post-order DFS returning, for each node, the length of the
 * longest zigzag path ending there via a move to the left and via a
 * move to the right. Since a zigzag must alternate direction,
 * left(node) = 1 + right(node.left) and right(node) = 1 + left(node.right).
 * Track the global max at every node.
 *
 * Time:  O(n) - every node is visited once
 * Space: O(h) - recursion stack, h = tree height
 */
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function longestZigZag(root: TreeNode | null): number {
  let maxLen = 0;

  // Returns [longest ending with a move to the left, longest ending with a move to the right]
  function dfs(node: TreeNode | null): [number, number] {
    if (node === null) return [-1, -1];

    const [, leftFromRight] = dfs(node.left);
    const [rightFromLeft] = dfs(node.right);

    const left = 1 + leftFromRight;
    const right = 1 + rightFromLeft;

    maxLen = Math.max(maxLen, left, right);

    return [left, right];
  }

  dfs(root);

  return maxLen;
}

// Example usage:
// const tree = new TreeNode(1, new TreeNode(1, null, new TreeNode(1, new TreeNode(1, null, new TreeNode(1)), new TreeNode(1))), new TreeNode(1));
// console.log(longestZigZag(tree)); // 4

export { longestZigZag, TreeNode };
