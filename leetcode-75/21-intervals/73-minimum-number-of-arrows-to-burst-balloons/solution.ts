/**
 * LeetCode 452. Minimum Number of Arrows to Burst Balloons
 * https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/
 *
 * Approach: sort balloons by end coordinate. Shoot an arrow at the end
 * of the first balloon in a cluster; any later balloon whose start is
 * still <= that arrow's position is already burst. As soon as a
 * balloon starts after the current arrow, a new arrow is needed,
 * placed at that balloon's end.
 *
 * Time:  O(n log n) - dominated by sorting
 * Space: O(log n) - sort's internal space (O(1) extra beyond that)
 */
function findMinArrowShots(points: number[][]): number {
  if (points.length === 0) return 0;

  points.sort((a, b) => a[1] - b[1]);

  let arrows = 1;
  let arrowPos = points[0][1];

  for (let i = 1; i < points.length; i++) {
    const [start, end] = points[i];

    if (start > arrowPos) {
      arrows++;
      arrowPos = end;
    }
  }

  return arrows;
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
  console.log(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])); // 2
  console.log(findMinArrowShots([[1,2],[3,4],[5,6],[7,8]])); // 4

  // Edge cases
  assertEqual(findMinArrowShots([[1, 2], [2, 3]]), 1, 'balloons touching at a point');
  assertEqual(findMinArrowShots([[5, 10]]), 1, 'single balloon');
  assertEqual(findMinArrowShots([[3, 6], [3, 6], [3, 6]]), 1, 'identical balloons');
  assertEqual(
    findMinArrowShots([[1, 2], [2, 3], [3, 4], [4, 5]]),
    2,
    'chain of touching balloons needs more than one arrow'
  );
  assertEqual(
    findMinArrowShots([[-2147483648, 2147483647]]),
    1,
    'extreme int32 boundary coordinates'
  );
}

export { findMinArrowShots };
