import { annotate } from "https://unpkg.com/rough-notation?module";

const nameElement = document.querySelector("#txt");
const aboutMeSection = document.querySelector("#about-me");
const arrowElement = document.querySelector(".arrow-svg");
const navIcon = document.getElementById('nav-icon');

// Create a single annotation instance
const nameAnnotation = annotate(nameElement, { type: "circle", color: "black", padding: 12 });

function createAnnotationAndScroll() {
    nameAnnotation.show();

    setTimeout(() => {
        nameAnnotation.hide();
        aboutMeSection.scrollIntoView({ behavior: "smooth" });
    }, 2000);
}

// Function to scroll to the about-me section
function scrollToSection() {
    aboutMeSection.scrollIntoView({ behavior: "smooth" });
}

// Set up event listeners
nameElement.addEventListener("click", createAnnotationAndScroll);
arrowElement.addEventListener("click", scrollToSection);

// Use a single annotation instance for periodic highlighting
setInterval(() => {
    nameAnnotation.show();
    setTimeout(() => {
        nameAnnotation.hide();
    }, 2000);
}, 4000); // Changed to 4000 to reduce flickering

// Toggle navigation icon and redirect
navIcon.addEventListener('click', () => {
    navIcon.classList.toggle('open');

    setTimeout(() => {
        window.location.href = 'navigation.html'; 
    }, 400); 
});


const flightPath = {
  curviness: 1.5,
  autoRotate: true,
  values: [
    {x: 100, y: -50},     
    {x: 300, y:-20},      
    {x: 500, y: -100},    
    {x: 750, y: 40},     
    {x: 900, y: -150},    
    {x: 1200, y: -50},   
    {x: 1500, y: 90},    
    {x: 1800, y: -200},  
    {x: window.innerWidth, y: -350} 
  ]
}

const tween = new TimelineLite()

tween.add(
TweenLite.to('.birdie', 3, {
  bezier: flightPath,
  ease: Power1.easeInOut
})
)

const controller = new ScrollMagic.Controller()
const scene = new ScrollMagic.Scene({
triggerElement: '.container-lang', 
duration: 1700, 
triggerHook: 0 
})
.setTween(tween)
.setPin('.animation') 
.addTo(controller)


const binderImage = document.getElementById('binderImage');

binderImage.addEventListener('click', () => {
  binderImage.classList.add('opening');

  setTimeout(() => {
    binderImage.src = 'Group 7573.png';
    binderImage.classList.remove('opening'); 
  }, 500); 
});



