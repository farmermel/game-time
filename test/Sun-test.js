const { assert } = require('chai');
const Sun = require('../lib/Sun.js');

describe('Sun', function() {
  let sun;

  beforeEach( function() {
    sun = new Sun();
  })

  it('should instantiate a sun', function() {
    assert.equal(true, true);
  })

  it('should generate a unique x coordinate and the same y coordinate', function() {
    let sun = new Sun();
    let sun1 = new Sun();

    assert.notEqual(sun.x, sun1.x);
    assert.equal(sun.y, sun1.y);
  });

  it('should have a velocity on y', function() {
    const sun = new Sun();

    assert.equal(sun.dy, 0.8);
  });

  it('should move only vertically', function() {
    const sun = new Sun();
    let initialSunX = sun.x;

    assert.equal(sun.x, initialSunX);
    assert.equal(sun.y, -50);
    sun.movePlanets();
    assert.equal(sun.x, initialSunX);
    assert.equal(sun.y, -49.2);
  });

})

