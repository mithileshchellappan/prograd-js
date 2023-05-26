const container = document.querySelector('.carousel-slide');
const pages = document.querySelectorAll('.page');
let counter = 0;
const size = pages[0].clientWidth;
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const colorPickers = document.querySelectorAll('.color-choice');
const colorLabels = document.querySelectorAll('.color-label');

colorPickers.forEach((picker, index) => {
    picker.addEventListener('change', (event) => {
        const changedColor = event.target.value;
        event.target.parentNode.style.backgroundColor = changedColor;
        colorLabels[index].textContent = `Current color is ${changedColor}`;
    });
});

nextButton.addEventListener('click', () => {
    if (counter >= 2) return;
    counter++;
    container.style.transform = `translateX(${-size * counter}px)`;
});

prevButton.addEventListener('click', () => {
    if (counter <= 0) return;
    counter--;
    container.style.transform = `translateX(${-size * counter}px)`;
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        if (counter >= 2) return;
        counter++;
        container.style.transform = `translateX(${-size * counter}px)`;
    } else if (event.key === 'ArrowLeft') {
        if (counter <= 0) return;
        counter--;
        container.style.transform = `translateX(${-size * counter}px)`;
    }
});