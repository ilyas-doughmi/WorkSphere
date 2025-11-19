import { save, load } from "./modules/localstorage.js";
import { validator, validate_exp } from "./modules/validator.js";

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
    const container_sidebar = document.getElementById("container_sidebar");

    const name_input = document.getElementById("name_input");
    const email_input = document.getElementById("email_input");
    const phone_input = document.getElementById("phone_input");
    const select_input = document.getElementById("select_input");
    const image_input = document.getElementById("image_input");
    const image_handler = document.getElementById("emplyee_image_preview");
    const submit_btn = document.getElementById("submit_btn");

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

    addexp_btn.addEventListener("click", () => {
        const input_field = `
            <div class="flex flex-col gap-2.5 rounded-2xl border border-black/10 bg-slate-50/80 p-3 mt-2 relative group">
                <p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Experience #${employee_id + 1}</p>
                <input id="title_${employee_id}" type="text" 
                    class="h-[40px] rounded-xl border-2 border-black/20 px-3 text-xs uppercase tracking-[0.2em] placeholder:text-center" 
                    placeholder="Title">
                <textarea id="desc_${employee_id}" 
                    class="min-h-[80px] rounded-xl border-2 border-black/20 px-3 py-2 text-xs uppercase tracking-[0.2em] placeholder:text-center" 
                    placeholder="Description"></textarea>
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

        addexp_btn.insertAdjacentHTML("beforebegin", input_field);
        employee_id++;
    });

    submit_btn.addEventListener("click", () => {

        const newEmployee = {
            id: id,
            fullname: name_input.value || "---",
            email: email_input.value || "---",
            phone: phone_input.value || "---",
            image: image_input.value || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
            role: select_input.value || "---",
            isInRoom: false,
            exp: []
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^06\d{8}$/;

        if (newEmployee.fullname.length < 3) {
            alert("Name must be at least 3 characters");
            return;
        }
        if (!emailRegex.test(newEmployee.email)) {
            alert("Invalid email format");
            return;
        }
        if (!phoneRegex.test(newEmployee.phone)) {
            alert("Phone must start with 06 and contain 10 digits");
            return;
        }
        if (newEmployee.role === "") {
            alert("Please select a job role");
            return;
        }

        for (let i = 0; i < employee_id; i++) {
            const titleEl = document.getElementById(`title_${i}`);
            const descEl = document.getElementById(`desc_${i}`);
            const startEl = document.getElementById(`startdate_${i}`);
            const endEl = document.getElementById(`enddate_${i}`);

            if (titleEl && titleEl.value.trim() !== "") {
                const experience = {
                    title: titleEl.value,
                    description: descEl.value,
                    from: startEl.value,
                    end: endEl.value
                };

                if (!validate_exp(experience)) {
                    alert("Experience fields invalid");
                    return;
                }

                newEmployee.exp.push(experience);
            }
        }

        employees.push(newEmployee);
        save(employees);

        window.hide_modal();
        renderSidebar();
        window.location.reload();
    });

    renderSidebar();
});

function renderSidebar() {
    const container_sidebar = document.getElementById("container_sidebar");
    container_sidebar.innerHTML = "";

    employees = load() || [];

    employees.forEach(e => {
        const card = `
        <div onclick="show_info(${e.id})" 
             class="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-slate-50 p-4 shadow-md transition hover:shadow-lg hover:scale-[1.02]">
            <img class="h-16 w-16 rounded-full border-2 border-indigo-200 object-cover shadow-sm" src="${e.image}">
            <div class="text-center md:text-left">
                <h1 class="text-lg font-semibold text-slate-900 uppercase tracking-wide">${e.fullname}</h1>
                <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">${e.role}</h3>
            </div>
        </div>`;
        container_sidebar.insertAdjacentHTML("beforeend", card);
    });
}

const info_modal = document.getElementById("info_modal");
const info_name = document.getElementById("info_name");
const info_role = document.getElementById("info_role");
const info_image = document.getElementById("info_image");
const info_email = document.getElementById("info_email");
const info_phone = document.getElementById("info_phone");
const info_experience_list = document.getElementById("info_experience");
const close_info_modal = document.getElementById("close_info_modal");

window.show_info = function (id_user) {
    const employee = employees.find(e => e.id === id_user);

    if (employee) {
        info_name.textContent = employee.fullname;
        info_role.textContent = employee.role;
        info_image.src = employee.image;
        info_email.textContent = employee.email;
        info_phone.textContent = employee.phone;

        info_experience_list.innerHTML = "";

        if (employee.exp && employee.exp.length > 0) {
            employee.exp.forEach(ex => {
                const li = `
                <li class="rounded-xl border border-black/10 bg-white p-3 flex flex-col gap-1">
                    <div class="flex justify-between items-center border-b border-black/5 pb-1 mb-1">
                         <span class="text-xs font-bold uppercase tracking-[0.2em] text-slate-800">${ex.title}</span>
                         <span class="text-[10px] font-mono text-gray-400 bg-gray-100 px-1 rounded">${ex.from} / ${ex.end}</span>
                    </div>
                    <p class="text-[11px] leading-relaxed text-gray-600 uppercase tracking-wider">${ex.description}</p>
                </li>`;
                info_experience_list.insertAdjacentHTML("beforeend", li);
            });
        } else {
            info_experience_list.innerHTML = `
            <li class="rounded-xl border border-dashed border-black/20 p-3 text-center text-xs uppercase tracking-[0.3em] text-gray-500">
                No experience added yet.
            </li>`;
        }

        info_modal.classList.remove("hidden");
    }
};

close_info_modal.addEventListener("click", () => {
    info_modal.classList.add("hidden");
});


// select room

let selectedRoom = null;

window.openAssignModal = function (roomId) {
    selectedRoom = roomId;

    document.getElementById("assign_modal").classList.remove("hidden");

    showemployees(selectedRoom);
};

window.closeAssignModal = function () {
    document.getElementById("assign_modal").classList.add("hidden");
};



function showemployees(room) {
    let worker;

    switch (room) {
        case "room1": 
            worker = employees;
            break;

        case "room2": 
            worker = employees.filter(e => e.role === "Technician" || e.role === "Manager");
            break;

        case "room3": 
            worker = employees.filter(e => e.role === "Security Agent" || e.role === "Manager");
            break;

        case "room4":
            worker = employees.filter(e => e.role === "Receptionist" || e.role === "Manager");
            break;

        case "room5":
            worker = employees;
            break;

        default:
            worker = employees.filter(e => e.role !== "Maintenance");
            break;
    }


    worker.forEach(function(e){
        console.log(e.role);
    })
}
