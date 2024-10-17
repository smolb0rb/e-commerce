// Retorna booleano indicando si el usuario esta logueado.
function isLoggedIn() {
    return localStorage.getItem("userData") != null;
}

// Si ya esta logueado, retorna a la pagina de inicio.
if (isLoggedIn()) {
    document.location = 'index.html'
}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim(); 

    if (email === "") {
        alert("Por favor, ingrese su nombre de usuario.");
        return;
    }                   //campos NO vacíos

    if (password === "") {
        alert("Por favor, ingrese su contraseña.");
        return;
    }

    localStorage.setItem("userData", JSON.stringify({email: email}));

    // Redirige al inicio
    window.location.href = "index.html";
});
