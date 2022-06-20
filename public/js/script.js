///***Clone de Space Invaders***///
///***Escrito por Rodrigo Melo***///
import Objeto from './obj.js'
import {canvas} from './obj.js'
import {ctx} from './obj.js'

let sprite = document.getElementById("shipSprite"),
 canvasW=940,
 canvasH=676,
 boxX=canvasW/2,
 boxY=canvasH-64,
 boxXPos=0,
 spd= 8,
 moveL=false,
 moveR=false,
 hit=false,
 vidas=false,
 y=boxY ,
 x=boxX,
 bulletExist=false,
 bulletSpd=spd-3,
 invader=[],
 invaderB=[],
 invaderC=[],
 invaderD=[],
 loteInvader=8,
 invaderSpd=0.2,
 invaderLimitL=false,
 invaderLimitR=false,
 invaderMoveY=canvas.height-canvas.height+16,///inicia os invader no topo da tela
 invaderMoveX=canvas.width-canvas.width+128, ///inicia os invaders no canto da tela
 yoyo=undefined,
 msg="",
 colors=["red","orange","pink","brown"];
 
 
canvas.width=canvasW;
canvas.height=canvasH;
canvas.style.backgroundColor="";


//Inicia objetos

for (let i = 0; i < loteInvader; i++) {
    
 invader[i]=new Objeto(32,32,0,100)  
 invaderB[i]=new Objeto(32,32,0,100)  
 invaderC[i]=new Objeto(32,32,0,100)  
 invaderD[i]=new Objeto(32,32,0,100)  
    
    
}

let bullet=new Objeto(4,32,x,y);
let ship = new Objeto(32,32,boxX,boxY);


window.addEventListener("keyup",()=>{
    moveL=false;
    moveR=false;
},false);

///Controles

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
    setInterval(()=>xIndex=32,125);
    setInterval(()=>xIndex=0,250);


    
    
    //Game Updades
    
function Loop(){
requestAnimationFrame(Loop,canvas);
Draw();



            
            ///Algoritmo de movimento dos Invader
            if(yoyo){ invaderMoveX+=invaderSpd}else{invaderMoveX-=invaderSpd}
           
            if(invaderLimitR){invaderMoveY+=16}
            if(invaderLimitL){invaderMoveY+=16}
            
          
            for (let i = 0; i < loteInvader; i++) {
       
            invader[i].drawSprite('red')
            invader[i].y=invaderMoveY
            invader[i].x=74* i+ invaderMoveX
            invader[i].collide(bullet.x,bullet.y,bullet.w,bullet.h)
            invader[i].hudMsg(invader[i].collideBolean)

            invaderB[i].drawSprite('red')
            invaderB[i].y=invaderMoveY+64
            invaderB[i].x=74* i+ invaderMoveX
            invaderB[i].collide(bullet.x,bullet.y,bullet.w,bullet.h)
            invaderB[i].hudMsg(invaderB[i].collideBolean)

            invaderC[i].drawSprite('red')
            invaderC[i].y=invaderMoveY+128
            invaderC[i].x=74* i+ invaderMoveX
            invaderC[i].collide(bullet.x,bullet.y,bullet.w,bullet.h)
            invaderC[i].hudMsg(invaderC[i].collideBolean)

            invaderD[i].drawSprite('red')
            invaderD[i].y=invaderMoveY+192
            invaderD[i].x=74* i+ invaderMoveX
            invaderD[i].collide(bullet.x,bullet.y,bullet.w,bullet.h)
            invaderD[i].hudMsg(invaderD[i].collideBolean)

            //retornando Bullet para  shipY
           if(invaderD[i].collideBolean){bulletExist=false; bullet.y=ship.centerY()}
        
            
        }
       
           
    
         

    
    if (bullet.y<-bullet.h){bullet.y=boxY;bulletExist=false};


    if (bulletExist==true ){
        
        
        bullet.y-=bulletSpd
        bullet.x=boxXPos-bullet.w/2
          
        }else{bullet.x=ship.centerX()}

        ship.x=boxX;

        ///movimenta ship pra direita e checa ela colide com canto direito da tela
        if(moveR && ship.centerX()+16 < canvasW){boxX+=spd}
        ///movimenta ship para esquerda e checa se ela colide com canto esquerdo da tela
        if(moveL && ship.centerX()-16 > 0){boxX-=spd}

        
    
}Loop();

//Desenha objetos

function Draw() {
    //variaveis da linha de controle horizontal do primero o ultimo invader da linha
    let lineXMoveTo=invader[0].x,
    lineYMoveTo=invader[0].y+64,
    lineXTo=invader[invader.length-1].x+32,
    lineYTo=invader[invader.length-1].y+64;


    //checa se inicio da linha de controle horizontal toca canto esquerdo da tela
    if(lineXMoveTo<=canvas.width-canvas.width){yoyo=true;invaderLimitL=true}else{invaderLimitL=false}
    //checa se final da linha de controle horizontal toca canto direito da tela
    if(lineXTo>=canvas.width){yoyo=false;invaderLimitR=true}else{invaderLimitR=false}


    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    
    ship.animSprite(sprite)
    ship.hudMsg(bulletExist)
    if (bulletExist) {bullet.drawSprite('red')} 
   
    /*
    ctx.beginPath();
    ctx.strokeStyle="red"
    ctx.moveTo(lineXMoveTo,lineYMoveTo);
    ctx.lineTo(lineXTo,lineYTo);
    ctx.stroke();
*/
    
    


   ctx.beginPath();
   
   ctx.strokeStyle=colors[Math.floor(Math.random()*colors.length)]
   ctx.globalAlpha = 0.4;
   ctx.moveTo(bullet.centerX(),ship.centerY()-16);
   ctx.lineTo(bullet.centerX(),bullet.centerY());
   ctx.stroke();

    
    ctx.restore();

  

/*

    ///Gui informação
    info.innerHTML=
    `hud= ${changeHud}
     <br> invader.y: ${invader[0].y}
     <br> invader.x: ${invader[0].x}
     <br> invader.w: ${invader[0].w}
     <br> invaderMoveY:${invaderMoveY}
     <br> lineXMoveTo:${lineXMoveTo}
     <br> lineXTo:${lineXTo}
     <br> invaderLimitL:${invaderLimitL}
     <br> invaderLimitR:${invaderLimitR}
     <br> yoyo:${yoyo}
     <br> moveL: ${moveL}
     <br> moveR: ${moveR}
     <br> bulletExist: ${bulletExist}
     <br> bullet.y: ${bullet.y}
     <br> bullet.x: ${bullet.x}
     <br> boxX: ${boxX}
     <br>  boxXPos: ${boxXPos}
     <br> ship.centerX: ${ship.centerX()}
     <br> canvas.width:${canvas.width}
     <br> canvas.height:${canvas.height}
     
     
     `  
     */  
};
