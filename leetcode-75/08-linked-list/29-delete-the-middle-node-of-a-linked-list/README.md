# 29. Delete the Middle Node of a Linked List

- **LeetCode:** [2095. Delete the Middle Node of a Linked List](https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/)
- **Difficulty:** Medium
- **Category:** Linked List
- **Pattern:** Fast & slow pointers

## Problem

You are given the `head` of a singly linked list. Delete the **middle**
node, and return the `head` of the modified linked list.

The middle node of a linked list of size `n` is the `⌊n / 2⌋`-th node
using **0-indexing**, where `⌊x⌋` denotes the largest integer less than
or equal to `x`.

**Example 1**
```
Input:  head = [1,3,4,7,1,2,6]
Output: [1,3,4,1,2,6]
Explanation: n = 7, middle index = ⌊7/2⌋ = 3, which holds value 7.
Removing it leaves [1,3,4,1,2,6].
```

**Example 2**
```
Input:  head = [1,2,3,4]
Output: [1,2,4]
Explanation: n = 4, middle index = ⌊4/2⌋ = 2, which holds value 3.
Removing it leaves [1,2,4].
```

**Constraints**
- The number of nodes in the list is in the range `[1, 10^5]`.
- `1 <= Node.val <= 10^5`

If the list has only one node, deleting the middle leaves an empty list
(return `null`/`None`).

## Approach

Use the classic fast/slow pointer technique, but stop the slow pointer
one node *before* the middle so it can be unlinked:

1. If `head.next` is `null`, the list has one node — the middle is the
   whole list, so return `null`.
2. Initialize `slow` at `head` and `fast` at `head.next.next` (fast starts
   two nodes ahead of slow so that when fast reaches the end, slow sits
   just before the true middle).
3. Advance `fast` by two and `slow` by one each step, while `fast` and
   `fast.next` are both non-null.
4. When the loop ends, `slow.next` is the middle node. Unlink it with
   `slow.next = slow.next.next`.
5. Return the original `head`.

The offset of starting `fast` at `head.next.next` (rather than
`head.next`) is what makes `slow` land exactly one node before index
`⌊n/2⌋`, matching the problem's specific definition of "middle."

A brute-force alternative is to first traverse the list to count `n`,
then traverse again to node `⌊n/2⌋ - 1` and unlink its successor — that
also works but takes two passes instead of one.

## Complexity

- **Time:** `O(n)` — a single pass through the list with the two
  pointers (the two-pass brute force is also `O(n)` but with a larger
  constant, visiting most nodes twice).
- **Space:** `O(1)` — only a couple of pointers are used, no extra data
  structures.

## Edge Cases

| Input | Expected output | Why it matters |
| --- | --- | --- |
| `[1]` | `[]` | Single node — the whole list is "the middle," classic off-by-one trap for fast/slow setup. |
| `[1,2]` | `[1]` | Two nodes — middle index `⌊2/2⌋ = 1`, tests `fast = head.next.next` landing exactly at `null`. |
| `[1,2,3]` | `[1,3]` | Three nodes — middle index `⌊3/2⌋ = 1`; the classic case where fast/slow offset errors show up. |
| `[1,2,3,4,5]` | `[1,2,4,5]` | Odd length `> 3` — confirms the pattern generalizes past the smallest cases. |
