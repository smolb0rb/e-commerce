document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        window.location = "products.html?id=101"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        window.location = "products.html?id=102"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        window.location = "products.html?id=103"
    });
});