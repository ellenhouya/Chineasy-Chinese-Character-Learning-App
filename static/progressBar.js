let currentURL = window.location.href;
let quizID = parseInt(currentURL.split("/").pop());

let totalQuizzes = 15;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 70;

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

canvas2.width = innerWidth;
canvas2.height = innerHeight;

const rectangleArray = [];

const gravity = 0.5;
const friction = 0.99;

let frameNumber = 1;

let lastRenderTime = 0;
let speedPerSec = 15;

let img = new Image();

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const dinosaur = {
  x: 0,
  y: 0,
  speed: 20,
  w: 100,
  h: 70,
  moving: false,
  dx: 0,
};

class Rectangle {
  constructor(x, y, velocity) {
    this.alpha = 1;
    this.x = x;
    this.y = y;

    this.h = innerWidth < 825 ? getRandomNum(5, 8) : getRandomNum(9, 13);
    this.w = innerWidth < 825 ? getRandomNum(5, 8) : getRandomNum(9, 13);
    this.dx = innerWidth < 825 ? getRandomNum(-2, 3) : getRandomNum(-5, 5);
    this.dy = innerWidth < 825 ? getRandomNum(1, 3) : getRandomNum(2, 5);
    this.color = `hsl(${Math.random() * 360}, 70%, 70%)`;

    this.velocity = velocity;
  }

  draw() {
    ctx2.save();
    ctx2.globalAlpha = this.alpha;
    ctx2.beginPath();

    ctx2.fillStyle = this.color;
    ctx2.fillRect(this.x, this.y, this.w, this.h);
    ctx2.fill();
    ctx2.closePath();
    ctx2.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

// $(document).ready(function () {
$(".percentage").css("width", `${((canvas.width - 45) / 15) * quizID}px`);

dinosaur.x = $(".percentage").width() - 10;

// $(".progress-number").text(`< ${quizID} / 15 >`);

$(".question-input").val(quizID);
// });

function pushArrayImages() {
  for (let i = 0; i < 50; i++) {
    const angle = (Math.PI * 2) / 50;
    const x = canvas2.width / 2;
    const y = 100;

    const velocity = {
      x: Math.cos(angle * i) * Math.random() * 15,
      y: Math.sin(angle * i) * Math.random() * 15,
    };

    rectangleArray.push(new Rectangle(x, y, velocity));
  }
}

function clearCanvasRect() {
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
}

function updateRectangle() {
  rectangleArray.forEach((rect, index) => {
    rect.alpha -= 0.015;

    if (rect.alpha >= 0) {
      rect.update();
    } else {
      rectangleArray.splice(index, 1);
    }
  });
}

function animate(currentTime) {
  img.src = `/static/images/sprites/walk/Walk (${frameNumber}).png`;

  requestAnimationFrame(animate);

  const secondsSinceLastRenderTime = (currentTime - lastRenderTime) / 1000;

  if (secondsSinceLastRenderTime < 1 / speedPerSec) return;

  lastRenderTime = currentTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  handleMove();

  ctx.drawImage(img, dinosaur.x, dinosaur.y, dinosaur.w, dinosaur.h);

  // small rectangles
  // draw small rectangles

  clearCanvasRect();

  updateRectangle();
}

$(document).ready(function () {
  animate();

  $(`.q-link${quizID}`).css("background", "var(--accent)");
});

function handleMove() {
  if (frameNumber < 10) {
    frameNumber++;
  } else {
    frameNumber = 1;
  }
}

function updateCheckedAnswered() {
  console.log(id);

  $.ajax({
    type: "POST",
    url: `/updateCheckedAnswered/${id}`,
    contentType: "application/json",
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.error(error);
    },
  });
}

function updateAnswered() {
  $.ajax({
    type: "POST",
    url: `/updateAnswered/${id}`,
    contentType: "application/json",
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.error(error);
    },
  });
}

function renderQuestionStatus(quiz, checked) {
  console.log(quiz);

  if (quiz.userAnswer) {
    let userAnswerIndex = parseInt(quiz.userAnswer);
    let radioButton = document.getElementById(`option${userAnswerIndex}`);

    console.log(userAnswerIndex, radioButton);
    radioButton.checked = true;
  }
  // disable radio buttons
  if (checked == "Y") {
    $("input[type='radio']").not(this).prop("disabled", true);

    // render message accordingly
    $(".feedback-msg").each(function (index, msg) {
      let selectedOption = $('input[name="options"]:checked');
      let messageSpan = selectedOption
        .closest(".option")
        .find(".show-correct, .show-wrong");
      if (quiz.correctAnswer == quiz.userAnswer) {
        messageSpan.filter(".show-correct").show();
        messageSpan.filter(".show-wrong").hide();
      } else {
        messageSpan.filter(".show-wrong").show();
        messageSpan.filter(".show-correct").hide();
      }
    });
  }
}
