
const navIcon2 = document.getElementById('nav-icon');

navIcon2.addEventListener('click', () => {
    navIcon2.classList.toggle('open');

    setTimeout(() => {
        // Assuming you want to navigate to the homepage after clicking
        window.location.href = 'homepage.html';
    }, 400);
});



