//récuperation des paramètre
let searchParams = new URLSearchParams(window.location.search);
let params = {};
for (let param of searchParams.entries()) {
    params[param[0]] = param[1];
}
let ID = params["id"]
console.log(ID)

let Url = "http://localhost:3000/hightech";
let produit;

function LoadId() {
    fetch(`${Url}/${ID}`, {
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
            p = -btn_img[i].value + 1;
            slider.style.transform = "translate(" + p * "300" + "px)";
            slider.style.transition = "all 0.5s ease";
        })
    }
}

let sel = document.createElement("select")
function LoadInfo() {
    let container = document.querySelector(".center");
    let tilte = document.createElement("h1")
    tilte.innerHTML = `${produit.name}`
    container.appendChild(tilte);
    let div = document.createElement("div")
    div.className = "ctn-des"
    container.appendChild(div)
    let des = document.createElement("div")
    des.className = "des";
    let txt_court = produit["description"].slice(0, 150)
    des.innerHTML = `${txt_court}...`;
    div.appendChild(des)
    let btn = document.createElement("button")
    btn.className = "plus"
    btn.innerHTML = "Voir plus";
    div.appendChild(btn)
    btn.addEventListener("click", () => {
        des.textContent = produit["description"]
        btn.style.display = "none";
    });
    let spec = document.createElement("div")
    spec.className = "spec";
    spec.innerHTML = `
    autonomie : ${produit["autonomy"]}<br>
    couleur : ${produit["colors"]}<br>
    stockage : ${produit["storage"]}<br>
    `;
    container.appendChild(spec);
    let ctn = document.querySelector(".right");
    let boite = document.createElement("div")
    boite.innerHTML = `
     Prix : ${produit["price"]}
    `;
    let bout = document.createElement("button");
    for(let i =1;i<=10;i++){
        let option =document.createElement("option")
        option.value= `${i}`
        option.id=`option${i}`;
        option.innerHTML= `${i}`
        sel.appendChild(option)
    }
    bout.onclick = addForCarts;
    bout.innerHTML = "Ajouter au panier";
    bout.className = "add-cart";
    ctn.appendChild(boite);
    ctn.appendChild(sel)
    ctn.appendChild(bout)
}

let cartList = JSON.parse(localStorage.getItem("cart")) || [];
const cartIcon = document.querySelector(".cart-icon");
const cartCtn = document.querySelector(".cart-ctn");
cartIcon.addEventListener("click", toggleCart);
function addForCarts() {
    let index = sel["selectedIndex"]
    let quantity = sel[index].value;
    console.log(Number(quantity))
    let verif = true
    cartList.forEach(prod => {
        if (prod.id === produit.id) {
            produit.quantity += Number(quantity);
            verif = false
            removefromcard(produit.id)
        }
    })
    if (verif) {
        produit.quantity = Number(quantity);
        console.log(produit["quantity"])
        console.log(produit)
    }
    cartList.push(produit);
    localStorage.setItem("cart", JSON.stringify(cartList));
    loadcart();

}

function moins(art) {
    cartList.forEach(prod => {
        if (prod.id === art) {
            console.log('plus')
            prod["quantity"]--;
            console.log(prod["quantity"]);
            removefromcard(prod.id);
            if (prod.quantity > 0) {
                cartList.push(produit);
                localStorage.setItem("cart", JSON.stringify(cartList));
                loadcart();
            }
        }
    })
}


function plus(art) {
    cartList.forEach(prod => {
        if (prod.id === art) {
            console.log('plus')
            prod["quantity"]++;
            console.log(prod["quantity"]);
            removefromcard(prod.id);
            cartList.push(prod);
            localStorage.setItem("cart", JSON.stringify(cartList));
        }
    })
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
        <div>
                <button onclick="moins(${hightech.id})" class="moins"><img src="images/logo/moins.png" alt="moins"></button>
                ${hightech["quantity"]}
                <button onclick="plus(${hightech.id})" class="plus"><img src="images/logo/plus.png" alt="plus"></button>
        </div>
        <div> ${hightech.price * hightech["quantity"]}€ </div>
        <button onclick="removefromcard(${hightech.id})"> Supprimer </button>

        `
        ;
        cartCtn.appendChild(hightechCart);
    });
    Loadbottomcart();
}

let btn_supr = document.createElement("button")

function Loadbottomcart() {
    console.log(produit)
    let bottom = document.createElement("div");
    bottom.className = "bottom";
    cartCtn.appendChild(bottom);
    let total_price = document.createElement("div");
    total_price.className = "price";
    nbr = 0;
    for (let i = 0; i < cartList.length; i++) {
        nbr += cartList[i].price * cartList[i].quantity;
    }
    total_price.innerHTML =
        `Prix total: ${nbr}€`

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
    cartList.splice(0, cartList.length);
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
