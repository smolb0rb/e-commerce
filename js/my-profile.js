// Al cargar la pagina, rellena el formulario con los datos guardados.

const data = getUserData();
setInputValue('nombre', data.nombre);
setInputValue('nombre2', data.nombre2);
setInputValue('apellido', data.apellido);
setInputValue('apellido2', data.apellido2);
setInputValue('email', data.email);
setInputValue('telefono', data.telefono);

// Pone la foto de perfil guardada (si hay una) en el tag <img>
let fotoPerfilB64 = localStorage.getItem('profilePicture');
if (fotoPerfilB64 != null) {
    document.getElementById('foto-perfil').src = fotoPerfilB64;
}

//==============================================
// Funcionalidad del formulario.

// Variable global para almacenar una nueva foto de perfil.
let imageB64 = null;

// Evento para cuando se envia el form.
document.getElementById('profileForm').onsubmit = function(e) {
    // Cancela el envio del form.
    e.preventDefault();
    e.stopPropagation();

    // Construye los datos nuevos.
    let userData = {
        nombre    : getInputValue('nombre'),
        nombre2   : getInputValue('nombre2'),
        apellido  : getInputValue('apellido'),
        apellido2 : getInputValue('apellido2'),
        email     : getInputValue('email'),
        telefono  : getInputValue('telefono'),
    };

    // Guarda los datos nuevos en localStorage.
    setUserData(userData);

    // Si selecciono una foto nueva, la actualiza.
    if (imageB64 != null) {
        localStorage.setItem('profilePicture', imageB64);
    }

    // Recarga la pagina.
    document.location.reload();

}

// Evento para cuando selecciona una foto nueva.
document.getElementById('profileImgPicker').onchange = async function(e) {
    // Obtiene la foto y comprueba que sea valida.
    const file = e.target.files[0];
    if (file) {
        // Convierte la foto a base64.
        let b64img = await fileToBase64(file);

        // Pone la foto en el tag <img>
        document.getElementById('foto-perfil').src = b64img;

        /**
         * Guardar el valor local de base64 en una variable
         * global para poder acceder a su contenido desde
         * el envio del form.
         */
        imageB64 = b64img;
    }
};
