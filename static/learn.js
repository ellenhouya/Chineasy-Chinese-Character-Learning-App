console.log(character_to_learn);
let swiper;

let quizID;
$(document).ready(function () {
  let currentURL = window.location.href;
  quizID = parseInt(currentURL.split("/").pop()); // Extract the last part of the URL and convert it to an integer

  // swiper.slideTo(quizID - 1);

  // Calculate the ID for the next quiz
  let nextLearnID = quizID + 1;
  let previousLearnID = quizID - 1;

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
      // window.location.href = "/quiz_1/1";
      // go to transition page
      window.location.href = "/transition";
    }
  });

  // swiper.js:
  console.log(data);
  $.each(data, function (index, item) {
    if (data[index].id !== quizID) {
      // Create a new swiper slide
      var $swiperSlide = $(
        `<a class="swiper-slide" href=/learn/${index + 1}></a>`
      );

      // Create a div for Chinese text and append it to the swiper slide
      var $chiDiv = $('<div class="slide-character-chi"></div>').text(
        item.Chinese
      );
      $swiperSlide.append($chiDiv);

      // Create a div for English text and append it to the swiper slide
      var $engDiv = $('<div class="slide-character-eng"></div>').text(
        item.English
      );
      $swiperSlide.append($engDiv);

      // Append the swiper slide to the swiper wrapper
      $(".swiper-wrapper").append($swiperSlide);
    }
  });

  if (character_to_learn.Chinese.length == 2) {
    $(".word").css({
      visibility: "visible",
    });
  }
});

$(window).on("load", function () {
  swiper = new Swiper(".swiper-container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: false,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 5,
      stretch: 0,
      depth: 5,
      modifier: 0,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },

    spaceBetween: 40,
  });
});

// on: {
//   slideChange: function () {
//     // // Remove the 'current-slide' class from all slides
//     // $(".swiper-slide").removeClass("current-slide");

//     // // Add the 'current-slide' class to the currently active slide
//     // $(".swiper-slide").eq(swiper.activeIndex).addClass("current-slide");

//     $(".swiper-slide").css("background", "transparent");
//     $(".slide-character-eng").css("background", "transparent");

//     $(".swiper-slide")
//       .eq(swiper.activeIndex)
//       .css("background", "rgba(255, 255, 255, 0.8)");
//     $(".swiper-slide")
//       .eq(swiper.activeIndex)
//       .find(".slide-character-eng")
//       .css("background", "rgb(255, 214, 77)");
//   },
// },
