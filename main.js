$(document).ready(function () {
  // Initialize Swiper
  const swiper = new Swiper(".slider-wrapper", {
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });

  // Handle dot clicks
  $(".swiper-dot").on("click", function () {
    const slideIndex = parseInt($(this).attr("data-slide-index"));
    swiper.slideToLoop(slideIndex); // Slide to the clicked dot's slide (looped)
  });

  // Synchronize dot changes with swiper's slide change
  swiper.on("slideChange", function () {
    const activeIndex = swiper.realIndex;
    $(".swiper-dot").each(function () {
      const dotIndex = parseInt($(this).attr("data-slide-index"));
      if (dotIndex === activeIndex % $(".swiper-dot").length) {
        $(this).attr("src", "rounddot.svg"); // Active dot
      } else {
        $(this).attr("src", "dot.svg"); // Inactive dot
      }
    });
  });
  // Show the contact popup when clicking on the contact button
  $("#contact-btn").click(function () {
    $("#contactPopup").css("display", "flex");
  });

  // Close the contact popup when clicking on the close button
  $("#closePopupButton").click(function () {
    $("#contactPopup").css("display", "none");
  });

  // Handle form submission
  $("#contactForm").submit(function (event) {
    event.preventDefault();
    const action = $(this).attr("action");
    $.ajax({
      type: "POST",
      url: action,
      crossDomain: true,
      data: new FormData(this),
      dataType: "json",
      processData: false,
      contentType: false,
      headers: {
        Accept: "application/json",
      },
    })
      .done(function () {
        alert("The form was submitted successfully.");
      })
      .fail(function () {
        alert("An error occurred! Please try again later.");
      });

    // Hide the contact popup after form submission
    $("#contactPopup").fadeOut();
  });
});
