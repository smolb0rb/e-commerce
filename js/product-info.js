document.addEventListener("DOMContentLoaded", function () {
    let productId = localStorage.getItem("selectedProductId");   //defini la varibale que almacena el valor que quede en el localstorch bajo el item selectedProductId 

    getJSONData(`https://japceibal.github.io/emercado-api/products/${productId}.json`).then(function (resultObj) {   // getjsondata: petición URL que devuelve un archivo json, en general devuelve una promesa que muestra el resultado de la petición con el método .then (procesa el resultado de la promesa)
        if (resultObj.status === "ok") {
            let selectedProduct = resultObj.data; //en esa variable se guarda la info/data del producto                                       
            let categoryName = resultObj.data.category;  //en esa variable se guarda la categoria a la que pertenece el producto
            showProductInfo(selectedProduct, categoryName);
        }
    });
});




function showProductInfo(product, categoryName) {
    let productInfoContainer = document.getElementById("product-info-container");  //variable que almacena la referencia al dom q contiene ese id

    // Estructura de como se muestra esa info
    productInfoContainer.innerHTML = `
<div class="row">
         <div class="col-md-1 text-center" style="width: 64px; margin-left: 90px;">
            <button style="margin-top: 195px;"><</button>
        </div>
        <div class="col-md-5 text-center">
        <img src="${product.images[0]}" alt="${product.description}"class="img-fluid img-thumbnail mb-4" >
        </div>
        <div class="col-md-1 text-center" style="width: 64px">
            <button style="margin-top: 195px;">></button>
        </div>

        <div class="col-md-4">
            <h1> <b> ${product.name} </b> </h1>
            <h3>${categoryName}</h3>
            <h2> <b> Vendidos: ${product.soldCount} </b> </h2> 
        <div class="card" style="width: 50rem;">
            <div class="card-body">
            <h5 class="card-title"> <b> Descripción </b> </h5>
            <p class="card-text">${product.description}</p>
        </div>
</div>
`
}
