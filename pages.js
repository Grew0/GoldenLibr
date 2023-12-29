let isLandscape = false;
let rt = document.currentScript.getAttribute("rt");

document.querySelector("html").style.opacity = 0;

function shape(){
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
    document.querySelector("html").style.opacity = 1;
    


    let waves = document.getElementsByClassName("wave_anim");
    console.log(waves.length);
    for(let i=0;i<waves.length;i++){
        let nwin = "";
        for(let j=0;j<waves[i].innerHTML.length;j++){
            nwin += "<span>" + waves[i].innerHTML[j] + "</span>";
        }
        waves[i].innerHTML = nwin;
        console.log(nwin);
        console.log(waves[i].innerHTML);
    }
    
    function wave_anim(time){
        for(let i=0;i<waves.length;i++){
            let letters = waves[i].childNodes;
            for(let j=0;j<letters.length;j++){
                letters[j].style.textShadow = "#000 0px " + Math.cos(time/300 + j*0.5)*2 + "px";
                letters[j].style.color = "rgba(0,0,0,0)";
                letters[j].style.transition = "0.05s";
            }
        }
        setTimeout(requestAnimationFrame, 50, wave_anim);		
    }
    requestAnimationFrame(wave_anim);
    
    
}

let tmout = setTimeout(
    shape,
    15
);

window.onmessage = function(event){
    if(event.data == "from iframe"){
        isLandscape = true;
        clearTimeout(tmout);
        shape();
    }
}

window.top.postMessage("is phone " + window.location.href, "*");


