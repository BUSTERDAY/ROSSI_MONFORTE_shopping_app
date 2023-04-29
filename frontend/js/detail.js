//récuperation des paramètre
let searchParams = new URLSearchParams(window.location.search);
let params = {};
for (let param of searchParams.entries()) {
    params[param[0]] = param[1];
}

let Url = "http://localhost:3000/hightech";
let produit;

function LoadId() {
    fetch(`${Url}/${params["id"]}`)
        .then(response => {
            return response.json();
        })
        .then(data => {

            produit = data.hightech;
            console.log(produit);
            LoadSlider();
            LoadInfo();

        })
        .catch(error => console.log("erreur =" + error));
}

//affichage image +carroussel
function LoadSlider() {
    let slider = document.querySelector(".slider")
    let ctn_btn =  document.querySelector(".ctn-btn")
    let nbr_img= 0
    let p = 1;
    for (let i = 1; i <= 3; i++) {
        console.log(produit[`img_${i}`] !== "")
        if (produit[`img_${i}`] !== ""){
            nbr_img++
            slider.style.width = (300 *nbr_img) +"px"
            let  div=document.createElement("div")
            div.className ="img_slid";
            div.style.backgroundImage="url("+produit[`img_${i}`]+")";
            slider.appendChild(div);
            let btn =document.createElement("button")
            btn.className="btn-img";
            btn.value = `${i}`;
            btn.innerHTML =`
            <img class="btn_img" src = "${produit[`img_${i}`]}" alt ="${i}"/>
            `;
            ctn_btn.appendChild(btn);
       }
    }
    let btn_img=document.querySelectorAll(".btn-img")
   for (let i =0;i < btn_img.length;i++){
        btn_img[i].addEventListener("click",function (){
            console.log( btn_img[i].value)
            p = -btn_img[i].value+1;
            slider.style.transform="translate("+p*"300"+"px)";
            slider.style.transition ="all 0.5s ease";
        })
   }
}

function LoadInfo(){
    let container =document.querySelector(".right");
    let tilte = document.createElement("h1")
    tilte.innerHTML =`${produit.name}`
    container.appendChild(tilte);
    let des = document.createElement("div")
    des.className="des";
    let txt_court =produit["description"].slice(0,150)
    des.innerHTML=`${txt_court}...`;
    container.appendChild(des)
    let btn = document.createElement("button")
    btn.className ="plus"
    btn.innerHTML="Voir plus";
    container.appendChild(btn)
    btn.addEventListener("click", () => {
        des.textContent =produit["description"]
        btn.style.display = "none";
    });
    let spec = document.createElement("div")
    spec.className="spec";
    spec.innerHTML = `
    autonomie : ${produit["autonomy"]}<br>
    couleur : ${produit["colors"]}<br>
    storage : ${produit["storage"]}<br>
    `
    container.appendChild(spec)
}


LoadId();
