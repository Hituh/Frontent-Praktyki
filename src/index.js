//*Hamburger
var hamburgerActive = false;

function triggerMenu() {
    const hamburgerButton = document.querySelector(".hamburger"); // Select the button by class
    const menucontainer = document.querySelector(".mobile-menu-container");
    if (hamburgerActive) {
        // If the hamburger is active, remove the "is-active" class
        hamburgerButton.classList.remove("is-active");
        menucontainer.classList.remove('active');
    } else {
        // If the hamburger is not active, add the "is-active" class
        hamburgerButton.classList.add("is-active");
        menucontainer.classList.add('active');
    }

    // Toggle the hamburgerActive variable
    hamburgerActive = !hamburgerActive;
}


//* Smooth navigation to correct section from navbar
//TODO: Fix wrong scrolling. It moves to correct section but a bit too low

let _navbarlowervisible = true;
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".navbar-lower-container a[href^='#']");

    links.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent the default behavior of the link
            const targetId = this.getAttribute("href").substring(1); // Get the target section's ID
            const targetElement = document.getElementById(targetId); // Get the target section element

            var offset = 5 * window.innerHeight / 100; // Calculate offset as 5% of the viewport height

            const bodyRect = document.body.getBoundingClientRect().top;
            const targetElementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = targetElementPosition - bodyRect - offset;
            if (targetElement) {
                // Scroll to the target section smoothly with a 200px offset from the top of the screen
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                })

            }
        });
    });
});

//* Navbar visible section highlighting
//TODO: Needs a bit of pixel perfect fix
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

//*Navbar hiding
//TODO: If visible, also hide language selection bar
const langDiv = document.getElementById("menuarrow");
const langBarcontainer = document.querySelector(".navbar-lang-container");
const langBar = document.querySelector(".navbar-lang");
const navbarlower = document.getElementById("navbar-lower");
const navbarupper = document.getElementById("navbar-upper");

let langclicked = false
let scrollYold = window.scrollY;

window.addEventListener('scroll', handleScroll);

function handleScroll() {
    if (window.scrollY > scrollYold) {
        scrollYold = window.scrollY;
        navbarlower.style.zIndex = 101;
        navbarlower.style.top = "0px";
        _navbarlowervisible = false;
    } else {
        scrollYold = window.scrollY;
        navbarlower.style.zIndex = 99;
        navbarlower.style.top = "70px";
        _navbarlowervisible = true;
    }
}

//*Language selection dropdown bar for desktop
//TODO: Probably make it also work on mobile
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

//*Overview section hand animation
const handsElement = document.getElementById("hand");

window.addEventListener('scroll', () => {
    if (window.pageYOffset < 50) {
        handsElement.style.top = `${50}px`;
    }
    else {
        handsElement.style.top = `${window.pageYOffset}px`;
    }
});


//*slider
//TODO: Make it work lmao

// Add your JavaScript code for slider functionality here
const slider = document.getElementById('content-slider');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPosition = e.clientX;
    slider.style.cursor = 'grabbing';
});

slider.addEventListener('mouseup', () => {
    isDragging = false;
    slider.style.cursor = 'grab';
    if (currentTranslate > prevTranslate && currentTranslate < 0) {
        // Move to the next card
        prevTranslate = currentTranslate;
        currentTranslate -= slider.offsetWidth;
    } else if (currentTranslate < prevTranslate && currentTranslate > -(slider.offsetWidth * (slider.children.length - 1))) {
        // Move to the previous card
        prevTranslate = currentTranslate;
        currentTranslate += slider.offsetWidth;
    }
    setSliderPosition();
});

slider.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentPosition = e.clientX;
    currentTranslate = prevTranslate + currentPosition - startPosition;
    setSliderPosition();
});

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

//*Accordion
//TODO: Make it work lmao
function accordionDropdown(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

//*Force active button on contact form

//*Autoresize textarea in form
const textarea = document.getElementById('message');

// Get the textarea element

// Attach an event listener to the textarea for input changes
textarea.addEventListener('input', function () {
    this.style.height = 'auto'; // Reset the height to auto to recalculate
    this.style.height = this.scrollHeight + 'px'; // Set the height to the scrollHeight
    console.log(this.style.height)
    // Set a minimum height (e.g., 1em) to prevent it from collapsing completely
    if (this.style.height < 258) {
        this.style.height = '38px';
    }
});
