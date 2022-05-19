let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let img = document.getElementById("shipSprite");
let canvasW=640;
let canvasH=512;
let boxX=canvasW/2;
let boxY=canvasH-64;
let xIndex = 0;
canvas.width=canvasW;
canvas.height=canvasH;
canvas.style.backgroundColor='black';



///anima imagem
setInterval(()=>xIndex=32,125)
setInterval(()=>xIndex=0,250)


function loop(){
    requestAnimationFrame(loop,canvas);
    
     


    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    
    
   
  


ctx.drawImage(img,xIndex,0,32,32,boxX,boxY,32,32);



 ctx.restore()

 

    

           



 
}loop()