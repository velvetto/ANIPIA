// TOAST
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

// REGISTRACE
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.querySelector("#signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const firstName = document.querySelector("#first-name").value.trim();
      const lastName = document.querySelector("#last-name").value.trim();
      const phone = document.querySelector("#telefon")?.value.trim() || "";
      const email = document.querySelector("#email").value.trim();
      const password = document.querySelector("#password").value.trim();
      const confirmPassword = document.querySelector("#confirm-password").value.trim();
      const errorContainer = document.querySelector("#password-error");

      errorContainer.style.display = "none";
      errorContainer.textContent = "";
      document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));

      let errors = [];

      if (password.length < 8) {
        errors.push("Password must be at least 8 characters.");
        document.querySelector("#password").classList.add("input-error");
      }

      if (password !== confirmPassword) {
        errors.push("Passwords do not match.");
        document.querySelector("#confirm-password").classList.add("input-error");
      }

      if (errors.length > 0) {
        errorContainer.innerHTML = errors.join("<br>");
        errorContainer.style.display = "block";
        return;
      }

      // Odeslání dat na backend
      try {
        const response = await fetch("http://localhost:8080/api/zakaznici/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            jmeno: firstName,
            prijmeni: lastName,
            telefon: phone,
            email,
            heslo: password
          })
        });

        if (response.ok) {
          showToast("Your registration is completed. Please log in", "success");
          setTimeout(() => {
            window.location.href = "Login.html";
          }, 2000);
        }
        else {
          const text = await response.text();

          if (text.includes("Email")) {
            localStorage.setItem("prefillEmail", email);
            showToast("User with such an email already exists", "error");
            setTimeout(() => {
                window.location.href = "Login.html";
            }, 2000);
        }

          else {
            showToast("Registration failed", "error");
          }
        }
      }

      catch (err) {
        console.error(err);
        showToast("Server error", "error");
      }
    });
  }
});

// LOGIN
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");
  if (loginForm) {
    const prefillEmail = localStorage.getItem("prefillEmail");
    if (prefillEmail) {
      const emailInput = document.querySelector("#email");
      if (emailInput) {
        emailInput.value = prefillEmail;
        localStorage.removeItem("prefillEmail");
      }
    }

    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.querySelector("#email").value.trim();
      const password = document.querySelector("#password").value.trim();
      const rememberMe = document.querySelector("#remember-me")?.checked;

      try {
        const response = await fetch("http://localhost:8080/api/zakaznici/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, heslo: password })
        });
        
        if (response.ok) {
          const data = await response.json();

          data.email = email;

        if (rememberMe) {
          localStorage.setItem("user", JSON.stringify(data));
        }

        else {
          sessionStorage.setItem("user", JSON.stringify(data));
        }

        showToast(`Welcome back, ${data.jmeno} ${data.prijmeni}`, "success");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
        }

        else {
          showToast("Invalid email or password", "error");
        }
      }

      catch (err) {
        console.error(err);
        showToast("Login error", "error");
      }
    });
  }
});