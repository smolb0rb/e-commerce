const cartItemList = document.getElementById('cart-item-list');
const cartDetailsList = document.getElementById('cart-item-list-details');

let products = getJson('cart', {});

let itemsHtml = '';
let detailsHtml = '';
let precioTotal = 0;
for (let id in products) {
    let product = products[id];

    precioTotal += product.cost * product.amount;

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
                <input class="cart-item-amount form-control" type="number" value="${product.amount}">
            </span>
        </div>
    </div>
    `;

    detailsHtml += `
    <li class="list-group-item">${product.amount}x ${product.name}</li>
    `;
}

cartItemList.innerHTML = itemsHtml;
cartDetailsList.innerHTML = detailsHtml;

document.getElementById('subtotal').textContent = "$ " + precioTotal;