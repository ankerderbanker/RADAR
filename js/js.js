// Initialize Slick Slider
$('.post-wrapper').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  nextArrow: $('.next'),
  prevArrow: $('.prev'),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

// Navbar Collapse and Scroll Behavior
const navbar = document.querySelector('.navbar');
const logo = document.querySelector('.logo');
const navLinks = document.querySelector('.nav-links');
const parallaxLayers = document.querySelectorAll('.parallax-layer');

const collapseThreshold = 10;
const baseOffset = 40; // Shift layers down by 40px

// Function to set initial navbar state based on viewport
function updateNavbarState() {
  if (window.innerWidth <= 600) {
    // Always collapsed on mobile
    navbar.classList.add('collapsed');
  } else {
    // Desktop: Check scroll position
    const scrollPosition = window.scrollY;
    if (scrollPosition > collapseThreshold) {
      navbar.classList.add('collapsed');
    } else {
      navbar.classList.remove('collapsed');
      navLinks.classList.remove('visible');
    }
  }
}

// On Page Load
document.addEventListener('DOMContentLoaded', updateNavbarState);

// On Resize
window.addEventListener('resize', updateNavbarState);

// On Scroll - Desktop specific behavior + parallax
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  if (window.innerWidth > 1000) {
    if (scrollPosition > collapseThreshold) {
      navbar.classList.add('collapsed');
    } else {
      navbar.classList.remove('collapsed');
      navLinks.classList.remove('visible');
    }
  } else {
    // On mobile, always collapsed - no need to change state here
    navbar.classList.add('collapsed');
  }

  // Update Parallax Effect
  parallaxLayers.forEach(layer => {
    const speed = parseFloat(getComputedStyle(layer).getPropertyValue('--parallax-speed'));
    layer.style.transform = `translateY(${scrollPosition * speed + baseOffset}px)`;
  });
});

// Toggle Menu Visibility on Logo Click in Collapsed State
logo.addEventListener('click', (event) => {
  if (navbar.classList.contains('collapsed')) {
    event.stopPropagation();
    navLinks.classList.toggle('visible');
  }
});

// Hide Menu on Outside Click
document.addEventListener('click', (event) => {
  if (!navbar.contains(event.target)) {
    navLinks.classList.remove('visible');
  }
});
