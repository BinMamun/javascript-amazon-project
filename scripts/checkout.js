import { cart, removeFromCart, calculateCartQuantity, updateQuantity }
    from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


let cartSummeryHTML = "";

cart.forEach((cartItem => {

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === cartItem.productId) {
            matchingProduct = product;
        }
    });

    cartSummeryHTML += `<div class="cart-item-container
    js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
        Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src="${matchingProduct.image}">

        <div class="cart-item-details">
        <div class="product-name">
            ${matchingProduct.name}
        </div>
        <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label
                js-cart-item-quantity-${matchingProduct.id}">
                ${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary
             js-update-quantity-link"
            data-product-id="${matchingProduct.id}">
            Update
            </span>
            <input type="number" class="quantity-input
                js-quantity-input
                js-quantity-input-${matchingProduct.id}"
                data-product-id="${matchingProduct.id}">
            <span class="save-quantity-link link-primary
                js-save-quantity-link" 
                data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary
            js-delete-link" data-product-id="${matchingProduct.id}">
            Delete</span>
            <div class="validation-message 
                js-validation-message-${matchingProduct.id}"></div>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        <div class="delivery-option">
            <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Tuesday, June 21
            </div>
            <div class="delivery-option-price">
                FREE Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Wednesday, June 15
            </div>
            <div class="delivery-option-price">
                $4.99 - Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Monday, June 13
            </div>
            <div class="delivery-option-price">
                $9.99 - Shipping
            </div>
            </div>
            </div>
        </div>
    </div>
</div>`;
}));

document.querySelector(".js-checkout-items").innerHTML = `${calculateCartQuantity()} items`;


document.querySelector(".js-order-summery").innerHTML = cartSummeryHTML;

document.querySelectorAll(".js-delete-link")
    .forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;

            removeFromCart(productId);

            const container = document
                .querySelector(`.js-cart-item-container-${productId}`);

            container.remove();

            document.querySelector(".js-checkout-items").innerHTML = `${calculateCartQuantity()} items`;
        })
    });


document.querySelectorAll(".js-update-quantity-link")
    .forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            const container = document
                .querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add("is-editing-quantity");
        })
    });

document.querySelectorAll(".js-save-quantity-link")
    .forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            const container = document
                .querySelector(`
                .js-cart-item-container-${productId}`);
            container.classList.remove("is-editing-quantity");


            const inputValue = document.querySelector(`.js-quantity-input-${productId}`);
            const newQuantity = Number(inputValue.value);

            const validationMessage =  document.querySelector(`.js-validation-message-${productId}`);

            if(newQuantity > 0 && newQuantity < 11 ){
            
                updateQuantity(productId, newQuantity); // updates the cart items quantity.

                document.querySelector(".js-checkout-items")
                .innerHTML = `${calculateCartQuantity()} items`; //calculates and displays the cart item quantity. 
                updateLabel(productId, newQuantity);
                //displays the updated quantity in the item-cart-container label.
                
                validationMessage.innerHTML = "";
            }else{
               
                validationMessage.innerHTML = "Value must be between 1 and 10";           
            }         

        })
    })

function updateLabel(productId, newQuantity) {
    const quantityLabel = document
        .querySelector(`.js-cart-item-quantity-${productId}`);
    quantityLabel.innerHTML = newQuantity;
}


document.querySelectorAll(".js-quantity-input")
    .forEach((input) => {
        input.addEventListener("keydown", (event) => {
            const productId = input.dataset.productId;

            const container = document
                .querySelector(`.js-cart-item-container-${productId}`);

            const inputValue = document
                .querySelector(`.js-quantity-input-${productId}`);
            const newQuantity = Number(inputValue.value);

            if (event.key === "Enter") {
                container.classList.remove("is-editing-quantity");
                updateQuantity(productId, newQuantity);
                document.querySelector(".js-checkout-items")
                    .innerHTML = `${calculateCartQuantity()} items`;

                updateLabel(productId, newQuantity);
            }
        })
    })


// function validation(productId) {
//     const inputValue = document.querySelector(`.js-quantity-input-${productId}`);
//     const newQuantity = Number(inputValue.value);

   
// }