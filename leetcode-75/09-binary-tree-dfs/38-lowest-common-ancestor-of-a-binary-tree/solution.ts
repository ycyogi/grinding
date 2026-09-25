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
function assertEqual(actual: unknown, expected: unknown, label: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    console.error(`FAIL [${label}]: got ${a}, expected ${e}`);
  } else {
    console.log(`PASS [${label}]`);
  }
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

  // Edge cases
  // 2-node tree: p is the root itself.
  const smallLeft = new TreeNode(20);
  const smallRoot = new TreeNode(10, smallLeft);
  assertEqual(lowestCommonAncestor(smallRoot, smallRoot, smallLeft).val, 10, '2-node tree, p is the root');

  // Chain A -> B -> C, p ancestor of q.
  const cNode = new TreeNode(3);
  const bNode = new TreeNode(2, cNode);
  const aNode = new TreeNode(1, bNode);
  assertEqual(lowestCommonAncestor(aNode, bNode, cNode).val, 2, 'p is an ancestor of q');
  assertEqual(lowestCommonAncestor(aNode, cNode, bNode).val, 2, 'p/q swapped, result unchanged');

  // Cross-subtree pair from the README tree, different from the demo above.
  assertEqual(lowestCommonAncestor(root, n7, n8).val, 3, 'p and q in different subtrees of the root');
}

export { lowestCommonAncestor, TreeNode };
