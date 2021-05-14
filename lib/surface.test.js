const Surface = require('./surface');

describe('Surface', () => {
  let surface;
  beforeEach(() => {
    surface = new Surface([ 5, 5 ]);
  });
  test('Surface with dimensions too large should throw', () => {
    expect(() => {
      new Surface([ 51, 51 ]);
    }).toThrow();
  });

  test('Surface marks unsafe step', () => { 
    surface.markUnsafeStep('5 1 N -> F'); 
    expect(surface.isUnsafeStep('5 1 N -> F')).toBe(true);
  });
});
