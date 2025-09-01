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

// --- Modal pro mazlíčky ---
document.addEventListener("DOMContentLoaded", () => {
    const petModals = document.querySelectorAll(".modal");   // všechny modály
    const closeButtons = document.querySelectorAll(".modal .close"); // všechny křížky

    // Kliknutí na křížek
    closeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".modal");
            if (modal) modal.style.display = "none";
        });
    });

    // Kliknutí mimo obsah zavře modal
    window.addEventListener("click", (event) => {
        petModals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});

//Formular na About
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
      showToast("Fill in all the fields", "warning");
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

    fetch("http://localhost:8080/contact/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(contactFormData)
    }).catch(error => {
      console.error("Error:", error);
    });
  });
}

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


// Odhlasovani
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
    const authLink = document.getElementById("auth-link");

    if (user && authLink) {
        if (window.location.pathname.endsWith("Profile.html")) {
            authLink.innerHTML = `<a href="#" class="nav-link nav-button" id="logout-btn">Logout</a>`;

            const logoutBtn = document.getElementById("logout-btn");
            if (logoutBtn) {
                logoutBtn.addEventListener("click", (event) => {
                    event.preventDefault();

                    localStorage.removeItem("user");
                    sessionStorage.removeItem("user");

                    showToast("You have been logged out", "success");

                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 1500);
                });
            }
        } else {
            authLink.innerHTML = `<a href="Profile.html" class="nav-link nav-button">My Profile</a>`;
        }
}
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    if (user && nameInput && emailInput) {
        nameInput.value = `${user.jmeno || ""} ${user.prijmeni || ""}`.trim();
        emailInput.value = user.email || "";
    }
});




