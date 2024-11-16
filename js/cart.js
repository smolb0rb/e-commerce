const cartItemList = document.getElementById('cart-item-list');
const cartDetailsList = document.getElementById('cart-item-list-details');

let products = getJson('cart', {});

let productCount = Object.keys(products).length;

if (productCount == 0) {
    document.getElementById('cart-empty-alert').classList.toggle('hidden');
    document.getElementById('cart-main').classList.toggle('hidden');
}

let itemsHtml = '';
for (let id in products) {
    let product = products[id];

    itemsHtml += `
    <div class="list-group-item">
        <div class="cart-item">
            <div class="cart-item-img-container">
                <i class="far fa-times-circle" onclick="deleteFromCart(${id})"></i>
                <img class="cart-item-img" src="${product.image}">
            </div>
            <span class="cart-item-name">${product.name}</span>
            <span class="cart-item-price-unit">${product.currency} ${product.cost}</span>
            <span class="cart-item-amount-container">
                Cant.
                <input oninput="amountChange(this, ${id})" class="cart-item-amount form-control" type="number" value="${product.amount}">
            </span>
        </div>
    </div>
    `;
}
cartItemList.innerHTML = itemsHtml;

loadDetails();

/**
 * Funcion que se llama cuando se hace click en el
 * boton circular de eliminar
 */
function deleteFromCart(id) {
    delete products[id];
    setJson('cart', products);
    loadDetails();
}

/**
 * Funcion que devuelve el subtotal de todos los productos
 */
function calcularTotalProductos() {
    let precioTotal = 0;

    for (let id in products) {
        let product = products[id];

        precioTotal += product.cost * product.amount;
    }

    return precioTotal;
}
/**
 * Recarga los detalles del carrito, actualizando la lista de productos,
 * el subtotal, el costo de envío y el total.
 */
function loadDetails() {

    let detailsHtml = '';
    for (let id in products) {
        let product = products[id];

        detailsHtml += `
        <li class="list-group-item">${product.amount}x ${product.name}</li>
        `;
    }
    cartDetailsList.innerHTML = detailsHtml;

    const precioTotal = calcularTotalProductos();
    document.getElementById('subtotal').textContent = "$ " + precioTotal;
    actualizarCostoTotal();
}
/**
 * Función que se llama cuando se cambia la cantidad de productos.
 */
function amountChange(input, id) {
    let product = products[id];
    let newAmount = input.value;
    product.amount = newAmount;

    setJson('cart', products);

    loadDetails();
    calcularCostoEnvio(); 
    actualizarCostoTotal(); 

    setCartBadge()
}


// Esta función calcula el costo del envío según el tipo.

function calcularCostoEnvio() {
    const subtotal = calcularTotalProductos();
    const envioSeleccionado = document.querySelector('input[name="shipping"]:checked')?.value;

    let valorEnvio = 0;

    if (envioSeleccionado === "1") {
        valorEnvio = subtotal * 0.10; // 10% para envío premium
    } else if (envioSeleccionado === "2") {
        valorEnvio = subtotal * 0.05; // 5% para  envío express
    } else if (envioSeleccionado === "3") {
        valorEnvio = subtotal * 0.02; // 2% para envío standard
    }

    // Se actualiza en la interfaz
    document.getElementById('costo-envio').textContent = '$ ' + valorEnvio.toFixed(2);
    document.getElementById('costo-envio2').textContent = '$ ' + valorEnvio.toFixed(2);

    return valorEnvio; // Retorna el valor para usar en el costo total

}

/**
 * Función para actualizar el costo total (productos + envío)
 */
function actualizarCostoTotal() {
    const subtotal = calcularTotalProductos();
    const costoEnvio = calcularCostoEnvio(); // Calcula y actualiza el costo de envío
    const costoTotal = subtotal + costoEnvio;

    document.getElementById('costo-total').textContent = "$ " + costoTotal.toFixed(2);
}



/**
 * Funcion que se llama en tiempo real cuando se cambia el tipo de envio.
 */
function changeShipping(e) {
    calcularCostoEnvio(); // Recalcular el costo de envío
    actualizarCostoTotal(); // Recalcular el total (productos + envío)
}

/**
 * Para todas las casillas de seleccion del tipo de envio, se hace
 * que la funcion 'changeShipping' sea llamada en el evento 'change'
 */
for (let radio of document.querySelectorAll('input[name="shipping"]')) {
    radio.addEventListener('change', changeShipping)
}


// Esto se ejecuta una sola vez al cargar la pagina
(function (){

    const precioTotal = calcularTotalProductos();

    // Por defecto es 7%, y se le quita decimales
    const costoEnvioInicial = Math.floor(precioTotal * 0.07);

    document.getElementById('costo-envio').textContent = '$ ' + costoEnvioInicial;
    document.getElementById('costo-envio2').textContent = '$ ' + costoEnvioInicial;

    // Calcular el costo total al inicio
    calcularCostoEnvio();
    actualizarCostoTotal();

})();



document.addEventListener("DOMContentLoaded", function () {
    const finalizarCompraButton = document.getElementById("finalizarCompra");

    finalizarCompraButton.addEventListener("click", function () {
        // Selecciona los campos de dirección
        const addressFields = document.querySelectorAll('.input-group input');

        // Verifica si todos los campos están llenos
        const addressValid = Array.from(addressFields).every(field => field.value.trim() !== "");

        if (!addressValid) {
            alert("Por favor, complete todos los campos de la dirección.");
            return;
        }

        // Si todos los campos están completos
        alert("¡Compra exitosa! Gracias por tu compra.");
    });
});