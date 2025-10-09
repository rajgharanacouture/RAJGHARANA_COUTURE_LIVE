// Main JavaScript functionality for Raj Gharana website

//document.addEventListener('DOMContentLoaded', function() {
const cartCount = document.getElementById('cartCount');
    window.cartData = [];
    console.log('server js loaded ');
    const supabaseUrl = "https://dklcbcbgpdrqsqupaaeb.supabase.co";


    //const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrbGNiY2JncGRycXNxdXBhYWViIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzI1ODk1MiwiZXhwIjoyMDcyODM0OTUyfQ.EN8lHW9BBf1qSNXw9fFnFU1rWgIoOsWqltks57qp-pY"; // apna anon key lagao
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrbGNiY2JncGRycXNxdXBhYWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNTg5NTIsImV4cCI6MjA3MjgzNDk1Mn0.JwMYyY4hfkRctnE2CBF_R_88GQSX58mE4cp25MvDODY"; // apna anon key lagao
    
    var client = supabase.createClient(supabaseUrl, supabaseKey);

    window.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;

    function createClient(){
        if(currentUser){
            console.log(' login ', currentUser);
            //client = supabase.createClient(supabaseUrl, currentUser.session.access_token);
            console.log('client login ', client);

        }
    }
    createClient();
    

        async function loadProducts() {
            console.log('loadProducts called');
            const { data, error } = await client.from("Products").select("*");

            if (error) {
                console.error(error);
                return;
            }

            let listDiv = document.getElementsByClassName("what-wear");
            console.log( JSON.stringify(listDiv) ,'<==listDiv==>',listDiv);
            let products = '';      

            data.forEach(product => {
                
                products += `<div class="card col-6" id="${product.id}">
                                    <div class="card-header" >
                                        <img loading="lazy" src="${product.productimage}" onclick="viewProduct('${product.productname}', '${product.productimage}', '${product.productprice}', '${product.productdescription}', '${product.id}')" 
                                        data-bs-toggle="modal" data-bs-target="#productModal" width="100%" height="180" alt="Product 1">
                                    </div>
                                    <div class="card-body">
                                        <p class="product-text">${product.productname}</p>
                                        <p>₹${product.productprice}</p>
                                        <div class="product-actions">
                                            <button class="btn btn-view" onclick="addToCart('${product.id}', 1, 'add');" >
                                                <i class="fas fa-cart-plus"></i> Add to Cart
                                            </button>
                                            
                                        </div>
                                    </div>
                                </div>`;
                
            });

            listDiv[0].innerHTML = products;

            console.log('data ',data);
            //console.log('listDiv.innerHTML ',listDiv[0].innerHTML);
        }

        loadProducts();
        loadCarts();

        async function checkSignIn(){

            if(!currentUser){
                showAlert('Unsuccessful. Please sign in to continue.');
                new bootstrap.Modal(document.getElementById('loginModal')).show();
                return false;
            }

            const expiresAt = currentUser.session.expires_at *1000;//session.expires_at * 1000; // convert to ms
            if (Date.now() > expiresAt) {
                showAlert('Session Expired. Please sign in to continue.');
                new bootstrap.Modal(document.getElementById('loginModal')).show();
                return false;
            }

            return true;

        }

        async function addToCart(productId, quantity, action){
            console.log(currentUser,' addToCart called ',client);
        
            toggleSpinner();
            try{
                if(checkSignIn()){

                    let updateCart = { productId: productId, quantity : quantity, user_id : currentUser.user.id };

                    const cartItem = cartData.find(cart => cart.productId == productId);
                    if (cartItem) {
                        updateCart.cart_id = cartItem.cart_id;
                        if(action == 'add'){
                            updateCart.quantity = cartItem.quantity + 1;
                        }
                    }

                    client = supabase.createClient(supabaseUrl, supabaseKey, {
                        global: {
                            headers: {
                            Authorization: `Bearer ${currentUser.session.access_token}`,
                            },
                        },
                    });
                    

                    let cartResponse = await client
                        .from("Cart")
                        .upsert([ updateCart ]);

                    //let { data, error } = await client.from('Cart').select('cart_id').in('productId', [productId]);   
                    
                    if (cartResponse.error) {
                        if(cartResponse.error.message == 'JWT expired'){
                            showAlert('Session expired. Please sign in again to continue.');
                        }else{
                            showAlert("Error inserting cart!");
                        }
                    } else {
                        console.log('data ',cartResponse.data);
                        if(action == 'add'){
                            showAlert('✨ Great choice! Your product is in the cart.');
                        }else{
                            showAlert('Cart updated successfully.');
                        }
                        //document.getElementById("sizeInput").value = "";
                        //document.getElementById("quantityInput").value = "";
                        loadCarts();
                    }
                }
            }catch(e){
                console.error(e);
            }finally{
                toggleSpinner();
            }
        }

        let emptyCart = document.getElementById('emptyCart');

        async function loadCarts() {

            if(!currentUser){
                return;
            }

            const cartResponse = await client.from("Cart").select("*").order("created_at", { ascending: false });
            cartData = cartResponse.data;
            
            if (cartResponse.error) { console.error(cartResponse.error); return; }

            console.log('loadCarts called' , cartData);

            if(cartData && cartData.length > 0){
                cartCount.style.display = 'unset';
                if(emptyCart) emptyCart.style.display = 'none';
            }else{
                cartCount.style.display = 'none';
                if(emptyCart) emptyCart.style.display = 'block';
            }
            


            cartCount.textContent = '' + cartData.length;

            
            
            /*const list = document.getElementById("cardList");
            list.innerHTML = "";
            data.forEach(c => {
                list.innerHTML += `
                <div class="card">
                    <span>🃏 Size: ${c.size} | Qty: ${c.quantity} <small>(${c.created_at})</small></span>
                    <button onclick="deleteCard(${c.id})">Delete</button>
                </div>`;
            });*/       
            let productIds = [];
            cartData.forEach(cart => {
                productIds.push(cart.productId);
            });
            
            let { data, error } = await client.from('Products').select('*').in('id', productIds)   

            if (error) {
                console.error('Error fetching products:', error)
                return
            }

            console.log('Products:', data)

            //data = JSON.parse( JSON.stringify(data));
            for (let index = 0; index < data.length; index++) {
                let dataElement = data[index];
                for (let cartIndex = 0; cartIndex < cartData.length; cartIndex++) {
                    const cartElement = cartData[cartIndex];
                    if(dataElement.id == cartElement.productId){
                        data[index].quantity = cartElement.quantity;
                        data[index].cart_id = cartElement.cart_id;
                    }
                }
            }

            const cartItems = document.getElementById('cartItems');

            /*cartItems.innerHTML = data.map(item => `
            <div class="cart-item">
                <img src="${item.productimage}" alt="${item.productname}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.productname}</div>
                    <div class="cart-item-price">₹${item.productprice}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.productid}, -1)">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.productid}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.productid})">Remove</button>
                </div>
            </div>
            `).join('');*/

            cartItems.innerHTML = `<!-- Mobile Card Layout -->
                <div class="container d-block d-md-none">` + data.map(item =>`
                        <div class="card mb-3">
                            <img loading="lazy" src="${item.productimage}" class="card-img-top img-thumbnail border-bottom" alt="Product image">
                            <div class="card-body p-4">
                                <h5 class="border-bottom"> <strong>${item.productname}</strong> </h5>
                                <p class="border-bottom"><span class="fw-medium">Price:</span> ₹${item.productprice}</p>
                                <p class="border-bottom"><span class="fw-medium">Quantity:</span> <input type="number" class="text-center" onblur="addToCart('${item.id}', this.value, 'update');"  style="width:20%" value="${item.quantity}" min="1"></p>
                                <p class="border-bottom"><span class="fw-medium">Subtotal:</span> ₹${item.quantity * item.productprice}</p>
                            </div>
                            <button type="button" class="btn-close position-absolute bottom-0 end-0 m-3" aria-label="Close"
            onclick="removeFromCart('${item.cart_id}')"></button>
                        </div>
                    `).join('') + `</div> 
                    <!-- Desktop Table Layout -->
                    <div class="container d-none d-md-block">
                    <table class="table table-sm table-hover align-middle">
                        <thead>
                        <tr>
                            <th>Preview</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                    ` +  data.map(item =>  `<tr>
                            <td>
                            <img loading="lazy" src="${item.productimage}" class="img-fluid" style="width:100px;" alt="Product image"><br>
                            </td>
                            <td class="mss-proxima-nova-thin-italic-4-2-0">${item.productname} </td>
                            <td>₹${item.productprice}</td>
                            <td>
                            <input type="number" min="1" value="${item.quantity}" onblur="addToCart('${item.id}', this.value, 'update');" class="form-control text-center" style="width:80px;">
                            </td>
                            <td>₹${item.quantity * item.productprice}</td>
                            <td>
                                <button type="button" class="btn-close" aria-label="Close" onclick="removeFromCart('${item.cart_id}')"></button>
                            </td>
                        </tr>`).join('') + `</tbody>
                    </table>
                    </div>`;

        
        const total = data.reduce((sum, item) => sum + (item.productprice * item.quantity), 0);
        document.getElementById('cartTotal').textContent = total.toFixed(2);

        }

        async function removeFromCart(cartId){
            toggleSpinner();
            try{
                console.log('removeFromCart called',cartId);
                if(checkSignIn()){
                    console.log(await client.from("Cart").delete().eq("cart_id",cartId));
                    loadCarts();
                    showAlert("Product successfully removed!");
                }
            }catch(e){
                console.error(e);
            }finally{
                toggleSpinner();
            }
        }
    


    async function signIn() {
    
        console.log('data called');
        const email = document.getElementById("loginEmail").value.trim();
        
        const password = document.getElementById("loginPassword").value.trim();

        if (!email || !password) {
            showAlert("Kindly enter your email and password!");
            return;
        }

        // Check user in DB
        /*const { data, error } = await client
        .from("Users")
        .select("user_id, Name, Email, password")
        .eq("Email", email)
        .eq("password", password)  */
        
        let signInResponse = await client.auth.signInWithPassword({ email : email, password : password });
        
        
        console.log('signin data, ',signInResponse);
        

        if (signInResponse.error) {
        console.error(signInResponse.error);
        showAlert("Sign-in unsuccessful. Please verify your details.!");
        return;
        }

        if (signInResponse.data) {
            // user found
            currentUser = signInResponse.data;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            loadCarts();
            //window.currentUserId = user.user_id; // Save logged-in user id
            showAlert(`Welcome ${signInResponse.data.user.user_metadata.first_name} 😃`);

            createClient();
            bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        } else {
            showAlert("Invalid email or password!");
        }
    }

    async function signUp() {
        toggleSpinner();
        try{

            const name = document.getElementById("registerFirstName").value.trim();
            const lastName = document.getElementById("registerLastName").value.trim();
            const email = document.getElementById("registerEmail").value.trim();
            const phoneNumber = document.getElementById("registerPhoneNumber").value.trim();
            const password = document.getElementById("registerPassword").value; // raw password (testing only)
            const confirmPassword = document.getElementById("confirmPassword").value;

            console.log("name",name,"lastName", lastName,"email",email, "phoneNumber",phoneNumber,"password", password)
            if (!name || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
                showAlert("Please fill all fields!");
                return;
            }
            

                // Validation
            if (password !== confirmPassword) {
                showAlert('Passwords do not match!', 'danger');
                return;
            }

            if (password.length < 6) {
                showAlert('Password must be at least 6 characters long!', 'danger');
                return;
            }

            let signUpResponse = await client.auth.signUp({ email, password,  options: {
                            data: {
                                first_name: name,
                                last_name: lastName,
                                phone: phoneNumber
                            }
                        } });
            
            console.log(' signUpResponse ', signUpResponse);

            if(signUpResponse.error){
                showAlert("Signup failed! Kindly check your details or try again later.");
            }else{
                showAlert("🎉 Signup successful! Please verify your email to activate your account.");
                bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
                new bootstrap.Modal(document.getElementById('loginModal')).show();
            }
        }catch(e){
            console.error(e);
        }finally{
            toggleSpinner();
        }

    }
      
    async function processCheckout() {

        if (cartData.length === 0) {
            showAlert('Your cart is empty!');
            return;
        }

        if(checkSignIn()){
            await client
                .from("Order")
                .insert([ {user_id : currentUser.user.id} ]);

            const orderResponse = await client.from("Order").select("*").order("created_at", { ascending: false });

            if(orderResponse.error){
                if(orderResponse.error.message == 'JWT expired'){
                    showAlert('Session expired. Please sign in again to continue.');
                }else{
                    showAlert("Error inserting cart!");
                }
            }

            showAlert("Order Placed successfully");

            console.log('orderResponse ', orderResponse);
            let orderId = orderResponse.data[0].order_id;

            let productIds = [];
                cartData.forEach(cart => {
                    productIds.push(cart.productId);
                });
                
            let productResponse = await client.from('Products').select('*').in('id', productIds);

            //data = JSON.parse( JSON.stringify(data));
                for (let index = 0; index < productResponse.data.length; index++) {
                    let dataElement = productResponse.data[index];
                    for (let cartIndex = 0; cartIndex < cartData.length; cartIndex++) {
                        const cartElement = cartData[cartIndex];
                        if(dataElement.id == cartElement.productId){
                            cartData[index].price = dataElement.productprice;
                            cartData[index].productname = dataElement.productname;
                        }
                    }
                }


            let orderLineItems = [];
            cartData.forEach( cart=> {
                orderLineItems.push( { product_id: cart.productId, 
                    quantity : cart.quantity, user_id : currentUser.user.id, price : cart.price,
                    product_name: cart.productname, order_id : orderId  });
            });

            let Order_Line_ItemResponse = await client
                    .from("Order_Line_Item")
                    .insert( orderLineItems );

            console.log(' Order_Line_ItemResponse called ',Order_Line_ItemResponse);        

            let cartIds = [];
            cartData.forEach(cart => {
                cartIds.push(cart.cart_id);
            });

            await client
                    .from("Cart")
                    .delete().in("cart_id",cartIds);

            loadCarts();
        }
    }

    function handleLogout(){
        showAlert('You have been logged out successfully.');
        currentUser = null;
        localStorage.removeItem('currentUser');
        location.reload();
        client.auth.signOut()
    }

//});
