// Main JavaScript functionality for Raj Gharana website
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('mainNavbar');
    const logo = document.getElementById('navbarLogo');
    //const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            navbar.classList.add('navbar-scrolled');
            logo.classList.remove('logo-large');
            logo.classList.add('logo-small');
            // Update nav links for scrolled state
            //navLinks.forEach(link => {
              //  link.classList.add('scrolled-link');
            //});
            
        } else {
            //navbar.classList.remove('navbar-scrolled');
            logo.classList.remove('logo-small');
            logo.classList.add('logo-large');
            
            // Update nav links for normal state
            //navLinks.forEach(link => {
                //link.classList.remove('scrolled-link');
            //});
        }
    });
    
    // Smooth scrolling for navigation links
    /*navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Hide all sections
                const allSections = document.querySelectorAll('main > section');
                allSections.forEach(section => {
                    section.classList.add('d-none');
                });
                
                // Show target section
                targetSection.classList.remove('d-none');
                
                // Smooth scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });*/
    
    // Set initial active link
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to product cards
    const productCards = document.querySelectorAll('.what-wear .card, .insta-shop .card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Initialize any carousels if needed
    //initializeCarousels();
    
    // Lazy loading for images
    initializeLazyLoading();    
    toggleSpinner();
});

function toggleSpinner(){
    let spinner = document.getElementById('spinner-overlay');
    spinner.style.display = spinner.style.display === 'flex' ? 'none' : 'flex';
}

// Show alert message
function showAlert(message) {
    //document.getElementById("showToast").addEventListener("click", () => {
      let toastElement = document.getElementById("liveToast");
      toastElement.innerHTML = `<div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
            </div>`;
      new bootstrap.Toast(toastElement).show();
    //});
}

// Initialize carousels function
/*function initializeCarousels() {
    // This function can be used to initialize any carousel functionality
    // Currently not needed as the design doesn't use carousels
    console.log('Carousel initialization ready');
    
    //setInterval(autoSlide, 4000);

    function showSlide(index) {
      slides.src = `images/store-image-${index}.jpg`;
    }

    function autoSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      showSlide(currentIndex);
    }
}*/




// Initialize lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Utility function for smooth animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.card, .better-choices-text, .Capturing-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}


// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

    async function showProfile() {
        console.log('showProfile called',currentUser);

        if(!currentUser){
            // Show modal
            new bootstrap.Modal(document.getElementById('loginModal')).show();
            return;
        }else{

        
            const expiresAt = currentUser.session.expires_at *1000;//session.expires_at * 1000; // convert to ms
            if (Date.now() > expiresAt) {
                showAlert('Session Expired. Please sign in to continue.');
                new bootstrap.Modal(document.getElementById('loginModal')).show();
                return;
            }
        }



        let user_metadata = currentUser.user.user_metadata;
        document.getElementById('profileNameInput').value = user_metadata.name;
        document.getElementById('profileEmailInput').value = user_metadata.email;
        document.getElementById('profilePhone').value = user_metadata.phone;
        document.getElementById('profileAddress').value = user_metadata.address;

        // Update display
        document.getElementById('profileName').textContent = user_metadata.name;
        document.getElementById('profileEmail').textContent = user_metadata.email;

        // Show modal
        new bootstrap.Modal(document.getElementById('profileModal')).show();
    }



