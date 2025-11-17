const salle_de_confirence = document.querySelector("#room1");
const salle_de_server = document.querySelector("#room2");
const salle_de_securite = document.querySelector("#room3");
const salle_de_reception = document.querySelector("#room4");
const salle_de_personnel = document.querySelector("#room5");
const salle_archive = document.querySelector("#room6");



let employees = [];
let id = 1;
let user_id = 0;

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




// Add New worker
const name_input = document.getElementById("name_input");   
const email_input = document.getElementById("email_input");
const phone_input = document.getElementById("phone_input");
const select_input = document.getElementById("select_input");
const image_handler = document.getElementById("emplyee_image_preview");
const image_input = document.getElementById("image_input");
const submit_btn = document.getElementById("submit_btn");
const container = document.getElementById("container_input");

// experience form
const addexp_btn = document.getElementById("addexp_btn");


image_input.addEventListener('change',function(){
    if(image_input.value === ""){
        image_handler.src = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
    }
    else{
        image_handler.src = image_input.value;
    }
})


submit_btn.addEventListener('click',function(){
    let employe = {
        fullname : name_input.value,
        email : email_input.value,
        phone : phone_input.value,
        image : image_input.value,
        role : select_input.value,
        isInRoom : false
    }

    employees.push(employe);
})



addexp_btn.addEventListener('click',function(){
    const input_field = `  <div class="flex flex-col gap-2.5 rounded-2xl border border-black/10 bg-slate-50/80 p-3">
                    <p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Experience</p>
                    <input type="text"
                        class="h-[40px] rounded-xl border-2 border-black/20 px-3 text-xs uppercase tracking-[0.2em] placeholder:text-center"
                        placeholder="Title (e.g., Lead Receptionist)">
                    <textarea
                        class="min-h-[80px] rounded-xl border-2 border-black/20 px-3 py-2 text-xs uppercase tracking-[0.2em] placeholder:text-center"
                        placeholder="Description of responsibilities"></textarea>
                    <div class="grid grid-cols-2 gap-3">
                        <label class="flex flex-col gap-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-500">
                            From
                            <input type="date" value="2023-01-01"
                                class="h-[38px] rounded-xl border-2 border-black/20 px-2.5 text-xs uppercase tracking-[0.2em]">
                        </label>
                        <label class="flex flex-col gap-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-500">
                            To
                            <input type="date" value="2024-12-31"
                                class="h-[38px] rounded-xl border-2 border-black/20 px-2.5 text-xs uppercase tracking-[0.2em]">
                        </label>
                    </div>
                </div>`

    container.insertAdjacentHTML('afterbegin',input_field);
})