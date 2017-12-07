const Block = require('./Block.js');
let canvasWidth = 750;

class Planet extends Block {
  constructor(width = 40, height = 40, dy = 0.8) {
    super(width, height, dy)
    this.x = this.planetPathway();
    this.y = -50;
    this.dx = 0;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.imgsrc = this.getPlanetSource();
    this.planetFriction = .97;
  }

  oppositeBounce(ufo) {
    // if (upArrow === true) {
    //   this.dy = 0;
    // }
    if (ufo.planetCollision) {
      this.dy = 5.5;
    }
    //apply an opposite gravity force until dy = 1
  }

  makePlanetFriction(upArrow) {
    if (upArrow === true && this.dy > 0.5) {
      this.dy *= this.planetFriction
    }
  }

  planetPathway() {
    let planetPath = 1;
    let randomX = Math.floor((Math.random() * (130 - 70)) + 70);
    
    if (randomX % 4 === 0) {
      planetPath += randomX;
    } else {
      planetPath -= randomX;
    }
    if (planetPath > canvasWidth - 40 || planetPath < 0) {
      planetPath = Math.floor((Math.random() * (canvasWidth - 100)) + 100);
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