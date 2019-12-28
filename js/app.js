/**
 * TODO:
 *
 * 1. Add product to cart
 * 2. Remove product to cart
 * 3. Clean cart
 *
 * Use local storage to memoryze cart for user
 *
 *
 */
//vars

/**
 * block for cart elements tr->td
 */
const productCart = document.querySelector("#lista-carrito tbody");
const emptyCartBtn = document.querySelector("#vaciar-carrito");
const productList = document.querySelector("#lista-cursos");
document.addEventListener("DOMContentLoaded", showAddedProductsLS);

console.log(productCart);
//events
createEvents();

function createEvents() {
  productList.addEventListener("click", addToCart);
  productCart.addEventListener("click", removeFromCart);
  emptyCartBtn.addEventListener("click", emptyCart);
}

//functions
function addToCart(e) {
  e.preventDefault();
  //   console.log(e.target.getAttribute("data-id"));
  //   console.log(e.target.parentElement.querySelector("img").getAttribute("src"));
  //   console.log(e.target.parentElement.querySelector(".precio").textContent);
  //   console.log(e.target.parentElement.querySelector("h4").textContent);
  //   console.log(e.target.parentElement);
  //   console.log("Add to cart");
  const product = {
    id: e.target.getAttribute("data-id"),
    image: e.target.parentElement.parentElement
      .querySelector(".imagen-curso")
      .getAttribute("src"),
    price: e.target.parentElement.querySelector(".precio span").textContent,
    name: e.target.parentElement.querySelector("h4").textContent,
    priceOld: e.target.parentElement.querySelector(".precio").textContent
  };
  //   console.log(product);
  addToLS(product);
}

function showInCart(product) {
  const tr = document.createElement("tr");
  tr.setAttribute("data-id", product.id);
  tr.innerHTML = `
  <td><img src="${product.image}" alt="${product.name}" width="100"/></td>
  <td><p>${product.name}</p></td>
  <td>${product.price}</td>
  <td><a href="#" class="borrar-curso">X</a></td>
  `;
  productCart.appendChild(tr);
  //   console.log(tr);
}

function addToLS(product) {
  showInCart(product);
  const products = getProductsFromLS();
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
}

function getProductsFromLS() {
  const products = [];
  console.log(JSON.parse(localStorage.getItem("products")));
  if (localStorage.getItem("products") !== null) {
    return JSON.parse(localStorage.getItem("products"));
  }

  return products;
}

function removeFromCart(e) {
  e.preventDefault();

  console.log(e.target.parentElement.parentElement);
  const pid = e.target.parentElement.parentElement.getAttribute("data-id");
  const products = getProductsFromLS();
  products.forEach((element, i) => {
    if (pid === element.id) {
      console.log("Removed! Pid:".pid);
      e.target.parentElement.parentElement.remove();
      removeFromLS(pid);
    }
  });
}

function removeFromLS(pid) {
  const products = getProductsFromLS();
  const newProducts = [];
  products.forEach(product => {
    if (product.id !== pid) {
      newProducts.push(product);
    }
  });
  localStorage.setItem("products", JSON.stringify(newProducts));
}

function showAddedProductsLS() {
  const products = getProductsFromLS();
  products.forEach(product => {
    showInCart(product);
  });
}

function emptyCart() {
  localStorage.clear();
  productCart.innerHTML = "";
  //   while (productCart.firstChild) {
  //     productCart.removeChild;
  //   }
}
