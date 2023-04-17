const url = "http://localhost:3000";
const container = document.querySelector(".ctn-sneakers");
const pickers = document.querySelectorAll(".picker");

let sneakers;
let filteredsneakers;

//chargement des sneakers

function LoadSneakers() {
    fetch(`${url}/sneakers`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            sneakers = data.sneakers;
            filteredsneakers = sneakers;
            console.log(sneakers, filteredsneakers);
            GetSneakers();
            
        })
        .catch(error => console.log("erreur : " + error));
}

//récupération des sneakers

function GetSneakers() {
    container.innerHTML = "";
    console.log(filteredsneakers);
    filteredsneakers.forEach(sneaker => {
        let sneakerctn = document.createElement("div");
        sneakerctn.classList.add("sneaker-item");
        sneakerctn.innerHTML = `
        <img class="sneaker-img" src="${sneaker.img_1}" />
        <div class="nom-sneaker"> ${sneaker.name} </div>
        <div> ${sneaker.price}€ </div>
        
        `;
        container.appendChild(sneakerctn);

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
        filteredsneakers = sneakers;
        GetSneakers();
    } else {
        filteredsneakers = sneakers.filter((sneaker) => sneaker.colors === color);
        if (filteredsneakers.length <= 0) {
            container.innerHTML = "Aucun résultat";
        } else {
            GetSneakers();
        }
    }
    
    GetSneakers();
    
}

//Tri par prix

const priceBtnAsc = document.querySelector(".price-btn-asc");

priceBtnAsc.addEventListener("click", sortByPriceAsc);

function compareByPriceAscending (a, b) {
    return a.price - b.price;
}

function sortByPriceAsc() {
    filteredsneakers.sort(compareByPriceAscending);
    GetSneakers();
}

//lancement de la fonction

LoadSneakers();