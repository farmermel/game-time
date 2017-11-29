const Block = require('./Block.js');

class Planet extends Block {
  constructor() {
    super();
    // this.planetsArray = [];
  }

  draw(ctx) {
    let img = new Image();
    img.src = '../images/planet1.png';
    return super.draw(ctx, img, 30, 30);
  }

  // generatePlanets() {
    
  //   for (let i = 0; i < 20; i++) {
  //     let planet = new Planet;
  //     this.planetsArray.push(planet);
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