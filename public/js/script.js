let canvas = document.querySelector("#canvas");
let info = document.querySelector(".info");
let ctx = canvas.getContext("2d");
let sprite = document.getElementById("shipSprite");
let canvasW=640;
let canvasH=512;
let boxX=canvasW/2;
let boxY=canvasH-64;
let boxXPos=0;
let xIndex =0;
let spd= 8;
let moveL=false;
let moveR=false;
let hit=false;
canvas.width=canvasW;
canvas.height=canvasH;
canvas.style.backgroundColor='#0D0D0D';


let y=boxY ,x=boxX;
let bulletExist=false;
let invader=[],loteInvader=8;
let colors=["#0DF205","#034001"]


function Objeto(w,h,x,y,cor,img){
    this.w=w;
    this.h=h;
    this.x=x;
    this.y=y;
    this.img=img
    this.centerX= function(){
        return this.x + this.w/2;
        };
    this.centerY= function(){
        return this.y + this.h/2;
        };
    
    ctx.fillStyle = cor;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    this.drawRetangulo=()=>{
        
        
        ctx.fillStyle=cor;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        
    };
    this.spriteAnim= function(){
    ctx.drawImage(this.img,xIndex,0,32,32,this.x,this.y,32,32); 
    } 

};


for (let i = 0; i < loteInvader; i++) {
    let xis=64
    xis*=i
   

    
    invader[i]=new Objeto(32,32,xis,100,colors[Math.floor(Math.random()*colors.length)])  
    
    
}

let bullet=new Objeto(4,32,boxX,y,colors[0]);
let ship = new Objeto(32,32,boxX,boxY,"",sprite);




window.addEventListener("keyup",()=>{

    
    moveL=false;
    moveR=false;

    

},false);

window.addEventListener("keydown",function(event){

        let k= event.key;
    
        if (k == "d" ){
            moveR=true;
                
        }else if(k =="a" ){
            moveL=true;
            
        }else if(k == "w" && bulletExist==false ){
            bulletExist=true;
            boxXPos=ship.centerX();
            bullet.y=ship.centerY()-38
            
        }
            
    },false);
   
    
    ///anima imagem
    setInterval(()=>xIndex=32,125)
    setInterval(()=>xIndex=0,250)
   

    //let invaderMoveDown=32
    //setInterval(()=>{invaderMoveDown+=32},3500)
    let invaderMoveH=0
    setInterval(()=>{invaderMoveH+=32},3500)
   
   
       

    
    
    
function Loop(){
            requestAnimationFrame(Loop,canvas);
            Draw();
       
    
    for (let i = 0; i < loteInvader; i++) {
        let xis=64
    xis*=i
        invader[i].drawRetangulo()
        //invader[i].y=invaderMoveDown
       invader[i].x= xis+ invaderMoveH
        
        
        
        
        
    }

    if (bullet.y<-bullet.h){bullet.y=boxY;bulletExist=false};


    if (bulletExist==true ){
              
        bullet.y-=spd*2
        bullet.x=boxXPos-bullet.w/2
       
        
        
         }else{bullet.x=ship.centerX()}

         ship.x=boxX;
         if(moveR && ship.centerX()+16 < canvasW){boxX+=spd;}
         if(moveL && ship.centerX()-16 > 0){boxX-=spd;}
         
 
         if (bullet.y < invader[0].y){hit=true}
    
}Loop();

function Draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    
    

    
    
    ship.spriteAnim()
   if (bulletExist) {bullet.drawRetangulo()} 
    
/*
   ctx.beginPath();
   ctx.strokeStyle="red"
   ctx.moveTo(ship.centerX(),ship.centerY());
   ctx.lineTo(bullet.centerX(),bullet.centerY());
   ctx.stroke();
*/
    
    ctx.restore();

    info.innerHTML=
    `<br> invader.y: ${invader[0].y}
     <br> invader.x: ${invader[0].x}
     <br> moveL: ${moveL}
     <br> moveR: ${moveR}
     <br> bulletExist: ${bulletExist}
     <br> bullet.y: ${bullet.y}
     <br> boxX: ${boxX}
     <br>  boxXPos: ${boxXPos}
     <br> hit: ${hit}
     <br> ship.centerX: ${ship.centerX()}
     <br> "a":esquerda
     <br> "d":direita
     <br> "w":dispara
     `    
};