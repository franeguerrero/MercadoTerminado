import "./styles.css";

const productName: string[] = [
  "Fideos",
  "Arroz",
  "Yerba Mate",
  "Agua",
  "Gaseosa",
  "Vino",
  "Desodorante",
  "Perfume",
  "Jabón",
  "Miel",
  "Harina Pan"
];
const productStock: number[] = [45, 84, 35, 86, 49, 40, 96, 47, 37, 30, 20];
const productPrice: number[] = [
  150,
  90,
  400,
  170,
  250,
  350,
  150,
  1000,
  120,
  380,
  270
];

let productsContainer = document.getElementById("products");

let cart = document.getElementById("cart");
let cartListView = document.getElementById("cartListView");
let buyBtn = document.createElement("button");
buyBtn.setAttribute("id", "buyBtn");
buyBtn.innerHTML = "COMPRAR";
cart?.appendChild(buyBtn);

let cartList = [];

let openCart = document.getElementById("openCart");
openCart?.addEventListener("click", () => {
  cart.classList.toggle("activated");
});

let displayCart = (list) => {
  cartListView.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    let addedProduct = document.createElement("div");
    addedProduct.classList.add("addedProduct");

    let imgProduct = document.createElement("img");
    imgProduct.src =
      "https://www.holded.com/wp-content/uploads/2020/09/ciclo-de-vida-de-un-producto-4.png";

    let addedProductName = document.createElement("p");
    addedProductName.classList.add("addedProductName");
    addedProductName.innerHTML = `${list[i].name} x${list[i].want}`;

    let totalPrice = document.createElement("p");
    totalPrice.classList.add("totalPrice");
    totalPrice.innerHTML = `$${list[i].want * list[i].price}`;

    let dataProduct = document.createElement("div");
    dataProduct.classList.add("dataProduct");
    dataProduct.appendChild(addedProductName);
    dataProduct.appendChild(totalPrice);

    addedProduct.classList.add("addedProduct");
    addedProduct.appendChild(imgProduct);
    addedProduct.appendChild(dataProduct);

    cartListView?.appendChild(addedProduct);
  }
};

let stockControl = (want: number, id: number) => {
  if (want <= 0 || want > productStock[id]) {
    alert("Cantidad inválida");
  } else {
    productStock[id] -= want;
    let stock = document.getElementById(`stock${id}`);
    stock.innerHTML = `/${productStock[id]}`;
    return true;
  }
};
let setCart = (id: number, name: string, price: number, want: number) => {
  let productAdded = {
    id: id,
    name: name,
    price: price,
    want: want
  };
  let alambre = false;
  for (let i = 0; i < cartList.length; i++) {
    if (cartList[i].id === id) {
      cartList[i].want = cartList[i].want + want;
      alambre = true;
    }
  }
  if (!alambre) {
    cartList[cartList.length] = { ...productAdded };
  }

  displayCart(cartList);
};

let displayProducts = (arr: string[]) => {
  for (let i: number = 0; i < arr.length; i++) {
    let product = document.createElement("div");
    let img = document.createElement("img");
    img.src =
      "https://www.holded.com/wp-content/uploads/2020/09/ciclo-de-vida-de-un-producto-4.png";

    let titleAndPrice = document.createElement("div");
    titleAndPrice.classList.add("name");
    let title = document.createElement("h5");
    title.innerHTML = productName[i];
    let price = document.createElement("p");
    price.innerHTML = "$" + productPrice[i];

    let btn = document.createElement("button");
    btn.setAttribute("id", `${i}`);
    btn.innerHTML = "AÑADIR AL CARRITO";
    product.classList.add("product");
    titleAndPrice.appendChild(title);
    titleAndPrice.appendChild(price);

    let wantAndStock = document.createElement("div");
    wantAndStock.classList.add("stock");
    let want = document.createElement("input");
    want.classList.add("want");
    want.setAttribute("type", "number");
    want.setAttribute("value", "1");
    want.setAttribute("min", "1");
    want.setAttribute("max", `${productStock[i]}`);
    let stock = document.createElement("p");
    stock.setAttribute("id", `stock${i}`);
    stock.innerHTML = `/${productStock[i]}`;
    wantAndStock.appendChild(want);
    wantAndStock.appendChild(stock);

    product.appendChild(img);
    product.appendChild(titleAndPrice);
    product.appendChild(wantAndStock);
    product.appendChild(btn);
    productsContainer?.appendChild(product);

    btn.addEventListener("click", (e: MouseEvent) => {
      let id = parseInt(e.target.id, 10);
      let name = productName[id];
      let price = productPrice[id];
      let card = e.target.parentElement;
      let want = parseInt(card.querySelector(".want").value, 10);

      if (stockControl(want, id)) {
        setCart(id, name, price, want);
      }
    });
  }
};
displayProducts(productName);
