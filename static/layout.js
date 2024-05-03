function resetData() {
  // Send an AJAX request to update the quizzes_3 data on the server
  $.ajax({
    url: "/resetAnswers",
    type: "POST",
    contentType: "application/json",

    success: function (response) {
      console.log("Quizzes_3 updated successfully");
    },
    error: function (xhr, status, error) {
      console.error("Error updating quizzes_3:", error);
    },
  });
}

$(document).ready(function () {
  $(".quiz-link").click(function () {
    resetData();
  });

  $("#retry-quiz-btn").click(function () {
    resetData();
  });
});
