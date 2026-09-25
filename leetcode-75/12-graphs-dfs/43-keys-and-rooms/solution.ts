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
if (require.main === module) {
  // Example usage:
  console.log(canVisitAllRooms([[1],[2],[3],[]])); // true
  console.log(canVisitAllRooms([[1,3],[3,0,1],[2],[0]])); // false
}

export { canVisitAllRooms };
