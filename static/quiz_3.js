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
      // Handle the error response here
      console.error(error);
    },
  });
}

$(document).ready(function () {
  console.log(quiz);

  if (quiz.answered == "Y") {
    renderQuestionStatus(quiz, quiz.checked);
  }

  // Add a click event listener to the "next" button using jQuery
  $("#submit").on("click", function (event) {
    event.preventDefault();

    var selectedOption = $('input[name="options"]:checked');

    if (selectedOption.length === 0) {
      // If no option is checked, display a message or handle the validation as needed
      $(".show-message").css("visibility", "visible");
      return;
    }

    if (selectedOption.length > 0) {
      $("input[type='radio']").not(this).prop("disabled", true);

      // $(".show-message").hide();
      $(".show-message").css("visibility", "hidden");

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

    var selectedOption = $('input[name="options"]:checked');
    // If no option is checked, display a message or handle the validation as needed
    // if (selectedOption.length === 0) {
    //   $(".show-message").show();
    //   return;
    // }

    updateAnswered();

    let selectedValue = selectedOption.val();
    saveAnswer(selectedValue);

    // Extract the quiz ID from the current URL
    var currentURL = window.location.href;
    var quizID = parseInt(currentURL.split("/").pop()); // Extract the last part of the URL and convert it to an integer

    // Calculate the ID for the next quiz
    var nextQuizID = quizID + 1;

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
  });

  // jump to another question
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
