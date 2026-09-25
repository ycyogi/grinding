/**
 * LeetCode 328. Odd Even Linked List
 * https://leetcode.com/problems/odd-even-linked-list/
 *
 * Approach: walk the odd and even chains with two pointers at the same
 * time, splicing each node's `next` to skip over the other chain's
 * nodes. After one pass, join the end of the odd chain to the head of
 * the even chain.
 *
 * Time:  O(n) - each node is visited once
 * Space: O(1) - rewiring happens in place, no extra nodes/arrays
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function oddEvenList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;

  let odd: ListNode = head;
  let even: ListNode = head.next;
  const evenHead: ListNode = even;

  while (even !== null && even.next !== null) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }

  odd.next = evenHead;

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
// console.log(oddEvenList(buildList([1, 2, 3, 4, 5])));       // 1 -> 3 -> 5 -> 2 -> 4
// console.log(oddEvenList(buildList([2, 1, 3, 5, 6, 4, 7])));  // 2 -> 3 -> 6 -> 7 -> 1 -> 5 -> 4

export { oddEvenList, ListNode };
