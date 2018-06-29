import '../common/rem.js'
import $ from 'jquery'
import methods from '../common/filters.js'
import '../common/reset.css'
import '../css/index.css'
import _ from 'lodash'


import indexArt from '../art/index.art'

console.log(methods.changeNum("xaing"))
console.log(methods.changeTime("2018-06"))

const number = [1,2,3].map(function(r){return r+1})
var greet = document.createElement('div');
greet.textContent = number+"index33";
$("#index").append(greet);

const arr = {
	list: [
		{
			name: "zhaoxiang",
			code: "25",
			num: 1
		},
		{
			name: "rrhaowwang",
			code: "15",
			num: 2
		},
		{
			name: "qqeehaoeeang",
			code: "75",
			num: 1
		}
	],
	header: "这是头",
	pHtml: "<p>快！编码输出我！</p>"
}

console.log(_.chunk(arr.list, 2))

const html =  indexArt(arr) 
$('#index').append(html);
// $("#index").fadeOut(3000)
var strData = JSON.stringify({
	method: "getuserpoint",
    accesstoken: "01204005194644175215081296" 
})
$(function(){
    $('#index').click(function(){
         $.ajax({
             type: "post",
             headers: {
              'Content-Type':'application/json; charset=utf-8'
          	 },
             url: process.env.API_HOST+'ajax/Exchange/Exchange_App.ashx',
             data: strData,
             dataType: "json",
             success: function(data){
                     console.log(data)
                }
         });
    });
});