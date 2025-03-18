// -----------------------------------------------------------------------------
// This file includes deliberate formatting errors in order for you to verify
// that ESLint and EditorConfig are working properly. If both tools are, indeed,
// working correctly, then you’d see errors in your editor about indentation and
// improper use of footmarks instead of back ticks. When you save this file,
// your editor should strip all excess newlines and whitespace characters from
// the file. If both of these events occur, then ESLint and EditorConfig are
// working correctly/.
// DON’T PROCEED UNTIL YOU’RE SURE ESLINT AND EDITORCONFIG ARE WORKING CORRECTLY
// -----------------------------------------------------------------------------


document.addEventListener(`DOMContentLoaded`, () => {

    const prevButton = document.querySelector(`.carousel-navigation a:first-child`);
    const nextButton = document.querySelector(`.carousel-navigation a:last-child`);
    const slidesContainer = document.querySelector(`.carousel-slides`);


    let currentIndex = 0;
    let albums = [];


    const loadAlbums = async () => {
        try {
            const res = await fetch(`/json/data.json`);
            albums = await res.json();
            displaySlides();
        } catch (error) {
            console.error(`Error`);
        }
    };



    const displaySlides = () => {
        slidesContainer.innerHTML = albums.map((album, index) => `
            <div class="slide ${index === 0 ? `active` : ``}">
                <a href="${album.url}" target="_blank">
                    <img src="${album.cover_image.path}" alt="${album.cover_image.alt_content}" width="640">
                </a>
                <h3>${album.album}</h3>
                <p>${album.artist}</p>
                <section>
                    <p>${album.review.content}</p>
                    <p>Credit: ${album.cover_image.credit}</p>
                    <p>— ${album.review.source}</p>
                </section>
            </div>
        `).join(``);
        console.log(`hello`);
    };

    const nextSlide = () => {

        if(currentIndex < albums.length - 1){
            currentIndex = (currentIndex + 1) ;
            updateCarousel();
        }

    };


    const prevSlide = () => {
        if(currentIndex > 0){
            currentIndex = (currentIndex - 1) ;
            updateCarousel();
        }
    };


    const updateCarousel = () => {
        document.querySelectorAll(`.slide`).forEach((slide, index) => {
            slide.classList.toggle(`active`, index === currentIndex);
        });
    };


    nextButton.addEventListener(`click`, (e) => {
        e.preventDefault();
        nextSlide();
    });

    prevButton.addEventListener(`click`, (e) => {
        e.preventDefault();
        prevSlide();
    });

    loadAlbums();
});
