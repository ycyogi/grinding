/**
 * LeetCode 872. Leaf-Similar Trees
 * https://leetcode.com/problems/leaf-similar-trees/
 *
 * Approach: DFS each tree (left before right) to collect its leaf
 * values in left-to-right order, then compare the two sequences.
 *
 * Time:  O(n + m) - every node of both trees is visited once
 * Space: O(n + m) for the leaf lists, plus O(h1 + h2) recursion stack
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

function getLeaves(node: TreeNode | null, leaves: number[]): void {
  if (node === null) return;

  if (node.left === null && node.right === null) {
    leaves.push(node.val);
    return;
  }

  getLeaves(node.left, leaves);
  getLeaves(node.right, leaves);
}

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
  const leaves1: number[] = [];
  const leaves2: number[] = [];

  getLeaves(root1, leaves1);
  getLeaves(root2, leaves2);

  if (leaves1.length !== leaves2.length) return false;

  for (let i = 0; i < leaves1.length; i++) {
    if (leaves1[i] !== leaves2[i]) return false;
  }

  return true;
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
  const t1 = new TreeNode(3, new TreeNode(5, new TreeNode(6), new TreeNode(2, new TreeNode(7), new TreeNode(4))), new TreeNode(1, new TreeNode(9), new TreeNode(8)));
  const t2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
  console.log(leafSimilar(t1, t1)); // true (same tree)
  console.log(leafSimilar(t2, new TreeNode(1, new TreeNode(3), new TreeNode(2)))); // false

  // Edge cases
  assertEqual(leafSimilar(new TreeNode(5), new TreeNode(5)), true, 'single node, same value');
  assertEqual(leafSimilar(new TreeNode(5), new TreeNode(6)), false, 'single node, different value');

  // Different shapes, same leaf sequence [2, 3]:
  // shapeA: 1 -> (left: leaf 2, right: leaf 3)
  const shapeA = new TreeNode(1, new TreeNode(2), new TreeNode(3));
  // shapeB: 1 -> (left: 10 -> left: leaf 2, right: leaf 3)
  const shapeB = new TreeNode(1, new TreeNode(10, new TreeNode(2)), new TreeNode(3));
  assertEqual(leafSimilar(shapeA, shapeB), true, 'different shapes, same leaf sequence');

  assertEqual(
    leafSimilar(new TreeNode(5, new TreeNode(6), new TreeNode(7)), new TreeNode(5, new TreeNode(7), new TreeNode(6))),
    false,
    'same values, mirrored leaf order'
  );
}

export { leafSimilar, TreeNode };
