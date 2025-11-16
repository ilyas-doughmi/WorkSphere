const salle_de_confirence = document.querySelector("#room1");
const salle_de_server = document.querySelector("#room2");
const salle_de_securite = document.querySelector("#room3");
const salle_de_reception = document.querySelector("#room4");
const salle_de_personnel = document.querySelector("#room5");
const salle_archive = document.querySelector("#room6");


// UI variables
const addworker_modal = document.getElementById("addworker_modal");

salle_de_confirence.addEventListener("mouseenter",function(){
    console.log("confirence");
})


function hide_modal(){
    addworker_modal.classList.add("hidden");
}
function show_modal(){
    addworker_modal.classList.remove("hidden");
}