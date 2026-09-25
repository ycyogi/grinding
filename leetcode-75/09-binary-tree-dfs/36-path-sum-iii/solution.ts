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
  const tree = new TreeNode(10,
    new TreeNode(5, new TreeNode(3, new TreeNode(3), new TreeNode(-2)), new TreeNode(2, null, new TreeNode(1))),
    new TreeNode(-3, null, new TreeNode(11)));
  console.log(pathSum(tree, 8)); // 3

  // Edge cases
  // Chain 1 -> -1 -> 1 (all left children), targetSum = 0.
  // Paths summing to 0: (1,-1) and (-1,1) -> 2.
  const negativeChain = new TreeNode(1, new TreeNode(-1, new TreeNode(1)));
  assertEqual(pathSum(negativeChain, 0), 2, 'negative values, targetSum=0');

  assertEqual(pathSum(new TreeNode(0), 0), 1, 'single zero-valued node, targetSum=0');

  // Root 100 (irrelevant) with a detached chain A(2) -> B(3) off its left.
  // Only A->B sums to 5; no root-anchored path does.
  const offRootChain = new TreeNode(100, new TreeNode(2, new TreeNode(3)));
  assertEqual(pathSum(offRootChain, 5), 1, 'valid path does not start at the root');

  // Symmetric zero tree: root 0, left child 0, right child 0, targetSum = 0.
  // 5 valid downward paths: [root], [root,left], [root,right], [left], [right].
  const symmetricZeroTree = new TreeNode(0, new TreeNode(0), new TreeNode(0));
  assertEqual(pathSum(symmetricZeroTree, 0), 5, 'symmetric zero-sum subtrees, no leakage across siblings');
}

export { pathSum, TreeNode };
