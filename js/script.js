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
    
    // Newsletter subscription
    const subscribeBtn = document.querySelector('.footer-section .btn');
    const emailInput = document.querySelector('.footer-section input[type="email"]');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate subscription
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification function
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification alert alert-${type === 'success' ? 'success' : 'danger'} position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
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
    initializeCarousels();
    
    // Lazy loading for images
    initializeLazyLoading();
});

// Show alert message
function showAlert(message) {
    //document.getElementById("showToast").addEventListener("click", () => {
      let toastElement = document.getElementById("liveToast");
      toastElement.innerHTML = `<div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
            </div>`;
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    //});
}

// Initialize carousels function
function initializeCarousels() {
    // This function can be used to initialize any carousel functionality
    // Currently not needed as the design doesn't use carousels
    console.log('Carousel initialization ready');
    const slides = document.querySelector('.home-image');
    const slideCount = 4;
    let currentIndex = 0;
    setInterval(autoSlide, 4000);

    function showSlide(index) {
      slides.src = `images/Home-bg${index}.jpg`;
    }

    function autoSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      showSlide(currentIndex);
    }
}

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

function viewProduct(productName, productImage, productPrice, productDescription, productId) {
    

    //productJSON = JSON.parse(productJSON);
    // Populate modal
    
    console.log( "viewProduct called",window.cartData);
    //document.getElementById('productModal').style.display = "block";
    //.textContent = product.name;
    document.getElementById('productModalImage').src = productImage;
    document.getElementById('productModalTitle').textContent = productName;
    //document.getElementById('productModalCategory').textContent = 'WoMen';

    const cartItem = window.cartData.find(cart => cart.productId == productId);
    if (cartItem) {
        document.getElementById('productQuantity').value = cartItem.quantity;
    }

    //document.getElementById('productQuantity').value = window.cartData[0].quantity;
    document.getElementById('productModalPrice').textContent = '₹' + productPrice;
    document.getElementById('productModalDescription').textContent = productDescription;
    document.getElementById('addToCartBtn').setAttribute('onclick', "addToCart('" + productId  +"', document.getElementById('productQuantity').value, 'update');");

    console.log(' #addToCartBtn ',document.getElementById('addToCartBtn'));
    

 

    /*Update size options
    const sizeSelect = document.getElementById('productSize');
    sizeSelect.innerHTML = '';
    product.sizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size === 'One Size' ? 'One Size' : size;
        sizeSelect.appendChild(option);
    });*/
}

// Modal switching
    document.getElementById('showRegister').addEventListener('click', function(e) {
        e.preventDefault();
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
        registerModal.show();
    });


 document.getElementById('showLogin').addEventListener('click', function(e) {
        e.preventDefault();
        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    });

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

