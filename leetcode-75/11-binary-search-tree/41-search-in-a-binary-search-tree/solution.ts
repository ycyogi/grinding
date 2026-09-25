/**
 * LeetCode 700. Search in a Binary Search Tree
 * https://leetcode.com/problems/search-in-a-binary-search-tree/
 *
 * Approach: exploit the BST ordering property - at each node, compare
 * val against node.val to decide whether the answer could only live in
 * the left subtree, the right subtree, or has been found, discarding
 * the other subtree entirely at each step.
 *
 * Time:  O(h) - h is tree height (O(log n) balanced, O(n) worst case)
 * Space: O(1) - iterative, no extra data structures
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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  let node = root;

  while (node !== null && node.val !== val) {
    node = val < node.val ? node.left : node.right;
  }

  return node;
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
  const root = new TreeNode(4, new TreeNode(2, new TreeNode(1), new TreeNode(3)), new TreeNode(7));
  console.log(searchBST(root, 2)); // TreeNode { val: 2, left: TreeNode{1}, right: TreeNode{3} }
  console.log(searchBST(root, 5)); // null

  // Edge cases
  assertEqual(searchBST(new TreeNode(5), 5), new TreeNode(5), "single node, match");
  assertEqual(searchBST(new TreeNode(5), 3), null, "single node, no match");
  assertEqual(searchBST(root, 4), root, "match is the root itself");

  const rightChain = new TreeNode(1, null, new TreeNode(2, null, new TreeNode(3, null, new TreeNode(4))));
  assertEqual(searchBST(rightChain, 4), new TreeNode(4), "deepest leaf of a right-only chain");

  assertEqual(searchBST(root, 6), null, "value falls in a gap, descends right then left before running off");
}

export { searchBST, TreeNode };
