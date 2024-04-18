let isElementDropped = false;
$(function () {
  $(".draggable").draggable({
    revert: (dropped) => {
      return !dropped && !isElementDropped;
    },
  });
  $(".droppable").droppable({
    over: function (event, ui) {
      $(this).css({
        backgroundColor: "#f5ee9e",
        color: "#000",
      });
    },
    out: function (event, ui) {
      $(this).css({
        backgroundColor: "#e9e9e9",
      });
    },

    drop: function (event, ui) {
      let draggableClass = ui.draggable.attr("class").split(" ")[2]; //

      // Extract the part after the hyphen (-) from the class names
      let draggableClassSuffix = draggableClass.split("-")[1];

      console.log(draggableClassSuffix);

      // Disable draggable behavior for all elements
      isElementDropped = true;
      $(".draggable").draggable("disable");
      $(".show-message").hide();

      // save the user's answer
      $.ajax({
        type: "POST",
        url: `/quiz_2/${id}`,
        data: JSON.stringify(draggableClassSuffix),
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
          } else {
            $(".droppable").css({
              backgroundColor: "red",
            });
            $(".dragged-image-meaning").text(
              `The image you dragged means "${draggableClassSuffix}."`
            );
            $(".feedback-correct").hide();
            $(".feedback-wrong").show();
          }
        },
        error: function (error) {
          // Handle the error response here
          console.error(error);
        },
      });
    },
  });
});

$(document).ready(function () {
  $("#nextButton").on("click", function (event) {
    event.preventDefault();

    if (!isElementDropped) {
      $(".show-message").show();
      return;
    }

    // Extract the quiz ID from the current URL
    var currentURL = window.location.href;
    var quizID = parseInt(currentURL.split("/").pop()); // Extract the last part of the URL and convert it to an integer

    // Calculate the ID for the next quiz
    var nextQuizID = quizID + 1;

    // Navigate to the next page
    if (nextQuizID <= 10) {
      window.location.href = `/quiz_2/${nextQuizID}`;
    } else {
      window.location.href = `/quiz_3/${nextQuizID}`;
    }
  });
});
