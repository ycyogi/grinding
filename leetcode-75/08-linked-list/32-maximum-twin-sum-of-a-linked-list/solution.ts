/**
 * LeetCode 2130. Maximum Twin Sum of a Linked List
 * https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/
 *
 * Approach: find the middle with fast/slow pointers, reverse the second
 * half in place, then walk the first half and the reversed second half
 * together so node i and node n-1-i line up as a pair. Track the max
 * sum seen.
 *
 * Time:  O(n) - finding the middle, reversing, and pairing are each a
 *        single linear pass
 * Space: O(1) extra - the reversal is done in place on existing nodes
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function pairSum(head: ListNode | null): number {
  // 1. Find the start of the second half.
  let slow: ListNode = head!;
  let fast: ListNode | null = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next as ListNode;
    fast = fast.next.next;
  }

  // 2. Reverse the second half in place.
  let prev: ListNode | null = null;
  let curr: ListNode | null = slow;

  while (curr !== null) {
    const next: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // 3. Walk the first half and the reversed second half together.
  let p1: ListNode | null = head;
  let p2: ListNode | null = prev;
  let maxSum = 0;

  while (p2 !== null) {
    maxSum = Math.max(maxSum, p1!.val + p2.val);
    p1 = p1!.next;
    p2 = p2.next;
  }

  return maxSum;
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

if (require.main === module) {
  // Example usage:
  console.log(pairSum(buildList([5, 4, 2, 1]))); // 6
  console.log(pairSum(buildList([4, 2, 2, 3]))); // 7
}

export { pairSum, ListNode };
