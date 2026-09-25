/**
 * LeetCode 206. Reverse Linked List
 * https://leetcode.com/problems/reverse-linked-list/
 *
 * Approach: iteratively walk the list, reversing each node's `next`
 * pointer to point at the previous node, using three tracking pointers
 * (prev, curr, next).
 *
 * Time:  O(n) - each node's pointer is reversed once
 * Space: O(1) - only a few pointers are used
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr: ListNode | null = head;

  while (curr !== null) {
    const next: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
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
// console.log(reverseList(buildList([1, 2, 3, 4, 5]))); // 5 -> 4 -> 3 -> 2 -> 1
// console.log(reverseList(buildList([1, 2])));           // 2 -> 1

export { reverseList, ListNode };
