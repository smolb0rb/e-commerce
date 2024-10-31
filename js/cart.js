const cartItemList = document.getElementById('cart-item-list');
const cartDetailsList = document.getElementById('cart-item-list-details');

let products = getJson('cart', {});

let itemsHtml = '';
for (let id in products) {
    let product = products[id];

    itemsHtml += `
    <div class="list-group-item">
        <div class="cart-item">
            <div class="cart-item-img-container">
                <i class="far fa-times-circle"></i>
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

function loadDetails() {
    let detailsHtml = '';
    let precioTotal = 0;

    for (let id in products) {
        let product = products[id];

        precioTotal += product.cost * product.amount;

        detailsHtml += `
        <li class="list-group-item">${product.amount}x ${product.name}</li>
        `;
    }

    cartDetailsList.innerHTML = detailsHtml;

    document.getElementById('subtotal').textContent = "$ " + precioTotal;
}

function amountChange(input, id) {
    let product = products[id];
    let newAmount = input.value;
    product.amount = newAmount;

    setJson('cart', products);

    loadDetails();
}