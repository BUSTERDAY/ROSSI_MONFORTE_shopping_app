const url = "http://localhost:3000";
const container = document.querySelector(".ctn-hightechs");
const pickers = document.querySelectorAll(".picker");

let hightechs;
let filteredhightechs;

//chargement des objets hightechs

function Loadhightechs() {
    fetch(`${url}/hightechs`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            hightechs = data.hightechs;
            filteredhightechs = hightechs;
            console.log(hightechs, filteredhightechs);
            Gethightechs();
            loadcart();
            
        })
        .catch(error => console.log("erreur : " + error));
}

//récupération des objets hightechs

function Gethightechs() {
    container.innerHTML = "";
    console.log(filteredhightechs);
    filteredhightechs.forEach(hightech => {
        let hightechCtn = document.createElement("div");
        hightechCtn.classList.add("hightech-item");
        hightechCtn.innerHTML = `
        <img class="hightech-img" src="${hightech.img_1}" />
        <div class="nom-hightech"> ${hightech.name} </div>
        <div> ${hightech.price}€ </div>
        <button onclick="addForCarts(${hightech.id})"> Ajouter au panier </button>
        
        `;
        container.appendChild(hightechCtn);

    });
}

//Filtrage

pickers.forEach(picker => {
    picker.addEventListener("click", SelectItem);
});

function SelectItem(e) {
    let picker = e.target;
    let color = e.target.classList[2];
    pickers.forEach((e) => {
        e.classList.remove("selected");

    });
    picker.classList.add("selected");

    console.log(color);
    FilterByColor(color);
}

//Filtrage par couleur

function FilterByColor(color) {
    if (color === "all") {
        filteredhightechs = hightechs;
        Gethightechs();
    } else {
        filteredhightechs = hightechs.filter((hightech) => hightech.colors === color);
        if (filteredhightechs.length <= 0) {
            container.innerHTML = "Aucun résultat";
        } else {
            Gethightechs();
        }
    }
    
    Gethightechs();
    
}

//Tri par prix

const priceBtnAsc = document.querySelector(".price-btn-asc");

priceBtnAsc.addEventListener("click", sortByPriceAsc);

function compareByPriceAscending (a, b) {
    return a.price - b.price;
}

function sortByPriceAsc() {
    filteredhightechs.sort(compareByPriceAscending);
    Gethightechs();
}

//création cartes

const cartIcon = document.querySelector(".cart-icon");
const cartCtn = document.querySelector(".cart-ctn");

cartIcon.addEventListener("click", toggleCart);

function toggleCart() {
    cartCtn.classList.toggle("open-cart");
    if(cartCtn.classList.contains("open-cart")) {
        cartIcon.src = "images/logo/close.png";
    } else {
        cartIcon.src = "images/logo/cart.png";
    }
}

//localStorage

let cartList = JSON.parse(localStorage.getItem("cart")) || [];

function addForCarts(id) {
    let hightech = hightechs.find(hightech => hightech.id === id);
    cartList.push(hightech);
    localStorage.setItem("cart", JSON.stringify(cartList));
    loadcart();
}

function loadcart() {
    cartCtn.innerHTML = "";
    cartList.forEach(hightech => {
        let hightechCart = document.createElement("div");
        hightechCart.classList.add("cart-item");
        hightechCart.innerHTML = `
        <img class="cart-hightech-img" src="${hightech.img_1}" />
        <div> ${hightech.name} </div>
        <div> ${hightech.price}€ </div>
        <button onclick="removefromcard(${hightech.id})"> Supprimer </button>
        `;
        cartCtn.appendChild(hightechCart);
    });
}

function removefromcard(id) {
    let indexToRemove = cartList.findIndex(hightech => hightech.id === id);
    cartList.splice(indexToRemove, 1);
    localStorage.setItem("cart", JSON.stringify(cartList));
    loadcart();
}

//lancement de la fonction

Loadhightechs();