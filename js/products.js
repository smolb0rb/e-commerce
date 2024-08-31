
function showProductsList(productsArray) {
    let htmlContentToAppend = "";

    // Itera sobre cada producto dentro del array 'products'
    for (let i = 0; i < productsArray.length; i++) {
        let product = productsArray[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-lg-3 col-sm-6">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
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
    document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
}   

// petición de json
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData("https://japceibal.github.io/emercado-api/cats_products/101.json").then(function(resultObj) {
        if (resultObj.status === "ok") {
            console.log (resultObj.data)
            // Accede a la lista de productos dentro del objeto JSON
            let productsArray = resultObj.data.products;
            showProductsList(productsArray);
            console.log(productsArray)
        }
    });
});
