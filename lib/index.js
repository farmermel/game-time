// import { Block } from 'Block';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let x = 10;
let y = 10;

var img = new Image();
img.addEventListener('load', function() {
  ctx.drawImage(img, 200, 200, 20, 20);
  animate();
}, false);
img.src = '/images/planet1.png';

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  ctx.drawImage(img, x, y++, 20, 20);
}

// animate();
