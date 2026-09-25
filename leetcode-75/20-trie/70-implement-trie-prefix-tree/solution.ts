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
function assertEqual(actual: unknown, expected: unknown, label: string): void {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    console.error(`FAIL [${label}]: got ${a}, expected ${e}`);
  } else {
    console.log(`PASS [${label}]`);
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

  // Edge cases

  // Scenario: fresh trie, nothing inserted
  const emptyTrie = new Trie();
  assertEqual(emptyTrie.startsWith(''), true, "empty trie startsWith('')");
  assertEqual(emptyTrie.search(''), false, "empty trie search('')");
  assertEqual(emptyTrie.search('cat'), false, 'search word never inserted');

  // Scenario: a word that is also a prefix of another inserted word
  const t2 = new Trie();
  t2.insert('app');
  t2.insert('apple');
  assertEqual(t2.search('app'), true, 'prefix that is also a complete word');
  assertEqual(t2.search('appl'), false, 'incomplete partial path is not a word');
  assertEqual(t2.startsWith('appl'), true, 'startsWith on partial path');
  assertEqual(t2.search('apple'), true, 'longer inserted word still found');

  // Scenario: single-character word (minimum length)
  const t3 = new Trie();
  t3.insert('a');
  assertEqual(t3.search('a'), true, 'single-char word search');
  assertEqual(t3.search('ab'), false, 'single-char word, longer search miss');
  assertEqual(t3.startsWith('a'), true, 'single-char startsWith');
  assertEqual(t3.startsWith('b'), false, 'unrelated single-char startsWith');
}

export { Trie };
