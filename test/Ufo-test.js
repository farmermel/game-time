const { assert } = require('chai');
const Ufo = require('../lib/Ufo');
const Planet = require('../lib/Planet');
const Refuel = require('../lib/Refueling.js');

describe('Ufo', function() {
  let ufo;
  let canvasWidth = 750;

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

    ufo = new Ufo(710, 460);

    assert.equal(ufo.x, canvasWidth - 40);
    assert.equal(ufo.y, 460);
    ufo.moveRight();
    ufo.makeGravity();
    ufo.rockBottom();
    assert.equal(ufo.x, canvasWidth - 40);
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
    refuel.x = 4,
    refuel.y = 10;

    ufo.checkForRefuelCollision(refuel);
    assert.equal(ufo.refuelCollision, false);

    ufo = new Ufo(4, 10);
    ufo.checkForRefuelCollision(refuel);
    assert.equal(ufo.refuelCollision, true);
  })
});


