document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.querySelector('.slides');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const nextButton = document.querySelector('.prevbuttons img:nth-child(2)'); // Next arrow
    const prevButton = document.querySelector('.prevbuttons img:nth-child(1)'); // Back arrow

    const slidesToShow = 4; // Number of slides to show at once
    const totalOriginalSlides = slides.length;
    let currentIndex = slidesToShow; // Start from the first clone set

    // Clone the first and last set of slides
    slides.slice(0, slidesToShow).forEach(slide => {
        const clone = slide.cloneNode(true);
        slidesContainer.appendChild(clone); // Append clones at the end
    });
    slides.slice(-slidesToShow).forEach(slide => {
        const clone = slide.cloneNode(true);
        slidesContainer.insertBefore(clone, slidesContainer.firstChild); // Prepend clones at the start
    });

    const allSlides = document.querySelectorAll('.slide');
    const totalSlides = allSlides.length;

    // Set initial position
    slidesContainer.style.transform = `translateX(-${currentIndex * (100 / slidesToShow)}%)`;

    function showSlide(index) {
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
        slidesContainer.style.transform = `translateX(-${index * (100 / slidesToShow)}%)`;
        currentIndex = index;

        slidesContainer.addEventListener('transitionend', handleTransitionEnd, { once: true });
    }

    function handleTransitionEnd() {
        if (currentIndex >= totalSlides - slidesToShow) {
            currentIndex = slidesToShow; // Reset to the start clone set
            slidesContainer.style.transition = 'none';
            slidesContainer.style.transform = `translateX(-${currentIndex * (100 / slidesToShow)}%)`;
        } else if (currentIndex < slidesToShow) {
            currentIndex = totalOriginalSlides; // Reset to the end clone set
            slidesContainer.style.transition = 'none';
            slidesContainer.style.transform = `translateX(-${currentIndex * (100 / slidesToShow)}%)`;
        }
    }

    nextButton.addEventListener('click', function() {
        showSlide(currentIndex + slidesToShow);
    });

    prevButton.addEventListener('click', function() {
        showSlide(currentIndex - slidesToShow);
    });
});
