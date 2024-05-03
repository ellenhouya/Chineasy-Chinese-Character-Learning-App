function saveAnswer(selectedValue) {
  $.ajax({
    type: "POST",
    url: `/quiz_1/${id}`,
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

$(document).ready(function () {
  console.log(quiz);

  if (quiz.answered == "Y") {
    renderQuestionStatus(quiz, quiz.checked);
  }

  $("#submit").on("click", function (event) {
    event.preventDefault();

    $(".feedback-msg").hide();

    let selectedOption = $('input[name="options"]:checked');

    // If no option is checked, display a message or handle the validation as needed
    if (selectedOption.length === 0) {
      $(".show-message").show();
      return;
    }

    if (selectedOption.length > 0) {
      // disable options
      $("input[type='radio']").not(this).prop("disabled", true);

      $(".show-message").hide();

      // save the status (answered and checked)
      updateCheckedAnswered();

      let selectedValue = selectedOption.val();
      saveAnswer(selectedValue);

      let messageSpan = selectedOption
        .closest(".option")
        .find(".show-correct, .show-wrong");

      if (quiz.correctAnswer == selectedValue) {
        ///// show correct message
        messageSpan.filter(".show-correct").show();
        messageSpan.filter(".show-wrong").hide();

        ///  push images into rectangleArray

        pushArrayImages();
      } else {
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

    updateAnswered();

    // Extract the quiz ID from the current URL
    let selectedValue = selectedOption.val();
    saveAnswer(selectedValue);

    // Calculate the ID for the next quiz
    let nextQuizID = quizID + 1;

    // Navigate to the next page
    if (nextQuizID <= 5) {
      window.location.href = `/quiz_1/${nextQuizID}`;
    } else {
      window.location.href = `/quiz_2/${nextQuizID}`;
    }
  });

  $('input[type="radio"]').change(function () {
    $(".show-message").css("visibility", "hidden");

    let selectedOption = $('input[name="options"]:checked');

    let selectedValue = selectedOption.val();

    updateAnswered();

    saveAnswer(selectedValue);
  });

  // input change event
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
