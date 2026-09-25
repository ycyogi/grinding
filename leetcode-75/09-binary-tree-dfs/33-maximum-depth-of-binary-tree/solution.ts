/**
 * LeetCode 104. Maximum Depth of Binary Tree
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 *
 * Approach: bottom-up recursive DFS. The depth of a subtree is
 * 1 + max(depth of left child, depth of right child), bottoming out at
 * null (depth 0).
 *
 * Time:  O(n) - every node is visited once
 * Space: O(h) - recursion stack, h = tree height (O(log n) balanced,
 *        O(n) worst case skewed)
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

function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return 1 + Math.max(leftDepth, rightDepth);
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
  const tree = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
  console.log(maxDepth(tree)); // 3
  console.log(maxDepth(new TreeNode(1, null, new TreeNode(2)))); // 2

  // Edge cases
  assertEqual(maxDepth(null), 0, 'empty tree');
  assertEqual(maxDepth(new TreeNode(1)), 1, 'single node');

  const leftChain = new TreeNode(1, new TreeNode(2, new TreeNode(3, new TreeNode(4))));
  assertEqual(maxDepth(leftChain), 4, 'left-skewed chain of 4 nodes');

  const rightChain = new TreeNode(1, null, new TreeNode(2, null, new TreeNode(3)));
  assertEqual(maxDepth(rightChain), 3, 'right-skewed chain of 3 nodes');
}

export { maxDepth, TreeNode };
