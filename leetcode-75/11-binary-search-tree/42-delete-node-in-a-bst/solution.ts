/**
 * LeetCode 450. Delete Node in a BST
 * https://leetcode.com/problems/delete-node-in-a-bst/
 *
 * Approach: use BST ordering to locate the key in O(h). Once found:
 * no children -> remove it; one child -> splice it out with its child;
 * two children -> replace its value with its inorder successor (the
 * min of the right subtree) and recursively delete that successor
 * from the right subtree (which then has at most one child).
 *
 * Time:  O(h) - h is tree height (O(log n) balanced, O(n) worst case)
 * Space: O(h) - recursion call stack
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

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (root === null) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Found the node to delete.
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;

    // Two children: find the inorder successor (min of right subtree).
    let successor = root.right;
    while (successor.left !== null) {
      successor = successor.left;
    }

    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }

  return root;
}
if (require.main === module) {
  // Example usage:
  const root = new TreeNode(5, new TreeNode(3, new TreeNode(2), new TreeNode(4)), new TreeNode(6, null, new TreeNode(7)));
  console.log(deleteNode(root, 3)); // tree with 3 removed, BST property preserved
  console.log(deleteNode(root, 0)); // unchanged, key not present
}

export { deleteNode, TreeNode };
