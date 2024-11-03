// ====================================
// Cuando la pagina carga:

// Si no esta logueado, redirige al login.
if (!isLoggedIn()) {
  document.location = 'login.html'
}

// Si esta logueado, setea el nombre de usuario en la barra de nav.
if (isLoggedIn()) {
  const email = getUserData().email;
  const emailNav = document.getElementById("userNav");
  emailNav.innerHTML = email;
}

// Setea el tema actual cuando la pagina carga.
setTheme(getTheme());
if (getTheme() == 'dark') {
  toggleThemeIcon();
}

// ====================================

const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(response => {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(error => {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//=========================================
// Funciones de utilidad.

// Edita los datos del usuario a traves de un callback.
function editUserData(fn) {
  let data = getUserData();
  fn(data);
  setUserData(data);
}

// Guarda los datos del usuario en localStorage.
function setUserData(data) {
  setJson('userData', data);
}

// Obtiene los datos del usuario desde el localStorage.
function getUserData() {
  return getJson('userData', {});
}

// Obtiene un objeto desde el localStorage, o retorna un valor por defecto.
function getJson(key, def) {
  // Obtiene los datos del localStorage
  let result = localStorage.getItem(key);
  if (result) {
    // Si existe, lo convierte de string a objeto y lo retorna
    return JSON.parse(result);
  }
  // Retorna el valor por defecto
  return def;
}

// Guarda un objeto en el localStorage
function setJson(key, obj) {
  // Convierte el objeto a string
  let str = JSON.stringify(obj);
  // Lo guarda en localStorage
  localStorage.setItem(key, str);
}

// Retorna booleano indicando si el usuario esta logueado.
function isLoggedIn() {
  return localStorage.getItem("userData") != null;
}

// Obtiene un valor desde la URL.
function getDataFromURL(name) {
  return new URL(document.location).searchParams.get(name);
}

// Desloguea al usuario y redirige al login.
function logout() {
  localStorage.clear();
  document.location = 'login.html';
}

// Alterna el icono de "cambiar tema" entre el sol y la luna.
function toggleThemeIcon() {
  let themeIcon = document.getElementById('theme-icon');
  themeIcon?.classList.toggle('fa-moon');
  themeIcon?.classList.toggle('fa-sun');
}

// Alterna el tema del sitio entre modo dia y noche.
function toggleDarkMode() {

  toggleThemeIcon();

  let theme = getTheme();
  let isDark = theme == 'dark';
  let newTheme = isDark ? 'light' : 'dark';

  setTheme(newTheme);
}

// Obtiene el tema actual, valores validos: dark, light.
function getTheme() {
  return localStorage.getItem('theme') ?? 'light';
}

// Setea un tema, valores validos: dark, light.
function setTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  localStorage.setItem('theme', theme)
}

// Setea un nuevo valor en un input.
function setInputValue(id, val) {
  document.getElementById(id).value = val ?? "";
}

// Obtiene el valor de un input.
function getInputValue(id) {
  return document.getElementById(id).value;
}

/*
 * Convierte un archivo en base64,
 * se obtiene el resultado con una promesa.
 */
async function fileToBase64(file) {
  return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.readAsDataURL(file);
  });
}

function setCartBadge() {
  let amount = 0;
  let products = getJson('cart', {});
  for (let id in products) {
    amount += parseInt(products[id].amount);
  }
  let badge = document.getElementById('cart-amount-badge');
  if (!badge) {
    return;
  }
  if (amount > 0) {
    badge.textContent = amount;
  } else {
    badge.textContent = '';
  }
}

setCartBadge()