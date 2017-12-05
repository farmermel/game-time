const { assert } = require('chai');
const Planet = require('../lib/Planet');
const Ufo = require('../lib/Ufo');
const Game = require('../lib/Game.js');


describe('Planet', function() {
  it('should be a function', function() {
    const planet = new Planet();
    assert.equal(true, true);
  });

  it('should generate a unique x coordinate and the same y coordinate', function() {
    let planet = new Planet();
    let planet1 = new Planet();

    assert.notEqual(planet.x, planet1.x);
    assert.equal(planet.y, planet1.y);
  });

  it('should have a velocity on y', function() {
    const planet = new Planet();

    assert.equal(planet.dy, 1);
  });

  it('should move only vertically', function() {
    const planet = new Planet();
    let initialPlanetX = planet.x;

    assert.equal(planet.x, initialPlanetX);
    assert.equal(planet.y, -50);
    planet.movePlanets();
    assert.equal(planet.x, initialPlanetX);
    assert.equal(planet.y, -49);
  });

  // put on game?
  // it('should decrease in size when user levels up', function() {
  //   const planet = new Planet();

  //   assert.equal(planet.width, 40);
  //   assert.equal(planet.height, 40);

  //   planet.checkPlanetSize(1);

  //   const planet1 = new Planet();
  //   assert.equal(planet1.width, 30);
  //   assert.equal(planet1.height, 30);

  // })

});

describe.only('Ufo', function() {
  let ufo;

  beforeEach(function() {
    ufo = new Ufo();
  })

  it('should be a function', function() {

    assert.equal(true, true);
  });

  it('should default to center bottom of canvas', function() {

    assert.equal(ufo.x, 250);
    assert.equal(ufo.y, 460);
  })

  it('should be able to move left', function() {

    assert.equal(ufo.x, 250);
    ufo.moveLeft;
    assert.equal(ufo.x, 246);

  });

  it('should be able to move right', function() {

    assert.equal(ufo.x, 250);
    ufo.moveRight;
    assert.equal(ufo.x, 254);
  })

  it('should be subject to gravity', function() {
    ufo = new Ufo(50, 50);
    assert.equal(ufo.y, 50);
    assert.equal(ufo.currentDY, 0);

    ufo.makeGravity();
    
    assert.equal(ufo.y, 50.1);
    assert.equal(ufo.currentDY, 0.1);
  })

  it.skip('should be able to bounce off of planets', function() {
    ufo = new Ufo(50, 50);
    planet = new Planet (55, 55);

    assert.equal(ufo.currentDY, -5);
  })

  it('should not be able to go off the canvas', function() {
    ufo = new Ufo(0, 0);

    assert.equal(ufo.x, 0);
    assert.equal(ufo.y, 0);
    ufo.moveLeft;
    ufo.bounceUp();
    assert.equal(ufo.x, 0);
    assert.equal(ufo.y, 0);

    ufo = new Ufo(460, 460);

    assert.equal(ufo.x, 460);
    assert.equal(ufo.y, 460);
    ufo.moveRight;
    ufo.makeGravity();
    ufo.rockBottom;
    assert.equal(ufo.x, 460);
    assert.equal(ufo.y, 460);
  })
});