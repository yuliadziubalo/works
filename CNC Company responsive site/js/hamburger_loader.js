window.addEventListener('load', function() {
    setTimeout(function() {
        $("#preloader").fadeOut();
    }, 500);
});

const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.navbar');
hamburger.addEventListener('click', () => {
    navList.classList.toggle('show');
});