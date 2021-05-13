function command(instruction) {
  switch (instruction) {
    case "L": {
      const mapping = {
        N: "W",
        W: "S",
        S: "E",
        E: "N",
      };
      this.orientation = mapping[this.orientation];
      break;
    }
    case "R": {
      const mapping = {
        N: "E",
        E: "S",
        S: "W",
        W: "N",
      };
      this.orientation = mapping[this.orientation];
      break;
    }
    case "F": {
      const mapping = {
        N: [0, 1],
        E: [1, 0],
        S: [0, -1],
        W: [-1, 0],
      };
      const movement = mapping[this.orientation];
      const result = [
        this.position[0] + movement[0],
        this.position[1] + movement[1],
      ];
      if (
        result[0] < 0 ||
        result[1] < 0 ||
        result[0] > this.surface.grid[0] ||
        result[1] > this.surface.grid[1]
      ) {
        this.lost = true;
        this.surface.unsafeArea.add(
          `${this.position[0]} ${this.position[1]} ${this.orientation} ${instruction}`
        );
        break;
      }
      this.position = result;
      break;
    }
    default:
      break;
  }
}class Expedition {
  constructor(surface, robots) {
    this.surface = surface;
    this.robots = robots;
  }

  static fromString(input) {
    const [grid, ...robots] = input.split("\n");
    const [gridX, gridY] = grid.split(" ");
    const martianRobots = [];
    const unsafeArea = new Set();
    const surface = {
      unsafeArea,
      grid: [gridX, gridY]
    }
    for (let i = 0; i < robots.length / 2; i++) {
      const robot = robots.slice(i * 2, i * 2 + 2);
      const [position, instructions] = robot;
      const [x, y, orientation] = position.split(" ");

      martianRobots.push({
        name: "Mars " + i,
        position: [x, y].map((c) => parseInt(c, 10)),
        orientation,
        instructions,
        command,
        surface,
      });
    }
    return new Expedition(surface, martianRobots);
  }

  start() {
    for (const robot of this.robots) {
      for (const instruction of robot.instructions) {
        if (robot.lost) {
          break;
        }
        if (
          this.surface.unsafeArea.has(
            `${robot.position[0]} ${robot.position[1]} ${robot.orientation} ${instruction}`
          )
        ) {
          continue;
        }
        robot.command(instruction);
      }
      console.log(robot.position, robot.orientation, robot.lost ? "LOST" : "");
    }
  }
}

module.exports = Expedition;
