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

// Example usage:
// const counter = new RecentCounter();
// console.log(counter.ping(1));    // 1
// console.log(counter.ping(100));  // 2
// console.log(counter.ping(3001)); // 3
// console.log(counter.ping(3002)); // 3

export { RecentCounter };
