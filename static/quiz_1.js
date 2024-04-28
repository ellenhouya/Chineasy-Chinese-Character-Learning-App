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

    // Calculate the ID for the next quiz
    let nextQuizID = quizID + 1;

    // Navigate to the next page
    if (nextQuizID <= 5) {
      window.location.href = `/quiz_1/${nextQuizID}`;
    } else {
      window.location.href = `/quiz_2/${nextQuizID}`;
    }
  });
});
