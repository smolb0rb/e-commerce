function isLoggedIn() {
    return localStorage.getItem("isAuthenticated") === "true"
}

if (isLoggedIn()) { // redirect to index.html if already logged in
    document.location = 'index.html'
}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim(); 

    if (username === "") {
        alert("Por favor, ingrese su nombre de usuario.");
        return;
    }                   //campos NO vacíos

    if (password === "") {
        alert("Por favor, ingrese su contraseña.");
        return;
    }
    
    // Si las credenciales son correctas, establecer la autenticación
    localStorage.setItem("isAuthenticated", "true");

    // Redirige al index
    document.location = "index.html";
});
