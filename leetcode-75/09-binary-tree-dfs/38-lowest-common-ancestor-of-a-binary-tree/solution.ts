/**
 * LeetCode 236. Lowest Common Ancestor of a Binary Tree
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
 *
 * Approach: bottom-up DFS. A node's search returns itself immediately
 * if it equals p or q (a node is its own descendant). Otherwise it
 * recurses into both children: if both sides return non-null, this
 * node is the split point and thus the LCA; otherwise propagate
 * whichever single non-null result was found (or null).
 *
 * Time:  O(n) - each node visited at most once
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

function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode
): TreeNode {
  function dfs(node: TreeNode | null): TreeNode | null {
    if (node === null || node === p || node === q) return node;

    const left = dfs(node.left);
    const right = dfs(node.right);

    if (left !== null && right !== null) return node;

    return left !== null ? left : right;
  }

  return dfs(root) as TreeNode;
}
if (require.main === module) {
  // Example usage:
  const n7 = new TreeNode(7), n4 = new TreeNode(4);
  const n6 = new TreeNode(6), n2 = new TreeNode(2, n7, n4);
  const n5 = new TreeNode(5, n6, n2);
  const n0 = new TreeNode(0), n8 = new TreeNode(8);
  const n1 = new TreeNode(1, n0, n8);
  const root = new TreeNode(3, n5, n1);
  console.log(lowestCommonAncestor(root, n5, n1).val); // 3
  console.log(lowestCommonAncestor(root, n5, n4).val); // 5
}

export { lowestCommonAncestor, TreeNode };
