/**
 * LeetCode 437. Path Sum III
 * https://leetcode.com/problems/path-sum-iii/
 *
 * Approach: DFS while maintaining a hash map of root-to-current prefix
 * sums seen on the current path. At each node, the number of valid
 * paths ending there is the count of ancestor prefixes equal to
 * currentSum - targetSum. Backtrack the map entry after visiting a
 * node's subtrees so sums don't leak across sibling branches.
 *
 * Time:  O(n) - each node visited once, O(1) average map operations
 * Space: O(n) for the prefix-sum map, O(h) recursion stack
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

function pathSum(root: TreeNode | null, targetSum: number): number {
  const prefixCount = new Map<number, number>([[0, 1]]);
  let total = 0;

  function dfs(node: TreeNode | null, currentSum: number): void {
    if (node === null) return;

    currentSum += node.val;

    total += prefixCount.get(currentSum - targetSum) ?? 0;

    prefixCount.set(currentSum, (prefixCount.get(currentSum) ?? 0) + 1);

    dfs(node.left, currentSum);
    dfs(node.right, currentSum);

    // Backtrack: remove this node's contribution before returning to the parent.
    prefixCount.set(currentSum, prefixCount.get(currentSum)! - 1);
  }

  dfs(root, 0);

  return total;
}

// Example usage:
// const tree = new TreeNode(10,
//   new TreeNode(5, new TreeNode(3, new TreeNode(3), new TreeNode(-2)), new TreeNode(2, null, new TreeNode(1))),
//   new TreeNode(-3, null, new TreeNode(11)));
// console.log(pathSum(tree, 8)); // 3

export { pathSum, TreeNode };
