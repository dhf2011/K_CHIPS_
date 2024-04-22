

document.addEventListener("DOMContentLoaded", function () {
  // Get the buttons and content elements
  const buttons = document.querySelectorAll(".btn_join_typ01");
  const contentItems = document.querySelectorAll(".join_content_li");

  // Add mouseover event listeners to each button
  buttons.forEach((button, index) => {
    button.addEventListener("mouseover", function () {
      // Remove ".on" class from all buttons
      buttons.forEach(btn => {
        btn.classList.remove("on");
      });

      // Add ".on" class to the hovered button
      button.classList.add("on");

      // Hide all content items
      contentItems.forEach(contentItem => {
        contentItem.style.display = "none";
      });

      // Show the content item corresponding to the hovered button
      contentItems[index].style.display = "block";
    });
  });
});

var mainSwiper = new Swiper(".main_swiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  }
});