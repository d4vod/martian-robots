const Expedition = require("./expedition");

describe("Expedition", () => {
  let expedition;
  beforeEach(() => {
    expedition = Expedition.fromString(`
      5 3
      1 1 E
      RFRFRFRF
      3 2 N
      FRRFLLFFRRFLL
      0 3 W
      LLFFFLFLFL
    `);
  });
  test("Should throw an error when given a bad input", () => {
    expect(() => {
      Expedition.fromString("");
    }).toThrow();
  });

  test("Parsing input example should produce 3 robots and 5x3 grid", () => {
    expect(expedition.robots.length).toBe(3);
    expect(expedition.surface.grid[0]).toBe(5);
    expect(expedition.surface.grid[1]).toBe(3);
  });

  test("Expedition example should return expected results", () => {
    const results = expedition.start();
    expect(results).toBe("1 1 E\n3 3 N LOST\n2 3 S");
  });
});
