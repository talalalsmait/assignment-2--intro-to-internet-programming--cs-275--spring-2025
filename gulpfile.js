

function fetchJSONP(url, callbackName) {
  const script = document.createElement('script');
  script.src = `${url}?callback=${callbackName}`;
  document.body.appendChild(script);
}

function renderCarousel(data) {
  const slidesContainer = document.getElementById('carousel-slides');
  data.albums.forEach((album, index) => {
    const slide = document.createElement('img');
    slide.src = album.image;
    slide.alt = album.title;
    if (index === 0) slide.classList.add('active');
    slidesContainer.appendChild(slide);
  });
}

let currentIndex = 0;
function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-slides img');
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? document.querySelectorAll('.carousel-slides img').length - 1 : currentIndex - 1;
  showSlide(currentIndex);
});

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex === document.querySelectorAll('.carousel-slides img').length - 1) ? 0 : currentIndex + 1;
  showSlide(currentIndex);
});


window.albumData = (data) => renderCarousel(data);
fetchJSONP('albums.jsonp', 'albumData');
