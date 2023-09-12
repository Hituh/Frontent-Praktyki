
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

//*Navbar hiding
//TODO: If visible, also hide language selection bar
const langDiv = document.getElementById("menuarrow");
const langBarContainer = document.querySelector(".navbar-upper-center-lang-container");
const langBarContent = document.querySelector(".navbar-upper-center-lang-content");
const navbarlower = document.getElementById("navbar-lower");
const navbarupper = document.getElementById("navbar-upper");

let langActive = false
let scrollYold = window.scrollY;

window.addEventListener('scroll', handleScroll);

function handleScroll() {
    if (window.scrollY > scrollYold + 0.0003) {
        scrollYold = window.scrollY;
        navbarlower.style.zIndex = 101;
        navbarlower.style.top = "0px";
        _navbarlowervisible = false;
        if (langActive) {
            langBarContainer.classList.remove('active');
            langActive = false;
        }
    } else {
        scrollYold = window.scrollY;
        navbarlower.style.zIndex = 99;
        navbarlower.style.top = "70px";
        _navbarlowervisible = true;
    }
}


//*Lang bar
langDiv.addEventListener('click', (e) => {
    e.preventDefault();
    const rect = langDiv.getBoundingClientRect();

    if (!langActive) {
        langActive = true;
        const websiteWidth = window.innerWidth;
        const paddingLeft = rect.left - document.body.getBoundingClientRect().left;
        const langContWidth = langBarContent.offsetWidth;
        console.log(websiteWidth)
        console.log(paddingLeft)
        console.log(langContWidth)
        // Calculate the padding-left
        const adjustedPaddingLeft = websiteWidth - paddingLeft - langContWidth;
        // Calculate the padding-left
        langBarContainer.style.right = `${adjustedPaddingLeft}px`;

        langBarContainer.classList.add("active");
    } else {
        langActive = false;
        langBarContainer.classList.remove("active");

        // Reset the padding-left
    }
});


//* Smooth navigation to correct section from navbar
//TODO: Fix wrong scrolling. It moves to correct section but a bit too low

let _navbarlowervisible = true;
let previousActive = 0;

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".navbar-lower-container a[href^='#']");

    links.forEach(function (link, index) { // Add the index parameter to the forEach callback
        link.addEventListener("click", function (e) {

            e.preventDefault(); // Prevent the default behavior of the link
            const targetId = this.getAttribute("href").substring(1); // Get the target section's ID
            const targetElement = document.getElementById(targetId); // Get the target section element


            if (targetElement) {
                if (index > previousActive) {
                    var offset = 5 * window.innerHeight / 100;
                    previousActive = index;
                }
                else {
                    var offset = 10 * window.innerHeight / 100;
                    previousActive = index;
                }
                const bodyRect = document.body.getBoundingClientRect().top;
                const targetElementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = targetElementPosition - bodyRect - offset;
                // Scroll to the target section smoothly with a 200px offset from the top of the screen
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Print the index of the clicked link

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
        link.classList.remove("active");
    });

    // Add the border and font-weight to the currently visible section's link
    if (currentSection) {
        const currentLink = document.querySelector(`.navbar-lower-content a[href="#${currentSection}"]`);
        currentLink.classList.add("active");
    }
});




//*Overview section hand animation
const handsElement = document.getElementById("hand");

window.addEventListener('scroll', () => {
    if (window.innerWidth < 1366) {

        handsElement.style.top = `${window.pageYOffset - 175}px`;

    }
    else {
        handsElement.style.top = `${window.pageYOffset}px`;


    }
});



//*image-slider background changing
const imageList = [
    '/assets/Layer_78.png',
    '/assets/william-iven-8515-unsplash.jpg',
    '/assets/rawpixel-675355-unsplash.jpg'
];

let currentIndex = 0;

function changeBackground(direction) {
    const sliderImage = document.getElementById('image-slider-content-image');
    sliderImage.classList.add('fade-out'); // Apply fade-out animation class

    const newImage = new Image();
    newImage.src = imageList[currentIndex];

    newImage.onload = function () {
        sliderImage.classList.add('fade-out'); // Apply fade-out animation class

        setTimeout(() => {
            if (direction === 'left') {
                currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
            } else if (direction === 'right') {
                currentIndex = (currentIndex + 1) % imageList.length;
            }

            sliderImage.style.backgroundImage = `url(${imageList[currentIndex]})`;

            // Trigger a reflow to ensure smooth transition
            sliderImage.offsetWidth; // This line forces a reflow

            sliderImage.classList.remove('fade-out'); // Remove fade-out animation class
        }, 300); // Adjust the duration as needed (milliseconds)
    };
}
//*Accordion
var acc = document.getElementsByClassName("accordion-item-button");
var i;

var acc = document.getElementsByClassName("accordion-item-button");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        var panel = this.nextElementSibling;
        var title = this.firstElementChild;
        var arrow = this.lastElementChild;

        // Check if the clicked item is already active
        var isActive = panel.classList.contains("active");

        // Close all accordion items
        closeAllAccordionItems(acc);

        // If the clicked item was not active, open it
        if (!isActive) {
            title.classList.add("active");
            arrow.classList.add("active");
            panel.classList.add("active");
        }
    });
}

function closeAllAccordionItems(accordionItems) {
    for (var j = 0; j < accordionItems.length; j++) {
        var panel = accordionItems[j].nextElementSibling;
        var title = accordionItems[j].firstElementChild;
        var arrow = accordionItems[j].lastElementChild;

        title.classList.remove("active");
        arrow.classList.remove("active");
        panel.classList.remove("active");
    }
}

//*Autoresize textarea in form
const textarea = document.getElementById('message');

// Get the textarea element

// Attach an event listener to the textarea for input changes
textarea.addEventListener('input', function () {
    this.style.height = 'auto'; // Reset the height to auto to recalculate
    this.style.height = this.scrollHeight + 'px'; // Set the height to the scrollHeight

    // Set a minimum height (e.g., 1em) to prevent it from collapsing completely
    if (this.style.height < 258) {
        this.style.height = '38px';
    }
});

document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth < 769) { // Check if the screen width is less than 769px

        const cards = document.querySelectorAll(".overview-descriptions-content-card");
        const dots = document.querySelectorAll(".dot");

        let currentCardIndex = 0;

        function showCard(index) {
            cards.forEach((card) => {
                card.style.display = "none";
            });
            cards[index].style.display = "block";

            dots.forEach((dot) => {
                dot.classList.remove("active");
            });
            dots[index].classList.add("active");
        }

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                showCard(index);
                currentCardIndex = index;
            });
        });

        showCard(currentCardIndex);
    }
});


