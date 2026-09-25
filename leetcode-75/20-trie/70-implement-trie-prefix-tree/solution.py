"""
LeetCode 208. Implement Trie (Prefix Tree)
https://leetcode.com/problems/implement-trie-prefix-tree/

Approach: each node keeps a dict from character to child node plus an
is_end flag. insert walks/creates nodes character by character and
flags the last one; search/startsWith walk the same path and differ
only in whether they require the final node's is_end flag.

Time:  O(L) per operation, where L is the word/prefix length
Space: O(N * L) for all inserted characters across N words
"""

from typing import Dict, Optional


class TrieNode:
    def __init__(self) -> None:
        self.children: Dict[str, "TrieNode"] = {}
        self.is_end: bool = False


class Trie:
    def __init__(self) -> None:
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self._find(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._find(prefix) is not None

    def _find(self, word: str) -> Optional[TrieNode]:
        node = self.root
        for ch in word:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node


def assert_equal(actual, expected, label):
    if actual != expected:
        print(f"FAIL [{label}]: got {actual}, expected {expected}")
    else:
        print(f"PASS [{label}]")


if __name__ == "__main__":
    trie = Trie()
    trie.insert("apple")
    print(trie.search("apple"))  # True
    print(trie.search("app"))  # False
    print(trie.startsWith("app"))  # True
    trie.insert("app")
    print(trie.search("app"))  # True

    # Edge cases

    # Scenario: fresh trie, nothing inserted
    empty_trie = Trie()
    assert_equal(empty_trie.startsWith(""), True, "empty trie startsWith('')")
    assert_equal(empty_trie.search(""), False, "empty trie search('')")
    assert_equal(empty_trie.search("cat"), False, "search word never inserted")

    # Scenario: a word that is also a prefix of another inserted word
    t2 = Trie()
    t2.insert("app")
    t2.insert("apple")
    assert_equal(t2.search("app"), True, "prefix that is also a complete word")
    assert_equal(t2.search("appl"), False, "incomplete partial path is not a word")
    assert_equal(t2.startsWith("appl"), True, "startsWith on partial path")
    assert_equal(t2.search("apple"), True, "longer inserted word still found")

    # Scenario: single-character word (minimum length)
    t3 = Trie()
    t3.insert("a")
    assert_equal(t3.search("a"), True, "single-char word search")
    assert_equal(t3.search("ab"), False, "single-char word, longer search miss")
    assert_equal(t3.startsWith("a"), True, "single-char startsWith")
    assert_equal(t3.startsWith("b"), False, "unrelated single-char startsWith")
