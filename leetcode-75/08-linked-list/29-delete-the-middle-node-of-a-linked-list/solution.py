"""
LeetCode 2095. Delete the Middle Node of a Linked List
https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/

Approach: fast/slow pointers, with fast starting two nodes ahead of
slow. When fast runs off the end, slow sits exactly one node before
the middle (index floor(n/2)), so slow.next can be unlinked directly.

Time:  O(n) - single pass through the list
Space: O(1) - only pointers are used
"""

from typing import Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head is None or head.next is None:
            return None

        slow = head
        fast = head.next.next

        while fast is not None and fast.next is not None:
            slow = slow.next
            fast = fast.next.next

        slow.next = slow.next.next

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
    print(to_list(sol.deleteMiddle(build_list([1, 3, 4, 7, 1, 2, 6]))))  # [1, 3, 4, 1, 2, 6]
    print(to_list(sol.deleteMiddle(build_list([1, 2, 3, 4]))))          # [1, 2, 4]
    print(to_list(sol.deleteMiddle(build_list([1]))))                  # []
