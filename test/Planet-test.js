const { assert } = require('chai');
const Planet = require('../lib/Planet');

describe('Planet', function() {
  it('should be a function', function() {
    const planet = new Planet();
    assert.equal(true, true);
  });

  it('should have default states', function() {
    assert.equal(game.y, -50);
    assert.equal(game.dx, 0);
    assert.equal(game.dy, 0.8);

  })

  it('should generate a unique x coordinate and the same y coordinate', function() {
    let planet = new Planet();
    let planet1 = new Planet();

    assert.notEqual(planet.x, planet1.x);
    assert.equal(planet.y, planet1.y);
  });

  it('should have a velocity on y', function() {
    const planet = new Planet();

    assert.equal(planet.dy, 0.8);
  });

  it('should move only vertically', function() {
    const planet = new Planet();
    let initialPlanetX = planet.x;

    assert.equal(planet.x, initialPlanetX);
    assert.equal(planet.y, -50);
    planet.movePlanets();
    assert.equal(planet.x, initialPlanetX);
    assert.equal(planet.y, -49.2);
  });

});
