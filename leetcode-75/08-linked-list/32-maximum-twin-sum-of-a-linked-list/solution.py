"""
LeetCode 2130. Maximum Twin Sum of a Linked List
https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/

Approach: find the middle with fast/slow pointers, reverse the second
half in place, then walk the first half and the reversed second half
together so node i and node n-1-i line up as a pair. Track the max
sum seen.

Time:  O(n) - finding the middle, reversing, and pairing are each a
       single linear pass
Space: O(1) extra - the reversal is done in place on existing nodes
"""

from typing import Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        # 1. Find the start of the second half.
        slow = head
        fast = head

        while fast is not None and fast.next is not None:
            slow = slow.next
            fast = fast.next.next

        # 2. Reverse the second half in place.
        prev = None
        curr = slow

        while curr is not None:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node

        # 3. Walk the first half and the reversed second half together.
        p1 = head
        p2 = prev
        max_sum = 0

        while p2 is not None:
            max_sum = max(max_sum, p1.val + p2.val)
            p1 = p1.next
            p2 = p2.next

        return max_sum


# Helper for building/printing a list from an array (not part of the
# LeetCode API, only for the demo below).
def build_list(values):
    dummy = ListNode()
    curr = dummy
    for v in values:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    sol = Solution()
    print(sol.pairSum(build_list([5, 4, 2, 1])))  # 6
    print(sol.pairSum(build_list([4, 2, 2, 3])))  # 7

    # Edge cases
    assert_equal(sol.pairSum(build_list([7, 3])), 10, "minimum valid input (n=2)")
    assert_equal(sol.pairSum(build_list([5, 100, 1, 5])), 101, "max twin sum pair is the inner pair, not outermost")
    assert_equal(sol.pairSum(build_list([4, 4, 4, 4])), 8, "all-equal values")
    assert_equal(sol.pairSum(build_list([1, 2, 3, 3, 2, 1])), 6, "n=6, max pair is the middle pair")
