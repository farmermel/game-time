const Block = require('./Block.js');

let canvasWidth = 750;
let canvasHeight = 500;

class Refuel extends Block {
  constructor(x = 1, y = -40, width = 40, height = 40) {
    super(x, y, width, height)
    this.x = x;
    this.y = -40;
    this.dx = 2;
    this.dy = 1;
    this.width = 40;
    this.height = 40;
    this.refuelExists = false;
    this.imgsrc = '../images/satellite.svg';
  }

  moveRefuel() {
    if (this.x < 0 || this.x > canvasWidth - 40) {
      this.dx = -this.dx;
    }
    this.move();
  }

  checkRefuelY() {
    if (this.y > canvasHeight) {
      this.refuelExists = false;
      this.x = 1;
      this.y = 0;
    }
  }
}

module.exports = Refuel;