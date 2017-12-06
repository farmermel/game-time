const { assert } = require('chai');
const Planet = require('../lib/Planet');
const Ufo = require('../lib/Ufo');
const Game = require('../lib/Game.js');
const Refuel = require('../lib/Refueling.js');


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
    ufo.moveLeft();
    assert.equal(ufo.x, 249);

  });

  it('should be able to move right', function() {

    assert.equal(ufo.x, 250);
    ufo.moveRight();
    assert.equal(ufo.x, 251);
  })

  it('should be subject to gravity', function() {
    ufo = new Ufo(50, 50);
    assert.equal(ufo.y, 50);
    assert.equal(ufo.velocityY, 0);

    ufo.makeGravity();
    
    assert.equal(ufo.y, 50.1);
    assert.equal(ufo.velocityY, 0.1);
  })

  it('should be able to bounce off of planets', function() {
    ufo = new Ufo(50, 50);
    planet = new Planet (55, 55);

    assert.equal(ufo.velocityY, 0);
    ufo.bounceUp();
    assert.equal(ufo.velocityY, -5);
  })

  it('should be subject to friction', function() {
    ufo = new Ufo();

    assert.equal(ufo.x, 250);
    // assert.equal(ufo.y, 460);
    ufo.moveRight();
    ufo.makeFriction();
    assert.equal(ufo.x, 251.98);

    ufo.x = 250;
    ufo.velocityX = 0;
    ufo.moveLeft();
    ufo.makeFriction();
    assert.equal(ufo.x, 248.02);
  })

  it('should not be able to go off the canvas', function() {
    ufo = new Ufo(0, 0);

    assert.equal(ufo.x, 0);
    assert.equal(ufo.y, 0);
    ufo.moveLeft();
    ufo.bounceUp();
    assert.equal(ufo.x, 0);
    assert.equal(ufo.y, 0);

    ufo = new Ufo(460, 460);

    assert.equal(ufo.x, 460);
    assert.equal(ufo.y, 460);
    ufo.moveRight();
    ufo.makeGravity();
    ufo.rockBottom();
    assert.equal(ufo.x, 460);
    assert.equal(ufo.y, 460);
  })

  it('should collide with planets when they overlap', function() {
    let planet1 = new Planet();
    let planet2 = new Planet();
    let planetsArray = [planet1, planet2];
    let planetx = planet1.x;
    let planety = planet1.y;
    ufo = new Ufo();

    ufo.checkForPlanetCollision(planetsArray);
    assert.equal(ufo.planetCollision, false);

    ufo.x = planetx;
    ufo.y = planety;
    
    ufo.checkForPlanetCollision(planetsArray);
    assert.equal(ufo.planetCollision, true);
  })

  it('should collide with refueling station when they overlap', function() {
    ufo = new Ufo();
    let refuel = new Refuel();

    ufo.checkForRefuelCollision(refuel);
    assert.equal(ufo.refuelCollision, false);

    ufo = new Ufo(1, 0);
    ufo.checkForRefuelCollision(refuel);
    assert.equal(ufo.refuelCollision, true);
  })
});

describe('Refuel', function() {
  let refuel;

  beforeEach(function() {
    refuel = new Refuel();
  })

  it('should move across screen vertically and horizontally', function() {
    assert.equal(refuel.x, 1);
    assert.equal(refuel.y, -40);

    refuel.moveRefuel();

    assert.equal(refuel.x, 3);
    assert.equal(refuel.y, -39);
  })

  it('should not move past the screen horizontally', function() {
    let refuel = new Refuel(461);
    
    assert.equal(refuel.x, 461);

    refuel.moveRefuel();
    assert.equal(refuel.x, 459);

    refuel.x = -1;

    assert.equal(refuel.x, -1);
    refuel.moveRefuel();
    assert.equal(refuel.x, 1)
  })

  it('should cease to exist if it passes canvas bottom', function() {
    let refuel = new Refuel();

    refuel.refuelExists = true;

    refuel.checkRefuelY();
    refuel.y = 501;
    refuel.checkRefuelY();
    assert.equal(refuel.refuelExists, false);
  })

})




