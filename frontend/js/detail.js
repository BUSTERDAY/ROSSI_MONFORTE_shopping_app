
//récuperation des paramètre
let searchParams = new URLSearchParams(window.location.search);
let params = {};
for (let param of searchParams.entries()) {
    params[param[0]] = param[1];
}

let  Url ="http://localhost:3000/hightech";
let produit;

function LoadId(){
    fetch(`${Url}/${params["id"]}`)
    .then(response => {
            return response.json();
    })
    .then(data =>{

        produit =data;
        console.log(produit);

    })
    .catch(error => console.log("erreur =" +error)) ;
}

LoadId();