
hightechImg.forEach((hightech) => {
    hightech.addEventListener("mouseover", (e) => {
        hightechHover.style.display = "block";
    });
    hightech.addEventListener("mouseout", (e) => {
        hightechHover.style.display = "none";
    });
});


/*Supperposition des images (me casse tout le site :
- toutes les cards se retrouve en invisible
- impossible de réafficher le tout)*/

const hightechImg = document.querySelectorAll(".hightech-img");
const hightechHover = document.querySelectorAll(".hightech-img-hover");

hightechImg.addEventListener("mouseover", () => {hightechHover.style.display = "block";});
hightechImg.addEventListener("mouseout", () => {hightechHover.style.display = "none";});
