# 70. Implement Trie (Prefix Tree)

- **LeetCode:** [208. Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)
- **Difficulty:** Medium
- **Category:** Trie
- **Pattern:** Trie (prefix tree) with child map + end-of-word flag

## Problem

A **trie** (pronounced "try") or **prefix tree** is a tree data
structure used to efficiently store and retrieve keys in a dataset of
strings. Implement the `Trie` class:

- `Trie()` Initializes the trie object.
- `void insert(String word)` Inserts the string `word` into the trie.
- `boolean search(String word)` Returns `true` if the string `word` is
  in the trie (i.e. was inserted before), and `false` otherwise.
- `boolean startsWith(String prefix)` Returns `true` if there is a
  previously inserted string that has `prefix` as a prefix, and `false`
  otherwise.

**Example**
```
Input:
  ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
  [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output:
  [null, null, true, false, true, null, true]

Explanation:
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return true
trie.search("app");     // return false (only "apple" was inserted)
trie.startsWith("app"); // return true ("apple" starts with "app")
trie.insert("app");
trie.search("app");     // return true (now "app" was inserted too)
```

**Constraints**
- `1 <= word.length, prefix.length <= 2000`
- `word` and `prefix` consist only of lowercase English letters.
- At most `3 * 10^4` calls in total will be made to `insert`, `search`,
  and `startsWith`.

## Approach

Each trie node holds:
- a map (or fixed-size array of 26) from character to child node, and
- a boolean flag marking whether a word ends at this node.

**insert(word):** Start at the root. For each character, if a child for
that character doesn't exist yet, create it. Move into that child.
After processing all characters, mark the final node's `isEnd` flag
`true`.

**search(word):** Walk down the trie one character at a time, following
child links. If at any point the needed child doesn't exist, return
`false`. If the walk completes, return the final node's `isEnd` flag
(it must be a *complete* stored word, not just a prefix of one).

**startsWith(prefix):** Same walk as `search`, but return `true` as
soon as the walk completes, regardless of `isEnd` — reaching any node
means some inserted word has this prefix.

## Complexity

Let `L` be the length of the word/prefix involved in a call.

- **Time:** `O(L)` per `insert`, `search`, or `startsWith` call — each
  visits one node per character.
- **Space:** `O(N * L)` in the worst case across all inserted words
  (`N` words of average length `L`), for the trie nodes created; each
  operation itself uses `O(1)` extra space beyond traversal.

## Edge Cases

| Scenario | Calls → Expected | Why it matters |
|---|---|---|
| Fresh trie, nothing inserted | `startsWith("")` → `true`; `search("")` → `false`; `search("cat")` → `false` | Empty prefix reaches the root in zero steps, so `startsWith("")` is always `true` even with no words stored; `search("cat")` proves a never-inserted word correctly returns `false`. |
| `insert("app")`, `insert("apple")` | `search("app")` → `true`; `search("appl")` → `false`; `startsWith("appl")` → `true`; `search("apple")` → `true` | A word that is also a *prefix* of another inserted word must still `search` as `true` (its own `isEnd` flag), while an incomplete partial path (`"appl"`) is only a prefix, not a stored word. |
| `insert("a")` (single character, minimum length) | `search("a")` → `true`; `search("ab")` → `false`; `startsWith("a")` → `true`; `startsWith("b")` → `false` | Minimum-length word from the constraint floor; also confirms an unrelated single-character prefix fails cleanly. |
