const Surface = require('./surface');
const Robot = require("./robot");

describe("Robot", () => {
  let robot;
  let surface;
  beforeEach(() => {
    surface = new Surface([ 20, 20 ]);
    robot = new Robot({ position: [0, 10], orientation: "N", surface });
  });

  test("Robot should crash when given bad instructions", () => {
    expect(() => {
      robot.loadInstructions("A");
    }).toThrow();
  });

  test('Robot heading N should point to N after rotating 360º to the left', () => {
    robot.loadInstructions("LLLL");
    robot.explore();
    expect(robot.location()).toBe("0 10 N");
  });

  test('Robot heading north should point to W after turning to its left', () => {
    robot.loadInstructions("L");
    robot.explore();
    expect(robot.location()).toBe("0 10 W");
  });

  test("Robot heading should point to E after turning to its right", () => {
    robot.loadInstructions("R");
    robot.explore();
    expect(robot.location()).toBe("0 10 E");
  });

  test("Robot heading N increment its Y position when moving forward", () => {
    robot.loadInstructions("F");
    robot.explore();
    expect(robot.location()).toBe("0 11 N");
  });

  test('Robot gets lost after moving out of surface', () => {
    robot.loadInstructions(Array(11).fill('F').join(''));
    robot.explore();
    expect(robot.location()).toBe("0 20 N LOST");
  });

  test('Robot should leave scent after getting lost', () => {
    let surface = new Surface([ 5, 5]);
    let robot = new Robot({ position: [0, 0], orientation: 'E', surface });
    robot.loadInstructions("FFFFFF")
    robot.explore();
    expect(robot.location()).toBe("5 0 E LOST");
    expect(surface.isUnsafeStep("5 0 E -> F")).toBe(true);
  });

  test('Other robots should ignore instructions which point to the abyss', () => {
    let surface = new Surface([ 5, 5]);
    let robot = new Robot({ position: [0, 0], orientation: 'E', surface });
    robot.loadInstructions("FFFFFF")
    robot.explore();
    expect(robot.location()).toBe("5 0 E LOST");
    expect(surface.isUnsafeStep("5 0 E -> F")).toBe(true);

    let robot2 = new Robot({ position: [0, 0], orientation: 'E', surface });
    // F (1,0,E) -> F (2,0,E) -> F (3,0,E) -> F (4,0,E) -> F (5,0,E) -> F (6,0,E) IGNORED -> L (5,0,N) -> F (5,1,N)
    robot2.loadInstructions("FFFFFFLF");
    robot2.explore();
    expect(robot2.location()).toBe("5 1 N");
  });
});
