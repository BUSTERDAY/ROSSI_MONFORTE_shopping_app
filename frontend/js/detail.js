//récuperation des paramètre
let searchParams = new URLSearchParams(window.location.search);
let params = {};
for (let param of searchParams.entries()) {
    params[param[0]] = param[1];
}

let Url = "http://localhost:3000/hightech";
let produit;

function LoadId() {
    fetch(`${Url}/${params["id"]}`, {
        method: "GET",
        headers: {
            "x-api-key": "11Xc47MijzE8269MrYMm7Uypj3QeEElQMITtUaTXDnWk9LGeGnMuyyeXtVQym3OS"
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            produit = data.hightech;
            LoadSlider();
            LoadInfo();
            loadcart();
        })
        .catch(error => console.log("erreur =" + error));
}

//affichage image +carroussel
function LoadSlider() {
    let slider = document.querySelector(".slider")
    let ctn_btn = document.querySelector(".ctn-btn")
    let nbr_img = 0
    let p = 1;
    for (let i = 1; i <= 3; i++) {
        console.log(produit[`img_${i}`] !== "")
        if (produit[`img_${i}`] !== "") {
            nbr_img++
            slider.style.width = (300 * nbr_img) + "px"
            let div = document.createElement("div")
            div.className = "img_slid";
            div.style.backgroundImage = "url(" + produit[`img_${i}`] + ")";
            slider.appendChild(div);
            let btn = document.createElement("button")
            btn.className = "btn-img";
            btn.value = `${i}`;
            btn.innerHTML = `
            <img class="btn_img" src = "${produit[`img_${i}`]}" alt ="${i}"/>
            `;
            ctn_btn.appendChild(btn);
        }
    }
    let btn_img = document.querySelectorAll(".btn-img")
    for (let i = 0; i < btn_img.length; i++) {
        btn_img[i].addEventListener("click", function () {
            console.log(btn_img[i].value)
            p = -btn_img[i].value + 1;
            slider.style.transform = "translate(" + p * "300" + "px)";
            slider.style.transition = "all 0.5s ease";
        })
    }
}

function LoadInfo() {
    let container = document.querySelector(".center");
    let tilte = document.createElement("h1")
    tilte.innerHTML = `${produit.name}`
    container.appendChild(tilte);
    let des = document.createElement("div")
    des.className = "des";
    let txt_court = produit["description"].slice(0, 150)
    des.innerHTML = `${txt_court}...`;
    container.appendChild(des)
    let btn = document.createElement("button")
    btn.className = "plus"
    btn.innerHTML = "Voir plus";
    container.appendChild(btn)
    btn.addEventListener("click", () => {
        des.textContent = produit["description"]
        btn.style.display = "none";
    });
    let spec = document.createElement("div")
    spec.className = "spec";
    spec.innerHTML = `
    autonomie : ${produit["autonomy"]}<br>
    couleur : ${produit["colors"]}<br>
    storage : ${produit["storage"]}<br>
    `;
    container.appendChild(spec);
    let ctn = document.querySelector(".right");
    let boite = document.createElement("div")
    boite.innerHTML = `
     Prix : ${produit["price"]}
    `;
    let bout = document.createElement("button");
    bout.onclick=addForCarts();
    bout.innerHTML="Ajouter au panier";
    bout.className="add-cart" ;
    ctn.appendChild(boite);
    ctn.appendChild(bout);


}

let cartList = JSON.parse(localStorage.getItem("cart")) || [];
const cartIcon = document.querySelector(".cart-icon");
const cartCtn = document.querySelector(".cart-ctn");

cartIcon.addEventListener("click", toggleCart);

function addForCarts() {
    cartList.push(produit);
    localStorage.setItem("cart", JSON.stringify(cartList));
    loadcart();
}

function loadcart() {
    cartCtn.innerHTML = "";
    console.log(cartList)
    cartList.forEach(hightech => {
        console.log("ici")
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
    Loadbottomcart();
}

let btn_supr = document.createElement("button")

function Loadbottomcart() {
    let bottom = document.createElement("div");
    bottom.className ="bottom";
    cartCtn.appendChild(bottom);
    let total_price = document.createElement("div");
    total_price.className = "price";
    nbr = 0;
    for (let i = 0; i < cartList.length; i++) {
        console.log((cartList[i].price));
        nbr += cartList[i].price;
    }
    console.log(nbr)
    total_price.innerHTML = `Prix total: ${nbr}`
    bottom.appendChild(total_price)
    btn_supr.className = "All"
    btn_supr.innerHTML = "Tout supprimer"
    bottom.appendChild(btn_supr);
    let btn_com = document.createElement("button")
    btn_com.className = "com"
    btn_com.innerHTML = "commander"
    bottom.appendChild(btn_com);

}


btn_supr.addEventListener("click", removeall)

function removefromcard(id) {
    let indexToRemove = cartList.findIndex(hightech => hightech.id === id)
    cartList.splice(indexToRemove, 1);
    localStorage.setItem("cart", JSON.stringify(cartList));
    loadcart();

}

function removeall() {
    console.log("ton pere")
    cartList.splice(0,cartList.length);
    localStorage.setItem("cart", JSON.stringify(cartList));
    loadcart();
}

function toggleCart() {

    cartCtn.classList.toggle("open-cart");
    if (cartCtn.classList.contains("open-cart")) {
        cartIcon.src = "images/logo/close.png";
    } else {
        cartIcon.src = "images/logo/cart.png";
    }
}


LoadId();
