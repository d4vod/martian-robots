const Robot = require("./robot");
const Surface = require("./surface");

function parseCoordinates(...coordinates) {
  return coordinates.map((c) => parseInt(c, 10));
}

class Expedition {
  constructor(surface, robots) {
    this.surface = surface;
    this.robots = robots;
  }

  static fromString(input) {
    let [grid, ...robots] = input.trim().split("\n");
    if (!grid.length) {
      throw new Error("Empty grid");
    }
    robots = robots.map((r) => r.trim());
    const [gridX, gridY] = grid.split(" ");
    const surface = new Surface(parseCoordinates(gridX, gridY));
    const martians = robots.reduce((prev, _, index) => {
      if (index % 2 === 0) {
        const robot = robots.slice(index, index + 2);
        const [position, instructions] = robot;
        const [x, y, orientation] = position.split(" ");
        const martianRobot = new Robot({
          position: parseCoordinates(x, y),
          orientation,
          surface,
        });
        martianRobot.loadInstructions(instructions);
        prev.push(martianRobot);
      }
      return prev;
    }, []);
    return new Expedition(surface, martians);
  }

  start() {
    for (const robot of this.robots) {
      robot.explore();
    }
    return this.robots.map((r) => r.location()).join("\n");
  }
}

module.exports = Expedition;
