const url = "http://localhost:3000";
const container = document.querySelector(".ctn-hightechs");
const pickers = document.querySelectorAll(".pickers");
const brands = document.querySelectorAll(".brands");

let hightechs;
let filteredhightechs;

//chargement des objets hightechs

function Loadhightechs() {
    fetch(`${url}/hightechs`,{
        method: "GET",
        headers: {
            "x-api-key":"11Xc47MijzE8269MrYMm7Uypj3QeEElQMITtUaTXDnWk9LGeGnMuyyeXtVQym3OS"
        }
    })
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

let PriceWhitReduction;
let img1 = document.createElement("img");
let img2 = document.createElement("img");

function Gethightechs() {
    container.innerHTML = "";
    console.log(filteredhightechs);
    filteredhightechs.forEach(hightech => {
        let hightechCtn = document.createElement("div");
        hightechCtn.classList.add("hightech-item");
        hightechCtn.id = `${hightech.id}`

        // si reduction, calcule du nouveau prix, sinon affiche le prix normal

        
        if (hightech.reduction > 0) {
            img1.src = hightech.img_1;
            img1.className = "hightech-img1";
            img2.src = hightech.img_2;
            img2.className = "hightech-img2";
            PriceWhitReduction = hightech.price - (hightech.price * hightech.reduction / 100);
            hightechCtn.innerHTML = `
                <div class="CardByIndex"> 
                    <img class="hightech-img" src="${hightech.img_1}" />
                    <div class="nom-hightech"> ${hightech.name} </div>
                    <div class="PriceAndReduction">
                        <div class="prices"> ${hightech.price}€ </div>
                        <div class="reduction"> -${hightech.reduction}% </div>
                        <div class="PricesWithReduction"> ${PriceWhitReduction}€ </div>
                    </div>
                    <button onclick="addForCarts(${hightech.id})"> Ajouter au panier </button>
                    <form method="GET" action="detail.html">
                        <button name="id" type="submit" value="${hightech.id}">Voir fiche produit</button>
                    </form>
                </div>
                `;
        } else {
            PriceWhitReduction = hightech.price;
            hightechCtn.innerHTML = `
                <div class="CardByIndex"> 
                    <img class="hightech-img" src="${hightech.img_1}" />
                    <div class="nom-hightech"> ${hightech.name} </div>
                    <div> ${PriceWhitReduction}€ </div>
                    <button onclick="addForCarts(${hightech.id})"> Ajouter au panier </button>
                    <form method="GET" action="detail.html">
                        <button name="id" type="submit" value="${hightech.id}">Voir fiche produit</button>
                    </form>
                </div>
                `;
                
        }
        console.log(PriceWhitReduction);
        container.appendChild(hightechCtn);

    });
}

//Change image au survol

addEventListener("mouseover", (e) => {
    
    if (e.target.classList.contains("hightech-img")) {
        let img = e.target;
        let newimg = img.src(`${hightechs.img_2}`);
        ChangeImage(img, newimg);
    }
});

addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("hightech-img")) {
        let img = e.target;
        let newimg = img.src(`${hightechs.img_1}`);
        ChangeImage(img, newimg);
    }
});

function ChangeImage(img, newimg) {
    img.src = newimg;
}

//Filtrage

let ActualSelectedColor = "all";
let ActualSelectedBrand = "all";

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
    ActualSelectedColor = color;
    Filter(ActualSelectedColor, ActualSelectedBrand);
}

brands.forEach(brand => {
    brand.addEventListener("click", SelectItemByBrand);
});

function SelectItemByBrand(f) {
    let brand = f.target;
    let marque = f.target.classList[2];

    brands.forEach((f) => {
        f.classList.remove("selected");

    });
    brand.classList.add("selected");

    console.log(marque);
    ActualSelectedBrand = marque;
    Filter(ActualSelectedColor, ActualSelectedBrand);
}

//Filtrage par couleur et marque

function Filter(color, brand) {
    if (color == "all" && brand == "all") {
        filteredhightechs = hightechs;
        Gethightechs();
    } else if (color == "all") {
        filteredhightechs = hightechs.filter((hightech) => hightech.brands === brand);
        console.log(filteredhightechs)
        if (filteredhightechs.length <= 0) {
            container.innerHTML = "Aucun résultat";
        } else {
            Gethightechs();
        }

    } else if (brand == "all") {
        filteredhightechs = hightechs.filter((hightech) => hightech.colors.includes(color));
        console.log(filteredhightechs)
        if (filteredhightechs.length <= 0) {
            container.innerHTML = "Aucun résultat";
        } else {
            Gethightechs();
        }

    } else {
        filteredhightechs = hightechs.filter((hightech) => hightech.colors.includes(color) && hightech.brands === brand);
        console.log(filteredhightechs)
        if (filteredhightechs.length <= 0) {
            container.innerHTML = "Aucun résultat";
        } else {
            Gethightechs();
        }
    }

    Gethightechs();

}

//Tri par prix dans l'ordre croissant

const priceBtnAsc = document.querySelector(".price-btn-asc");

priceBtnAsc.addEventListener("click", sortByPriceAsc);

function compareByPriceAscending(a, b) {
    return a.price - b.price;
}

function sortByPriceAsc() {
    filteredhightechs.sort(compareByPriceAscending);
    Gethightechs();
}

//Trie par prix dans l'ordre décroissant

const priceBtnDesc = document.querySelector(".price-btn-desc");

priceBtnDesc.addEventListener("click", sortByPriceDesc);

function compareByPriceDescending(a, b) {
    return b.price - a.price;
}

function sortByPriceDesc() {
    filteredhightechs.sort(compareByPriceDescending);
    Gethightechs();
}


//création cartes

const cartIcon = document.querySelector(".cart-icon");
const cartCtn = document.querySelector(".cart-ctn");

cartIcon.addEventListener("click", toggleCart);

function toggleCart() {
    cartCtn.classList.toggle("open-cart");
    if (cartCtn.classList.contains("open-cart")) {
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

        // si reduction, calcule du nouveau prix, sinon affiche le prix normal

        if (hightech.reduction > 0) {
            PriceWhitReduction = hightech.price - (hightech.price * hightech.reduction / 100);
        } else {
            PriceWhitReduction = hightech.price;
        }

        hightechCart.innerHTML = `
        <img class="cart-hightech-img" src="${hightech.img_1}" alt="img" />
        <div> ${hightech.name} </div>
        <div> ${PriceWhitReduction}€ </div>
        <button onclick="removefromcard(${hightech.id})"> Supprimer </button>
        `;
        cartCtn.appendChild(hightechCart);
    });
    Loadbottomcart();
}

function removefromcard(id) {
    let indexToRemove = cartList.findIndex(hightech => hightech.id === id);
    cartList.splice(indexToRemove, 1);
    localStorage.setItem("cart", JSON.stringify(cartList));
    loadcart();
}

function removeall() {
    console.log("ton pere")
    cartList.splice(0, cartList.length);
    localStorage.setItem("cart", JSON.stringify(cartList));
    loadcart();
}

let btn_supr = document.createElement("button")

function Loadbottomcart() {
    let total_price = document.createElement("div");
    total_price.className = "price";
    nbr = 0;
    for (let i = 0; i < cartList.length; i++) {
        if (cartList[i].reduction > 0) {
            console.log((PriceWhitReduction))
            PriceWhitReduction = cartList[i].price - (cartList[i].price * cartList[i].reduction / 100); 
            nbr += PriceWhitReduction;
        } else {
            console.log((cartList[i].price));
            nbr += cartList[i].price;
        }
        
    }
    console.log(nbr)
    total_price.innerHTML = `Prix total: ${nbr}`
    cartCtn.appendChild(total_price)
    btn_supr.className = "All"
    btn_supr.innerHTML = "Tout supprimer"
    cartCtn.appendChild(btn_supr);
    let btn_com = document.createElement("button")
    btn_com.className = "com"
    btn_com.innerHTML = "commander"
    cartCtn.appendChild(btn_com);
}
btn_supr.addEventListener("click", removeall)

//Lancement de la fonction

Loadhightechs();