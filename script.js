const carouselContainer = document.querySelector('.carousel-slide');
const carouselPages = document.querySelectorAll('.page');
let slideCounter = 0;
const slideSize = carouselPages[0].clientWidth;
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const colorPickers = document.querySelectorAll('.color-choice');
const colorLabels = document.querySelectorAll('.color-label');

colorPickers.forEach((picker, index) => {
    picker.addEventListener('change', (event) => {
        const changedColor = event.target.value;
        event.target.parentNode.style.backgroundColor = changedColor;
        colorLabels[index].textContent = `Selected color: ${changedColor}`;
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        nextMove()
    } else if (event.key === 'ArrowLeft') {
        prevMove()
    }
});

nextBtn.addEventListener('click',nextMove);

prevBtn.addEventListener('click', prevMove);

function prevMove(){
    if (slideCounter <= 0) return;
    slideCounter--;
    carouselContainer.style.transform = `translateX(${-slideSize * slideCounter}px)`;
}

function nextMove(){
    if (slideCounter >= 2) return;
    slideCounter++;
    carouselContainer.style.transform = `translateX(${-slideSize * slideCounter}px)`;
}
