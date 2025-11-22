import { save, load } from "./modules/localstorage.js";
import { validate_exp } from "./modules/validator.js";

let employees = load() || [];
let selected_room = null;
let exp_count = 0;

const default_avatar = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

const room_limits = {
  room1: 6,
  room2: 2,
  room3: 2,
  room4: 2,
  room5: 2,
  room6: 2
};

const room_labels = {
  room1: "Salle de conference",
  room2: "Salle serveur",
  room3: "Salle securite",
  room4: "Reception",
  room5: "Salle du personnel",
  room6: "Salle archive"
};

const rooms_color = {
  room1: "bg-orange-200/70",
  room2: "bg-blue-200/70",
  room3: "bg-green-300/70",
  room4: "bg-yellow-200/70",
  room5: "bg-orange-300/70",
  room6: "bg-emerald-300/70"
};

const restricted_rooms = ["room2", "room3", "room4", "room6"];

function load_data() {
  employees = load() || [];
}

function save_data() {
  save(employees);
}

function rooms_count(list = employees) {
  const counts = {
    room1: 0,
    room2: 0,
    room3: 0,
    room4: 0,
    room5: 0,
    room6: 0
  };
  list.forEach(emp => {
    if (emp.isInRoom && emp.roomId && counts.hasOwnProperty(emp.roomId)) {
      counts[emp.roomId]++;
    }
  });
  return counts;
}

function room_label(roomId) {
  return room_labels[roomId] || "---";
}

function free_emps(source = employees) {
  return source.filter(e => !e.isInRoom);
}

function exp_template(index) {
  return `
    <div class="exp-field flex flex-col gap-1.5 sm:gap-2 md:gap-2.5 rounded-xl md:rounded-2xl border border-black/10 bg-slate-50/80 p-2 md:p-3 mt-2 relative group">
      <p class="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.35em] text-slate-500">
        Experience #${index + 1}
      </p>
      <input id="title_${index}" type="text" 
        class="h-[32px] sm:h-[34px] md:h-[40px] rounded-lg md:rounded-xl border-2 border-black/20 px-2 md:px-3 text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] placeholder:text-center" 
        placeholder="Title (e.g., Lead Receptionist)">
      <textarea id="desc_${index}" 
        class="min-h-[50px] sm:min-h-[60px] md:min-h-[80px] rounded-lg md:rounded-xl border-2 border-black/20 px-2 md:px-3 py-1.5 md:py-2 text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] placeholder:text-center" 
        placeholder="Description"></textarea>
      <div class="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3">
        <label class="flex flex-col text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-gray-500">
          From
          <input type="date" id="startdate_${index}" 
            class="h-[32px] sm:h-[34px] md:h-[38px] rounded-lg md:rounded-xl border-2 border-black/20 px-1.5 md:px-2.5 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em]">
        </label>
        <label class="flex flex-col text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-gray-500">
          To
          <input type="date" id="enddate_${index}" 
            class="h-[32px] sm:h-[34px] md:h-[38px] rounded-lg md:rounded-xl border-2 border-black/20 px-1.5 md:px-2.5 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em]">
        </label>
      </div>
    </div>
  `;
}

function clear_exp() {
  document.querySelectorAll(".exp-field").forEach(e => e.remove());
  exp_count = 0;
}

function add_exp(btn) {
  const field = exp_template(exp_count);
  btn.insertAdjacentHTML("beforebegin", field);
  exp_count++;
}

function sidebar_card(employee) {
  return `
    <div onclick="showemp_info(${employee.id})" 
      class="flex w-full cursor-pointer items-center gap-4 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-slate-50 p-4 shadow-md transition hover:shadow-lg hover:scale-[1.02]">
      <img class="h-16 w-16 rounded-full border-2 border-indigo-200 object-cover shadow-sm" src="${employee.image}">
      <div class="text-center md:text-left">
        <h1 class="text-lg font-semibold text-slate-900 uppercase tracking-wide">${employee.fullname}</h1>
        <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">${employee.role}</h3>
      </div>
    </div>
  `;
}

function room_card(employee) {
  return `
    <div id="room-card-${employee.id}"
      class="card relative z-0 h-[65px] w-[52px] sm:h-[75px] sm:w-[60px] md:h-[90px] md:w-[72px] lg:h-[100px] lg:w-[80px] overflow-visible rounded-lg sm:rounded-lg md:rounded-xl border border-black/70 sm:border-2">
      <img src="${employee.image}"
        class="h-full w-full rounded-lg sm:rounded-lg md:rounded-xl object-cover cursor-pointer" 
        onclick="showemp_info(${employee.id})">
      <button
        class="absolute -right-0.5 -top-1 sm:-right-1 sm:-top-2 flex h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 items-center justify-center rounded-full border border-black sm:border-2 bg-white/95 text-[10px] sm:text-xs md:text-sm text-black transition hover:bg-black hover:text-white"
        onclick="remove_emp(${employee.id})">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
  `;
}

function assign_card(employee) {
  return `
    <div class="mb-3 card h-[14vh] shadow-xs shadow-black w-full rounded-lg flex gap-4 items-center border-black border-2" 
      id="${employee.id}" onclick="assign_emp(${employee.id})">
      <img src="${employee.image}" class="ml-4 h-[97%] rounded-full border-2">
      <div>
        <h1 class="font-semibold text-[18px] uppercase tracking-[0.2em]">${employee.fullname}</h1> 
        <h6 class="font-semibold text-[10px] uppercase tracking-[0.2em]">${employee.role}</h6> 
      </div>
    </div>
  `;
}

function sidebar(sourceEmployees = null) {
  const container = document.getElementById("container_sidebar");
  if (!container) return;

  load_data();

  const base = sourceEmployees || employees;
  const available = free_emps(base);

  container.innerHTML = "";

  if (available.length === 0) {
    container.innerHTML = `
      <div class="w-full rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/50 p-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
        No available workers
      </div>
    `;
    return;
  }

  available.forEach(e => {
    container.insertAdjacentHTML("beforeend", sidebar_card(e));
  });
}

function rooms_ui() {
  load_data();
  const containers = document.querySelectorAll("[data-room-id]");
  containers.forEach(container => (container.innerHTML = ""));

  const counts = rooms_count(employees);

  Object.keys(counts).forEach(roomId => {
    const el = document.getElementById(roomId);
    if (!el) return;

    const isEmpty = counts[roomId] === 0;
    const isMandatory = restricted_rooms.includes(roomId);

    if (isEmpty && isMandatory) {
      el.classList.remove(rooms_color[roomId]);
      el.classList.add("bg-red-200");
    } else {
      el.classList.remove("bg-red-200");
      el.classList.add(rooms_color[roomId]);
    }
  });

  employees
    .filter(emp => emp.isInRoom && emp.roomId)
    .forEach(emp => {
      const target = document.querySelector(`[data-room-id="${emp.roomId}"]`);
      if (target) {
        target.insertAdjacentHTML("beforeend", room_card(emp));
      }
    });
}

function eligible_emps(roomId, list = employees) {
  switch (roomId) {
    case "room1":
      return list;
    case "room2":
      return list.filter(e => ["Technician", "Manager", "Nettoyage"].includes(e.role));
    case "room3":
      return list.filter(e => ["Security Agent", "Manager", "Nettoyage"].includes(e.role));
    case "room4":
      return list.filter(e => ["Receptionist", "Manager", "Nettoyage"].includes(e.role));
    case "room5":
      return list;
    case "room6":
      return list.filter(e => e.role === "Manager");
    default:
      return list;
  }
}

function assign_list_ui(container, list) {
  container.innerHTML = "";
  list.forEach(e => {
    container.insertAdjacentHTML("beforeend", assign_card(e));
  });
}

window.showemp_info = function (id) {
  load_data();
  const employee = employees.find(e => e.id === id);
  if (!employee) return;

  const modal = document.getElementById("info_modal");
  const name = document.getElementById("info_name");
  const role = document.getElementById("info_role");
  const img = document.getElementById("info_image");
  const email = document.getElementById("info_email");
  const phone = document.getElementById("info_phone");
  const room = document.getElementById("info_room");
  const exp_list = document.getElementById("info_experience");

  name.textContent = employee.fullname;
  role.textContent = employee.role;
  img.src = employee.image || default_avatar;
  email.textContent = employee.email;
  phone.textContent = employee.phone;
  room.textContent = employee.isInRoom ? room_label(employee.roomId) : "---";

  exp_list.innerHTML = "";

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
      exp_list.insertAdjacentHTML("beforeend", li);
    });
  } else {
    exp_list.innerHTML = `
      <li class="rounded-xl border border-dashed border-black/20 p-3 text-center text-xs uppercase tracking-[0.3em] text-gray-500">
        No experience added
      </li>`;
  }

  modal.classList.remove("hidden");
};

window.open_assign = function (roomId) {
  selected_room = roomId;
  load_data();

  const modal = document.getElementById("assign_modal");
  const list_container = document.getElementById("assign_workers_list");

  modal.classList.remove("hidden");

  const eligible = eligible_emps(roomId, employees);
  const free = free_emps(eligible);

  assign_list_ui(list_container, free);
};

window.close_assign = function () {
  const modal = document.getElementById("assign_modal");
  const list_container = document.getElementById("assign_workers_list");

  list_container.innerHTML = "";
  modal.classList.add("hidden");
};

window.assign_emp = function (id) {
  load_data();
  if (!selected_room) return;

  const counts = rooms_count(employees);
  if (counts[selected_room] >= room_limits[selected_room]) {
    alert("This room is full!");
    return;
  }

  const employee = employees.find(e => e.id === id);
  if (!employee) return;

  employee.isInRoom = true;
  employee.roomId = selected_room;
  save_data();

  rooms_ui();
  sidebar();
  window.close_assign();
};

window.remove_emp = function (id) {
  load_data();

  const employee = employees.find(e => e.id === id);
  if (!employee) return;

  employee.isInRoom = false;
  employee.roomId = null;
  save_data();

  rooms_ui();
  sidebar();
};

document.addEventListener("DOMContentLoaded", () => {
  const add_modal = document.getElementById("addworker_modal");
  const name_in = document.getElementById("name_input");
  const email_in = document.getElementById("email_input");
  const phone_in = document.getElementById("phone_input");
  const role_in = document.getElementById("select_input");
  const img_in = document.getElementById("image_input");
  const img_prev = document.getElementById("emplyee_image_preview");
  const submit_btn = document.getElementById("submit_btn");
  const add_exp_btn = document.getElementById("addexp_btn");
  const info_modal = document.getElementById("info_modal");
  const close_info = document.getElementById("close_info_modal");

  function reset_form() {
    name_in.value = "";
    email_in.value = "";
    phone_in.value = "";
    role_in.value = "";
    img_in.value = "";
    img_prev.src = default_avatar;
    clear_exp();
    add_exp(add_exp_btn);
  }

  window.close_add = function () {
    add_modal.classList.add("hidden");
    reset_form();
  };

  window.open_add = function () {
    add_modal.classList.remove("hidden");
    reset_form();
  };

  img_in.addEventListener("change", () => {
    img_prev.src = img_in.value || default_avatar;
  });

  add_exp_btn.addEventListener("click", () => {
    add_exp(add_exp_btn);
  });

  close_info.addEventListener("click", () => {
    info_modal.classList.add("hidden");
  });

  submit_btn.addEventListener("click", () => {
    load_data();

    const new_emp = {
      id: Date.now(),
      fullname: name_in.value || "---",
      email: email_in.value || "---",
      phone: phone_in.value || "---",
      image: img_in.value || default_avatar,
      role: role_in.value,
      isInRoom: false,
      roomId: null,
      exp: []
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^06\d{8}$/;

    if (new_emp.fullname.length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }
    if (!new_emp.role) {
      alert("Choose a role");
      return;
    }
    if (!emailRegex.test(new_emp.email)) {
      alert("Invalid email format");
      return;
    }
    if (!phoneRegex.test(new_emp.phone)) {
      alert("Phone must start with 06 and contain 10 digits");
      return;
    }

    for (let i = 0; i < exp_count; i++) {
      const t = document.getElementById(`title_${i}`);
      const d = document.getElementById(`desc_${i}`);
      const s = document.getElementById(`startdate_${i}`);
      const e = document.getElementById(`enddate_${i}`);

      if (t && t.value.trim() !== "") {
        const xp = {
          title: t.value,
          description: d ? d.value : "",
          from: s ? s.value : "",
          end: e ? e.value : ""
        };

        try {
          if (!validate_exp(xp)) {
            alert("Experience fields invalid");
            return;
          }
          new_emp.exp.push(xp);
        } catch (err) {
          alert("Validator Error: " + err.message);
          return;
        }
      }
    }

    employees.push(new_emp);
    save_data();

    window.close_add();
    sidebar();
    rooms_ui();
  });

  sidebar();
  rooms_ui();
});