import { save, load } from "./modules/localstorage.js";

let employees = load() || [];
let employee_id = 1;
let id = Date.now();

document.addEventListener("DOMContentLoaded", () => {

    const salle_de_confirence = document.querySelector("#room1");
    const salle_de_server = document.querySelector("#room2");
    const salle_de_securite = document.querySelector("#room3");
    const salle_de_reception = document.querySelector("#room4");
    const salle_de_personnel = document.querySelector("#room5");
    const salle_archive = document.querySelector("#room6");

    const addworker_modal = document.getElementById("addworker_modal");
    const name_input = document.getElementById("name_input");
    const email_input = document.getElementById("email_input");
    const phone_input = document.getElementById("phone_input");
    const select_input = document.getElementById("select_input");
    const image_handler = document.getElementById("emplyee_image_preview");
    const image_input = document.getElementById("image_input");
    const submit_btn = document.getElementById("submit_btn");
    const container = document.getElementById("container_input");
    const addexp_btn = document.getElementById("addexp_btn");

    window.hide_modal = function () {
        addworker_modal.classList.add("hidden");
    };

    window.show_modal = function () {
        addworker_modal.classList.remove("hidden");
    };

    image_input.addEventListener("change", () => {
        if (image_input.value === "") {
            image_handler.src = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
        } else {
            image_handler.src = image_input.value;
        }
    });

    submit_btn.addEventListener("click", () => {
        const employe = {
            id: id,
            fullname: name_input.value,
            email: email_input.value,
            phone: phone_input.value,
            image: image_input.value,
            role: select_input.value,
            isInRoom: false,
            exp: []
        };

        for (let i = 0; i < employee_id; i++) {
            const exp = {
                id: i,
                title: document.getElementById(`title_${i}`).value,
                description: document.getElementById(`desc_${i}`).value,
                from: document.getElementById(`startdate_${i}`).value,
                end: document.getElementById(`enddate_${i}`).value
            };
            employe.exp.push(exp);
        }

        employees.push(employe);
        save(employees);
         window.location.reload();
        loaddata();
        hide_modal();
    });

    addexp_btn.addEventListener("click", () => {
        const input_field = `
            <div class="flex flex-col gap-2.5 rounded-2xl border border-black/10 bg-slate-50/80 p-3">
                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Experience</p>
                <input id="title_${employee_id}" type="text" class="h-[40px] rounded-xl border-2 border-black/20 px-3 text-xs uppercase tracking-[0.2em] placeholder:text-center" placeholder="Title">
                <textarea id="desc_${employee_id}" class="min-h-[80px] rounded-xl border-2 border-black/20 px-3 py-2 text-xs uppercase tracking-[0.2em] placeholder:text-center" placeholder="Description"></textarea>
                <div class="grid grid-cols-2 gap-3">
                    <label class="flex flex-col gap-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-500">
                        From
                        <input type="date" id="startdate_${employee_id}" class="h-[38px] rounded-xl border-2 border-black/20 px-2.5 text-xs uppercase tracking-[0.2em]">
                    </label>
                    <label class="flex flex-col gap-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-500">
                        To
                        <input type="date" id="enddate_${employee_id}" class="h-[38px] rounded-xl border-2 border-black/20 px-2.5 text-xs uppercase tracking-[0.2em]">
                    </label>
                </div>
            </div>`;

        container.insertAdjacentHTML("afterbegin", input_field);
        employee_id++;
    });

    loaddata();
});


const container_sidebar = document.getElementById("container_sidebar");

function loaddata() {
    container_sidebar.innerHTML = "";

    employees = load() || [];

    employees.forEach(e => {
        const card = `
        <div class="flex w-full items-center gap-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-slate-50 p-4 shadow-md" id="${e.id}" onclick="show_info(${e.id})">
            <img class="h-16 w-16 rounded-full border-2 border-indigo-200 object-cover shadow-sm" src="${e.image}">
            <div class="text-center md:text-left">
                <h1 class="text-lg font-semibold text-slate-900">${e.fullname}</h1>
                <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">${e.role}</h3>
            </div>
        </div>`;

        container_sidebar.insertAdjacentHTML("beforeend", card);
    });
}


// info section

const info_modal = document.getElementById("info_modal");
const info_name = document.getElementById("info_name");
const info_role = document.getElementById("info_role");
const close_info_modal = document.getElementById("close_info_modal");
const info_image = document.getElementById("info_image");
const info_email = document.getElementById("info_email");
const info_phone = document.getElementById("info_phone");

window.show_info = function(id_user){
    const employe_info = employees.find(function(e){
        return e.id == id_user;
    })

    if(employe_info){
  info_modal.classList.remove("hidden");
    info_name.textContent = employe_info.fullname;
    info_role.textContent = employe_info.role;
    info_image.src = employe_info.image;
    info_email.textContent = employe_info.email;
    info_phone.textContent = employe_info.phone;
    }
    close_info_modal.onclick = function(){
        info_modal.classList.add("hidden");
    }
  
}