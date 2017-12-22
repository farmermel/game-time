/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);

	const ctx = $("#game")[0].getContext('2d');
	const $playerScore = $('#score-num');
	const $startScreen = $('.start');
	const $playScreen = $('.game-wrap');
	const $lossScreen = $('.lose');
	const $finalScore = $('#score');
	const $titleScreen = $('.title-wrap');
	const $levelChange = $('.level-change');

	let game = new Game();

	$(document).ready(function () {
	  $titleScreen.css('display', 'block');
	  setTimeout(function () {
	    $titleScreen.css('display', 'none');
	    $startScreen.css('display', 'flex');
	  }, 1500);
	});

	$(document).on('click', '.start-button', gamePlaying);

	$(document).on('click', '.restart-button', restartGamePlaying);

	$(document).on('keydown', checkKey);

	$(document).on('keyup', checkKeyVelocity);

	function checkKey(e) {
	  e = e || window.event;
	  //up arrow
	  if (e.keyCode == '38') {
	    game.checkKeyFunctionality('38');
	    // left arrow
	  } else if (e.keyCode == '37') {
	    game.checkKeyFunctionality('37');
	    // right arrow
	  } else if (e.keyCode == '39') {
	    game.checkKeyFunctionality('39');
	  }
	}

	function checkKeyVelocity(e) {
	  e = e || window.event;
	  //up arrow
	  if (e.keyCode == '38') {
	    // left arrow
	  } else if (e.keyCode == '37') {
	    game.resetVelocityX('37');
	    // right arrow
	  } else if (e.keyCode == '39') {
	    game.resetVelocityX('39');
	  }
	}

	$playerScore.text(0);

	function animate() {
	  ctx.clearRect(0, 0, innerWidth, innerHeight);
	  game.onPlay(ctx, $levelChange);
	  updateScore();
	  game.generatePlanets();
	  game.checkLoss();
	  displayLevelChange();
	  if (game.loss) {
	    ctx.clearRect(0, -500, innerWidth, innerHeight);
	    onLoss();
	    return;
	  }
	  requestAnimationFrame(animate);
	}

	function onLoss() {
	  $finalScore.text(game.score);
	  if (game.loss) {
	    setTimeout(() => {
	      $playScreen.css('display', 'none');
	      $lossScreen.css('display', 'flex');
	    }, 1000);
	  }
	}

	function updateScore() {
	  $playerScore.text(game.score);
	}

	function displayLevelChange() {
	  if (game.levelChange) {
	    $levelChange.css('display', 'block');
	    setTimeout(function () {
	      $levelChange.css('display', 'none');
	      game.levelChange = false;
	    }, 2000);
	  }
	}

	function gamePlaying() {
	  animate();
	  $startScreen.css('display', 'none');
	  $playScreen.css('display', 'block');
	}

	function restartGamePlaying() {
	  game = new Game();
	  gamePlaying();
	  $lossScreen.css('display', 'none');
	  $playScreen.css('display', 'block');
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const Planet = __webpack_require__(2);
	const Ufo = __webpack_require__(4);
	const Refuel = __webpack_require__(5);
	const Sun = __webpack_require__(6);
	const planet = new Planet();
	let sun = new Sun();
	let canvasWidth = 750;
	let canvasHeight = 500;

	class Game {
	  constructor() {
	    this.planetsArray = [];
	    this.scoreIncrement = 10;
	    this.score = 0;
	    this.level = 0;
	    this.planetsGenerated = 0;
	    this.ufo = new Ufo(250, 460);
	    this.refuel = new Refuel(1, -40, 40, 40);
	    this.upArrowPressed = false;
	    this.levelChange = false;
	    this.loss = false;
	  }

	  onPlay(ctx) {
	    this.ufo.draw(ctx, this.ufo.imgsrc);
	    this.ufo.makeGravity();
	    this.ufo.makeFriction();
	    this.ufo.arrowUp();
	    this.movePlanets();
	    this.checkCollision();
	    this.changeLevelState();
	    this.generateRefuel(ctx);
	    this.generateSun(ctx);
	    this.planetsArray.forEach(planet => {
	      planet.draw(ctx, planet.imgsrc);
	      planet.makePlanetFriction(this.upArrowPressed);
	    });
	  }

	  checkLoss() {
	    if (this.ufo.y > canvasHeight + 40) {
	      this.loss = true;
	      this.ufo.y = canvasHeight + 50;
	      this.level = 0;
	    }
	  }

	  resetStates() {
	    this.ufo.velocityY = 0;
	    this.ufo.x = canvasWidth / 2;
	    this.ufo.removeBottom = false;
	    this.scoreIncrement = 10;
	    this.planetsArray = [];
	    this.refuel.refuelExists = false;
	  }

	  changeLevelState() {
	    if (this.score >= 1000 && this.level === 0) {
	      this.level = 1;
	      this.levelChange = true;
	      this.upArrowPressed = false;
	      this.resetStates();
	    }
	  }

	  checkKeyFunctionality(string) {
	    this.checkBottom();
	    if (string == '38' && this.upArrowPressed === false) {
	      this.ufo.bounceUp();
	    } else if (string == '37') {
	      this.ufo.moveLeft();
	    } else if (string == '39') {
	      this.ufo.moveRight();
	    }
	  }

	  checkBottom() {
	    if (this.upArrowPressed === true) {
	      this.ufo.removeBottom = true;
	    }
	  }

	  resetVelocityX(string) {
	    //left arrow
	    if (string == '37') {
	      if (this.ufo.x < 10) {
	        this.ufo.x = 0;
	        this.ufo.velocityX = 0;
	        this.ufo.x = 0;
	      } else {
	        this.ufo.velocityX = -0.5;
	      }
	      // right arrow
	    } else if (string == '39') {
	      if (this.ufo.x > canvasWidth - 50) {
	        this.ufo.velocityX = 0;
	        this.ufo.x = canvasWidth - 40;
	      } else {
	        this.ufo.velocityX = 0.5;
	      }
	    }
	  }

	  checkCollision() {
	    this.planetsArray = this.ufo.checkForPlanetCollision(this.planetsArray);
	    this.refuel = this.ufo.checkForRefuelCollision(this.refuel);
	    this.calculateScore();
	  }

	  generatePlanets() {
	    let lastPlanet = this.planetsArray[this.planetsArray.length - 1];

	    if (!lastPlanet || lastPlanet.y > 50) {
	      let level = this.level;
	      var planetSizes = planet.checkPlanetSize(level);
	      let newPlanet = new Planet(planetSizes.width, planetSizes.height);

	      this.planetsArray.push(newPlanet);
	      this.removePlanets();
	      this.planetsGenerated++;
	      this.checkForRefuel();
	      this.checkForSun();
	    }
	  }

	  checkForRefuel() {
	    if (this.planetsGenerated === 10) {
	      this.planetsGenerated = 0;
	      this.refuel.refuelExists = true;
	    }
	  }

	  generateRefuel(ctx) {
	    if (this.refuel.refuelExists) {
	      this.refuel.moveRefuel();
	      this.refuel.draw(ctx, this.refuel.imgsrc);
	      this.refuel.checkRefuelY();
	    }
	  }

	  checkForSun() {
	    if (this.planetsGenerated == 2) {
	      sun.sunExists = true;
	    }
	  }

	  generateSun() {
	    if (sun.sunExists) {
	      let sun1 = new Sun();

	      this.planetsArray.push(sun1);
	      sun.sunExists = false;
	    }
	  }

	  removePlanets() {
	    this.planetsArray.forEach((planet, index) => {
	      if (planet.y > canvasHeight - 40) {
	        this.planetsArray.splice(index, 1);
	      }
	    });
	  }

	  movePlanets() {
	    this.planetsArray.forEach(function (planet) {
	      planet.move();
	    });
	  }

	  calculateScore() {
	    if (this.ufo.planetCollision) {
	      this.upArrowPressed = true;
	      this.planetsBounceDown();
	      this.score += this.scoreIncrement;
	      this.scoreIncrement += 10;
	      this.ufo.planetCollision = false;
	    } else if (this.ufo.refuelCollision) {
	      this.score *= 2;
	      this.ufo.refuelCollision = false;
	      this.planetsBounceDown();
	    } else if (this.ufo.sunCollision) {
	      this.planetsBounceDown();
	      this.score -= this.scoreIncrement;
	      this.ufo.sunCollision = false;
	    }
	  }

	  planetsBounceDown() {
	    this.planetsArray.forEach(planet => {
	      planet.oppositeBounce(this.ufo);
	    });
	  }

	}

	module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	const Block = __webpack_require__(3);
	let canvasWidth = 750;

	class Planet extends Block {
	  constructor(width = 40, height = 40, dy = 0.8) {
	    super(width, height, dy);
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
	    if (ufo.planetCollision) {
	      this.dy = 5.5;
	    }
	  }

	  makePlanetFriction(upArrow) {
	    if (upArrow === true && this.dy > 0.5) {
	      this.dy *= this.planetFriction;
	    }
	  }

	  planetPathway() {
	    let planetPath = 1;
	    let randomX = Math.floor(Math.random() * (130 - 70) + 70);

	    if (randomX % 4 === 0) {
	      planetPath += randomX;
	    } else {
	      planetPath -= randomX;
	    }
	    if (planetPath > canvasWidth - 40 || planetPath < 0) {
	      planetPath = Math.floor(Math.random() * (canvasWidth - 100) + 100);
	    }
	    return planetPath;
	  }

	  getPlanetSource() {
	    let planetSrcImg = {};
	    let planetSrc = ['../images/mars.svg', '../images/jupiter.svg', '../images/moon.svg', '../images/saturn.svg', '../images/coolplanet.svg', '../images/earth.svg'];
	    let planetIndex = Math.floor(Math.random() * 6);

	    planetSrcImg.arrayVal = planetSrc[planetIndex];
	    return planetSrcImg.arrayVal;
	  }

	  checkPlanetSize(level) {
	    let planetSizes = {};

	    if (level === 0) {
	      planetSizes.width = 40;
	      planetSizes.height = 40;
	    } else if (level === 1) {
	      planetSizes.width = 30;
	      planetSizes.height = 30;
	    }return planetSizes;
	  }
	}

	module.exports = Planet;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	const Block = __webpack_require__(3);

	let canvasWidth = 750;
	let canvasHeight = 500;

	class Ufo extends Block {
	  constructor(x = 250, y = 460) {
	    super(x, y);
	    this.x = x;
	    this.y = y;
	    this.velocityX = 0;
	    this.velocityY = 0;
	    this.width = 40;
	    this.height = 40;
	    this.gravity = 0.095;
	    this.friction = .98;
	    this.imgsrc = '../images/ufo.svg';
	    this.removeBottom = false;
	    this.planetCollision = false;
	    this.refuelCollision = false;
	    this.sunCollision = false;
	  }

	  makeFriction() {
	    this.velocityX *= this.friction;
	    if (this.velocityX > 0) {
	      this.x += this.velocityX;
	    } else if (this.velocityX < 0) {
	      this.x += this.velocityX;
	    }
	  }

	  moveRight() {
	    this.velocityX += 1.5;
	    this.x += this.velocityX;
	    if (this.x > canvasWidth - 40) {
	      this.x = canvasWidth - 40;
	      this.velocityX = 0;
	    }
	  }

	  moveLeft() {
	    this.velocityX -= 1.5;
	    this.x += this.velocityX;
	    if (this.x < 0) {
	      this.x = 0;
	      this.velocityX = 0;
	    }
	  }

	  arrowUp() {
	    if (this.removeBottom === false) {
	      this.rockBottom();
	    }
	  }

	  rockBottom() {
	    if (this.y > canvasHeight - 40) {
	      this.y = canvasHeight - 40;
	    }
	  }

	  //figure out wtf is going on with our ufo width

	  // this.collisionParams = {
	  //   ufoXLeft: this.x - this.width;
	  //   let ufoXRight: this.x + this.width;
	  //   let ufoYTop: this.y - this.height;
	  //   let ufoYBottom: this.y + this.height;
	  // }

	  checkForPlanetCollision(planetsArray) {
	    let ufoXLeft = this.x - 30;
	    let ufoXRight = this.x + 30;
	    let ufoYTop = this.y - 30;
	    let ufoYBottom = this.y + 30;

	    planetsArray.forEach((planet, index) => {
	      if (ufoXLeft < planet.x && planet.x < ufoXRight && ufoYBottom > planet.y && planet.y > ufoYTop) {
	        this.bounceUp();
	        planetsArray.splice(index, 1);
	        if (planet.imgsrc === '../images/sun.svg') {
	          this.sunCollision = true;
	        } else {
	          this.planetCollision = true;
	        }
	      }
	    });
	    return planetsArray;
	  }

	  checkForRefuelCollision(refuel) {
	    let ufoXLeft = this.x - 30;
	    let ufoXRight = this.x + 30;
	    let ufoYTop = this.y - 30;
	    let ufoYBottom = this.y + 30;

	    if (ufoXLeft < refuel.x && refuel.x < ufoXRight && ufoYBottom > refuel.y && refuel.y > ufoYTop) {
	      this.bounceUp();
	      refuel.refuelExists = false;
	      refuel.x = 1;
	      refuel.y = 0;
	      this.refuelCollision = true;
	    }return refuel;
	  }

	  makeGravity() {
	    this.velocityY += this.gravity;
	    this.y += this.velocityY;
	    if (this.y < 0) {
	      this.y = 0;
	      this.velocityY = 0;
	    }
	  }

	  bounceUp() {
	    this.velocityY = -5;
	  }
	}

	module.exports = Ufo;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	const Block = __webpack_require__(3);

	let canvasWidth = 750;
	let canvasHeight = 500;

	class Refuel extends Block {
	  constructor(x = 1, y = -40, width = 40, height = 40) {
	    super(x, y, width, height);
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	const Planet = __webpack_require__(2);

	class Sun extends Planet {
	  constructor(width, height) {
	    super(width, height);
	    this.imgsrc = '../images/sun.svg';
	    this.sunExists = false;
	  }
	}

	module.exports = Sun;

/***/ })
/******/ ]);