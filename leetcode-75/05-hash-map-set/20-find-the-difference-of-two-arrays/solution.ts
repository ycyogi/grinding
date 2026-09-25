/**
 * LeetCode 2215. Find the Difference of Two Arrays
 * https://leetcode.com/problems/find-the-difference-of-two-arrays/
 *
 * Approach: build a hash set from each array, then compute the two-way
 * set difference using O(1) average membership checks instead of a
 * brute-force nested-loop comparison.
 *
 * Time:  O(m + n) - building the sets and filtering each is linear
 * Space: O(m + n) - two sets plus the output lists
 */
function findDifference(nums1: number[], nums2: number[]): number[][] {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);

  const onlyInNums1 = [...set1].filter((n) => !set2.has(n));
  const onlyInNums2 = [...set2].filter((n) => !set1.has(n));

  return [onlyInNums1, onlyInNums2];
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

// Sort each inner list so order-independent output can be compared.
function normalize(result: number[][]): number[][] {
  return result.map((part) => [...part].sort((x, y) => x - y));
}

if (require.main === module) {
  // Example usage:
  console.log(findDifference([1, 2, 3], [2, 4, 6])); // [[1,3],[4,6]]
  console.log(findDifference([1, 2, 3, 3], [1, 1, 2, 2])); // [[3],[]]

  // Edge cases
  assertEqual(
    normalize(findDifference([1, 2, 3], [1, 2, 3])),
    [[], []],
    'identical arrays'
  );
  assertEqual(
    normalize(findDifference([1, 2], [3, 4])),
    [[1, 2], [3, 4]],
    'completely disjoint arrays'
  );
  assertEqual(
    normalize(findDifference([5, 5, 5], [5, 5])),
    [[], []],
    'duplicates-only input'
  );
  assertEqual(
    normalize(findDifference([1, 2, 3, 4], [2, 3])),
    [[1, 4], []],
    'one array is a subset of the other'
  );
  assertEqual(
    normalize(findDifference([-1, -2, -3], [-2, -4])),
    [[-3, -1], [-4]],
    'negative numbers'
  );
}

export { findDifference };
