class Block {
  constructor(x, y, width, height, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }

  draw(ctx, image) {
    let img = new Image();

    img.src = image;
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
}

module.exports = Block;