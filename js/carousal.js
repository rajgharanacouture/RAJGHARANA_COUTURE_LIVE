const slides = document.querySelector('.home-image');
console.log('==>',slides);
    const slideCount = 2;
    let currentIndex = 0;
    let interval = setInterval(autoSlide, 4000);

    function showSlide(index) {
      slides.src = `images/Home-bg${index}.jpg`;
    }

    function autoSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      showSlide(currentIndex);
    }