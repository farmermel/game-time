const Planet = require('./Planet.js');

class Sun extends Planet {
  constructor(width, height) {
    super(width, height);
    this.imgsrc = '../images/sun.svg';
    this.sunExists = false;
  } 
}

module.exports = Sun;