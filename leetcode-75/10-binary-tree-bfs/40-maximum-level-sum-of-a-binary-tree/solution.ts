/**
 * LeetCode 1161. Maximum Level Sum of a Binary Tree
 * https://leetcode.com/problems/maximum-level-sum-of-a-binary-tree/
 *
 * Approach: BFS level order traversal, summing each level's node
 * values and tracking the level with the maximal sum (first one wins
 * on a tie because we scan levels in increasing order and only update
 * on a strictly greater sum).
 *
 * Time:  O(n) - every node is visited once
 * Space: O(n) - queue holds up to the widest level of the tree
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

function maxLevelSum(root: TreeNode | null): number {
  if (root === null) return 0;

  const queue: TreeNode[] = [root];
  let currentLevel = 0;
  let bestLevel = 1;
  let bestSum = -Infinity;

  while (queue.length > 0) {
    currentLevel++;
    const levelSize = queue.length;
    let levelSum = 0;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift() as TreeNode;
      levelSum += node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (levelSum > bestSum) {
      bestSum = levelSum;
      bestLevel = currentLevel;
    }
  }

  return bestLevel;
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
  const root = new TreeNode(1, new TreeNode(7, new TreeNode(7), new TreeNode(-8)), new TreeNode(0));
  console.log(maxLevelSum(root)); // 2

  // Edge cases
  assertEqual(maxLevelSum(new TreeNode(5)), 1, "single node");

  const allNegative = new TreeNode(-1, new TreeNode(-2), new TreeNode(-3));
  assertEqual(maxLevelSum(allNegative), 1, "all negative values, level 1 sum is least negative");

  const tie = new TreeNode(0, new TreeNode(0), new TreeNode(0));
  assertEqual(maxLevelSum(tie), 1, "tie between levels resolves to smallest level");

  const leftChain = new TreeNode(1, new TreeNode(2, new TreeNode(3, new TreeNode(4))));
  assertEqual(maxLevelSum(leftChain), 4, "pure left chain, deepest level has largest sum");
}

export { maxLevelSum, TreeNode };
