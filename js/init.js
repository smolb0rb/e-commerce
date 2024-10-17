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

function isLoggedIn() {
  return localStorage.getItem("isAuthenticated") === "true"
}

if (!isLoggedIn()) {
  document.location = 'login.html'
}

if (isLoggedIn()) {
  const username = localStorage.getItem("username")

  const userNav = document.getElementById("userNav");

  userNav.innerHTML = username;
}

function getDataFromURL(name) {
  return new URL(document.location).searchParams.get(name);
}

function logout() {
  localStorage.clear();
  document.location = 'login.html';
}

function toggleThemeIcon() {
  let themeIcon = document.getElementById('theme-icon');
  themeIcon?.classList.toggle('fa-moon');
  themeIcon?.classList.toggle('fa-sun');
}

function toggleDarkMode() {

  toggleThemeIcon();

  let theme = getTheme();
  let isDark = theme == 'dark';
  let newTheme = !isDark ? 'dark' : 'light';

  document.documentElement.setAttribute('data-bs-theme', newTheme);

  localStorage.setItem('theme', newTheme)
}

function getTheme() {
  return localStorage.getItem('theme') ?? 'light';
}

// Set current theme
document.documentElement.setAttribute('data-bs-theme', getTheme());

if (getTheme() == 'dark') {
  toggleThemeIcon();
}