let isLandscape = false;
let rt = document.currentScript.getAttribute("rt");

window.onmessage = function(event){
    if(event.data == "from iframe"){
        isLandscape = true;
        console.log(document.getElementById("back_from_iframe"));
    }
}

window.top.postMessage("is phone", "*");

setTimeout(
    ()=>{
        if(!isLandscape){
            console.log("Ok1");
            
            let a = document.getElementById("back_from_iframe");
            console.log("Ok2");
            if(a != null) a.href= rt + "Shells.html";
            console.log("Ok3");


            let item = document.querySelector("body");
            let item_innerHtml = item.innerHTML;
            item.innerHTML += 
            "<img style='position:fixed; width:100vw; height:100vh; z-index: -10000; left:0px; top:0px' src='" + rt + "paper.jpg'></img>"
            console.log("Ok4");
        }
    },
    15
);

