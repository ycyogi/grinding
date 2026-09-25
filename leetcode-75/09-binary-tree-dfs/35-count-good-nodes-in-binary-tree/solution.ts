/**
 * LeetCode 1448. Count Good Nodes in Binary Tree
 * https://leetcode.com/problems/count-good-nodes-in-binary-tree/
 *
 * Approach: top-down DFS threading the max value seen so far on the
 * root-to-node path. A node is good when its value >= that running
 * max; the running max is then updated for its children.
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

function goodNodes(root: TreeNode): number {
  function dfs(node: TreeNode | null, maxSoFar: number): number {
    if (node === null) return 0;

    let count = node.val >= maxSoFar ? 1 : 0;
    const newMax = Math.max(maxSoFar, node.val);

    count += dfs(node.left, newMax);
    count += dfs(node.right, newMax);

    return count;
  }

  return dfs(root, -Infinity);
}

// Example usage:
// const tree = new TreeNode(3, new TreeNode(1, new TreeNode(3)), new TreeNode(4, new TreeNode(1), new TreeNode(5)));
// console.log(goodNodes(tree)); // 4

export { goodNodes, TreeNode };
