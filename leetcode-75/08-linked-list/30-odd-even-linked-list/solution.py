"""
LeetCode 328. Odd Even Linked List
https://leetcode.com/problems/odd-even-linked-list/

Approach: walk the odd and even chains with two pointers at the same
time, splicing each node's `next` to skip over the other chain's
nodes. After one pass, join the end of the odd chain to the head of
the even chain.

Time:  O(n) - each node is visited once
Space: O(1) - rewiring happens in place, no extra nodes/arrays
"""

from typing import Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head is None or head.next is None:
            return head

        odd = head
        even = head.next
        even_head = even

        while even is not None and even.next is not None:
            odd.next = even.next
            odd = odd.next
            even.next = odd.next
            even = even.next

        odd.next = even_head

        return head


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
    print(to_list(sol.oddEvenList(build_list([1, 2, 3, 4, 5]))))        # [1, 3, 5, 2, 4]
    print(to_list(sol.oddEvenList(build_list([2, 1, 3, 5, 6, 4, 7]))))  # [2, 3, 6, 7, 1, 5, 4]
