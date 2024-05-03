let isElementDropped = false;
let xPosition;
let yPosition;

$(function () {
  $(".draggable").draggable({
    revert: (dropped) => {
      return !dropped && !isElementDropped;
    },
  });
  $(".droppable").droppable({
    over: function (event, ui) {
      $(this).css({
        backgroundColor: "rgb(255, 214, 77)",
        color: "#000",
      });
    },
    out: function (event, ui) {
      $(this).css({
        backgroundColor: "#e9e9e9",
      });
    },

    drop: function (event, ui) {
      let draggableClass = ui.draggable.attr("class").split(" ")[2];
      let draggableClass2 = ui.draggable.attr("class").split(" ")[3];

      // Extract the part after the hyphen (-) from the class names
      let draggableClassSuffix = draggableClass.split("-")[1];

      console.log(draggableClass2);
      console.log(draggableClassSuffix);

      // Disable draggable behavior for all elements
      isElementDropped = true;
      $(".draggable").draggable("disable");
      $(".show-message").hide();

      updateAnswered();
      updateCheckedAnswered();

      // save position
      snapToMiddle(ui.draggable, $(this));
      let left = ui.draggable.css("left");
      let top = ui.draggable.css("top");

      console.log(ui);
      console.log(left, top);

      // save the user's answer
      $.ajax({
        type: "POST",
        url: `/quiz_2/${id}`,
        data: JSON.stringify({
          draggableClassSuffix,
          left,
          top,
        }),
        contentType: "application/json",
        success: function (response) {
          console.log(response);
          if (response.correctAnswer == draggableClassSuffix) {
            console.log("correct");
            $(".droppable").css({
              backgroundColor: "green",
            });

            $(".feedback-correct").show();
            $(".feedback-wrong").hide();

            //  push images into rectangleArray
            pushArrayImages();
          } else {
            $(".droppable").css({
              backgroundColor: "red",
            });
            $(".dragged-image-meaning").text(
              `The image you dragged is "${draggableClass2.split("-")[1]}."`
            );
            $(".feedback-correct").hide();
            $(".feedback-wrong").show();
          }
        },
        error: function (error) {
          console.error(error);
        },
      });
    },
  });
});

function snapToMiddle(dragger, target) {
  let offset = target.offset();
  let topMove = (target.outerHeight(true) - dragger.outerHeight(true)) / 2;
  let leftMove = (target.outerWidth(true) - dragger.outerWidth(true)) / 2;

  dragger.offset({ top: topMove + offset.top, left: leftMove + offset.left });
}

$(document).ready(function () {
  if (quiz.answered == "Y" && quiz.checked == "Y") {
    // find the element with the class drag-${quiz.userAnswer}
    console.log(quiz);
    let $element = $(".drag-" + quiz.userAnswer);

    // set the element's position based on quiz.x and quiz.y
    $element.css({
      left: quiz.x,
      top: quiz.y,
    });

    // show the message
    if (quiz.correctAnswer == quiz.userAnswer) {
      $(".droppable").css({
        backgroundColor: "green",
      });
      $(".feedback-correct").show();
      $(".feedback-wrong").hide();
    } else {
      $(".droppable").css({
        backgroundColor: "red",
      });

      quiz.images.forEach((img, index) => {
        if (quiz.userAnswer == img) {
          $(".dragged-image-meaning").text(
            `The image you dragged is "${quiz.chi[index]}."`
          );
        }
      });

      $(".feedback-correct").hide();
      $(".feedback-wrong").show();
    }

    // Disable drag and drop feature
    $(".draggable").draggable("disable");
  }

  $("#nextButton").on("click", function (event) {
    event.preventDefault();

    // Extract the quiz ID from the current URL
    let currentURL = window.location.href;
    let quizID = parseInt(currentURL.split("/").pop());

    // Calculate the ID for the next quiz
    let nextQuizID = quizID + 1;

    // Navigate to the next page
    if (nextQuizID <= 10) {
      window.location.href = `/quiz_2/${nextQuizID}`;
    } else {
      window.location.href = `/quiz_3/${nextQuizID}`;
    }
  });

  //jump to another question
  $(".question-input").keypress(function (event) {
    if (event.keyCode === 13) {
      let inputValue = $(this).val();

      if (inputValue < 1 || inputValue > 15) return;

      let type_number =
        inputValue % 5 != 0
          ? Math.floor(inputValue / 5) + 1
          : Math.floor(inputValue / 5);

      window.location.href = `/quiz_${type_number}/${inputValue}`;
    }
  });
});
