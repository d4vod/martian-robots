class Surface {
  constructor(grid) {
    this.validateGrid(grid);
    this.unsafeSteps = new Set();
  }

  validateGrid(grid) {
    const [x, y] = grid;
    if (x > 50 || y > y) {
      throw new Error("Dimensions are too large. Max allowed: 50");
    }
    this.grid = grid;
  }

  markUnsafeStep(step) {
    // Should we validate if the step is within the grid?
    this.unsafeSteps.add(step);
  }

  isOff(position) {
    const [x, y] = position;
    if (x < 0 || y < 0) {
      return true;
    }
    const [gridX, gridY] = this.grid;
    if (x > gridX || y > gridY) {
      return true;
    }
    return false;
  }

  isSafe(step) {
    return !this.unsafeSteps.has(step);
  }

  isUnsafeStep(step) {
    return this.unsafeSteps.has(step);
  }
}

module.exports = Surface;
