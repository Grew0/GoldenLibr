let items = {
    "book2": "res/ПОУМ/ПОУМ.html",
};

let iframe_controller = null;
let iframe_controller_backup = {
        opened: false,
        ifr: document.getElementById("ifr"), 
        outifr: document.getElementById("outifr"),
        ifrback: document.getElementById("iframeback"),

        open: function(res){
            iframe_controller.opened = res;
            iframe_controller.ifr.src = res;
            iframe_controller.outifr.style.display = "block";
            iframe_controller.ifrback.style.display = "block";
            iframe_controller.outifr.style.animationName = "appear2";
            iframe_controller.ifrback.style.animationName = "appear2";
            iframe_controller.outifr.style.marginLeft = "calc(" + window.innerWidth/2 +  "px - 30vw)";                
            document.getElementById("part_area").style.opacity = 0;
        },

        closeifr: function(){
            iframe_controller.opened = false;
            document.getElementById("part_area").style.opacity = 1;
            iframe_controller.outifr.style.animationName = "disappear2";
            iframe_controller.ifrback.style.animationName = "disappear2";
            setTimeout(
                ()=>{
                    iframe_controller.outifr.style.display = "none";
                    iframe_controller.ifrback.style.display = "none";
                }, 250
            );
        }

    };
function checksize(){
    let w = window.innerWidth;
    let h = window.innerHeight;

    if(w >= h){
        window.onmessage = function(event){
            if(event.data == "close_window"){
                iframe_controller.closeifr();
            }
            if(event.data.substr(0, 8) == "is phone" && iframe_controller != null){
                iframe_controller.opened = event.data.substr(9);
                ifr.contentWindow.postMessage("from iframe", "*");
            }
        }

        if(iframe_controller == null)
            iframe_controller = iframe_controller_backup;
        
        for(let key in items){
            let item = document.getElementById(key);
            item.querySelector("a").onclick = function(){
                iframe_controller.open(items[key])
            };
            item.querySelector("a").removeAttribute("href");
        }
    }else{
        iframe_controller = null;

        for(let key in items){
            let item = document.getElementById(key);
            item.querySelector("a").href = items[key];
        }
    }
    document.getElementById("book3").querySelector("div").querySelector("a").href = "paint/paint.html";
    document.getElementById("book4").querySelector("div").querySelector("a").href = "checkers.html";

    let allbooks = document.getElementsByClassName("book");
    for(let i=0;i<allbooks.length;i++){
        let p = allbooks[i].querySelector('p');
        p.style.setProperty("--shiftY", "-" + (p.offsetHeight+allbooks[i].querySelector("img").offsetHeight)/2 + "px");
    }
}
checksize();
window.addEventListener('resize', ()=>{
    checksize();
    iframe_controller_backup.outifr.style.marginLeft = "calc(" + window.innerWidth/2 +  "px - 30vw)";
});


function save(){
    window.localStorage.setItem("ifr_location", iframe_controller.opened);
}

function load(){
    let tmp = window.localStorage.getItem("ifr_location");
    if(tmp){
        if(tmp != "false"){
            iframe_controller.open(tmp);
        }
    }
    let texting;
    let ind=0;
    texting = setInterval( (elem, list)=>{
        if(elem.style.opacity == 0){
            elem.style.opacity = 1;
            elem.innerHTML = "";
        }
        elem.innerHTML += list[ind++];
        if(ind == list.length){
            clearInterval(texting);
        }
    }, 50, document.getElementById("Shells_header"), ['Д', 'о', 'б', 'р', 'о ', 'п', 'о', 'ж', 'а', 'л', 'о', 'в', 'а', 'т', 'ь ', 'в ', 'ф', 'и', 'л', 'и', 'а', 'л', '<div></div>б', 'и', 'б', 'л', 'и', 'о', 'т', 'е', 'к', 'и ', 'З', 'о', 'л', 'о', 'т', 'о', 'й ', 'а', 'к', 'а', 'д', 'е', 'м', 'и', 'и']);
}

setInterval(save, 1000);

window.onunload = ()=>{
    save();
}
load();

