import { products } from "/js/product.js";
import { clearCartItem, discountApply } from "/js/cart.js";

products.map(
  (item, index) =>
    (document.getElementById("product-list").innerHTML += `
    <div class="col-sm-6 col-md-4 col-xl-3">
    <div class="card">
      <div class="image-box text-center pt-2">
        <img
          style="height: 100px; width: 100px;"
          class=""
          src="images/${item.image}"
          alt="${item.name}"
        />
      </div>

      <div class="card-body">
        <div class="bd-highlight">
          <div
            class="pt-4 text-center flex-fill bd-highlight justify-content-start p-title"
          >
          ${item.name}
          </div>
          <div
            class="pt-4 text-center flex-fill bd-highlight justify-content-end p-title"
          >
          <small>৳</small> ${item.price.toLocaleString()}
          </div>
        </div>
        <div class="pt-4 pb-4">
        <div class="col-md-12 text-center">
            <button type="button" class="btn btn-outline-dark btn-sm p-title" onclick="window.addtocart('${
              item.id
            }');">Add to Cart</button>
        </div>
        </div>
      </div>
    </div>
  </div>
`)
);

//cart clear
clearCart.addEventListener("click", () => {
  clearCartItem();
  discountApply(0);
  document.getElementById("cupon").value = "";
});

//cupon apply btn
cuponApply.addEventListener("click", () => {
  let cupon = document.getElementById("cupon").value;
  if (cupon) {
    discountApply(5);
  } else {
    discountApply(0);
    alert("Please insert any letter or number");
  }
});
