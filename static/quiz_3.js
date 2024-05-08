function saveAnswer(selectedValue) {
  $.ajax({
    type: "POST",
    url: `/quiz_3/${id}`,
    data: JSON.stringify(selectedValue),
    contentType: "application/json",
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.error(error);
    },
  });
}

// function addLayer(targetEle, className) {
//   var content = $(targetEle);
//   var beforeElement = $("<div></div>");

//   beforeElement.addClass(className);

//   content.prepend(beforeElement);
// }

// function removeLayer(element) {
//   $(element).remove();
// }

function showMessage(id) {
  // addLayer(".content", "content-before");
  // addLayer(".nav-con", "nav-con-before");

  $(id).addClass("show");
}

$(document).ready(function () {
  markUnanswered();

  console.log(quiz);

  if (quiz.id == 15) {
    $("#nextButton").text("See result");
  }

  if (quiz.answered == "Y") {
    renderQuestionStatus(quiz, quiz.checked);
  }

  $("#submit").on("click", function (event) {
    event.preventDefault();

    let selectedOption = $('input[name="options"]:checked');

    if (selectedOption.length === 0) {
      // If no option is checked, display a message or handle the validation as needed
      $(".show-message").css("visibility", "visible");
      return;
    }

    if (selectedOption.length > 0) {
      $("input[type='radio']").not(this).prop("disabled", true);

      $(".show-message").css("visibility", "hidden");

      updateCheckedAnswered();

      let selectedValue = selectedOption.val();
      saveAnswer(selectedValue);

      let messageSpan = selectedOption
        .closest(".option")
        .find(".show-correct, .show-wrong");

      if (quiz.correctAnswer == selectedValue) {
        // show correct message
        messageSpan.filter(".show-correct").css("visibility", "visible");

        pushArrayImages();
      } else {
        // show wrong message
        messageSpan.filter(".show-wrong").css("visibility", "visible");
      }
    } else {
      console.log("No option selected.");
    }
  });

  $("#nextButton").on("click", function (event) {
    event.preventDefault();

    let selectedOption = $('input[name="options"]:checked');

    let selectedValue = selectedOption.val();

    // if (quiz.id != 15) {
    //   updateAnswered();
    // }

    console.log(selectedValue);

    if (selectedValue) {
      updateAnswered();
      saveAnswer(selectedValue);
    }

    // show the user if they have completed the quiz. if not, show all the questions they skipped.

    if (quiz.id == 15) {
      // need to go to server to retreived the updated data

      $.get(`/updateAnswered/${id}`, function (data) {
        console.log(data);

        if (data.length > 0) {
          // show message
          let message = "Unanswered questions:\n";
          data.forEach(function (question) {
            message += question.id + ", ";
          });
          // Remove the trailing comma and space
          message = message.slice(0, -2);

          $(".unanswered_message").text(message);

          // Show the alert
          showMessage("#confirmMessage");

          // toggle layer
          $(".last-question-layer").toggle();
        } else {
          window.location.href = "/result";
        }
      });
      return;
    }

    // // Extract the quiz ID from the current URL
    let currentURL = window.location.href;
    let quizID = parseInt(currentURL.split("/").pop());

    // // Calculate the ID for the next quiz
    let nextQuizID = quizID + 1;

    // Navigate to the next page
    window.location.href = `/quiz_3/${nextQuizID}`;

    if (nextQuizID >= 16) {
      window.location.href = "/result";
    }
  });

  $('input[type="radio"]').change(function () {
    $(".show-message").css("visibility", "hidden");

    let selectedOption = $('input[name="options"]:checked');

    let selectedValue = selectedOption.val();

    updateAnswered();

    saveAnswer(selectedValue);

    let $qLink = $(".q-link" + id);
    $qLink.css("background", "var(--lightGray)");

    $.get(`/updateAnswered/${id}`, function (unAnsweredQuestions) {
      updatePercentage(15 - unAnsweredQuestions.length);
    });
  });

  $("#complete-q-btn").on("click", function (event) {
    window.location.href = "/quiz_3/15";
  });

  // complete questions
  $("#see-result-btn").on("click", function (event) {
    window.location.href = "/result";
  });
});
