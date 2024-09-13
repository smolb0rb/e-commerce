let productsCache = [];
let lastShown = [];

function showProducts(productsArray) {
    let newHtmlContent = "";

    // Itera sobre cada producto dentro del array 'products'
    for (let i = 0; i < productsArray.length; i++) {
        let product = productsArray[i];

        newHtmlContent += `
        <div class="list-group-item list-group-item-action cursor-active" data-id="${product.id}" onclick="selectProduct(${product.id})">  
            <div class="row">
                <div class="col-lg-3 col-sm-6">
                    <img src="${product.image}" class="img-thumbnail">
                </div>
                <div class="col">
                    <small class="float-end text-muted"> Vendidos hasta el momento: ${product.soldCount}</small>
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${product.name}</h4>
                    </div>
                    <p class="mb-1 small">${product.description}</p>
                    <h5 class="mb-1">${product.currency} ${product.cost}</h5>
                </div>
            </div>
        </div>
        `
    }

    // Inserta el contenido generado en el div
    document.getElementById("product-list-container").innerHTML = newHtmlContent;
}   

document.addEventListener("DOMContentLoaded", function (e) {

    let catID = localStorage.getItem("catID");

    let url = PRODUCTS_URL + catID + EXT_TYPE;

    getJSONData(url).then(function (result) {
        if (result.status === "ok") {
            productsCache = result.data.products;

            showProducts(productsCache);
        }
    });

});



function selectProduct(productId){
    localStorage.setItem("selectedProductId",productId);

    window.location.href = "product-info.html"; 
}

// Ordenamiento

function sortByName(asc) {
    return fnSort(productsCache, p => p.name, asc);
}

function sortByPrice(asc) {
    return fnSort(productsCache, p => p.cost, asc);
}

function sortBySold(asc) {
    return fnSort(productsCache, p => p.soldCount, asc);
}

function fnSort(array, fn, asc) {
    return array.toSorted(function (a, b) {
        a = fn(a); b = fn(b);
        if (a < b) { return asc ? -1 : 1; }
        if (a > b) { return asc ? 1 : -1; }
        return 0;
    });
}

// Funcionamiento de barra de busqueda.

let searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", function(e) {
    let text = e.target.value;

    let result = productsCache.filter(product => {
        if (contains(product.name, text) || contains(product.description, text)) {
            return true;
        }
        return false;
    });

    showProducts(result);
});

/**
 * Retorna true si el string "find" existe dentro de "str" sin importar las mayusculas y miniusculas.
 */
function contains(str, find) {
    return str.toLowerCase().indexOf(find.toLowerCase()) != -1;
}