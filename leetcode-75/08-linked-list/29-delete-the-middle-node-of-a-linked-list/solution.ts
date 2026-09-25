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
// function buildList(values: number[]): ListNode | null {
//   const dummy = new ListNode();
//   let curr = dummy;
//   for (const v of values) {
//     curr.next = new ListNode(v);
//     curr = curr.next;
//   }
//   return dummy.next;
// }

// Example usage:
// console.log(deleteMiddle(buildList([1, 3, 4, 7, 1, 2, 6]))); // 1 -> 3 -> 4 -> 1 -> 2 -> 6
// console.log(deleteMiddle(buildList([1, 2, 3, 4])));          // 1 -> 2 -> 4

export { deleteMiddle, ListNode };
