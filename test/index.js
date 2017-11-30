const { assert } = require('chai');
const Planet = require('../lib/Planet');
const Ufo = require('../lib/Ufo');


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
    planet.move();
    assert.equal(planet.x, 5);
    assert.equal(planet.y, 11);
  });
});

describe.only('Ufo', function() {

  it('should be a function', function() {
    const ufo = new Ufo();
    assert.equal(true, true);
  });

  it('should default to center bottom of canvas', function() {
    const ufo = new Ufo();

    assert.equal(ufo.x, 250);
    assert.equal(ufo.y, 460);
  })

  it('should be able to move left', function() {
    const ufo = new Ufo();

    assert.equal(ufo.x, 250);
    ufo.moveLeft;
    assert.equal(ufo.x, 248);

  });




});