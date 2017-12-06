class Refuel {
  constructor(x = 1) {
    this.x = x;
    this.y = -40;
    this.velocityX = 2;
    this.velocityY = 1;
    this.width = 40;
    this.height = 40;
    this.refuelExists = false;
  }

  drawRefuel(ctx) {
    let img = new Image();

    img.src = 'images/satellite.svg';
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
  }

  moveRefuel() {
    if (this.x < 0 || this.x > 460) {
      this.velocityX = -this.velocityX;
    }
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  checkRefuelY() {
    if (this.y > 500) {
      this.refuelExists = false;
      this.x = 1;
      this.y = 0;
    }
  }
}

module.exports = Refuel;