function knightMoves(start, target) {
  // Create an 8x8 board
  let board = new Array(8);

  for (let i = 0; i < 8; i++) {
    // Mark all vertices as false (not visited)
    board[i] = new Array(8).fill(false);
  }

  // Possible Knight's moves
  const directions = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  // Initial position of the Knight
  let xPos = start[0];
  let yPos = start[1];

  const queue = [];

  // In the queue store current position of the Knight [xPos, yPos]
  // as well as the path that was taken so far (an array of [xPos, yPos])
  // starting with the initial position as part of the path
  queue.push([xPos, yPos, [[xPos, yPos]]]);

  board[xPos][yPos] = true; // Mark initial position as visited

  // Use BFS to find shortest path
  while (queue.length > 0) {
    let levelLength = queue.length;

    // Iterate over each position in the queue at the current level of the board
    for (let i = 0; i < levelLength; i++) {
      const [currentX, currentY, path] = queue.shift();

      // If Knight's current position matches target position, show the number of moves and the moves it took
      if (currentX === target[0] && currentY === target[1]) {
        console.log(`You made it in ${path.length - 1} moves! Here's your path:`);

        path.forEach((move, i) => {
          i === 0 ? console.log(move, "< Initial Position") : console.log(move);
        });
        return;
      }

      for (let [x, y] of directions) {
        // Calculate new position of the Knight by applying the direction offset to current position
        const newX = currentX + x;
        const newY = currentY + y;

        // Check if the new position of the Knight is within the bounds of the board
        // also check if the position hasn't been visited yet
        if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && !board[newX][newY]) {
          board[newX][newY] = true; // Mark it as visited
          queue.push([newX, newY, [...path, [newX, newY]]]); // Add new position to the queue, and update the path
        }
      }
    }
  }
}

knightMoves([3, 3], [0, 0]);
/* You made it in 2 moves! Here's your path:
[3, 3] < Initial Position
[1, 2]
[0, 0] */

knightMoves([0, 0], [7, 7]);
/* You made it in 6 moves! Here's your path:
[0, 0] < Initial Position
[2, 1]
[4, 2]
[6, 3]
[4, 4]
[6, 5]
[7, 7] */

knightMoves([3, 3], [4, 3]);
/* You made it in 3 moves! Here's your path:
[3, 3] < Initial Position
[5, 4]
[3, 5]
[4, 3] */
