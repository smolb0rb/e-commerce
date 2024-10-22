
document.addEventListener("DOMContentLoaded", function () {
    let productId = getDataFromURL('id');

    getJSONData(PRODUCT_INFO_URL + productId + EXT_TYPE).then(function (resultObj) {   // getjsondata: petición URL que devuelve un archivo json, en general devuelve una promesa que muestra el resultado de la petición con el método .then (procesa el resultado de la promesa)
        if (resultObj.status === "ok") {
            let selectedProduct = resultObj.data; //en esa variable se guarda la info/data del producto                                       
            showProductInfo(selectedProduct);
        }
    });
    getProductComments(productId)
});




function showProductInfo(product) {
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
        slideImg.id = "slide-" + (i + 1);

        sliderImages.appendChild(slideImg)

        let slideJump = document.createElement('a');
        slideJump.href = "#" + slideImg.id;

        sliderNav.appendChild(slideJump);
    }

    let relatedDiv = document.getElementById('related');
    for (let rel of product.relatedProducts) {
        let html = `
        <div>
            <a href="product-info.html?id=${rel.id}">
                <img src="${rel.image}" height="100px" />
            </a>
            <p>${rel.name}</p>
        </div>
        `;
        let relatedProduct = document.createElement('div');
        relatedDiv.appendChild(relatedProduct);
        relatedProduct.outerHTML = html;
    }
}

//  - Sección de Calificaciones -
//Traigo los comentarios ya existentes en el archivo json
function getProductComments(productId) {
    const url = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;
    fetch(url)
        .then(response => response.json())
        .then(comments => showProductComments(comments))
        .catch(error => console.error('Error fetching comments:', error));
}

const commentsContainer = document.getElementById("product-comments-container");

// Muestro esos comentarios con determinada info
function showProductComments(comments) {
    commentsContainer.innerHTML = "";

    comments.reverse().forEach(comment => {
        addNewComment(comment);
    });
}

/**
 * Comment debe tener: dateTime, user, score, description.
 */
function addNewComment(comment) {
    commentsContainer.innerHTML = `
    <div class="row">
        <div class="col-md-6 mx-auto">
            <div class="comment">
                <div class="col-12 text-end">
                    <p class="text-end me-2">${comment.dateTime}</p>
                </div>
                <h6><b>${comment.user}</b></h6>
                <p>${getStars(comment.score)} (${comment.score}/5)</p>
                <p>"${comment.description}"</p> 
            </div>
        </div>
    </div>
    <br>
  ` + commentsContainer.innerHTML;
}

// Calificación representada con estrellas
function getStars(score) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}


let commentBtn = document.getElementById('commentBtn');
commentBtn.addEventListener('click', function (e) {
    let comment = document.getElementById('comment');
    let commentText = comment.value;

    if (!commentText) {
        return;
    }

    let stars = document.getElementById('stars-slide').value;
    let user = getUserData().email;
    let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    addNewComment({
        dateTime: date,
        user: user,
        score: stars,
        description: commentText
    });

    comment.value = "";
});