let canvasWidth = 750;

class Planet {
  constructor(width = 40, height = 40) {
    this.x = this.planetPathway();
    this.y = -50;
    this.dy = .8;
    this.width = width;
    this.height = height;
    this.imgsrc = this.getPlanetSource();
    this.planetFriction = .97;
  }

  drawPlanets(ctx) {
    let img = new Image();
    
    img.src = this.imgsrc;
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
  }

  oppositeBounce(ufo) {
    if (ufo.planetCollision) {
      this.dy = 5.5;
    }
  }

  makePlanetFriction(upArrow) {
    if (upArrow === true && this.dy > 0.5) {
      this.dy *= this.planetFriction
    }
  }

  movePlanets() {
    this.y += this.dy;
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