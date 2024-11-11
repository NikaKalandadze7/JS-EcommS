// GET PRODUCTS
fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.products);
    const products = data.products;

    let productList = document.getElementById("productList");

    function listProducts(products) {
      productList.innerHTML = "";
      products.forEach((product) => {
        const listItem = document.createElement("li");
        const productTitle = document.createElement("h4");
        const productPrice = document.createElement("p");
        const productImg = document.createElement("img");

        productTitle.textContent = product.title;
        productPrice.textContent = product.price;
        productImg.src = product.images[0];
        productImg.classList.add("image");
        productList.appendChild(listItem);
        listItem.appendChild(productTitle);
        listItem.appendChild(productPrice);
        listItem.appendChild(productImg);
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

// // POST
// let userData = {
//   title: "newtitle",
//   id: 1,
// };

// fetch("https://jsonplaceholder.typicode.com/posts", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(userData),
// });

// //promise

// // let myPromise = new Promise((resolve, reject) => {
// //   let success = true;
// //   if (success) {
// //     resolve("RESOLUTION SUCCESSFUL");
// //   } else {
// //     reject("UNSUCCESSFUL");
// //   }
// // });

// // myPromise
// //   .then((result) => console.log(result))
// //   .catch((error) => console.log(error));

// // let fetchData = new Promise((resolve, reject) => {
// //   fetch("https://dummyjson.com/products")
// //     .then((response) => response.json())
// //     .then((data) => resolve(data))
// //     .catch((error) => reject(error));
// // });

// // fetchData
// //   .then((data) => {
// //     console.log(data);
// //   })
// //   .catch((error) => console.log(error));

// // console.log("start");
// // setTimeout(() => {
// //   console.log("task");
// // }, 4000);
// // console.log("end");

// async function handleProducts() {
//   let success = true;
//   if (success) {
//     console.log("SUCCESSFUL");
//   } else {
//     console.log("UNSUCCESSFUL");
//   }
// }

// handleProducts().then((result) => console.log(result));
