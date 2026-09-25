/**
 * LeetCode 1268. Search Suggestions System
 * https://leetcode.com/problems/search-suggestions-system/
 *
 * Approach: sort products lexicographically so any prefix's matches form
 * a contiguous block. Maintain a two-pointer window [left, right] over
 * the sorted array that only shrinks as searchWord's prefix grows one
 * character at a time; take up to the first 3 products in the window
 * after each character.
 *
 * Time:  O(n log n + n + m) - sort dominates; pointers move O(n) total
 *        across the whole run; m = searchWord.length for the output loop
 * Space: O(m) for the output beyond sorting
 */
function suggestedProducts(products: string[], searchWord: string): string[][] {
  const sorted = [...products].sort();
  let left = 0;
  let right = sorted.length - 1;
  const result: string[][] = [];

  for (let i = 0; i < searchWord.length; i++) {
    const ch = searchWord[i];

    while (left <= right && (sorted[left].length <= i || sorted[left][i] !== ch)) {
      left++;
    }
    while (left <= right && (sorted[right].length <= i || sorted[right][i] !== ch)) {
      right--;
    }

    const suggestions: string[] = [];
    for (let k = left; k <= right && suggestions.length < 3; k++) {
      suggestions.push(sorted[k]);
    }
    result.push(suggestions);
  }

  return result;
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
  console.log(suggestedProducts(
    ['mobile', 'mouse', 'moneypot', 'monitor', 'mousepad'],
    'mouse'
  ));
  // [["mobile","moneypot","monitor"], ["mobile","moneypot","monitor"],
  //  ["mouse","mousepad"], ["mouse","mousepad"], ["mouse","mousepad"]]

  // Edge cases
  assertEqual(
    suggestedProducts(['ab', 'abc'], 'abcde'),
    [['ab', 'abc'], ['ab', 'abc'], ['abc'], [], []],
    'searchWord longer than any product'
  );
  assertEqual(
    suggestedProducts(['x'], 'xy'),
    [['x'], []],
    'single product, searchWord longer than it'
  );
  assertEqual(
    suggestedProducts(['zebra', 'zoo'], 'a'),
    [[]],
    'no product matches even the first character'
  );
}

export { suggestedProducts };
