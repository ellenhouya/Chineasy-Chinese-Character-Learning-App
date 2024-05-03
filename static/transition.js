const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = 2 * innerHeight;

let frameNumber = 1;

let layer = document.querySelector(".layer");

let layerSpeed = 0;
layer.style.left = 0;

const boySheetWidth = 128;
const boySheetHeight = 192;

const boyImg = new Image();
boyImg.src = "/static/images/sprites/run/run_001.png";

let lastRenderTime = 0;

let speedPerSec = 50;
let animationId;
let scrolling = false;
let wheelEventTriggered = false;

// Preload all the images before starting the animation
const images = [];
for (let i = 1; i <= 42; i++) {
  let paddedFrameNumber = String(i).padStart(3, "0");
  let img = new Image();
  img.src = `/static/images/sprites/run/run_${paddedFrameNumber}.png`;
  images.push(img);
}

const boy = {
  x: 10,
  y: innerHeight - 400,
  w: 143,
  h: 216,
};

function animate(currentTime) {
  layerSpeed += 6;

  animationId = requestAnimationFrame(animate);

  const secondsSinceLastRenderTime = (currentTime - lastRenderTime) / 1000;

  if (secondsSinceLastRenderTime < 1 / speedPerSec) return;

  lastRenderTime = currentTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  update();

  draw();
}

animate();

function draw() {
  ctx.drawImage(images[boy.frameNumber], boy.x, boy.y, boy.w, boy.h);
}

function update() {
  // Update the boy's animation frame
  if (boy.frameNumber < 41) {
    // Adjusted condition
    boy.frameNumber++;
  } else {
    boy.frameNumber = 0;
  }

  layer.style.left = layerSpeed;

  if (layerSpeed > innerWidth / 2) {
    layer.style.left = innerWidth / 2;
  }
}
