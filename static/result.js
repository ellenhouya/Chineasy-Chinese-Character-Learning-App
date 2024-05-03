$(document).ready(function () {
  $("#retry-quiz-btn").on("click", function (event) {
    window.location.href = "/quiz_1/1";
  });

  $("#home-btn").on("click", function (event) {
    window.location.href = "/";
  });

  // $(".incorrect-qustion-link").each(function () {
  //   // Get the class attribute of the current anchor tag
  //   let classAttr = $(this).attr("class");

  //   // Split the class attribute by '-'
  //   let classParts = classAttr.split("-");

  //   // Get the last part of the class attribute (which should be the number)
  //   let question_number = classParts[classParts.length - 1];

  //   // Calculate type_number based on question_number
  //   let type_number =
  //     question_number % 5 != 0
  //       ? Math.floor(question_number / 5) + 1
  //       : Math.floor(question_number / 5);

  //   // Set the href attribute of the current anchor tag
  //   $(this).attr("href", `quiz_${type_number}/${question_number}`);
  // });

  // $(".correct-qustion-link").each(function () {
  //   // Get the class attribute of the current anchor tag
  //   let classAttr = $(this).attr("class");

  //   // Split the class attribute by '-'
  //   let classParts = classAttr.split("-");

  //   // Get the last part of the class attribute (which should be the number)
  //   let question_number = classParts[classParts.length - 1];

  //   // Calculate type_number based on question_number
  //   let type_number =
  //     question_number % 5 != 0
  //       ? Math.floor(question_number / 5) + 1
  //       : Math.floor(question_number / 5);

  //   // Set the href attribute of the current anchor tag
  //   $(this).attr("href", `quiz_${type_number}/${question_number}`);
  // });
});
