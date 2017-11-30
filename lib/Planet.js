class Planet {
  constructor(x, y, imgsrc) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 1;
    //DUUUDE, WHY THE HELL IS DY DICTATING HOW FAR THEY DROP DOWN?!?!?!?!
    this.imgsrc = imgsrc;
    // this.img;
  }

  // get imgsrc() {
  //   let imgArray = ['../images/mars.svg', '../images/moon.svg', '../images/jupiter.svg']
  //   let index = Math.floor(Math.random()*2);
  //   let img = new Image();
  //   img.src = imgArray[index];
  //   this.img = img;
  // }

  draw(ctx) {
    let img = new Image();
    img.src = this.imgsrc;
    ctx.drawImage(img, this.x, this.y, 40, 40);
  }

  //are we drawing a planet or an image here? If we have trouble later interacting with planets this could be why

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  // generatePlanetLoc(ctx) {
  //   for (let i = 0; i < 4; i++) {
  //     let planet = new Planet(i*70, this.x);
  //     planet.move();
  //     this.planetsArray.push(planet);
  //     // planet.draw(ctx);
  //     console.log(planet)
  //   }
  // }

}


module.exports = Planet;



//class Planet extends Block {
// constructor() {
//   super();
//   this.img = get img() {
//     new Image();
//     return img.src = '../images/planet1.png';
//   }
// }

//Old code from when we were trying to extend Block
  // draw(ctx) {
  //   let img = new Image();
  //   img.src = '../images/planet1.png';
  //   // this.planetsArray.forEach((planet) => {
  //   //   console.log(this);
  //     return super.draw(ctx, img, 30, 30);
  //   // })
  // }

  // move() {
  //   this.x += this.dx;
  //   this.y += this.dy;
  // }

  // generatePlanetLoc(ctx) {
  //   for (let i = 0; i < 4; i++) {
  //     let planet = new Planet(i*70, this.x);
  //     planet.move();
  //     this.planetsArray.push(planet);
  //     // planet.draw(ctx);
  //     console.log(planet)
  //   }