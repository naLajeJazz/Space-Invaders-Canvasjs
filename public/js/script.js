///***Clone de Space Invaders***///
///***Escrito por Rodrigo Melo***///


let canvas = document.querySelector("#canvas"),
 info = document.querySelector(".info"),
 ctx = canvas.getContext("2d"),
 sprite = document.getElementById("shipSprite"),
 canvasW=640,
 canvasH=512,
 boxX=canvasW/2,
 boxY=canvasH-64,
 boxXPos=0,
 xIndex =0,
 spd= 8,
 moveL=false,
 moveR=false,
 hit=false,
 vidas=false,
 y=boxY ,
 x=boxX,
 bulletExist=false,
 invader=[],loteInvader=8,
 colors=["#0DF205","#034001"];
 
canvas.width=canvasW;
canvas.height=canvasH;
canvas.style.backgroundColor='#0D0D0D';

//Objeto construtor
function Objeto(w,h,x,y,cor,img){
    this.w=w;
    this.h=h;
    this.x=x;
    this.y=y;
    this.img=img;
    this.centerX=()=>{return this.x + this.w/2};
    this.centerY=()=>{return this.y + this.h/2};
    
    ctx.fillStyle=cor;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    this.drawRetangulo=()=>{
        ctx.fillStyle=cor;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        };
    this.spriteAnim=()=>{
        ctx.drawImage(this.img,xIndex,0,32,32,this.x,this.y,32,32); 
    } 

};


//Inicia objetos

for (let i = 0; i < loteInvader; i++) {
    
 invader[i]=new Objeto(32,32,64*i,100,colors[Math.floor(Math.random()*colors.length)])  
    
    
}

let bullet=new Objeto(4,32,boxX,y,colors[0]);
let ship = new Objeto(32,32,boxX,boxY,"",sprite);


window.addEventListener("keyup",()=>{
    moveL=false;
    moveR=false;
},false);

//Controles

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
   
    ///Aqui vou escrever o algoritmo que controla o movimento dos invaders
    let invaderMoveY=32
    setInterval(()=>{invaderMoveY+=32},7000)
    let invaderMoveX=0
    setInterval(()=>{invaderMoveX+=32},2000)

    
    //Game Updades
    
function Loop(){
            requestAnimationFrame(Loop,canvas);
            Draw();
       
    
    for (let i = 0; i < loteInvader; i++) {
      
        invader[i].drawRetangulo()
        invader[i].y=invaderMoveY
        invader[i].x=64* i+ invaderMoveX
    
    }

    if (bullet.y<-bullet.h){bullet.y=boxY;bulletExist=false};


    if (bulletExist==true ){
              
        bullet.y-=spd*2
        bullet.x=boxXPos-bullet.w/2
          
        }else{bullet.x=ship.centerX()}

        ship.x=boxX;

        if(moveR && ship.centerX()+16 < canvasW){boxX+=spd}
        if(moveL && ship.centerX()-16 > 0){boxX-=spd}
        if (bullet.y < invader[0].y){hit=true}else{hit=false}
    
}Loop();

//Desenha objetos

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
    ///Gui informação
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