# 71. Search Suggestions System

- **LeetCode:** [1268. Search Suggestions System](https://leetcode.com/problems/search-suggestions-system/)
- **Difficulty:** Medium
- **Category:** Trie
- **Pattern:** Sort + two-pointer window narrowing (trie-equivalent)

## Problem

Given an array of strings `products` and a string `searchWord`, design a
system that, after each character of `searchWord` is typed, suggests at
most three product names from `products`. Suggested products should
share a common prefix with the part of `searchWord` typed so far. If
more than three products match, return the three lexicographically
smallest ones.

Return a list of lists of the suggested products after each character of
`searchWord` is typed.

**Example 1**
```
Input:  products = ["mobile","mouse","moneypot","monitor","mousepad"],
        searchWord = "mouse"
Output: [
  ["mobile","moneypot","monitor"],
  ["mobile","moneypot","monitor"],
  ["mouse","mousepad"],
  ["mouse","mousepad"],
  ["mouse","mousepad"]
]
Explanation: products sorted lexicographically:
["mobile","moneypot","monitor","mouse","mousepad"].
After typing "m" and "mo", the three lexicographically smallest matches
are "mobile", "moneypot", "monitor". After typing "mou", "mous", "mouse",
only "mouse" and "mousepad" still match.
```

**Example 2**
```
Input:  products = ["havana"], searchWord = "havana"
Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
```

**Constraints**
- `1 <= products.length <= 1000`
- `1 <= products[i].length <= 3000`
- `1 <= sum(products[i].length) <= 2 * 10^4`
- `products[i]` consists of lowercase English letters.
- `1 <= searchWord.length <= 1000`
- `searchWord` consists of lowercase English letters.

## Approach

This is naturally a trie problem (insert all products, then walk down
following `searchWord` and DFS the 3 smallest completions at each node),
but a sort + two-pointer window is simpler to implement and equally
efficient given the constraints:

1. Sort `products` lexicographically. Once sorted, all products sharing
   any given prefix form one contiguous block in the array.
2. Maintain a window `[left, right]` over the sorted array representing
   the candidate products that still match the prefix typed so far.
   Initialize `left = 0`, `right = products.length - 1`.
3. For each index `i` (0-based) of `searchWord`, with character
   `ch = searchWord[i]`:
   - Advance `left` forward while `products[left]` is shorter than
     `i + 1` or its character at index `i` doesn't equal `ch`.
   - Move `right` backward while `products[right]` is shorter than
     `i + 1` or its character at index `i` doesn't equal `ch`.
   - The window only shrinks as `i` grows (never widens), since a
     product still matching a longer prefix must also match every
     shorter prefix of it.
   - Append up to the first 3 products in `products[left..right]` (or
     an empty list if `left > right`) to the answer.
4. Return the collected list of lists.

## Complexity

- **Time:** `O(n log n + n + m)` — sorting the `n` products dominates
  (`O(n log n)`); each pointer only ever moves forward across the whole
  algorithm, so total pointer movement is `O(n)`; `m` is
  `searchWord.length` for the output loop. Far better than repeatedly
  scanning all products for every prefix, which would be roughly
  `O(m * n * L)`.
- **Space:** `O(log n)` to `O(n)` for the sort's internal space
  (implementation dependent), plus `O(m)` for the output lists, not
  counting the output itself.
