// This function creates a Mars Rover object with the given position, orientation, and grid size.
function createRoverAndGrid(grid, x, y, orientation) {
  let lost = false;

  // This function executes a single movement command (L, R, or F) based on the input command.
  function move(command) {
    if (lost) {
      return;
    }

    if (command === "L") {
      rotateLeft();
    } else if (command === "R") {
      rotateRight();
    } else if (command === "F") {
      moveForward();
    }
  }

  // This function changes the rover's orientation counterclockwise.
  function rotateLeft() {
    const rotations = { N: "W", W: "S", S: "E", E: "N" };
    orientation = rotations[orientation];
  }

  // This function changes the rover's orientation clockwise.
  function rotateRight() {
    const rotations = { N: "E", E: "S", S: "W", W: "N" };
    orientation = rotations[orientation];
  }

  // This function moves the rover one step in the direction of its orientation.
  function moveForward() {
    let newX = x;
    let newY = y;

    if (orientation === "N") {
      newY += 1;
    } else if (orientation === "E") {
      newX += 1;
    } else if (orientation === "S") {
      newY -= 1;
    } else if (orientation === "W") {
      newX -= 1;
    }

    if (0 <= newX && newX < grid[0] && 0 <= newY && newY < grid[1]) {
      x = newX;
      y = newY;
    } else {
      lost = true;
    }
  }

  // This function returns the rover's current position and orientation as a string.
  function toString() {
    return `(${x}, ${y}, ${orientation})${lost ? " LOST" : ""}`;
  }

  // This function returns whether the rover is lost or not.
  return { move, toString, lost: () => lost };
}

function main() {
  // Prompt the user for the grid size and convert the input into an array of numbers.
  const gridSizeInput = prompt("Enter the grid size (e.g., 5 9):");
  const grid = gridSizeInput.split(" ").map(Number);

  // Prompt the user for the initial position of the first rover and create the first rover object.
  const initialStateInput1 = prompt(
    "Enter the initial position of the first rover (e.g., 0 2 N):"
  );
  const initialStateParts1 = initialStateInput1.split(" ");
  const initialState1 = [
    Number(initialStateParts1[0]),
    Number(initialStateParts1[1]),
    initialStateParts1[2],
  ];
  const rover1 = createRoverAndGrid(...initialState1, grid);

  // Prompt the user for the initial position of the second rover and create the second rover object.
  const initialStateInput2 = prompt(
    "Enter the initial position of the second rover (e.g., 0 2 N):"
  );
  const initialStateParts2 = initialStateInput2.split(" ");
  const initialState2 = [
    Number(initialStateParts2[0]),
    Number(initialStateParts2[1]),
    initialStateParts2[2],
  ];
  const rover2 = createRoverAndGrid(...initialState2, grid);

  // Continuously update the rover positions based on user input until both rovers are lost or the user decides to stop.
  while (!rover1.lost() || !rover2.lost()) {
    // Prompt the user for the rover number to control or allow the user to exit the loop.
    const roverNumber = prompt(
      'Enter the rover number (1 or 2) to control, or "EXIT" to stop:'
    );
    if (roverNumber.toUpperCase() === "EXIT") {
      break;
    }

    // Prompt the user for the sequence of movement commands for the selected rover.
    const commands = prompt(
      `Enter the sequence of movement commands for rover ${roverNumber} (e.g., FLLFR):`
    );
    const rover = roverNumber === "1" ? rover1 : rover2;

    // Execute the movement commands for the selected rover.
    for (const command of commands) {
      rover.move(command);
      if (rover.lost()) {
        console.log(
          `Rover ${roverNumber} is LOST at position: ${rover.toString()}`
        );
        break;
      }
    }

    // Log the current positions of both rovers.
    console.log(
      `Current positions:\nRover 1: ${rover1.toString()}\nRover 2: ${rover2.toString()}`
    );

    // If both rovers are lost, display an alert and break the loop.
    if (rover1.lost() && rover2.lost()) {
      alert("Game over! Both rovers are lost.");
      break;
    }
  }
}

main();
