class Planet {
  constructor(width = 40, height = 40) {
    let planetPath = this.planetPathway();

    this.x = planetPath.x;
    // this.y = planetPath.y;
    this.y = -50;

    this.dy = .8;
    this.width = width;
    this.height = height;
    this.imgsrc = this.getPlanetSource();
    this.planetFriction = .97;
  }

  // pull into block class
  drawPlanets(ctx) {
    let img = new Image();
    
    img.src = this.imgsrc;
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
  }

  oppositeBounce(ufo) {
    // if (upArrow === true) {
    //   this.dy = 0;
    // }
    if (ufo.planetCollision) {
      this.dy = 5;
    }
    //apply an opposite gravity force until dy = 1
  }

  makePlanetFriction(upArrow) {
    if (upArrow === true && this.dy > 0.5) {
      this.dy *= this.planetFriction
    }
  }

  // pull into block class?
  movePlanets() {
    this.y += this.dy;
  }

  planetPathway() {
    let planetPath = {
      x: 1,
      y: -50
    };
    let randomX = Math.floor((Math.random() * (150 - 70)) + 70);
    
    if (randomX % 4 === 0) {
      planetPath.x += randomX;
    } else {
      planetPath.x -= randomX;
    }
    if (planetPath.x > 460 || planetPath.x < 0) {
      planetPath.x = Math.floor(Math.random() * 460);
    }
    return planetPath;
  }

  getPlanetSource() {
    let planetSrcImg = {};
    let planetSrc = ['../images/mars.svg', 
      '../images/jupiter.svg', 
      '../images/moon.svg', 
      '../images/saturn.svg', 
      '../images/coolplanet.svg', 
      '../images/earth.svg'];
    let planetIndex = Math.floor(Math.random() * 6);

    planetSrcImg.arrayVal = planetSrc[planetIndex];
    return planetSrcImg.arrayVal;
  }

  checkPlanetSize(level) {
    let planetSizes = {}

    if (level === 0) {
      planetSizes.width = 40;
      planetSizes.height = 40;
    } else if (level === 1) {
      planetSizes.width = 30;
      planetSizes.height = 30;
    } return planetSizes;
  }

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