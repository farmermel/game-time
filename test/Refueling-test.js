const { assert } = require('chai');
const Refuel = require('../lib/Refueling.js');

describe('Refuel', function() {
  let refuel;
  let canvasWidth = 750;

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
    let refuel = new Refuel(canvasWidth - 39);
    
    assert.equal(refuel.x, canvasWidth - 39);

    refuel.moveRefuel();
    assert.equal(refuel.x, canvasWidth - 41);

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