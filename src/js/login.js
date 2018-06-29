import '../css/login.css'
const number = [1,2,3].map(function(r){return r+1})
var greet = document.createElement('div');
greet.textContent = number+"login";
document.querySelector("#login").appendChild(greet);