"""
LeetCode 206. Reverse Linked List
https://leetcode.com/problems/reverse-linked-list/

Approach: iteratively walk the list, reversing each node's `next`
pointer to point at the previous node, using three tracking pointers
(prev, curr, next).

Time:  O(n) - each node's pointer is reversed once
Space: O(1) - only a few pointers are used
"""

from typing import Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head

        while curr is not None:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node

        return prev


# Helper for building/printing a list from an array (not part of the
# LeetCode API, only for the demo below).
def build_list(values):
    dummy = ListNode()
    curr = dummy
    for v in values:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next


def to_list(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out


if __name__ == "__main__":
    sol = Solution()
    print(to_list(sol.reverseList(build_list([1, 2, 3, 4, 5]))))  # [5, 4, 3, 2, 1]
    print(to_list(sol.reverseList(build_list([1, 2]))))           # [2, 1]
    print(to_list(sol.reverseList(build_list([]))))               # []
