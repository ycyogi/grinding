/**
 * LeetCode 933. Number of Recent Calls
 * https://leetcode.com/problems/number-of-recent-calls/
 *
 * Approach: maintain a FIFO queue of request timestamps. Since t is
 * strictly increasing across calls, once a timestamp falls below
 * t - 3000 it can be popped off the front for good and never needs to
 * be reconsidered.
 *
 * Time:  O(1) amortized per ping - each timestamp is pushed once and
 *        popped at most once over the life of the counter
 * Space: O(n) for the timestamps currently within the 3000ms window
 */
class RecentCounter {
  private requests: number[];

  constructor() {
    this.requests = [];
  }

  ping(t: number): number {
    this.requests.push(t);

    while (this.requests[0] < t - 3000) {
      this.requests.shift();
    }

    return this.requests.length;
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
  const counter = new RecentCounter();
  console.log(counter.ping(1));    // 1
  console.log(counter.ping(100));  // 2
  console.log(counter.ping(3001)); // 3
  console.log(counter.ping(3002)); // 3

  // Edge cases
  const c1 = new RecentCounter();
  assertEqual(c1.ping(1), 1, 'single ping');

  const c2 = new RecentCounter();
  assertEqual(c2.ping(1), 1, 'inclusive lower bound: ping(1)');
  assertEqual(c2.ping(3001), 2, 'inclusive lower bound: ping(3001) keeps t=1');

  const c3 = new RecentCounter();
  assertEqual(c3.ping(1), 1, 'exclusive boundary: ping(1)');
  assertEqual(c3.ping(3002), 1, 'exclusive boundary: ping(3002) drops t=1');

  const c4 = new RecentCounter();
  assertEqual(c4.ping(1), 1, 'sparse pings: ping(1)');
  assertEqual(c4.ping(5000), 1, 'sparse pings: ping(5000)');
  assertEqual(c4.ping(10000), 1, 'sparse pings: ping(10000)');

  const c5 = new RecentCounter();
  assertEqual(c5.ping(1), 1, 'clustered pings: ping(1)');
  assertEqual(c5.ping(2), 2, 'clustered pings: ping(2)');
  assertEqual(c5.ping(3), 3, 'clustered pings: ping(3)');
}

export { RecentCounter };
