# 32. Maximum Twin Sum of a Linked List

- **LeetCode:** [2130. Maximum Twin Sum of a Linked List](https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/)
- **Difficulty:** Medium
- **Category:** Linked List
- **Pattern:** Find middle, reverse second half, pair up with first half

## Problem

In a linked list of size `n`, where `n` is **even**, each node has a
unique **twin**: the `i`-th node (0-indexed) is the twin of the
`(n - 1 - i)`-th node, for `0 <= i <= n / 2 - 1`.

- For example, if `n = 4`, then node `0` is the twin of node `3`, and
  node `1` is the twin of node `2`. These are the only nodes with twins
  for `n = 4`.

The **twin sum** is defined as the sum of a node and its twin.

Given the head of a linked list with even length, return the **maximum
twin sum** of the linked list.

**Example 1**
```
Input:  head = [5,4,2,1]
Output: 6
Explanation:
Node 0 has twin node 3 with value 1: twin sum = 5 + 1 = 6.
Node 1 has twin node 2 with value 2: twin sum = 4 + 2 = 6.
The maximum twin sum is 6.
```

**Example 2**
```
Input:  head = [4,2,2,3]
Output: 7
Explanation:
Node 0 (val=4) and node 3 (val=3) → twin sum = 7.
Node 1 (val=2) and node 2 (val=2) → twin sum = 4.
The maximum twin sum is 7.
```

**Constraints**
- The number of nodes in the list is an even integer in the range
  `[2, 10^5]`.
- `1 <= Node.val <= 10^5`

## Approach

The list has no random access, so the goal is to pair up node `i` with
node `n-1-i` using only `O(1)` extra space:

1. Find the middle of the list with the standard fast/slow pointer
   technique: advance `slow` by one and `fast` by two until `fast`
   reaches the end. `slow` then points at the first node of the second
   half.
2. Reverse the second half of the list in place (same technique as
   Reverse Linked List), producing a list that starts with what was the
   *last* node of the original list.
3. Walk the first half (starting at `head`) and the reversed second half
   (starting at the reversed sub-list's head) together, one node at a
   time. At each step, node `i` from the front and node `n-1-i` from the
   (now-reversed) back line up perfectly — sum their values and track the
   maximum seen.
4. Stop once the first-half pointer reaches the middle (or, equivalently,
   once the reversed-half pointer runs out). Return the maximum twin sum
   found.

An alternative brute-force approach copies all values into an array
first, then reads `arr[i] + arr[n-1-i]` directly — that's simpler but
uses `O(n)` extra space instead of `O(1)`.

## Complexity

- **Time:** `O(n)` — finding the middle, reversing the second half, and
  walking both halves are each a single linear pass.
- **Space:** `O(1)` extra space — the reversal happens in place on the
  existing nodes; only a handful of pointers and a running maximum are
  used (versus `O(n)` for the array-copy brute force).
