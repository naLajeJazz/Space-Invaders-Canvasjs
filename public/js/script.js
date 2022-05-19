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
let lote=[]


function Objeto(w,h,x,y,cor){
    this.w=w;
    this.h=h;
    this.x=x;
    this.y=y;
    
    ctx.fillStyle = cor;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    this.retangulo=()=>{
        
        
        ctx.fillStyle=cor;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        
    };  

};

 let obj1=new Objeto(32,32,Math.floor(Math.random()*canvasW),100,'red')
 let obj2=new Objeto(32,32,100,Math.floor(Math.random()*canvasW),'green')
 let bul=new Objeto(16,16,boxX,y,"red")




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
   

   
   
       

    
    
    function loop(){

        
        requestAnimationFrame(loop,canvas);
        
        
         
    
    
    
        
        
        

        
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        
        
    
    
        obj1.retangulo()
        obj2.retangulo()
        
    
 
   
    
    ctx.drawImage(img,xIndex,0,32,32,boxX,boxY,32,32);
    
    
    
    ctx.restore();

    if (bul.y<0){bul.y=boxY;bulletExist=false}
    
    if (bulletExist==true ){
        
       
        
        bul.y-=1
        
        bul.retangulo()
        
        
         
        
    }

    
    
    
    
    info.innerHTML=bulletExist
    
}loop()





/*
for (let i = 0; i < 2; i++) {
        
    lote[i]=new Objeto(32,32,Math.floor(Math.random()*100),100,'red')
      
  }    */


