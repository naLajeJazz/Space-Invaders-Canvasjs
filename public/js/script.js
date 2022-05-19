let canvas = document.querySelector("#canvas");
let info = document.querySelector(".info");
let ctx = canvas.getContext("2d");
let img = document.getElementById("shipSprite");
let canvasW=640;
let canvasH=512;
let boxX=canvasW/2;
let boxY=canvasH-64;
let xIndex =0;
let spd= 32;
canvas.width=canvasW;
canvas.height=canvasH;
canvas.style.backgroundColor='black';

let y=boxY ,x=boxX;
let bulletExist=false;
let invader=[],loteInvader=8;
let colors=["red","green","yellow","blue"]


function Objeto(w,h,x,y,cor){
    this.w=w;
    this.h=h;
    this.x=x;
    this.y=y;
    
    ctx.fillStyle = cor;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    this.drawRetangulo=()=>{
        
        
        ctx.fillStyle=cor;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        
    };  

};


for (let i = 0; i < loteInvader; i++) {
    let xis=64
    xis*=i
    invader[i]=new Objeto(32,32,xis+64,100,colors[Math.floor(Math.random()*4)])  
    
}


 
 
 let bul=new Objeto(4,32,boxX,y,colors[0])




window.addEventListener("keyup",()=>{k='p' },false);
window.addEventListener("keydown",function(event){

    let k= event.key;
    
   
        
        if (k == "d" && boxX+32 < canvasW){
            
            boxX+=spd
            
            
        }else if(k =="a" && boxX > 0){
            
            boxX-=spd
            
            
            
            
        }else if(k == "w" && bulletExist==false ){
            bulletExist=true;
           
            
        }
        
        
        
    },false);
   
   
  
    
    ///anima imagem
    setInterval(()=>xIndex=32,125)
    setInterval(()=>xIndex=0,250)
   

    let down=32
    setInterval(()=>{down+=32},3500)
   
   
       

    
    
    function loop(){

        
        requestAnimationFrame(loop,canvas);
            
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        
    
        for (let i = 0; i < loteInvader; i++) {
            
            invader[i].drawRetangulo()
            invader[i].y=down
           
            
        }
 
   
    
    ctx.drawImage(img,xIndex,0,32,32,boxX,boxY,32,32);
    
    ctx.restore();


    if (bul.y<0){bul.y=boxY;bulletExist=false};


    if (bulletExist==true ){
              
        bul.y-=28
        bul.x=boxX+14
        bul.drawRetangulo()
        
         }
 
    info.innerHTML=bul.y
    
}loop();