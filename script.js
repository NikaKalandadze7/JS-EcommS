const shoppingCart = [];
let products = [];
let shoppingCartBtn = document.getElementById("shopping-cart-btn");
const shoppingCartDropdown = document.getElementById("shopping-cart-dropdown");
const cartItems = document.getElementById("cart-items");

shoppingCartBtn.addEventListener("click", () => {
  const cart = document.querySelector(".cart");
  cart.classList.toggle("shopping-cart-open");
});

function updateShoppingCart() {
  cartItems.innerHTML = "";

  shoppingCart.forEach((product) => {
    const listItem = document.createElement("li");
    const imgWrapper = document.createElement("div");
    const productImg = document.createElement("img");
    const productInfo = document.createElement("div");
    let productCount = document.createElement("span");
    const productTitle = document.createElement("h4");
    const productPrice = document.createElement("p");
    const removeFromCartBtn = document.createElement("button");
    const countWrapper = document.createElement("div");

    productTitle.textContent = product.title;
    removeFromCartBtn.textContent = "Remove";
    productImg.src = product.images[0];
    productCount.textContent = product.count;

    listItem.classList.add("cart-item");
    productInfo.classList.add("cart-item");
    imgWrapper.classList.add("cart-img-wrapper");
    productImg.classList.add("cart-img");
    productTitle.classList.add("cart-title");
    productPrice.classList.add("cart-text");
    removeFromCartBtn.classList.add("remove-from-cart-btn");
    countWrapper.classList.add("count-wrapper");
    productCount.classList.add("cart-count");

    cartItems.appendChild(listItem);
    listItem.appendChild(imgWrapper);
    imgWrapper.appendChild(productImg);
    listItem.appendChild(productInfo);
    productInfo.appendChild(productTitle);
    productInfo.appendChild(productPrice);
    productInfo.appendChild(countWrapper);
    countWrapper.appendChild(productCount);
    productInfo.appendChild(removeFromCartBtn);

    removeFromCartBtn.addEventListener("click", () => {
      if (product.count === 1) {
        const index = shoppingCart.findIndex((item) => item.id === product.id);
        if (index > -1) {
          shoppingCart.splice(index, 1);
        }
      } else {
        product.count = product.count - 1;
      }
      updateShoppingCart();
    });
    let totalPrice = product.price * product.count;
    if (product.discountPercentage > 1) {
      totalPrice = totalPrice - totalPrice * (product.discountPercentage / 100);
    }
    productPrice.textContent = `$${totalPrice.toFixed(2)}`;
  });
}

fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.products);
    products = data.products;

    let productList = document.getElementById("productList");

    function listProducts(products) {
      productList.innerHTML = "";
      products.forEach((product) => {
        const listItem = document.createElement("li");
        const imgWrapper = document.createElement("div");
        const productImg = document.createElement("img");
        const productInfo = document.createElement("div");
        const productTitle = document.createElement("h4");
        const productMisc = document.createElement("div");
        const productPrice = document.createElement("p");
        const addToCartBtn = document.createElement("button");
        const productDesc = document.createElement("p");

        if (product.discountPercentage > 1) {
          const discountedPrice =
            product.price - product.price * (product.discountPercentage / 100);
          productPrice.textContent = `$${discountedPrice.toFixed(2)}`;

          const originalPrice = document.createElement("span");

          originalPrice.textContent = `$${product.price}`;

          originalPrice.classList.add("original-price");

          const discountBadge = document.createElement("span");
          discountBadge.classList.add(
            "badge",
            "rounded-pill",
            "text-bg-danger"
          );
          discountBadge.textContent = `-${product.discountPercentage}%`;
          productPrice.appendChild(originalPrice);
          productPrice.appendChild(discountBadge);
          originalPrice.classList.add("discounted");
        } else {
          productPrice.textContent = `$${product.price}`;
        }

        productTitle.textContent = product.title;
        // productPrice.textContent = `$${product.price}`;
        addToCartBtn.textContent = "Add To Cart";
        productDesc.textContent = product.description;
        productImg.src = product.images[0];

        listItem.classList.add("card");
        imgWrapper.classList.add("img-wrapper");
        productImg.classList.add("card-img-top");
        productInfo.classList.add("card-body");
        productTitle.classList.add("card-title");
        productMisc.classList.add("product-misc");
        productPrice.classList.add("card-text");
        addToCartBtn.classList.add("add-to-cart-btn");
        productDesc.classList.add("product-desc");

        productList.appendChild(listItem);
        listItem.appendChild(imgWrapper);
        imgWrapper.appendChild(productImg);
        listItem.appendChild(productInfo);
        productInfo.appendChild(productTitle);
        productInfo.appendChild(productDesc);
        productInfo.appendChild(productMisc);
        productMisc.appendChild(productPrice);
        productMisc.appendChild(addToCartBtn);

        addToCartBtn.addEventListener("click", () => {
          const existingProduct = shoppingCart.find(
            (item) => item.id === product.id
          );

          if (existingProduct) {
            existingProduct.count += 1;
          } else {
            shoppingCart.push({ ...product, count: 1 });
          }

          updateShoppingCart();
        });
      });
    }

    listProducts(products);

    const searchBar = document.getElementById("searchInput");

    function searchProduct(searchText) {
      return products.filter((product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    searchBar.addEventListener("keyup", (event) => {
      const searchText = event.target.value;
      const searchedProducts = searchProduct(searchText);
      if (searchedProducts) {
        listProducts(searchedProducts);
      } else {
        listProducts(products);
      }
    });
  })
  .catch((error) => console.log("error: ", error));
