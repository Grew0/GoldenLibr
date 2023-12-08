let isLandscape = false;
let rt = document.currentScript.getAttribute("rt");

window.onmessage = function(event){
    if(event.data == "from iframe"){
        isLandscape = true;
    }
}

window.top.postMessage("is phone", "*");

setTimeout(
    ()=>{
        if(!isLandscape){
            
            let a = document.getElementById("back_from_iframe");
            if(a != null) a.href= rt + "Shells.html";


            let item = document.querySelector("body");
            let item_innerHtml = item.innerHTML;
            item.innerHTML += 
            "<img style='position:fixed; width:100vw; height:100vh; z-index: -10000; left:0px; top:0px' src='" + rt + "paper.jpg'></img>"

            document.querySelector('html').innerHTML += 
            "<style>\
body{padding: 5%}\
h1{font-size: 5em}\
p{font-size: 4em;}\
li{font-size: 4em;}\
.back{font-size: 4em;}\
.interface{font-size: 4em}\
</style>";

        }else{
            document.querySelector('html').innerHTML += 
            "<style>\
p{font-size: 25px;}\
li{font-size: 25px;}\
.back{font-size: 21px;}\
</style>";


        }
    },
    15
);

