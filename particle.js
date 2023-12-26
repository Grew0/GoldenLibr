function allTheCode(){
    let amount_of_templ=500, index=0;
    let particles = [];
    function Part(x, y, dx, dy, t){
        this.x=x;
        this.y=x;
        this.dx=dy;
        this.dy=dy;
        this.t = t;
        this.bt = t;
        this.ind=index;
        index = (index+1) % amount_of_templ;    

        this.update = function(dt){
            let elem = document.getElementById("part_" + this.ind);
            elem.style.top = y + "px";
            elem.style.left = x + "px";
            x += dx*dt;
            y += dy*dt;
            this.t -= dt;
            elem.style.opacity = Math.max(0, this.t/this.bt);
        }
    }
    for(let i=0;i<amount_of_templ;i++){
        document.getElementById("part_area").innerHTML += "<div id=\"part_" + i + "\" class=\"particle\"></div>";
    }
    document.getElementById("part_area").innerHTML += "<style>.particle{top:-1000px; border-radius:100px;\
    background: radial-gradient(#fff, #0ff, #50f) ;position:fixed; width:10px;height:10px;\
    z-index:1000000;pointer-events: none;}</style>";

    function particleSpawn(a, b, event){
        let s=(Math.random())*a, ang=Math.random()*3.1415*2, time = (Math.random())*b;
        particles.push(new Part(event.x+(s+1)*Math.cos(ang), event.y+(s+1)*Math.sin(ang), s*Math.cos(ang), s*Math.sin(ang), time));
    }

    document.addEventListener("click", (event)=>{
        for(let x = 50;x-->0;){
            particleSpawn(40, 3, event);
        }
        return true;
    });

    document.addEventListener("mousemove", (event)=>{
        particleSpawn(10, 5, event);
    });


    function update_all(){
        for(let i=particles.length-1;i>=0;i--){
            particles[i].update(0.1);
            if(particles[i].t <= 0){
                
                particles[i] = particles[particles.length-1];
                particles.pop();
            }
        }
    }
    setInterval(update_all, 15);
}

let fun_bef = window.onload;
window.onload = function(){
    if(fun_bef)
        fun_bef();
    allTheCode();   
}