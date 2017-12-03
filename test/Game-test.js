const { assert } = require('chai');
const Game = require('../lib/Game.js');
const startScreen = require('../lib/index.js');

describe('Game', function() {
  let game;

  beforeEach(function(){
    game = new Game();
  });

  it('should load start screen first', function() {
    console.log(startScreen);
  })
})