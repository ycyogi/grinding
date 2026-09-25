# 31. Reverse Linked List

- **LeetCode:** [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)
- **Difficulty:** Easy
- **Category:** Linked List
- **Pattern:** Iterative pointer reversal

## Problem

Given the `head` of a singly linked list, reverse the list, and return
the reversed list's head.

**Example 1**
```
Input:  head = [1,2,3,4,5]
Output: [5,4,3,2,1]
```

**Example 2**
```
Input:  head = [1,2]
Output: [2,1]
```

**Constraints**
- The number of nodes in the list is the range `[0, 5000]`.
- `-5000 <= Node.val <= 5000`

Follow-up: the list can be reversed either iteratively or recursively —
try to implement both.

## Approach

Walk the list once, reversing each node's `next` pointer to point
backward instead of forward, using three tracking pointers:

1. Initialize `prev = null` (what will become the new tail's `next`) and
   `curr = head`.
2. While `curr` is not null:
   - Save `next = curr.next` before overwriting anything.
   - Reverse the link: `curr.next = prev`.
   - Advance both pointers: `prev = curr`, then `curr = next`.
3. When the loop ends, `curr` is `null` and `prev` points at what was the
   last node of the original list — that's the new head. Return `prev`.

A recursive version does the same conceptually: recurse to the end of
the list, then, unwinding the call stack, set `node.next.next = node` and
`node.next = null` at each level. It's equivalent in time complexity but
uses `O(n)` call-stack space instead of `O(1)`, so the iterative approach
is preferred when space matters.

## Complexity

- **Time:** `O(n)` — each node's pointer is reversed exactly once.
- **Space:** `O(1)` for the iterative approach (a few pointers only); the
  recursive approach is `O(n)` due to the call stack.
