import { products } from "/js/product.js";

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

//init cart heading
function initCart() {
  if (cart.length > 0) {
    document.getElementById("init-cart").innerHTML = `
  <div class="row p-1">
    <div class="row pt-2 main align-items-center">
      <div class="col">&nbsp;</div>
      <div class="col">
        <div class="row p-title">Product</div>
      </div>
      <div class="col">
        <div class="row p-title">Quantity</div>
      </div>
      <div class="col">
        <div class="row p-title">Unit Price</div>
      </div>
      <div class="col">
        <div class="row p-title">Total Price</div>
      </div>
      <div class="col">
        <div class="row p-title">Delete</div>
      </div>
    </div>
  </div>
  `;
  } else {
    document.getElementById("init-cart").innerHTML = "";
  }
}

function addToCart(id) {
  if (cart.some((item) => item.id == id)) {
    changequantity("plus", id);
  } else {
    const item = products.find((p) => p.id == id);
    cart.push({
      ...item,
      quantity: 1,
    });
  }
  updateCart();
}

// change number of units for an item
function changequantity(action, id) {
  cart = cart.map((item) => {
    let quantity = item.quantity;

    if (item.id == id) {
      if (action === "minus" && quantity > 1) {
        quantity--;
      } else if (action === "plus" && quantity) {
        quantity++;
      }
    }

    return {
      ...item,
      quantity,
    };
  });

  updateCart();
}

// update cart
function updateCart() {
  initCart();
  renderCartItems();
  renderSubtotal();
  let cupon = document.getElementById("cupon").value;
  if (cupon) {
    discountApply(5);
  }

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

function clearCartItem() {
  cart = [];
  updateCart();
  renderTotal(0);
}

// render cart items
function renderCartItems() {
  // clear cart element
  document.getElementById("cart-items").innerHTML = ""; 
  cart.forEach((item) => {
    document.getElementById("cart-items").innerHTML += `
      <div class="row p-1">
      <div class="row p-3 main align-items-center border">
          <div class="col-2"><img class="img-fluid" src="images/${
            item.image
          }"></div>
          <div class="col">
              <div class="row p-title"><small>${item.name}</small></div>
          </div>
          <div class="col pddding-0">
             <div class="row units pddding-left-6">
                <div class="col-4 pddding-left-0">
                <div class="btn minus button-minus border rounded-circle icon-shape" onclick="changequantity('minus', ${
                  item.id
                })">-</div>
                </div>
                <div class="col-4 pddding-0 text-center pt-2">
                <div class="number">${item.quantity}</div>
                </div>
                <div class="col-4 pddding-left-0">
                <div class="btn plus button-minus border rounded-circle icon-shape" onclick="changequantity('plus', ${
                  item.id
                })">+</div>     
                </div>      
            </div>
          </div>
          <div class="col text-end">${item.price} </div>
          <div class="col text-end">${(item.price * item.quantity).toFixed(
            2
          )} </div>
          <div class="col text-center">
            <button class="item-info" onclick="removeItemFromCart(${item.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
            </button>
          </div>
      </div>
  </div>
        `;
  });
}
// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
    //totalItems += item.quantity;
  });

  document.getElementById(
    "subtotal-amount"
  ).innerHTML = `<strong> Sub Total </strong> :  <small>৳</small> ${totalPrice.toFixed(
    2
  )}`;
}

// calculate and render total
function renderTotal(total_discount = 0) {
  let subTotalPrice = 0,
    totalPrice = 0;

  cart.forEach((item) => {
    subTotalPrice += item.price * item.quantity;
  });
  totalPrice = subTotalPrice - total_discount;
  if (total_discount > 0) {
    document.getElementById(
      "total-amount"
    ).innerHTML = `<strong> Total </strong> :  <small>৳</small> ${totalPrice.toFixed(
      2
    )}`;
  } else {
    document.getElementById("total-amount").innerHTML = "";
  }
}

//discount apply
function discountApply(discount) {
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  let total_discount = (totalPrice * discount) / 100;
  console.log(totalPrice);
  console.log(total_discount);
  if (total_discount > 0) {
    document.getElementById(
      "total-discount"
    ).innerHTML = `<strong> Total Discount (5%)</strong> :  <small>৳</small> ${total_discount.toFixed(
      2
    )}`;
    renderTotal(total_discount);
  } else {
    document.getElementById(
      "total-discount"
    ).innerHTML = "";
    renderTotal(0);
  }
}

window.addtocart = addToCart;

window.removeItemFromCart = removeItemFromCart;

window.changequantity = changequantity;

export { clearCartItem, discountApply };
