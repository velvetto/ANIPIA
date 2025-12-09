// MODALY
const modal = document.getElementById("pet-modal");
const addCard = document.querySelector(".pet-add-card");
const closeBtn = document.querySelector(".close");
let editingPetId = null;

addCard.addEventListener("click", () => openEditPetModal());
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => { if (e.target === modal) modal.style.display = "none"; });

const noteInput = document.getElementById("note");
noteInput.setAttribute("maxlength", 250);
noteInput.addEventListener("input", () => {
    if (noteInput.value.length > 250) {
        noteInput.value = noteInput.value.slice(0, 250);
    }
});

function setupImageUpload(card, petId) {
    const img = card.querySelector(".pet-img");
    const input = card.querySelector(".pet-upload");

    img.addEventListener("click", () => input.click());
    input.addEventListener("change", async () => {
        const file = input.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`http://localhost:8080/api/zvirata/upload-image/${petId}`, {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                const updatedPet = await response.json();
                img.src = updatedPet.imageUrl;
            } else {
                alert("Error");
            }
        } catch (err) {
            console.error(err);
            alert("Error.");
        }
    });
}

function addPetCard(pet) {
    const petsList = document.getElementById("pets-list");

    let shortNote = "";
    if (pet.poznamka) {
        const words = pet.poznamka.split(" ");
        shortNote = words.slice(0, 3).join(" ");
        if (words.length > 3) shortNote += " ...";
    }

    const newCard = document.createElement("div");
    newCard.className = "pet-card";
    newCard.dataset.id = pet.idZvirata;

    newCard.innerHTML = `
        <div class="pet-image">
            <img src="${pet.imageUrl || 'Photos/default_pet.png'}" alt="Pet" class="pet-img">
            <input type="file" class="pet-upload" style="display:none;" accept="image/*">
        </div>
        <div class="pet-info">
            <span class="pet-delete" title="Delete Pet">&times;</span>
            <p><strong>Name:</strong> ${pet.jmeno}</p>
            <p><strong>Type:</strong> ${pet.druh}</p>
            <p><strong>Breed:</strong> ${pet.plemeno || ""}</p>
            <p><strong>Age:</strong> ${pet.vek || ""}</p>
            <p><strong>Health:</strong> ${pet.zdravotniStav || ""}</p>
            <p><strong>Note:</strong> ${shortNote}</p>
        </div>
    `;
    petsList.insertBefore(newCard, addCard);

    setupImageUpload(newCard, pet.idZvirata);
    setupPetCardClick(newCard, pet);
    setupDeletePet(newCard, pet.idZvirata); 
}

const deletePetModal = document.getElementById("delete-pet-modal");
const deleteConfirmBtn = document.getElementById("delete-confirm-btn");
const deleteCancelBtn = document.getElementById("delete-cancel-btn");
const deleteModalClose = document.getElementById("delete-modal-close");
let petToDeleteId = null;
let petCardToDelete = null;

deleteCancelBtn.addEventListener("click", () => deletePetModal.style.display = "none");
deleteModalClose.addEventListener("click", () => deletePetModal.style.display = "none");
window.addEventListener("click", e => { if(e.target === deletePetModal) deletePetModal.style.display = "none"; });

deleteConfirmBtn.addEventListener("click", async () => {
    if (!petToDeleteId || !petCardToDelete) return;

    try {
        const response = await fetch(`http://localhost:8080/api/zvirata/delete/${petToDeleteId}`, {
            method: "DELETE"
        });

        if(response.ok){
            petCardToDelete.remove(); 
        } else {
            const text = await response.text();
            alert("Error deleting pet: " + text);
        }
    } catch(err) {
        console.error(err);
        alert("Server error");
    } finally {
        deletePetModal.style.display = "none";
        petToDeleteId = null;
        petCardToDelete = null;
    }
});

function setupDeletePet(card, petId) {
    const deleteBtn = card.querySelector(".pet-delete");
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        petToDeleteId = petId;
        petCardToDelete = card;
        deletePetModal.style.display = "block";
    });
}

function openEditPetModal(pet = null) {
    const form = document.getElementById("add-pet-form");
    const submitBtn = form.querySelector("button");
    const modalTitle = document.getElementById("modal-title"); 

    if (pet) {
        editingPetId = pet.idZvirata;
        form.name.value = pet.jmeno;
        form.type.value = pet.druh;
        form.breed.value = pet.plemeno || "";
        form.age.value = pet.vek || "";
        form.health.value = pet.zdravotniStav || "";
        form.note.value = pet.poznamka || "";
        submitBtn.textContent = "Update";
        modalTitle.textContent = "Edit Pet Details";
    } else {
        editingPetId = null;
        form.reset();
        submitBtn.textContent = "Add Pet";
        modalTitle.textContent = "Add New Pet";
    }
    modal.style.display = "block";
}

function setupPetCardClick(card, pet) {
    card.addEventListener("click", () => openEditPetModal(pet));
}

document.getElementById("add-pet-form").age.addEventListener("input", e => {
    if (e.target.value < 0) e.target.value = 0;
});

document.getElementById("add-pet-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;

    const petData = {
        jmeno: form.name.value,
        druh: form.type.value,
        plemeno: form.breed.value,
        vek: form.age.value ? parseInt(form.age.value) : null,
        zdravotniStav: form.health.value,
        poznamka: form.note.value
    };

    const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    if (!user) return alert("User not logged in!");

    try {
        let response;
        if (editingPetId) {
            response = await fetch(`http://localhost:8080/api/zvirata/update/${editingPetId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(petData)
            });
        } else {
            response = await fetch(`http://localhost:8080/api/zvirata/add?zakaznikId=${user.idZakaznici}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(petData)
            });
        }

        if (response.ok) {
            const pet = await response.json();
            if (editingPetId) {
                const card = document.querySelector(`.pet-card[data-id="${editingPetId}"]`);
                if (card) card.remove();
            }
            addPetCard(pet);
            modal.style.display = "none";
            form.reset();
            editingPetId = null;
        } else {
            const errText = await response.text();
            alert("Error saving pet: " + errText);
        }
    } catch (err) {
        console.error(err);
        alert("Server error");
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    if (!user) return;

    const userNameSpan = document.getElementById("user-name");
    if (userNameSpan) userNameSpan.textContent = user.jmeno;

    try {
        const response = await fetch(`http://localhost:8080/api/zvirata/by-user?zakaznikId=${user.idZakaznici}`);
        if (response.ok) {
            const pets = await response.json();
            pets.forEach(pet => addPetCard(pet));
        } else {
            console.error("Failed to load pets");
        }
    } catch (err) {
        console.error("Error loading pets:", err);
    }
});

// KALENDAR
const calendarEl = document.getElementById("calendar");
let startDate = null, endDate = null;
let selectedDates = [];
let reservations = [];

function generateCalendar(date = new Date()) {
    calendarEl.innerHTML = "";
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const month = date.getMonth(), year = date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const header = document.createElement("div");
    header.className = "calendar-header";
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "<";
    prevBtn.addEventListener("click", ()=> generateCalendar(new Date(year, month - 1, 1)));
    const nextBtn = document.createElement("button");
    nextBtn.textContent = ">";
    nextBtn.addEventListener("click", ()=> generateCalendar(new Date(year, month + 1, 1)));
    const title = document.createElement("span");
    title.textContent = `${monthNames[month]} ${year}`;
    title.className = "calendar-title";
    header.append(prevBtn, title, nextBtn);
    calendarEl.appendChild(header);

    const weekdays=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    const weekdaysRow=document.createElement("div");
    weekdaysRow.className="calendar-weekdays";
    weekdays.forEach(day=>{
        const dayEl=document.createElement("div");
        dayEl.className="calendar-weekday"; dayEl.textContent=day;
        weekdaysRow.appendChild(dayEl);
    });
    calendarEl.appendChild(weekdaysRow);

    const daysGrid = document.createElement("div");
    daysGrid.className = "calendar-days";
    for (let i=0; i<(firstDay+6)%7; i++) {
        const empty = document.createElement("div");
        empty.className="calendar-day empty"; 
        daysGrid.appendChild(empty);
    }
    const today = new Date();
    for (let day=1; day<=lastDate; day++) {
        const dayEl = document.createElement("div");
        dayEl.className = "calendar-day"; 
        dayEl.textContent = day;
        dayEl.dataset.date = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        if(day===today.getDate() && month===today.getMonth() && year===today.getFullYear()) {
            dayEl.classList.add("today");
        }

    dayEl.addEventListener("click", () => {
        const today = new Date();
        const dayDate = new Date(`${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`);

        if(dayDate < today) return; 

        if(!startDate || (startDate && endDate)) {
            startDate = day; endDate = null;
        } else {
            if(day < startDate) { endDate = startDate; startDate = day; }
            else endDate = day;
        }

        selectedDates = [];
        const start = startDate, end = endDate || startDate;
        for(let d=start; d<=end; d++) {
            selectedDates.push(`${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`);
            }
            renderCalendarHighlight();
        });
                daysGrid.appendChild(dayEl);
            }
        calendarEl.appendChild(daysGrid);
        renderCalendarHighlight();
    }

function renderCalendarHighlight() {
    const today = new Date();
    document.querySelectorAll(".calendar-day").forEach(day => {
        const dateStr = day.dataset.date;
        day.style.backgroundColor = "";
        const dayDate = new Date(dateStr);

        if(day.classList.contains("today")) day.style.border = "0.3rem solid #3C552D";
        if(selectedDates.includes(dateStr)) day.style.backgroundColor = "#a4b689ff";

        reservations.forEach(r => {
            if (r.dates.includes(dateStr)) {
                if(dayDate < today) {
                    day.style.backgroundColor = "lightgrey"; 
                } else {
                    day.style.backgroundColor = "#3C552D";
                    day.style.color = "#fefefe" 
                }
            }
        });
    });
}

async function loadReservations() {
    const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    if (!user) return;

    try {
        const response = await fetch(`http://localhost:8080/api/rezervace/by-user?zakaznikId=${user.idZakaznici}`);
        if (response.ok) {
            const data = await response.json();
            reservations = data.map(r => {
                const start = new Date(r.datumOd).toISOString().split("T")[0];
                const end = new Date(r.datumDo).toISOString().split("T")[0];
                let dates = [];
                let current = new Date(start);

                while (current <= new Date(end)) {
                    dates.push(current.toISOString().split("T")[0]);
                    current.setDate(current.getDate() + 1);
                }

                return {
                    id: r.id,
                    roomId: r.roomId,
                    petId: r.petId,
                    dates
                };
            });
            renderCalendarHighlight();
        } else {
            console.error("Error");
        }
    } catch (err) {
        console.error("Reservation error:", err);
    }
}

// ZPRAVY
const notificationsList = document.getElementById("notifications-list");

async function loadNotifications() {
    const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    if(!user) return;

    try {
        const resReservations = await fetch(`http://localhost:8080/api/rezervace/by-user?zakaznikId=${user.idZakaznici}`);
        if(!resReservations.ok) return console.error("Error");
        const reservations = await resReservations.json();
        const resPets = await fetch(`http://localhost:8080/api/zvirata/by-user?zakaznikId=${user.idZakaznici}`);
        const pets = resPets.ok ? await resPets.json() : [];
        const resRooms = await fetch(`http://localhost:8080/api/rooms/all`);
        const rooms = resRooms.ok ? await resRooms.json() : [];

        notificationsList.innerHTML = "";

        const today = new Date();

        reservations.forEach(r => {
            const start = new Date(r.datumOd);
            const end = new Date(r.datumDo);
            const pet = pets.find(p => p.idZvirata === r.petId);
            const room = rooms.find(room => room.id === r.roomId);
            const petName = pet ? pet.jmeno : `Pet ID ${r.petId}`;
            const roomName = room ? room.name : `Room ID ${r.roomId}`;
            const totalPrice = r.celkovaCena;
            const text = `${start.toLocaleDateString()} - ${end.toLocaleDateString()} | Pet: ${petName} | Total price: $${totalPrice}`;
            const div = document.createElement("div");
            div.textContent = text;

            if(end < today) div.style.backgroundColor = "#cfcfcfff"; 
            else if(start <= today && end >= today) div.style.backgroundColor = "#fefefe"; 
            else div.style.backgroundColor = "#fefefe";                 

            div.style.padding = "1.2rem";
            div.style.margin = "0.5rem 0";
            div.style.borderRadius = "8px";

            notificationsList.appendChild(div);
        });

    } catch(err) {
        console.error("Error notification:", err);
    }
}

// REZERVACE POKOJU
const reserveBtn = document.getElementById("reserve-btn");
const roomModal = document.getElementById("room-reservation-modal");
const roomClose = roomModal.querySelector(".close");
const roomsList = document.getElementById("rooms-list");

const rooms = [
    {id:1,name:"Standard Room For Cats",price:50,image:"Photos/Rooms/catRoom1.jpg",description: "Cozy standard room designed specifically for cats. Includes daily fresh food, clean water, and a private litter box."},
    {id:2,name:"Larger Room For Cats",price:60,image:"Photos/Rooms/catRoom2.gif",description: "Spacious suite suitable for multiple cats from the same household. Equipped with climbing structures, shelves, toys, and multiple resting spots. Fresh food and water are provided daily, and litter boxes are cleaned frequently."},
    {id:3,name:"Standard Cage For Dogs",price:70,image:"Photos/Rooms/dogRoom1.webp",description: "Comfortable kennel designed for small to medium-sized dogs. The price includes daily feeding, fresh water, and regular outdoor walks."},
    {id:4,name:"Larger Cage For Dogs",price:90,image:"Photos/Rooms/dogRoom2.jpg",description: "Larger, luxury room for dogs who need extra space and attention. In addition to fresh food, water, and daily walks, this package also includes basic training and interactive play sessions with our staff."},
];

reserveBtn.addEventListener("click", ()=> {
    roomsList.innerHTML = "";
    rooms.forEach(room => {
        const card = document.createElement("div");
        card.className = "room-card";
        card.innerHTML = `
            <img src="${room.image}" alt="${room.name}">
            <div class="room-info">
                <p><strong>${room.name}</strong></p>
                <p class="room-desc">${room.description}</p>
                <p>Price: $${room.price}</p>
                <label for="pet-select-${room.id}">Select pet:</label>
                <select id="pet-select-${room.id}"><option value=""> </option></select>
                <button class="reserve-room-btn">Reserve</button>
            </div>
        `;
        roomsList.appendChild(card);

        const petSelect = card.querySelector("select");
        document.querySelectorAll(".pet-card").forEach(petCard => {
            const petInfo = petCard.querySelectorAll(".pet-info p");
            if(petInfo.length < 2) return;
            
            const petName = petInfo[0].textContent.replace("Name:", "").trim();
            const petType = petInfo[1].textContent.replace("Type:", "").trim().toLowerCase();

            if ((room.id === 1 || room.id === 2) && petType === "cat") {
                const option = document.createElement("option");
                option.value = petCard.dataset.id;
                option.textContent = petName;
                petSelect.appendChild(option);
            } else if ((room.id === 3 || room.id === 4) && petType === "dog") {
                const option = document.createElement("option");
                option.value = petCard.dataset.id;
                option.textContent = petName;
                petSelect.appendChild(option);
            }
        });

        card.querySelector(".reserve-room-btn").addEventListener("click", async ()=> {
    const petId = parseInt(petSelect.value);
    if(!petId) {
        showToast("Please select a pet.", "alert");
        return;
    }
    if (selectedDates.length < 2) {
        showToast("Please select at least 2 days for your reservation.", "alert");
        return;
    }

    const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    if(!user) {
        showToast("User not logged in!", "error");
        return;
    }

    const datumOd = selectedDates[0];
    const datumDo = selectedDates[selectedDates.length-1];
    const days = selectedDates.length;
    const celkovaCena = room.price * days;

    try {
        const response = await fetch("http://localhost:8080/api/rezervace/add", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                zakaznikId: user.idZakaznici,
                petId,
                roomId: room.id,
                datumOd,
                datumDo,
                celkovaCena,
                poznamka: ""
            })
        });

        if(response.ok){
            showToast(`Room ${room.name} reserved for ${petSelect.options[petSelect.selectedIndex].text}`, "success");
            roomModal.style.display = "none";
            await loadReservations();
        } else {
            const text = await response.text();
            showToast("Error: " + text, "error");
        }

    } catch(err) {
        console.error(err);
        showToast("Server error", "error");
    }
});
    });
    roomModal.style.display = "block";
});

roomClose.addEventListener("click", ()=> roomModal.style.display="none");
window.addEventListener("click", e => { if(e.target === roomModal) roomModal.style.display="none"; });

document.addEventListener("DOMContentLoaded", async () => {
    generateCalendar();
    await loadReservations();    
    await loadNotifications();   
});