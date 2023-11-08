export const cart = [];

export function addToCart(productId){
    const addQuantity = document.querySelector(`.js-quantity-selector-${productId}`).value;
  
    let matchingItem;
  
    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    if(matchingItem){
      matchingItem.quantity+= Number(addQuantity);
    }else{
      cart.push({
        productId : productId,
        quantity: Number(addQuantity)
      })
    }
  }