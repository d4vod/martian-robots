const Step = require('./step');

class Robot {
  constructor({ position, orientation, surface }) {
    this.position = position;
    this.orientation = orientation;
    this.surface = surface;
    this.instruction = null;
    this.lost = false;
    this.path = new Set();
  }

  loadInstructions(instructions) {
    if (!instructions.match(/[RFL]+/)) {
      throw new Error("Brrrr bad instructions");
    }
    this.instructions = instructions;
  }

  formatInstruction(instruction) {
    return `${this.location()} -> ${instruction}`;
  }

  leaveScent(instruction) {
    this.surface.markUnsafeStep(this.formatInstruction(instruction));
    this.lost = true;
    return null;
  }

  location() {
    const [x, y] = this.position;
    return `${x} ${y} ${this.orientation} ${this.lost ? "LOST" : ""}`.trim();
  }

  command(step) {
    const [position, orientation] = step.to;
    this.position = position;
    this.orientation = orientation;
  }

  calculateInstruction(instruction) {
    let position = this.position;
    switch (instruction) {
      case "L": {
        const mapping = {
          N: "W",
          W: "S",
          S: "E",
          E: "N",
        };
        return [position, mapping[this.orientation]];
      }
      case "R": {
        const mapping = {
          N: "E",
          E: "S",
          S: "W",
          W: "N",
        };
        return [position, mapping[this.orientation]];
      }
      case "F": {
        const mapping = {
          N: [0, 1],
          E: [1, 0],
          S: [0, -1],
          W: [-1, 0],
        };
        const movement = mapping[this.orientation];
        position = [
          position[0] + movement[0],
          position[1] + movement[1],
        ];
        return [position, this.orientation];
      }
      default:
        break;
    }
  }

  planStep(instruction) {
    const [position, orientation] = this.calculateInstruction(instruction);
    const step = new Step({
      from: [this.position, this.orientation],
      to: [position, orientation],
      instruction,
      safe: this.surface.isSafe(this.formatInstruction(instruction)),
      off: this.surface.isOff(position),
    });
    this.path.add(step);
    return step;
  }

  steps() {
    return this.path.size;
  }

  explore() {
    for (const instruction of this.instructions) {
      const step = this.planStep(instruction);
      if (step.isOff()) {
        return this.leaveScent(instruction);
      }
      if (step.isSafe()) {
        this.command(step);
      }
    }
    return this.path;
  }
}

module.exports = Robot;
