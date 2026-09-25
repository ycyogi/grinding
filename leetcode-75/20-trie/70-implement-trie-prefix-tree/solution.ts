/**
 * LeetCode 208. Implement Trie (Prefix Tree)
 * https://leetcode.com/problems/implement-trie-prefix-tree/
 *
 * Approach: each node keeps a map from character to child node plus an
 * isEnd flag. insert walks/creates nodes character by character and
 * flags the last one; search/startsWith walk the same path and differ
 * only in whether they require the final node's isEnd flag.
 *
 * Time:  O(L) per operation, where L is the word/prefix length
 * Space: O(N * L) for all inserted characters across N words
 */
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEnd = false;
}

class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;

    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch)!;
    }

    node.isEnd = true;
  }

  search(word: string): boolean {
    const node = this.find(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix: string): boolean {
    return this.find(prefix) !== null;
  }

  private find(word: string): TrieNode | null {
    let node = this.root;

    for (const ch of word) {
      const next = node.children.get(ch);
      if (!next) return null;
      node = next;
    }

    return node;
  }
}
if (require.main === module) {
  // Example usage:
  const trie = new Trie();
  trie.insert('apple');
  console.log(trie.search('apple'));   // true
  console.log(trie.search('app'));     // false
  console.log(trie.startsWith('app')); // true
  trie.insert('app');
  console.log(trie.search('app'));     // true
}

export { Trie };
