/**
 * LeetCode 199. Binary Tree Right Side View
 * https://leetcode.com/problems/binary-tree-right-side-view/
 *
 * Approach: BFS level order traversal. For each level, keep only the
 * value of the last node dequeued (the rightmost node at that depth).
 *
 * Time:  O(n) - every node is visited once
 * Space: O(n) - queue holds up to the widest level; output holds one
 *               value per level
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

function rightSideView(root: TreeNode | null): number[] {
  const result: number[] = [];
  if (root === null) return result;

  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    let rightmostValue = 0;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift() as TreeNode;
      rightmostValue = node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(rightmostValue);
  }

  return result;
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
  const root = new TreeNode(1, new TreeNode(2, null, new TreeNode(5)), new TreeNode(3, null, new TreeNode(4)));
  console.log(rightSideView(root)); // [1, 3, 4]

  // Edge cases
  assertEqual(rightSideView(null), [], "empty tree");

  assertEqual(rightSideView(new TreeNode(1)), [1], "single node");

  const leftChain = new TreeNode(1, new TreeNode(2, new TreeNode(3, new TreeNode(4))));
  assertEqual(rightSideView(leftChain), [1, 2, 3, 4], "pure left chain");

  const switchOver = new TreeNode(
    1,
    new TreeNode(2, null, new TreeNode(6, null, new TreeNode(7))),
    new TreeNode(3)
  );
  assertEqual(rightSideView(switchOver), [1, 3, 6, 7], "visibility switches to deeper left branch");

  const negatives = new TreeNode(-100, new TreeNode(-50), new TreeNode(-75));
  assertEqual(rightSideView(negatives), [-100, -75], "boundary negative values");
}

export { rightSideView, TreeNode };
