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

        <div class="col-md-6 text-center">
            <div class="slider-wrapper">
                <div class="slider"></div>
                <div class="slider-nav"></div>
            </div>
        </div>

        <div class="col-md-6">
            <h1><b>${product.name}</b></h1>

            <table>
                <tr>
                    <td>Categoria:<td>
                    <td>${product.category}<td>
                </tr>
                <tr>
                    <td>Vendidos:<td>
                    <td>${product.soldCount}<td>
                </tr>
                <tr>
                    <td>Precio:<td>
                    <td><b>${product.currency} ${product.cost}</b><td>
                </tr>
            </table>
            <br/>
            <div class="card" style="max-width: 50rem;">
                <div class="card-body">
                    <h5 class="card-title"> <b> Descripción </b> </h5>
                    <p class="card-text">${product.description}</p>
                </div>
            </div>
        </div>
    </div>
    `

    for (let i = 0; i < product.images.length; i++) {
        let imgUrl = product.images[i];

        let sliderImages = productInfoContainer.querySelector('.slider');
        let sliderNav = productInfoContainer.querySelector('.slider-nav');

        let slideImg = document.createElement('img');
        slideImg.src = imgUrl;
        slideImg.id = "slide-" + (i+1);

        sliderImages.appendChild(slideImg)

        let slideJump = document.createElement('a');
        slideJump.href = "#" + slideImg.id;

        sliderNav.appendChild(slideJump);
    }

}
