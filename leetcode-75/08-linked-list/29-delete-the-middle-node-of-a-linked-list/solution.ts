/**
 * LeetCode 2095. Delete the Middle Node of a Linked List
 * https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/
 *
 * Approach: fast/slow pointers, with fast starting two nodes ahead of
 * slow. When fast runs off the end, slow sits exactly one node before
 * the middle (index floor(n/2)), so slow.next can be unlinked directly.
 *
 * Time:  O(n) - single pass through the list
 * Space: O(1) - only pointers are used
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function deleteMiddle(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return null;

  let slow: ListNode = head;
  let fast: ListNode | null = head.next.next;

  while (fast !== null && fast.next !== null) {
    slow = slow.next as ListNode;
    fast = fast.next.next;
  }

  slow.next = slow.next!.next;

  return head;
}
// Helper for building a list from an array (not part of the LeetCode API).
function buildList(values: number[]): ListNode | null {
  const dummy = new ListNode();
  let curr = dummy;
  for (const v of values) {
    curr.next = new ListNode(v);
    curr = curr.next;
  }
  return dummy.next;
}

function toArray(head: ListNode | null): number[] {
  const out: number[] = [];
  let curr = head;
  while (curr !== null) {
    out.push(curr.val);
    curr = curr.next;
  }
  return out;
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
  console.log(deleteMiddle(buildList([1, 3, 4, 7, 1, 2, 6]))); // 1 -> 3 -> 4 -> 1 -> 2 -> 6
  console.log(deleteMiddle(buildList([1, 2, 3, 4])));          // 1 -> 2 -> 4

  // Edge cases
  assertEqual(toArray(deleteMiddle(buildList([1]))), [], 'single node becomes empty');
  assertEqual(toArray(deleteMiddle(buildList([1, 2]))), [1], 'two nodes: delete index 1');
  assertEqual(toArray(deleteMiddle(buildList([1, 2, 3]))), [1, 3], 'three nodes: classic fast/slow trap');
  assertEqual(toArray(deleteMiddle(buildList([1, 2, 3, 4, 5]))), [1, 2, 4, 5], 'five nodes: delete index 2');
}

export { deleteMiddle, ListNode };
