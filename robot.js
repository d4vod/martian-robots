class Robot {
  constructor({ position, orientation, surface }) {
    this.position = position;
    this.orientation = orientation;
    this.surface = surface;
    this.instruction = null;
    this.lost = false;
  }

  loadInstructions(instructions) {
    if (!instructions.match(/[RFL]+/)) {
      throw new Error('Brrrr bad instructions');
    }
    this.instructions = instructions;
  }

  location() {
    const [x, y] = this.position;
    return `${x} ${y} ${this.orientation} ${this.lost ? 'LOST' : ''}`.trim();
  }

  command(instruction) {
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
          this.surface.markUnsafeStep(
            `${this.position[0]} ${this.position[1]} ${this.orientation} -> ${instruction}`
          );
          break;
        }
        this.position = result;
        break;
      }
      default:
        break;
    }
  }

  explore() {
    for (const instruction of this.instructions) {
      if (this.lost) {
        break;
      }
      if (
        this.surface.isUnsafeStep(
          `${this.position[0]} ${this.position[1]} ${this.orientation} -> ${instruction}`
        )
      ) {
        continue;
      }
      this.command(instruction);
    }
  }
}

module.exports = Robot;
