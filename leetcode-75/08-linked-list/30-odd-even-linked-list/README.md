# 30. Odd Even Linked List

- **LeetCode:** [328. Odd Even Linked List](https://leetcode.com/problems/odd-even-linked-list/)
- **Difficulty:** Medium
- **Category:** Linked List
- **Pattern:** In-place list partitioning with two running pointers

## Problem

Given the `head` of a singly linked list, group all the nodes with **odd
indices** together followed by the nodes with **even indices**, and
return the reordered list.

The **first** node is considered **odd**, the **second** node is
**even**, and so on (this is 1-indexed, not 0-indexed).

You must solve it in `O(1)` extra space complexity and `O(n)` time
complexity. The relative order inside the odd group and inside the even
group must be preserved from the original list.

**Example 1**
```
Input:  head = [1,2,3,4,5]
Output: [1,3,5,2,4]
Explanation: odd-indexed nodes (1st,3rd,5th) = 1,3,5; even-indexed nodes
(2nd,4th) = 2,4. Odds first, then evens.
```

**Example 2**
```
Input:  head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]
Explanation: odd-indexed nodes (1st,3rd,5th,7th) = 2,3,6,7; even-indexed
nodes (2nd,4th,6th) = 1,5,4.
```

**Constraints**
- The number of nodes in the linked list is in the range `[0, 10^4]`.
- `-10^6 <= Node.val <= 10^6`

## Approach

Rewire the list in place using two pointers that walk the odd and even
chains simultaneously, without allocating any new nodes:

1. If the list is empty or has only one node, return `head` unchanged —
   nothing to reorder.
2. Set `odd = head` and `even = head.next`, and remember
   `evenHead = even` so the odd chain can be reattached to it at the end.
3. While `even` and `even.next` are both non-null:
   - Link `odd.next = even.next` (skip over the even node), then advance
     `odd = odd.next`.
   - Link `even.next = odd.next` (skip over the new odd node), then
     advance `even = even.next`.
4. After the loop, the odd chain ends at the last odd node and the even
   chain ends at the last even node. Attach the even chain to the end of
   the odd chain: `odd.next = evenHead`.
5. Return `head` (the list now starts with all odd-indexed nodes followed
   by all even-indexed nodes, both in original relative order).

This works by literally splicing the existing nodes into two
interleaved chains as we walk once through the list, then joining them —
no extra nodes or arrays are needed.

## Complexity

- **Time:** `O(n)` — each node is visited once while its `next` pointer
  is rewired.
- **Space:** `O(1)` — only a few pointers are used; the reordering
  happens in place on the existing nodes (a brute-force approach that
  collects values into two arrays and rebuilds the list would take
  `O(n)` extra space).

## Edge Cases

| Input | Expected output | Why it matters |
| --- | --- | --- |
| `[]` (empty) | `[]` | Nothing to reorder; must not crash on a null head. |
| `[1]` | `[1]` | Single node — odd/even loop must not run, list returned unchanged. |
| `[1,2]` | `[1,2]` | Two nodes — one odd, one even; loop condition (`even && even.next`) must not run and must not create a cycle. |
| `[1,2,3]` | `[1,3,2]` | Three nodes — tests that `even.next` is explicitly nulled (via the splice) rather than left dangling into a cycle. |
