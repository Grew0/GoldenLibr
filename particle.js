function allTheCode(){
    let amount_of_templ=500, index=0;
    let particles = [];
    let now_smoking = [];
    function Part(x, y, dx, dy, t, is_smoke=false){
        this.t = t;
        this.bt = t;
        this.elem = document.getElementById("part_" + index);
        is_smoke = is_smoke;
        index = (index+1) % amount_of_templ;    
        if(is_smoke)this.elem.classList.add("smoke_part");
        else this.elem.classList.remove("smoke_part");

        this.update = function(dt, sry){
            this.elem.style.top = y-sry-5 + "px";
            this.elem.style.left = x-5 + "px";
            x += dx*dt;
            y += dy*dt;
            this.t -= dt;
            if(is_smoke) {
                dy -= dt*2;
                this.elem.style.opacity = Math.max(0, 2*this.t/this.bt);
            }
            else this.elem.style.opacity = Math.max(0, this.t/this.bt);
        }
    }
    for(let i=0;i<amount_of_templ;i++){
        document.getElementById("part_area").innerHTML += "<div id=\"part_" + i + "\" class=\"particle\"></div>";
    }
    document.getElementById("part_area").innerHTML += "<style>.particle{top:-1000px; border-radius:100px;\
    background: radial-gradient(#fff, #0ff, #50f) ;position:fixed; width:10px;height:10px;\
    z-index:1000000;pointer-events: none;}</style>";

    document.getElementById("part_area").innerHTML += "<style>.smoke_part{background:\
        radial-gradient(#fff, #fff, #fa0, #f00) ;\
        z-index:0;box-shadow: #fa0 0px 0px 10px 5px}</style>";
    
    function particleSpawn(a, b, event, is_smoke=false, addwd=0){
        let s=(Math.random())*a, ang=Math.random()*3.1415*2, time = (Math.random())*b;
        if(is_smoke){
            particles.push(new Part(event.x+2*addwd*Math.cos(ang), event.y+addwd*Math.sin(ang), s*Math.cos(ang)-5, s*Math.sin(ang), time, true));
        }else{
            particles.push(new Part(event.x+(s+1)*Math.cos(ang), event.y+(s+1)*Math.sin(ang), s*Math.cos(ang), s*Math.sin(ang), time));
        }
    }

    document.addEventListener("click", (event)=>{
        let sry = window.scrollY;
        for(let x = 50;x-->0;){
            particleSpawn(40, 3, {x:event.x, y:event.y+sry});
        }
        return true;
    });

    document.addEventListener("mousemove", (event)=>{
        particleSpawn(10, 5, {x:event.x, y:event.y+window.scrollY});
    });


    function update_all(){
        let sry = window.scrollY;
        for(let i=particles.length-1;i>=0;i--){
            particles[i].update(0.1, sry);
            if(particles[i].t <= 0){
                particles[i] = particles[particles.length-1];
                particles.pop();
            }
        }

        for(let i=0;i<now_smoking.length;i++){
            let _x = now_smoking[i].offsetLeft+now_smoking[i].offsetWidth/2;
            
            let bdr = now_smoking[i].querySelector('img').getBoundingClientRect(); 
            let _y = bdr.y+bdr.height/2;
            particleSpawn(30, 5, {x: _x, y:_y+sry}, true, bdr.width/2);
        }
        setTimeout(requestAnimationFrame, 15, update_all);
    }
    requestAnimationFrame(update_all);

    let smoke_elem = document.getElementsByClassName("part_smoke");
    for(let i=0;i<smoke_elem.length;i++){
        smoke_elem[i].addEventListener("mouseenter",
            ()=>{
                now_smoking.push(smoke_elem[i]);
            }
        );
    
        smoke_elem[i].addEventListener("mouseleave",
            ()=>{
                now_smoking.pop(smoke_elem[i]);                
            }
        );
    
    }
    
}

let fun_bef = window.onload;
window.onload = function(){
    if(fun_bef)
        fun_bef();
    allTheCode();   
}

