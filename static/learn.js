console.log(character_to_learn);

$(document).ready(function () {
  var currentURL = window.location.href;
  var quizID = parseInt(currentURL.split("/").pop()); // Extract the last part of the URL and convert it to an integer

  // Calculate the ID for the next quiz
  var nextLearnID = quizID + 1;
  var previousLearnID = quizID - 1;

  if (character_to_learn.Chinese.length == 2) {
    // Select all img elements within .evolution-con and set their width and height
    $(".evolution-con img").css({
      width: "160px",
    });
  }
  $(".previous-btn").on("click", function (event) {
    if (previousLearnID != 0) {
      window.location.href = `/learn/${previousLearnID}`;
    } else {
      window.location.href = "/";
    }
  });

  $(".next-btn").on("click", function (event) {
    if (nextLearnID <= 16) {
      window.location.href = `/learn/${nextLearnID}`;
    } else {
      window.location.href = "/quiz_1/1";
    }
  });
});
