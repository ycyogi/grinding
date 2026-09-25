# 27. Number of Recent Calls

- **LeetCode:** [933. Number of Recent Calls](https://leetcode.com/problems/number-of-recent-calls/)
- **Difficulty:** Easy
- **Category:** Queue
- **Pattern:** Sliding window with a monotonic queue

## Problem

Implement the `RecentCounter` class to count the number of recent requests
within a certain time frame.

- `RecentCounter()` initializes the counter with zero recent requests.
- `int ping(int t)` adds a new request at time `t` (in milliseconds), where
  `t` is strictly larger than every previous call to `ping`. It returns the
  number of requests that have happened in the inclusive range
  `[t - 3000, t]`.

It is guaranteed that every call to `ping` uses a strictly larger value of
`t` than the previous call.

**Example 1**
```
Input:
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]

Output:
[null, 1, 2, 3, 3]

Explanation:
RecentCounter counter = new RecentCounter();
counter.ping(1);    // requests = [1],                range = [-2999, 1], return 1
counter.ping(100);  // requests = [1, 100],            range = [-2900, 100], return 2
counter.ping(3001); // requests = [1, 100, 3001],       range = [1, 3001], return 3
counter.ping(3002); // requests = [1, 100, 3001, 3002], range = [2, 3002], return 3 (1 falls out)
```

**Example 2**
```
Input:  ping(1), ping(2), ping(3000), ping(3001)
Output: 1, 2, 3, 4
Explanation: 1 is still within [1, 3001] (3001 - 3000 = 1), so nothing has
expired yet and every ping so far is counted.
```

**Constraints**
- `1 <= t <= 10^9`
- Each test case calls `ping` with strictly increasing values of `t`.
- At most `10^4` calls will be made to `ping`.

## Approach

Because `t` values only ever increase, a request that falls out of the
current window `[t - 3000, t]` will never come back into range on a later
call. That makes this a classic sliding-window-over-a-queue problem:

1. Keep a queue (array used as a FIFO) of all request timestamps seen so
   far, in increasing order.
2. On each `ping(t)` call, push `t` onto the back of the queue.
3. While the front of the queue is smaller than `t - 3000`, pop it off —
   those requests are now outside the window and can never re-enter it.
4. Return the queue's current length, which is exactly the count of
   requests still within `[t - 3000, t]`.

Using a proper queue (shift from the front) rather than filtering the
whole array on every call avoids re-scanning requests that have already
been confirmed to be in range.

## Complexity

- **Time:** `O(1)` amortized per `ping` call — each timestamp is pushed
  once and popped at most once across the life of the counter, so the
  total work over `n` calls is `O(n)`.
- **Space:** `O(n)` in the worst case, for the timestamps currently stored
  in the window (at most all `n` calls if they're all within 3000ms of
  each other).
