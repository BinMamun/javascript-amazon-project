import {cart, addToCart} from "../data/cart.js";
import {products} from "../data/products.js";


let productsHTML = "";
products.forEach((product)=>{
    productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
      ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
        ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart-button" 
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`
});


document.querySelector(".js-products-grid")
    .innerHTML = productsHTML;


function updateCartQuantity(){  
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity")
    .innerText = cartQuantity;
}


function addedNotification(productId, timeOutId){
  const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);

  clearTimeout(timeOutId);            
  addedToCart.classList.add("added-to-cart-visible");

  timeOutId = setTimeout(() => {
    if(addedToCart.classList.contains   ("added-to-cart-visible")){
      addedToCart.classList.remove("added-to-cart-visible");
    }
  }, 2000);
}

document.querySelectorAll(".js-add-to-cart-button")
  .forEach((button) => {
    let timeOutId;
      button.addEventListener("click", () => {
        const productId = button.dataset.productId;

        addToCart(productId); //Adds item to the cart.
          
        updateCartQuantity(); // Counts the cart quantity.

        addedNotification(productId, timeOutId); // Displays added notification & then hides after 2 seconds. 
    })
})
