// Hamburger menu toggle
const menuIcon = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-bar");

menuIcon.addEventListener("click", function () {
    nav.classList.toggle("active");
});

// Popup cart toggle
const cart = document.querySelector(".cart");
const popUpCart = document.querySelector(".popUp-cart");

cart.addEventListener("click", function() {
    popUpCart.classList.toggle("show");
});

document.addEventListener("click", function (e) {
    if (!cart.contains(e.target) && !popUpCart.contains(e.target)) {
        popUpCart.classList.remove("show");
    }
});

// Quantity management
const quantityContainer = document.querySelector('.quantity');
const quantityValue = quantityContainer.querySelector('p');
const plusButton = quantityContainer.querySelector('.plus');
const minusButton = quantityContainer.querySelector('.minus');

// Set the initial quantity value
let quantity = 0;

// Function to update the quantity display
function updateQuantityDisplay() {
    quantityValue.textContent = quantity;
}

// Function to handle the plus button click
function increaseQuantity() {
    quantity++;
    updateQuantityDisplay();
}

// Function to handle the minus button click
function decreaseQuantity() {
    if (quantity > 0) {
        quantity--;
        updateQuantityDisplay();
    }
}

// Add click event listeners to the plus and minus buttons
plusButton.addEventListener('click', increaseQuantity);
minusButton.addEventListener('click', decreaseQuantity);

// Initialize the quantity display
updateQuantityDisplay();

// Add to cart functionality
const addToCartButton = document.querySelector('button');
const amountContainer = document.querySelector('#amount-cart');
const activecart = document.querySelector('.activeCart');

function updateAmountDisplay(quantity) {
    amountContainer.textContent = `${quantity}`;
}

function formatPrice(price) {
    return price.toFixed(2);
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
    const cartItem = document.querySelector('.cart-item')

    if (cartItem) {
        popUpCart.removeChild(cartItem);
        popUpCart.appendChild(activecart); 
        amountContainer.style.display = 'none';

        quantity = 0;
        updateQuantityDisplay();
        updateAmountDisplay(quantity);
    }
}});

function addToCart() {
    const quantityValue = parseInt(document.querySelector('.quantity p').textContent);
    
    if (quantity > 0) {
        popUpCart.removeChild(activecart);
        amountContainer.style.display = 'block';

        const pricePerItem = 125;
        const totalPrice = pricePerItem * quantityValue;
        const formattedTotalPrice = formatPrice(totalPrice);

        const popupCart = document.querySelector('.popUp-cart');
        const cartItems = popupCart.querySelectorAll('.cart-item');
        const isCartEmpty = cartItems.length === 0;

        const cartItemHTML = `
            <div class="cart-item">
                <img src="images/image-product-1.jpg" alt="" class="item-image">
                <div class="item-details">
                    <p class="item-name">Fall Limited Edition Sneakers</p>
                    <img src="images/icon-delete.svg" alt="Delete" class="delete">
                    <div class="priceCont">
                        <p class="item-price">$${formatPrice(pricePerItem)} x ${quantityValue}</p>
                        <p class="item-total">$${formattedTotalPrice}</p>
                    </div>
                    <button class="popUpbtn">Checkout</button>
                </div>
            </div>
        `;

        if (!isCartEmpty) {
            popUpCart.innerHTML = cartItemHTML;
        } else {
            popUpCart.innerHTML += cartItemHTML;
        }

        updateAmountDisplay(quantityValue);
    } else {
        popUpCart.appendChild(activecart);
        amountContainer.style.display = 'none';
    }
}

addToCartButton.addEventListener('click', addToCart);

// Selecting elements
const thumbnails = document.querySelectorAll(".thumbnails div");
const thumbsLight = document.querySelectorAll(".thumbnails-light div");
const hero = document.getElementById("hero");
const heroLightbox = document.getElementById("hero-lightbox");
const closeMenu = document.querySelector(".closeMenu")
const light1 = document.getElementById("light-1");
const light2 = document.getElementById("light-2");
let lightbox = false;

// Function to handle lightbox display
function lightBox(thumbsLight, heroLight, index) {
    thumbsLight.forEach((e) => {
        e.children[0].classList.remove("active");
        e.classList.remove("ring-active");
    });

    let found = thumbsLight[index - 1]; // Adjust index to match array indexing (starting from 0)

    found.classList.add("ring-active");
    found.children[0].classList.add("active");

    heroLight.src = found.children[0].src;

    heroLight.classList.add("animate-change");
    setTimeout(() => {
        heroLight.classList.remove("animate-change");
    }, 400);
}

closeMenu.addEventListener("click", closeLightbox)
function closeLightbox() {
    light1.classList.add("hidden");
    light2.classList.add("invisible");
}

// Click event listener for document
document.addEventListener("click", function (e) {
    // Lightbox toggle logic
    if (e.target.id == "hero") {
        light1.classList.remove("hidden");
        light2.classList.remove("invisible");
        light1.classList.add("animate-lightChange");
        light2.classList.add("animate-change");
        setTimeout(() => {
            light1.classList.remove("animate-lightChange");
            light2.classList.remove("animate-change");
        }, 400);
        return (lightbox = true);
    }

    // Next and previous button logic
    if (e.target.id == "previous" || e.target.id == "next") {
        const src = heroLightbox.src;
        let foundIndex = Array.from(thumbsLight).findIndex((e) => e.children[0].src == src);
        let id;
        if (e.target.id == "previous") {
            id = parseInt(foundIndex) === 0 ? thumbsLight.length : foundIndex;
        } else {
            id = parseInt(foundIndex) === thumbsLight.length - 1 ? 1 : foundIndex + 2;
        }
        lightBox(thumbsLight, heroLightbox, id);
        return;
    }

    	// Next and Previous 2
	if (e.target.id == "previous-mobile" || e.target.id == "next-mobile") {
		let index = parseInt(
			hero.src.substring(hero.src.length - 5, hero.src.length - 4)
		);
		const firstIndex = index;

		if (e.target.id == "next-mobile") {
			index += 1;
		} else {
			index -= 1;
		}

		if (index > 4) {
			index = 1;
		} else if (index < 1) {
			index = 4;
		}

		hero.src = hero.src
			.slice(0, hero.src.length - 5)
			.concat(`${index}.jpg`);

		hero.classList.add("animate-change");
		setTimeout(() => {
			hero.classList.remove("animate-change");
		}, 400);
	}
});


localStorage["total"] = 0;

// Check cart items
let items = parseInt(localStorage.getItem("total"));
if (items <= 0 || !items) {
	emptyCart(insideCart);
} else {
	loadCart(insideCart, items);
}

// Config localStrogae
if (localStorage["total"] == 0) {
	localStorage.setItem("total", amount.innerHTML);
} else {
	amountCart.innerHTML = items;
	if (amountCart.innerHTML >= 1) {
		amountCart.classList.replace("scale-0", "scale-1");
	}
}


// mobile next and previous
const previousImgMobile = document.getElementById("previous-mobile");
const nextImgMobile = document.getElementById("next-mobile");

// Function to handle previous image click on mobile
function previousImageMobile() {
    const currentIndex = Array.from(document.querySelectorAll('.thumbnail-img .ring-active')).findIndex((e) => e.children[0].classList.contains("active"));
    const previousIndex = currentIndex === 0 ? 3 : currentIndex - 1;
    const previousImg = document.querySelectorAll('.thumbnail-img div')[previousIndex];
    previousImg.classList.add("ring-active");
    previousImg.children[0].classList.add("active");

    const heroImg = document.getElementById("hero");
    heroImg.src = previousImg.children[0].src;
}

// Function to handle next image click on mobile
function nextImageMobile() {
    const currentIndex = Array.from(document.querySelectorAll('.thumbnail-img .ring-active')).findIndex((e) => e.children[0].classList.contains("active"));
    const nextIndex = currentIndex === 3 ? 0 : currentIndex + 1;
    const nextImg = document.querySelectorAll('.thumbnail-img div')[nextIndex];
    nextImg.classList.add("ring-active");
    nextImg.children[0].classList.add("active");

    const heroImg = document.getElementById("hero");
    heroImg.src = nextImg.children[0].src;
}

// Add click event listeners to previous and next images on mobile
previousImgMobile.addEventListener('click', previousImageMobile);
nextImgMobile.addEventListener('click', nextImageMobile);