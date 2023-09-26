//*Hamburger menu dropdown
var hamburgerActive = false;

function triggerMenu() {
    const hamburgerButton = document.querySelector(".hamburger");
    const menucontainer = document.querySelector(".mobile-menu-container");
    if (hamburgerActive) {
        hamburgerButton.classList.remove("is-active");
        menucontainer.classList.remove('active');
    } else {
        hamburgerButton.classList.add("is-active");
        menucontainer.classList.add('active');
    }
    hamburgerActive = !hamburgerActive;
}

const langDiv = document.getElementById("menuarrow");
const langBarContainer = document.querySelector(".navbar-upper-center-lang-container");
const langBarContent = document.querySelector(".navbar-upper-center-lang-content");
const navbarlower = document.getElementById("navbar-lower");
const navbarupper = document.getElementById("navbar-upper");
let langActive = false;
let scrollYold = window.scrollY;


//*Bottom navbar droppng and hiding
window.addEventListener('scroll', handleScroll);

function handleScroll() {
    if (window.scrollY > scrollYold + 0.0003) {
        scrollYold = window.scrollY;
        navbarlower.style.zIndex = 101;
        navbarlower.style.top = "0px";
        if (langActive) {
            langBarContainer.classList.remove('active');
            langActive = false;
        }
    } else {
        scrollYold = window.scrollY;
        navbarlower.style.zIndex = 99;
        navbarlower.style.top = "70px";
    }
}



//*Language selection dropdown
langDiv.addEventListener('click', (e) => {
    e.preventDefault();
    const rect = langDiv.getBoundingClientRect();
    if (!langActive) {
        langActive = true;
        const websiteWidth = window.innerWidth;
        const paddingLeft = rect.left - document.body.getBoundingClientRect().left;
        const langContWidth = langBarContent.offsetWidth;
        const adjustedPaddingLeft = websiteWidth - paddingLeft - langContWidth;
        langBarContainer.style.right = `${adjustedPaddingLeft}px`;
        langBarContainer.classList.add("active");
    } else {
        langActive = false;
        langBarContainer.classList.remove("active");
    }
});

//*Navbar navigation anchoring
let previousActive = 0;

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".navbar-lower-container a[href^='#']");
    links.forEach(function (link, index) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
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
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});


//*Navbar navigation highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar-lower-content a");

window.addEventListener("scroll", () => {
    let currentSection = null;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 180 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });
    navLinks.forEach((link) => {
        link.classList.remove("active");
    });
    if (currentSection) {
        const currentLink = document.querySelector(`.navbar-lower-content a[href="#${currentSection}"]`);
        currentLink.classList.add("active");
    }
});

//*Hand with phone animation
//TODO: Fix so that hand is always centered on all dimensions
const handsElement = document.getElementById("hand");

window.addEventListener('scroll', () => {
    const vh = window.innerHeight;
    if (window.innerWidth < 1366) {
        handsElement.style.top = `${window.pageYOffset - 0.10 * vh}px`;
    } else {
        handsElement.style.top = `${window.pageYOffset}px`;
    }
});


//*Image slider in features section
//TODO: Fix slow loading
const imageList = [
    '/assets/Layer_78.png',
    '/assets/william-iven-8515-unsplash.jpg',
    '/assets/rawpixel-675355-unsplash.jpg'
];

let currentIndex = 0;

function changeBackground(direction) {
    const sliderImage = document.getElementById('image-slider-content-image');
    sliderImage.classList.add('fade-out');
    const newImage = new Image();
    newImage.src = imageList[currentIndex];
    newImage.onload = function () {
        sliderImage.classList.add('fade-out');
        setTimeout(() => {
            if (direction === 'left') {
                currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
            } else if (direction === 'right') {
                currentIndex = (currentIndex + 1) % imageList.length;
            }
            sliderImage.style.backgroundImage = `url(${imageList[currentIndex]})`;
            sliderImage.offsetWidth;
            sliderImage.classList.remove('fade-out');
        }, 300);
    };
}

//*Accordion
var acc = document.getElementsByClassName("accordion-item-button");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        var panel = this.nextElementSibling;
        var title = this.firstElementChild;
        var arrow = this.lastElementChild;
        var isActive = panel.classList.contains("active");
        closeAllAccordionItems(acc);
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

//*Form auto height adjust
//TODO: Fix so that textarea is always the same height
const textarea = document.getElementById('message');

textarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
    if (this.style.height < 258) {
        this.style.height = '38px';
    }
});
