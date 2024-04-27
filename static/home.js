const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight / 2;

let frameNumberBoy1 = 1;
let frameNumberBoy2 = 5;
let frameNumberBoy3 = 3;

const boy = {
  x: innerWidth - innerWidth / 2 - 450,
  y: canvas.height - 430,
  speed: 8,
  w: 200,
  h: 300,
  moving: false,
  dx: 0,
};

const girl1 = {
  x: boy.x + 180,
  y: canvas.height - 400,
  speed: 5,
  w: 170,
  h: 260,
  moving: false,
  dx: 0,
};

const girl2 = {
  x: girl1.x + 170,
  y: canvas.height - 390,
  speed: 5,
  w: 150,
  h: 240,
  moving: false,
  dx: 0,
};

const boy2 = {
  x: girl2.x + 150,
  y: canvas.height - 410,
  speed: 8,
  w: 160,
  h: 280,
  moving: false,
  dx: 0,
};

const girl3 = {
  x: boy2.x + 160,
  y: canvas.height - 400,
  speed: 5,
  w: 140,
  h: 260,
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

/////

let jumpHeight = 10; // Adjust this value to control the maximum height of the jump
let jumpSpeed = 0.9; // Adjust this value to control the speed of the jump
let jumpTime = 0; // Initialize jump time
/////

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

  // if (frameNumberBoy2 == 2) {
  //   $(".fun").css({
  //     left: `${girl2.x + 50}px`,
  //     top: `${girl2.y + frameNumberBoy2 + 680}px`,
  //   });
  // } else
  if (frameNumberBoy2 == 4 || frameNumberBoy2 == 5) {
    $(".fun").css({
      left: `${girl2.x + 50}px`,
      top: `${girl2.y - frameNumberBoy2 + 680}px`,
    });
  } else if (
    frameNumberBoy2 == 7 ||
    frameNumberBoy2 == 8 ||
    frameNumberBoy2 == 9
  ) {
    $(".fun").css({
      left: `${girl2.x + 50}px`,
      top: `${girl2.y + frameNumberBoy2 + 680}px`,
    });
  }
}

animate();

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
