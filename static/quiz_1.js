let currentURL = window.location.href;
let quizID = parseInt(currentURL.split("/").pop());
let progressBarLen = 600;

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

canvas2.width = innerWidth;
canvas2.height = innerHeight;

const dinosaur = {
  x: 0,
  y: 0,
  speed: 20,
  w: 100,
  h: 70,
  moving: false,
  dx: 0,
};

$(document).ready(function () {
  // Add a click event listener to the "next" button using jQuery
  $("#submit").on("click", function (event) {
    event.preventDefault();

    let selectedOption = $('input[name="options"]:checked');

    // If no option is checked, display a message or handle the validation as needed
    if (selectedOption.length === 0) {
      $(".show-message").show();
      return;
    }

    if (selectedOption.length > 0) {
      $(this).prop("disabled", true);
      $(".show-message").hide();
      let selectedValue = selectedOption.val();
      console.log(selectedValue);

      let messageSpan = selectedOption
        .closest(".option")
        .find(".show-correct, .show-wrong");

      if (quiz.correctAnswer == selectedValue) {
        console.log("correct");

        ///// show correct message
        messageSpan.filter(".show-correct").show();
        messageSpan.filter(".show-wrong").hide();

        ///  animation
        if (!rectPushed)
          for (let i = 0; i < 50; i++) {
            const angle = (Math.PI * 2) / 50;
            const x = canvas2.width / 2;
            const y = 100;

            // const color = `hsl(${Math.random() * 360}, 70%, 70%)`;

            const velocity = {
              x: Math.cos(angle * i) * Math.random() * 15,
              y: Math.sin(angle * i) * Math.random() * 15,
            };

            rectangularArray.push(new Rectangular(x, y, velocity));
            rectPushed = true;
          }
      } else {
        console.log("wrong!");
        /// show wrong message
        messageSpan.filter(".show-wrong").show();
        messageSpan.filter(".show-correct").hide();
      }
    } else {
      console.log("No option selected.");
    }
  });

  $("#nextButton").on("click", function (event) {
    event.preventDefault();

    // If no option is checked, display a message or handle the validation as needed
    let selectedOption = $('input[name="options"]:checked');
    // if (selectedOption.length === 0) {
    //   $(".show-message").show();
    //   return;
    // }

    // Extract the quiz ID from the current URL
    let selectedValue = selectedOption.val();
    $.ajax({
      type: "POST",
      url: `/quiz_1/${id}`,
      data: JSON.stringify(selectedValue),
      contentType: "application/json",
      success: function (response) {
        console.log(response);
        if (response.correctAnswer == selectedValue) {
        } else {
        }
      },
      error: function (error) {
        // Handle the error response here
        console.error(error);
      },
    });

    // let currentURL = window.location.href;
    // let quizID = parseInt(currentURL.split("/").pop());

    // Calculate the ID for the next quiz
    let nextQuizID = quizID + 1;

    // Navigate to the next page
    if (nextQuizID <= 5) {
      window.location.href = `/quiz_1/${nextQuizID}`;
    } else {
      window.location.href = `/quiz_2/${nextQuizID}`;
    }
  });

  // update progress bar

  $(".percentage").css("width", `${(509 / 15) * quizID}px`);

  dinosaur.x = $(".percentage").width() - 10;

  $(".progress-number").text(`<${quizID}/15>`);
});

///
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 70;

let frameNumber = 1;

let lastRenderTime = 0;
let speedPerSec = 15;

let img = new Image();

///

const rectangularArray = [];
let rectPushed = false;

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const gravity = 0.5;
const friction = 0.99;

class Rectangular {
  constructor(x, y, velocity) {
    // this.x = getRandomNum(-50, canvas2.width + 50);
    // this.y = getRandomNum(-50, -10);
    this.alpha = 1;
    this.x = x;
    this.y = y;

    this.h = innerWidth < 825 ? getRandomNum(5, 8) : getRandomNum(9, 13);
    this.w = innerWidth < 825 ? getRandomNum(5, 8) : getRandomNum(9, 13);
    this.dx = innerWidth < 825 ? getRandomNum(-2, 3) : getRandomNum(-5, 5);
    this.dy = innerWidth < 825 ? getRandomNum(1, 3) : getRandomNum(2, 5);
    this.color = `hsl(${Math.random() * 360}, 70%, 70%)`;

    ///
    this.velocity = velocity;
  }

  draw() {
    // ctx2.beginPath();
    // ctx2.fillStyle = this.color;
    // ctx2.fillRect(this.x, this.y, this.w, this.h);
    // ctx2.fill();
    // ctx2.closePath();

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
    // this.draw();
    // this.x += this.dx;
    // this.y += this.dy;

    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}
///

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
  // draw small rectangulars
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  rectangularArray.forEach((rect, index) => {
    rect.alpha -= 0.015;

    if (rect.alpha >= 0) {
      rect.update();
    } else {
      rectangularArray.splice(index, 1);
    }
  });
}

animate();

function handleMove() {
  if (frameNumber < 10) {
    frameNumber++;
  } else {
    frameNumber = 1;
  }
}
