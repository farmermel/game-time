const { assert } = require('chai');
const Game = require('../lib/Game.js');

describe('Game', function() {
  let game;

  beforeEach(function(){
    game = new Game();
  });

  it('should have default states', function() {
    assert.deepEqual(game.planetsArray, []);
    assert.equal(game.scoreIncrement, 10);
    assert.equal(game.score, 0);
    assert.equal(game.level, 0);
    assert.equal(game.planetsGenerated, 0);
    assert.equal(game.upArrowPressed, false);
    assert.equal(game.levelChange, false);
    assert.equal(game.loss, false);
  })

  it('should change level on levelup', function() {
    assert.equal(game.level, 0);
    game.changeLevelState();
    assert.equal(game.level, 0);

    game.score = 1100;
    game.changeLevelState();

    assert.equal(game.level, 1);
  });

  it('should generate refueling station every 10 planets', function() {
    game.planetsGenerated = 9;
    game.checkForRefuel();
    assert.equal(game.refuel.refuelExists, false);

    game.planetsGenerated = 10;
    game.checkForRefuel();
    assert.equal(game.refuel.refuelExists, true);
  });

  it('should change level after 1000 points', function() {
    game.score = 900;
    game.changeLevelState();
    assert.equal(game.level, 0);

    game.score = 1000;
    game.changeLevelState();
    assert.equal(game.level, 1);
  });

  it('should replace bottom on level change', function() {
    game.ufo.removeBottom = true;
    game.level = 0;
    game.score = 1100;
    game.changeLevelState();

    assert.equal(game.ufo.removeBottom, false);
  });

  it('should calculate the score on planet collision', function() {
    game.ufo.planetCollision = false;
    game.calculateScore();
    assert.equal(game.score, 0);

    game.ufo.planetCollision = true;
    game.calculateScore();
    assert.equal(game.score, 10);
  });

  it('should double the score on refueling station collision', function() {
    game.score = 10;
    game.ufo.refuelCollision = false;
    game.calculateScore();
    assert.equal(game.score, 10);

    game.ufo.refuelCollision = true;
    game.calculateScore();
    assert.equal(game.score, 20);
  });

  it('should decrease the score on sun collision', function() {
    game.score = 10;
    game.ufo.sunCollision = false;
    game.calculateScore();
    assert.equal(game.score, 10);

    game.ufo.sunCollision = true;
    game.calculateScore();
    assert.equal(game.score, 0);
  });

  it('should initiate a loss when ufo goes off canvas', function() {
    game.ufo.y = 500;
    game.checkLoss();
    assert.equal(game.loss, false);

    game.ufo.y = 550;
    game.checkLoss();
    assert.equal(game.loss, true);
  });

});