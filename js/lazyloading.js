
    const modalsHTML = `
     <!-- Product Modal start-->
    <div class="modal fade" id="productModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header d-flex ">
                    <h5 class="modal-title" id="productModalTitle">Product Details</h5>
                    <i class="fa fa-close closeIcon" data-bs-dismiss="modal"></i>    
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img id="productModalImage" src="" alt="Product" class="img-fluid rounded">
                        </div>
                        <div class="col-md-6">
                            <h4 id="productModalName"></h4>
                            <p class="text-muted" id="productModalCategory"></p>
                            <h5 id="productModalPrice"></h5>
                            <p id="productModalDescription"></p>
                            <!--<div class="mb-3">
                                <label class="form-label">Size:</label>
                                <select class="form-select" id="productSize">
                                    <option value="S">Small</option>
                                    <option value="M">Medium</option>
                                    <option value="L">Large</option>
                                    <option value="XL">Extra Large</option>
                                </select>
                            </div>-->
                            <div class="mb-3">
                                <label class="form-label fw-bold">Quantity:</label>
                                <input type="number" class="form-control" id="productQuantity" value="1" min="1">
                            </div>
                            <button class="btn btn-view w-100" onclick="addToCart(2)" id="addToCartBtn">
                                <i class="fas fa-cart-plus"></i> &nbsp; Update Cart    
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Product Modal stop-->

     <!-- Login Modal start-->
    <div class="modal fade" id="loginModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Sign In To Continue Shopping</h5>
                    <i class="fa fa-close closeIcon" data-bs-dismiss="modal"></i> 
                </div>
                <div class="modal-body">
                    <form id="loginForm">
                        <div class="mb-3">
                            <label for="loginEmail" class="form-label">Email Address</label>
                            <input type="email" class="form-control" id="loginEmail" required>
                        </div>
                        <div class="mb-3">
                            <label for="loginPassword" class="form-label">Password</label>
                            <input type="password" class="form-control" id="loginPassword" required>
                        </div>
                        <div class="d-grid">
                            <button type="button" onclick="signIn();" class="btn btn-view">Login</button>
                        </div>
                    </form>
                    <div class="text-center mt-3">
                        <p class="mb-0">Don't have an account? <a href="#" id="showRegister">Register here</a></p>
                        <!--<p class="mb-0"><a href="#" id="forgotPassword">Forgot your password?</a></p>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Login Modal stop-->

    <!-- Registration Modal start-->
    <div class="modal fade" id="registerModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Register</h5>
                    <i class="fa fa-close closeIcon" data-bs-dismiss="modal"></i> 
                </div>
                <div class="modal-body">
                    <form id="registerForm">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="registerFirstName" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="registerFirstName" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="registerLastName" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="registerLastName" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="registerEmail" class="form-label">Email Address</label>
                            <input type="email" class="form-control" id="registerEmail" required>
                        </div>
                        <div class="mb-3">
                            <label for="registerPhoneNumber" class="form-label">Phone Number</label>
                            <input type="text" class="form-control" id="registerPhoneNumber" required>
                        </div>
                        <div class="mb-3">
                            <label for="registerPassword" class="form-label">Password</label>
                            <input type="password" class="form-control" id="registerPassword" required minlength="6">
                            <div class="form-text">Password must be at least 6 characters long.</div>
                        </div>
                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="confirmPassword" required>
                        </div>
                        <div class="d-grid">
                            <button type="button" onclick="signUp();" class="btn btn-view">Let’s Get You Signed In</button>
                        </div>
                    </form>
                    <div class="text-center mt-3">
                        <p class="mb-0">Already have an account? <a href="#" id="showLogin">Login here</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Registration Modal stop-->

    <!-- Profile Modal start -->
    <div class="modal fade" id="profileModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">User Profile</h5>
                    <i class="fa fa-close closeIcon" data-bs-dismiss="modal"></i>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <!--<div class="profile-avatar mb-3">
                                <i class="fas fa-user-circle fa-5x text-primary"></i>
                            </div>-->
                            <h5 id="profileName">John Doe</h5>
                            <p class="text-muted" id="profileEmail">john@example.com</p>
                        </div>
                        <div class="col-md-8">
                            <form id="profileForm">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="profileFirstName" class="form-label">First Name</label>
                                        <input type="text" class="form-control" id="profileFirstName" required>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="profileLastName" class="form-label">Last Name</label>
                                        <input type="text" class="form-control" id="profileLastName" required>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="profileEmailInput" class="form-label">Email Address</label>
                                    <input type="email" class="form-control" id="profileEmailInput" required>
                                </div>
                                <div class="mb-3">
                                    <label for="profilePhone" class="form-label">Phone Number</label>
                                    <input type="tel" class="form-control" id="profilePhone">
                                </div>
                                <div class="d-grid">
                                    <button type="button" onclick="handleLogout();" class="btn btn-view">Log Out</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Profile Modal stop-->

    <!-- Cart Modal start -->
    <div class="modal fade" id="cartModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Checkout List</h5>
                     <i class="fa fa-close closeIcon" data-bs-dismiss="modal"></i> 
                </div>
                <div class="modal-body">
                    <div id="cartItems">
                        <!-- Cart items will be displayed here -->
                    </div>

                    <div class="text-center" id="emptyCart">
                        <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                        <p class="text-muted">Your cart is empty</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="d-flex justify-content-between w-100">
                        <h5>Total: ₹<span id="cartTotal">0.00</span></h5>
                        <button class="btn btn-view" onclick="processCheckout();" data-bs-dismiss="modal" id="checkoutBtn">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Cart Modal stop -->
    `;

    // Append modals to body
    document.body.insertAdjacentHTML('beforeend', modalsHTML);
    // Modal switching
    document.getElementById('showRegister').addEventListener('click', function(e) {
        e.preventDefault();
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        new bootstrap.Modal(document.getElementById('registerModal')).show();
        
    });

    //for carousal start

    const slideCount = 9;
    let currentIndex = 0;

    function changeSlide(direction) {
        //const direction = button.getAttribute("data-bs-slide");
        {
            let currentButton = document.querySelector(`[data-bs-slide-to="${currentIndex}"]`);
            currentButton.classList.remove('active');
        }
        if (direction == "next") {
            currentIndex = (currentIndex + 1) % slideCount;
        } else if (direction == "prev") {
            currentIndex = ((currentIndex + slideCount) - 1) % slideCount;
        }else {
            currentIndex = direction;
        }
        {
            let newActiveButton = document.querySelector(`[data-bs-slide-to="${currentIndex}"]`);
            newActiveButton.classList.add('active');
        }

        document.querySelector('.home-image').src = `https://dklcbcbgpdrqsqupaaeb.supabase.co/storage/v1/object/public/Static_Images/Home-bg${currentIndex}.jpg`;
        
    }
    const carouselElement = document.getElementById('carouselExample');

    var startX = 0;
    carouselElement.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });
    carouselElement.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) { // minimum swipe distance
            if (diffX > 0) {        
                changeSlide('next');
            } else {
                changeSlide('prev');
            }
        }
    });
    //for carousal end




    document.getElementById('showLogin').addEventListener('click', function(e) {
        e.preventDefault();
        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
        new bootstrap.Modal(document.getElementById('loginModal')).show();
    });


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



