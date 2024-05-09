const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight / 2;

let frameNumberBoy1 = 1;
let frameNumberBoy2 = 5;
let frameNumberBoy3 = 3;

const boy = {
  x:
    canvas.width > 1024
      ? innerWidth - innerWidth / 2 - 450
      : innerWidth - innerWidth / 2 - 350,
  y: canvas.height > 1229 ? canvas.height - 430 : canvas.height - 480,
  speed: 8,
  w: canvas.width > 1024 ? 200 : 150,
  h: canvas.height > 1229 ? 300 : 250,
  moving: false,
  dx: 0,
};

const girl1 = {
  x: canvas.width > 1024 ? boy.x + 180 : boy.x + 130,
  y: canvas.height > 1229 ? canvas.height - 400 : canvas.height - 450,
  speed: 5,
  w: canvas.width > 1024 ? 170 : 120,
  h: canvas.width > 1024 ? 260 : 210,
  moving: false,
  dx: 0,
};

const girl2 = {
  x: canvas.width > 1024 ? girl1.x + 170 : girl1.x + 120,
  y: canvas.height > 1229 ? canvas.height - 390 : canvas.height - 440,
  speed: 5,
  w: canvas.width > 1024 ? 150 : 100,
  h: canvas.width > 1024 ? 240 : 190,
  moving: false,
  dx: 0,
};

const boy2 = {
  x: canvas.width > 1024 ? girl2.x + 150 : girl2.x + 100,
  y: canvas.height > 1229 ? canvas.height - 410 : canvas.height - 460,
  speed: 8,
  w: canvas.width > 1024 ? 160 : 110,
  h: canvas.width > 1024 ? 280 : 230,
  moving: false,
  dx: 0,
};

const girl3 = {
  x: canvas.width > 1024 ? boy2.x + 160 : boy2.x + 110,
  y: canvas.height > 1229 ? canvas.height - 400 : canvas.height - 450,
  speed: 5,
  w: canvas.width > 1024 ? 140 : 90,
  h: canvas.width > 1024 ? 260 : 210,
  moving: false,
  dx: 0,
};

let lastRenderTime = 0;
let speedPerSec = 15;

// Preload all the images before starting the animation
const images = [];
for (let i = 1; i <= 9; i++) {
  let paddedFrameNumber = String(i).padStart(3, "0");
  let img = new Image();
  img.src = `/static/images/sprites/boy/idle/${paddedFrameNumber}.png`;
  images.push(img);
}

const images2 = [];
for (let i = 1; i <= 9; i++) {
  let paddedFrameNumber = String(i).padStart(3, "0");
  let img = new Image();
  img.src = `/static/images/sprites/boy/summer_fun/1_summer_Fun_${paddedFrameNumber}.png`;
  images2.push(img);
}

const images3 = [];
for (let i = 1; i <= 9; i++) {
  let paddedFrameNumber = String(i).padStart(3, "0");
  let img = new Image();
  img.src = `/static/images/sprites/girl/summer_fun/2_summer_Fun_${paddedFrameNumber}.png`;
  images3.push(img);
}

const images4 = [];
for (let i = 1; i <= 9; i++) {
  let paddedFrameNumber = String(i).padStart(3, "0");
  let img = new Image();
  img.src = `/static/images/sprites/girl/jump/3_winter_Jump_${paddedFrameNumber}.png`;
  images4.push(img);
}

const images5 = [];
for (let i = 1; i <= 9; i++) {
  let paddedFrameNumber = String(i).padStart(3, "0");
  let img = new Image();
  img.src = `/static/images/sprites/girl/run/1_autumn_Run_${paddedFrameNumber}.png`;
  images5.push(img);
}

let counter = 0;

let jumpHeight = 10;
let jumpSpeed = 0.9;
let jumpTime = 0;

function animate(currentTime) {
  counter++;
  requestAnimationFrame(animate);

  const secondsSinceLastRenderTime = (currentTime - lastRenderTime) / 1000;

  if (secondsSinceLastRenderTime < 1 / speedPerSec) return;

  lastRenderTime = currentTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  handleMove();

  ctx.drawImage(
    images[frameNumberBoy1 - 1],
    girl1.x,
    girl1.y,
    girl1.w,
    girl1.h
  );

  ctx.drawImage(images3[frameNumberBoy2 - 1], boy.x, boy.y, boy.w, boy.h);

  ctx.drawImage(
    images4[frameNumberBoy2 - 1],
    girl2.x,
    girl2.y,
    girl2.w,
    girl2.h
  );

  ctx.drawImage(images2[frameNumberBoy2 - 1], boy2.x, boy2.y, boy2.w, boy2.h);

  ctx.drawImage(
    images5[frameNumberBoy2 - 1],
    girl3.x,
    girl3.y,
    girl3.w,
    girl3.h
  );

  jumpTime += jumpSpeed;
}

function handleMove() {
  // Update frame number for boy1
  if (frameNumberBoy1 < 9) {
    frameNumberBoy1++;
  } else {
    frameNumberBoy1 = 1;
  }

  if (frameNumberBoy2 < 9) {
    frameNumberBoy2++;
  } else {
    frameNumberBoy2 = 1;
  }

  if (frameNumberBoy2 == 4 || frameNumberBoy2 == 5) {
    $(".fun").css({
      left: `${girl2.x + 50}px`,
      top: `${
        canvas.width > 1024
          ? girl2.y - frameNumberBoy2 + 680
          : girl2.y - frameNumberBoy2 + 750
      }px`,
    });
  } else if (
    frameNumberBoy2 == 7 ||
    frameNumberBoy2 == 8 ||
    frameNumberBoy2 == 9
  ) {
    $(".fun").css({
      left: `${girl2.x + 50}px`,
      top: `${
        canvas.width > 1024
          ? girl2.y + frameNumberBoy2 + 680
          : girl2.y + frameNumberBoy2 + 750
      }px`,
    });
  }
}

$(document).ready(function () {
  animate();

  $(".test-con").click(function () {
    resetData();
  });
});

let heading_eng = "Chineasy";
let i = 0;
function typing_eng() {
  if (i < heading_eng.length) {
    document.querySelector(".eng").textContent += heading_eng.charAt(i);
    i++;
    setTimeout(typing_eng, 150);
  }
}

typing_eng();
