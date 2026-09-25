/**
 * LeetCode 841. Keys and Rooms
 * https://leetcode.com/problems/keys-and-rooms/
 *
 * Approach: treat rooms as graph nodes and keys as directed edges.
 * DFS from room 0, marking rooms visited as we collect their keys.
 * All rooms are reachable iff visited.size === n.
 *
 * Time:  O(n + e) - n rooms, e total keys across all rooms
 * Space: O(n) - visited set and explicit stack
 */
function canVisitAllRooms(rooms: number[][]): boolean {
  const n = rooms.length;
  const visited = new Set<number>([0]);
  const stack: number[] = [0];

  while (stack.length > 0) {
    const room = stack.pop() as number;

    for (const key of rooms[room]) {
      if (!visited.has(key)) {
        visited.add(key);
        stack.push(key);
      }
    }
  }

  return visited.size === n;
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
  console.log(canVisitAllRooms([[1],[2],[3],[]])); // true
  console.log(canVisitAllRooms([[1,3],[3,0,1],[2],[0]])); // false

  // Edge cases
  assertEqual(canVisitAllRooms([[]]), true, "n=1, only room 0");
  assertEqual(canVisitAllRooms([[], []]), false, "room 0 has no keys, room 1 unreachable");
  assertEqual(canVisitAllRooms([[1], [], []]), false, "room 2's key never handed out");
  assertEqual(canVisitAllRooms([[1], [0, 2], [0]]), true, "cycle back to room 0 doesn't break traversal");
  assertEqual(canVisitAllRooms([[0, 1], []]), true, "self-referencing key is a harmless no-op");
}

export { canVisitAllRooms };
