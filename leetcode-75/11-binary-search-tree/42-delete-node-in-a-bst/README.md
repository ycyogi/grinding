# 42. Delete Node in a BST

- **LeetCode:** [450. Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/)
- **Difficulty:** Medium
- **Category:** Binary Search Tree
- **Pattern:** BST search + inorder successor

## Problem

Given the `root` of a binary search tree (BST) and a key, delete the
node with the given key from the BST. Return the (possibly changed)
root of the BST after deletion.

The deletion process should keep the tree a valid BST:

1. Locate the node to delete.
2. If it is found, delete it while preserving the BST property.

**Example 1**
```
Input:  root = [5,3,6,2,4,null,7], key = 3

        5                     5
       / \                   / \
      3   6      -->        4   6
     / \   \                /    \
    2   4   7               2     7

Output: [5,4,6,2,null,null,7]  (one valid answer)
Explanation: 3 is replaced by its inorder successor, 4. Other valid
answers include replacing it with its inorder predecessor, 2.
```

**Example 2**
```
Input:  root = [5,3,6,2,4,null,7], key = 0
Output: [5,3,6,2,4,null,7]
Explanation: The tree does not contain a node with value 0, so it is
returned unchanged.
```

**Constraints**
- The number of nodes in the tree is in the range `[0, 10^4]`.
- `-10^5 <= Node.val <= 10^5`
- Each node has a unique value.
- `root` is a valid binary search tree.
- `-10^5 <= key <= 10^5`

## Approach

Use the BST ordering property to *find* the target node in `O(h)`, then
handle deletion based on how many children it has:

1. **Find the node** (recursively, or iteratively): compare `key` to
   `root.val`.
   - If `key < root.val`, the target (if it exists) is in the left
     subtree: recurse on `root.left` and reassign the result back to
     `root.left`.
   - If `key > root.val`, symmetric on the right subtree.
   - If `key === root.val`, this is the node to delete — handle the
     three structural cases below.
2. **Deletion cases**, once the node to delete is found:
   - **No children:** return `null` (the node simply disappears).
   - **One child:** return that single child (it takes the deleted
     node's place directly — the BST property still holds since it was
     already the entire content of that subtree).
   - **Two children:** we can't just remove the node, so we replace its
     value with either its **inorder successor** (the smallest value in
     the right subtree, found by walking `node.right` then `.left` all
     the way down) or its inorder predecessor. Using the successor:
     - Find `successor = min(node.right)`.
     - Set `node.val = successor.val`.
     - Recursively delete `successor.val` from `node.right` (this
       recursive call is guaranteed to hit the "0 or 1 child" case,
       since the successor is the leftmost node of that subtree and so
       has no left child).
3. Return the (possibly new) subtree root at each level, propagating
   reassignments back up to `root`.

This never touches nodes outside the search path plus the successor's
path, which is what keeps it `O(h)` instead of a full tree scan.

## Edge Cases

| Input | Expected Output | Why it matters |
|---|---|---|
| `root = []`, `key = 5` (empty tree) | `null` | Constraint allows 0 nodes; must not dereference a null root. |
| `root = [5]`, `key = 5` (delete the only node) | `null` | The "no children" case at the very root — result must become an empty tree, not a dangling reference. |
| `root = [5,3,8]`, `key = 3` (target has only a left child: `3` has left `2`... see below) — concretely `root = [5,[3,[2]],8]`, `key = 3` | `[5,2,8]` | "One child" case: the child (`2`) must be spliced directly into the parent's slot. |
| `root = [5,2,[8,null,9]]`, `key = 8` (target has only a right child, `9`) | `[5,2,9]` | "One child" case mirrored on the right side. |
| `root = [5,3,6,2,4,null,7]`, `key = 100` (key not present anywhere) | `[5,3,6,2,4,null,7]` (unchanged) | Must search the full height without finding a match and return the tree structurally untouched. |
| `root = [5,3,6,2,4,null,7]`, `key = 5` (delete the root itself, which has two children) | `[6,3,7,2,4]` (root value replaces with inorder successor `6`; `6`'s original right child `7` moves up) | Two-children deletion at the root: exercises both the successor-copy step and the recursive removal of the successor from the right subtree, at the trickiest position (root has no parent to repoint). |

## Complexity

- **Time:** `O(h)` — `O(h)` to find the node, plus at most another
  `O(h)` to find the inorder successor and remove it; both bounded by
  tree height. `O(log n)` balanced, `O(n)` worst case (degenerate tree).
- **Space:** `O(h)` for the recursion call stack (`O(1)` if implemented
  iteratively with parent pointers, but recursion is the standard,
  more readable formulation and is what's used here).
