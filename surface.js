class Surface {
  constructor(grid) {
    this.validateGrid(grid);
    this.unsafeSteps = new Set();
  }

  validateGrid(grid) {
    const [x, y] = grid;
    if (x > 50 || y > y) {
      throw new Error('Dimensions are too large. Max allowed: 50');
    }
    this.grid = grid;
  }

  markUnsafeStep(step) {
    // Should we validate if the step is within the grid?
    this.unsafeSteps.add(step);
  }

  isUnsafeStep(step) {
    return this.unsafeSteps.has(step);
  }
}

module.exports = Surface;
