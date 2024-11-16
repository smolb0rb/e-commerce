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

}

function amountChange(input, id) {
    let product = products[id];
    let newAmount = input.value;
    product.amount = newAmount;

    setJson('cart', products);

    loadDetails();

    setCartBadge()
}

/**
 * 
 * Esta funcion se llama cuando se hace click en
 * el btn 'Finalizar Compra', se obtiene como param.
 * la referencia DOM del boton, la cual nos sirve
 * para obtener la ref. al <form>
 * 
 */
function comprarBtnClick(btn) {

    /** referencia DOM al <form> 
     * 
     * Con esto se puede validar el form
     * para asegurar que todos los campos
     * son validos (ej. los 'required')
     * 
    */
    const form = btn.parentElement;

    

}


/**
 * Funcion que se llama en tiempo real cuando se cambia el tipo de envio.
 */
function changeShipping(e) {
    /**
     * Posibles valores y su significado:
     * 1  == Envio premium
     * 2  == Envio express
     * 3  == Envio standard
     */
    const envio = e.target.value;

    let valorEnvio = 0; // calcular


    // Se actualiza el valor en pantalla
    document.getElementById('costo-envio').textContent = '$ ' + valorEnvio;
    document.getElementById('costo-envio2').textContent = '$ ' + valorEnvio;

    // calcular envio+productos
    document.getElementById('costo-total').textContent = '$ ' + 0;

}

/**
 * Para todas las casillas de seleccion del tipo de envio, se hace
 * que la funcion 'changeShipping' sea llamada en el evento 'change'
 */
for (let radio of document.querySelectorAll('input[name="shipping"]')) {
    radio.addEventListener('change', changeShipping)
}


// Esto se ejecuta una sola vez al cargar la pagina
(function(){

    const precioTotal = calcularTotalProductos();

    // Por defecto es 7%, y se le quita decimales
    const costoEnvioInicial = Math.floor(precioTotal * 0.07);

    document.getElementById('costo-envio').textContent = '$ ' + costoEnvioInicial;
    document.getElementById('costo-envio2').textContent = '$ ' + costoEnvioInicial;

    // calcular envio+productos
    document.getElementById('costo-total').textContent = '$ ' + 0;

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
  