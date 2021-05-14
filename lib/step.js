class Step {
  constructor({ from, to, instruction, safe, off }) {
    this.from = from;
    this.to = to;
    this.instruction = instruction;
    this.ignored = !safe;
    this.safe = safe;
    this.off = off;
    this.formatted = this.format();
  }

  format() {
    const [[fromX, fromY], fromOrientation] = this.from;
    const [[toX, toY], toOrientation] = this.to;
    return `${fromX} ${fromY} ${fromOrientation} -> ${toX} ${toY} ${toOrientation}`;
  }

  isSafe() {
    return this.safe;
  }

  isOff() {
    return this.off && this.safe;
  }
}

module.exports = Step;
