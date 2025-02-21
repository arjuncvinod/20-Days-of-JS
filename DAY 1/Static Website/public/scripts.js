document.addEventListener("DOMContentLoaded", function () {
    const carouselContent = document.querySelector(".carousel-content");
    const prevButton = document.querySelector(".carousel-button.prev");
    const nextButton = document.querySelector(".carousel-button.next");

    let index = 0;
    const images = document.querySelectorAll(".carousel-content img");
    const totalImages = images.length;
    const imagesPerView = 3; 
    const imageWidth = images[0].clientWidth;
    const maxIndex = totalImages - imagesPerView; 
    function updateCarousel() {
        carouselContent.style.transform = `translateX(${-index * imageWidth}px)`;


        
    }

    nextButton.addEventListener("click", function () {
        if (index < maxIndex) {
            index++;
        }
        updateCarousel();
    });

    prevButton.addEventListener("click", function () {
        if (index > 0) {
            index--; 
        }
        updateCarousel();
    });

    window.addEventListener("resize", function () {
        updateCarousel();
    });


    updateCarousel();
});
