const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

//Formular na About
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
        showToast("Fill in all fields", "warning");
        return;
    }

    const contactFormData = {
        name: name,
        email: email,
        message: message
    };

    showToast("Your message has been sent successfully", "success");

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

    // Odeslani dat do backendu pomoci AJAX
    fetch("http://localhost:8080/contact/submit", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(contactFormData)
})
    .catch(error => {
        console.error("Error:", error);
    });
});

// Hlaska pri odeslani formulare
function showToast(message, type = "success") {
    const existingToast = document.querySelector(".toast");
    if (existingToast) existingToast.remove();

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100); 

    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.add("hidden");
        setTimeout(() => {
            toast.remove();
        }, 100); 
    }, 4000);
}