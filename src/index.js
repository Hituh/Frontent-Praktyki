document.querySelectorAll('navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - document.querySelector('navbar').offsetHeight,
            behavior: 'smooth'
        });
    });
});


const sections = document.querySelectorAll("section"); // Assuming you have sections with IDs like "overview", "features", etc.
const navLinks = document.querySelectorAll(".navbar-lower-content a");

window.addEventListener("scroll", () => {
    let currentSection = null;

    // Find the currently visible section
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 180 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });

    // Remove the border and font-weight from all links
    navLinks.forEach((link) => {
        link.style.borderBottom = "4px solid transparent";
        link.style.fontWeight = "normal";
    });

    // Add the border and font-weight to the currently visible section's link
    if (currentSection) {
        const currentLink = document.querySelector(`.navbar-lower-content a[href="#${currentSection}"]`);
        currentLink.style.borderBottom = "4px solid #01ffcb";
        currentLink.style.fontWeight = "bold";
    }
});




//Navbar hiding

const langDiv = document.getElementById("menuarrow");
const langBarcontainer = document.querySelector(".navbar-lang-container");
const langBar = document.querySelector(".navbar-lang");
const navbarlower = document.getElementById("navbar-lower");
const navbarupper = document.getElementById("navbar-upper");

let langclicked = false;

let scrollYold = window.scrollY;

window.addEventListener('scroll', () => {

    if (window.scrollY > scrollYold) {
        scrollYold = window.scrollY;
        navbarlower.style.zIndex = 101;
        navbarlower.style.top = "0px";
    } else {

        scrollYold = window.scrollY;
        navbarlower.style.zIndex = 99;
        navbarlower.style.top = "70px";
    }
});

// Language menu arrow

langDiv.addEventListener('click', (e) => {
    e.preventDefault();
    const rect = langDiv.getBoundingClientRect();

    if (!langclicked) {
        langclicked = true;
        langBarcontainer.style.top = "60px";
        langBar.style.paddingLeft = `${rect.left}px`; // Use backticks for template strings
        langBarcontainer.style.opacity = "1"; // Fade in the language bar
    } else {
        langclicked = false;
        langBarcontainer.style.top = "-80px";
        langBarcontainer.style.opacity = "0"; // Fade out the language bar
    }
});




//Navbar smooth scrolling to anchored item

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".navbar-lower-container a[href^='#']");

    links.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent the default behavior of the link
            const targetId = this.getAttribute("href").substring(1); // Get the target section's ID
            const targetElement = document.getElementById(targetId); // Get the target section element

            if (targetElement) {
                // Scroll to the target section smoothly with a 200px offset from the top of the screen
                targetElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
            }
        });
    });
});


//slider

const slider = document.getElementById("content-slider");
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    startPosition = e.clientX;
    slider.style.cursor = "grabbing";
});

slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const currentPosition = e.clientX;
    const diff = currentPosition - startPosition;
    currentTranslate = prevTranslate + diff;

    // Limit the slider's movement within page boundaries
    const slidercard = document.getElementById("card1");
    console.log(slidercard.offsetWidth);
    const minTranslate = 0

    const maxTranslate = 1920;
    currentTranslate = Math.min(maxTranslate, Math.max(minTranslate, currentTranslate));

    slider.style.transform = `translateX(${currentTranslate}px)`;
});

slider.addEventListener("mouseup", () => {
    endDrag();
});

slider.addEventListener("mouseleave", () => {
    if (isDragging) {
        endDrag();
    }
});

function endDrag() {
    isDragging = false;
    prevTranslate = currentTranslate;
    slider.style.cursor = "grab";
}

//Accordion
function accordionDropdown (id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }


}