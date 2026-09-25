/**
 * LeetCode 17. Letter Combinations of a Phone Number
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 *
 * Approach: backtracking over the digit-to-letters mapping, building one
 * letter at a time and undoing the choice after exploring each branch.
 *
 * Time:  O(4^n * n) - up to 4 letters per digit, n digits, n to copy each path
 * Space: O(n) extra for recursion depth and the path buffer (excl. output)
 */
const DIGIT_LETTERS: Record<string, string> = {
  '2': 'abc',
  '3': 'def',
  '4': 'ghi',
  '5': 'jkl',
  '6': 'mno',
  '7': 'pqrs',
  '8': 'tuv',
  '9': 'wxyz',
};

function letterCombinations(digits: string): string[] {
  if (digits.length === 0) return [];

  const result: string[] = [];
  const path: string[] = [];

  const backtrack = (i: number): void => {
    if (i === digits.length) {
      result.push(path.join(''));
      return;
    }

    const letters = DIGIT_LETTERS[digits[i]];
    for (const letter of letters) {
      path.push(letter);
      backtrack(i + 1);
      path.pop();
    }
  };

  backtrack(0);
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
  console.log(letterCombinations('23'));
  // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
  console.log(letterCombinations('')); // []

  // Edge cases
  // Order is deterministic (letters are iterated from a fixed string), so
  // exact array equality is valid here — no sorting needed.
  assertEqual(letterCombinations(''), [], 'empty digits returns [], not [""]');
  assertEqual(letterCombinations('2'), ['a', 'b', 'c'], 'single digit, 3 letters');
  assertEqual(
    letterCombinations('7'),
    ['p', 'q', 'r', 's'],
    'single digit, 4 letters (max branching)'
  );
  assertEqual(
    letterCombinations('23'),
    ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'],
    'two digits, full 3x3 combination set'
  );
}

export { letterCombinations };
