import '../css/home.css'
import imgs from '../../static/4.jpg'
const number = [1,2,3].map(function(r){return r+1})
var greet = document.createElement('div');
var grees = document.createElement('div');
grees.style.width = "100px"
grees.style.height = "100px"
grees.style.background = 'url('+imgs+')'
grees.style.backgroundSize = "100%"
greet.textContent = number+"home";
document.querySelector("#home").appendChild(greet);
document.querySelector("#home").appendChild(grees);