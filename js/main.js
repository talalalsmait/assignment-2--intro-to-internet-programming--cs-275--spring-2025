// Ensure ESLint and EditorConfig are set up properly

window.onload = () => {
    // Fetch album data from data.json
    fetch('data.json')
        .then(response => response.json())
        .then(data => setupCarousel(data))
        .catch(error => console.error('Error loading data:', error));
};

function setupCarousel(albums) {
    const carouselContainer = document.querySelector('.carousel-slides');

    // Populate carousel with album data
    albums.forEach((album, index) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        slide.innerHTML = `
            <img src="${album.cover}" alt="${album.title}">
            <h2>${album.title}</h2>
            <p>${album.artist}</p>
            <p>${album.year}</p>
        `;
        if (index === 0) slide.classList.add('active');
        carouselContainer.appendChild(slide);
    });

    // Setup navigation
    const prevButton = document.querySelector('.carousel-navigation a:first-child');
    const nextButton = document.querySelector('.carousel-navigation a:last-child');

    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        showSlide(currentSlide);
    });
}
