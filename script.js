// Script for navigation bar
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');


if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

function removeRow(iconElement) {
    var row = iconElement.parentNode.parentNode;
    row.parentNode.removeChild(row);
    console.log('Row removed'); 
    updateTotals();
    alert("Item removed from cart!");
    saveCart();
}

function updateSubtotal(inputElement, subtotalId) {
    var row = inputElement.parentNode.parentNode;
    var priceElement = row.cells[3];
    var quantityElement = row.cells[4].querySelector('input');
    var subtotalElement = row.cells[5];

    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = parseInt(quantityElement.value);
    var subtotal = price * quantity;

    subtotalElement.innerText = '$' + subtotal.toFixed(2);
    updateTotals();
}

function updateTotals() {
    var totalSubtotal = 0;

    // Iterate through each row and update the total subtotal
    for (var i = 1; i <= 3; i++) {
        var subtotalElement = document.getElementById('subtotal' + i);

        // Check if the element exists before trying to read its innerText
        if (subtotalElement) {
            var subtotal = parseFloat(subtotalElement.innerText.replace('$', ''));
            totalSubtotal += subtotal;
        }
    }

    var totalSubtotalElement = document.getElementById('totalSubtotal');
    totalSubtotalElement.innerText = '$' + totalSubtotal.toFixed(2);

    // Assuming shipping is free, the grand total is the same as the total subtotal
    var grandTotalElement = document.getElementById('grandTotal');
    grandTotalElement.innerText = '$' + totalSubtotal.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function () {
    // Check if there are rows in the cart
    var cartBody = document.getElementById('cartBody');
    if (cartBody.children.length === 0) {
        // If no rows, display a message
        var messageRow = document.createElement('tr');
        var messageCell = document.createElement('td');
        messageCell.setAttribute('colspan', '6');
        messageCell.textContent = 'You don\'t have any items in your cart.';
        messageRow.appendChild(messageCell);
        cartBody.appendChild(messageRow);
    } else {
        // If there are rows, update totals
        updateTotals();
    }
});


function addToCart() {
    // Fetch product details
    var image = document.getElementById('MainImg').src;
    var name = document.querySelector('.single-pro-details h4').innerText;
    var price = parseFloat(document.getElementById('pricePerItem').innerText.replace('$', ''));
    var quantity = parseInt(document.getElementById('quantity').value);
    alert("Item added to cart!");

    // Calculate total price for the item
    var total = price * quantity;

    // Create an object representing the cart item
    var cartItem = {
        image: image,
        name: name,
        price: price,
        quantity: quantity,
        total: total
    };

    // Retrieve existing cart items from localStorage
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Add the new item to the cart
    cartItems.push(cartItem);

    // Save the updated cart items to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    saveCart();

    // Optionally, you can redirect the user to the cart page after adding an item
    // window.location.href = 'cart.html';
}
// Load and display cart items from localStorage
document.addEventListener('DOMContentLoaded', function () {
    var cartTableBody = document.getElementById('cartBody');
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the existing content in the cart table body
    cartTableBody.innerHTML = '';

    // Loop through cart items and create rows
    cartItems.forEach(function (item) {
        var cartRow = document.createElement('tr');
        cartRow.innerHTML = `
    <td><i class="far fa-times-circle" onclick="removeRow(this)"></i><a href="#"></a></td>
    <td><img src="img/products/f1.jpg" alt="${item.name}" width="50"></td>
    <td>${item.name}</td>
    <td>$${item.price.toFixed(2)}</td>
    <td>${item.quantity}</td>
    <td class="subtotal">$${item.total.toFixed(2)}</td>
`;
        cartTableBody.appendChild(cartRow);
    });

    // Update totals in the cart
    updateTotals();
});

// Load cart from localStorage when the page loads
window.onload = function () {
    loadCart();
    updateTotals(); // Make sure to update totals when loading the cart
};

function loadCart() {
    // Load cart data from localStorage
    var cartData = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Display cart items on the page
    var cartBody = document.getElementById("cartBody");
    cartBody.innerHTML = "";

    for (var i = 0; i < cartData.length; i++) {
        var item = cartData[i];
        var cartRow = cartBody.insertRow();
        cartRow.innerHTML = `
            <td><i class="far fa-times-circle" onclick="removeRow(this)"></i><a href="#"></a></td>
            <td><img src="${item.image}" alt="${item.name}" width="50"></td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td class="subtotal">$${item.total.toFixed(2)}</td>
        `;
    }

    // Update totals based on loaded cart
    updateTotals();
}

function saveCart() {
    // Save cart data to localStorage
    var cartRows = document.getElementById("cartBody").getElementsByTagName("tr");
    var cartData = [];

    for (var i = 0; i < cartRows.length; i++) {
        var row = cartRows[i];
        var name = row.cells[2].innerText;
        var price = parseFloat(row.cells[3].innerText.replace('$', ''));
        var quantity = parseInt(row.cells[4].innerText);
        var total = parseFloat(row.cells[5].innerText.replace('$', ''));

        var item = {
            name: name,
            price: price,
            quantity: quantity,
            total: total,
            // Add 'image' property if it's available in your product data
            // image: "path_to_image.jpg"
        };

        cartData.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cartData));
}

function displayCartItems() {
    var cartTableBody = document.getElementById('cartBody');
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Clear the existing content in the cart table body
    cartTableBody.innerHTML = '';

    // Loop through cart items and create rows
    cartItems.forEach(function (item, index) {
        var cartRow = document.createElement('tr');
        cartRow.innerHTML = `
            <td><i class="far fa-times-circle" onclick="removeRow(this)"></i></a></td>
            <td><img src="${img/products/f1.jpg}" alt="${item.name}" width="50"></td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" onchange="updateSubtotal(this, 'subtotal${index + 1}')"></td>
            <td class="subtotal" id="subtotal${index + 1}">$${item.total.toFixed(2)}</td>
        `;
        cartTableBody.appendChild(cartRow);
    });
}

function redirectToSProduct(imageUrl) {
    // Redirect to sproduct.html with the selected image URL as a query parameter
    window.location.href = `sproduct.html?image=${encodeURIComponent(imageUrl)}`;
}

// JavaScript to retrieve the image URL from the query parameter and display it
window.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const imageUrl = queryParams.get('image');
    
    if (imageUrl) {
        const productImage = document.getElementById('productImage');
        productImage.src = decodeURIComponent(imageUrl);
    }
});

function showImage(imageUrl) {
    const mainImage = document.getElementById('MainImg');
    mainImage.src = imageUrl;
}




// Function to show the popup notification
function showNotification(message) {
    const notification = document.getElementById("cartNotification");
    const notificationText = document.getElementById("notificationText");
    
    notificationText.textContent = message;
    notification.style.display = "block";
    
    // Hide the notification after 3 seconds (adjust as needed)
    setTimeout(function () {
        notification.style.display = "none";
    }, 3000);
}

// Function to handle adding to cart
function addToCart() {
    // Add your logic to add the item to the cart here
    
    // Show the notification
    showNotification("Item successfully added to cart!");
}
