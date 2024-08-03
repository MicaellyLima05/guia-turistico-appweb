let currentIndex = 0;
const intervalTime = 2000; // Tempo entre as transições em milissegundos

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

function moveSlide(step) {
    showSlide(currentIndex + step);
}

// Função para iniciar o auto-play
function startAutoPlay() {
    setInterval(() => {
        moveSlide(1);
    }, intervalTime);
}

// Inicialize o slider mostrando o primeiro slide e inicie o auto-play
showSlide(currentIndex);
startAutoPlay();
