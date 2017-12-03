const { assert } = require('chai');
const Planet = require('../lib/Planet');
const Ufo = require('../lib/Ufo');
const Game = require('../lib/Game.js');


describe('Planet', function() {
  it('should be a function', function() {
    const planet = new Planet();
    assert.equal(true, true);
  });

  it('should accept an x and y coordinate', function() {
    const planet = new Planet(5, 10);

    assert.equal(planet.x, 5);
    assert.equal(planet.y, 10);
  });

  it.skip('should have a horizontal and vertical velocity', function() {
    const planet = new Planet();

    assert.exists(planet.dx, 'x velocity is neither null or undefined');
  });

  it('should accept an image source', function() {
    const planet = new Planet(5, 10, '../images/mars.svg');

    assert.equal(planet.imgsrc, '../images/mars.svg');
  });

  it('should move only vertically', function() {
    const planet = new Planet(5, 10);

    assert.equal(planet.x, 5);
    assert.equal(planet.y, 10);
    planet.movePlanets();
    assert.equal(planet.x, 5);
    assert.equal(planet.y, 11);
  });
});

describe('Ufo', function() {
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