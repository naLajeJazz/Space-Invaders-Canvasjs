///***Clone de Space Invaders***///
///***Escrito por Rodrigo Melo***///


let canvas = document.querySelector("#canvas"),
 info = document.querySelector(".info"),
 ctx = canvas.getContext("2d"),
 sprite = document.getElementById("shipSprite"),
 canvasW=840,
 canvasH=612,
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
 bulletSpd=spd-3,
 invader=[],
 invaderB=[],
 loteInvader=4,
 invaderSpd=0.2,
 invaderLimitL=false,
 invaderLimitR=false,
 invaderMoveY=canvas.height-canvas.height,///inicia os invader no topo da tela
 invaderMoveX=canvas.width-canvas.width, ///inicia os invaders no canto da tela
 yoyo=undefined,
 msg="",
 colors=["#0DF205","#034001"],
 hudColor="white",
 changeHud=false;
 
 
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
    this.drawSprite=()=>{
        
        ctx.fillStyle=cor;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        };
    this.animSprite=()=>{
        ctx.drawImage(this.img,xIndex,0,32,32,this.x,this.y,this.w,this.h); 
    };
    this.collide=function(hitX,hitY,hitW,hitH){
        this.collideBolean=false;
        this.hitX=hitX;
        this.hitY=hitY;
        this.hitW=hitW;
        this.hitH=hitH;
        if(this.x<=this.hitX+this.hitW&&this.x+this.w>=this.hitX&&this.y+this.h>=this.hitY&&this.y<=this.hitY+this.hitH)
        {this.collideBolean=true}else{this.collideBolean=false}};
        
        this.hudMsg=function(msg){ 
            ctx.font = "16px Courier New";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(msg, this.x+16,this.y+42);
          }

};


//Inicia objetos

for (let i = 0; i < loteInvader; i++) {
    
 invader[i]=new Objeto(32,32,0,100,colors[Math.floor(Math.random()*colors.length)])  
 invaderB[i]=new Objeto(32,32,0,100,colors[Math.floor(Math.random()*colors.length)])  
    
    
}

let bullet=new Objeto(4,32,x,y,colors[0]);
let ship = new Objeto(32,32,boxX,boxY,"",sprite);


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


/*
            
            ///Algoritmo de movimento dos Invader
            if(yoyo){ invaderMoveX+=invaderSpd}else{invaderMoveX-=invaderSpd}
           
            if(invaderLimitR){invaderMoveY+=16}
            if(invaderLimitL){invaderMoveY+=16}
  */           
          
            for (let i = 0; i < loteInvader; i++) {
      
            invader[i].drawSprite()
            invader[i].y=invaderMoveY
            invader[i].x=64* i+ invaderMoveX
            invader[i].collide(bullet.x,bullet.y,bullet.w,bullet.h)
            invaderB[i].drawSprite()
            invaderB[i].y=invaderMoveY+100
            invaderB[i].x=64* i+ invaderMoveX
            invaderB[i].collide(bullet.x,bullet.y,bullet.w,bullet.h)

           invader[i].hudMsg(invader[i].collideBolean)
           invaderB[i].hudMsg(invaderB[i].collideBolean)
            
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


     ///Aqui vou escrever colisão do bullet com invaders
     //if (bulletExist&& bullet.y<=invader[0].y&& bullet.x>invader[0].x&&bullet.x<invader[0].w){hit=true}else{hit=false}


    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    
    ship.animSprite()
    if (bulletExist) {bullet.drawSprite()} 
   
    
    ctx.beginPath();
    ctx.strokeStyle="red"
    ctx.moveTo(lineXMoveTo,lineYMoveTo);
    ctx.lineTo(lineXTo,lineYTo);
    ctx.stroke();

    
    


   ctx.beginPath();
   
   ctx.strokeStyle=colors[Math.floor(Math.random()*colors.length)]
   ctx.globalAlpha = 0.4;
   ctx.moveTo(bullet.centerX(),ship.centerY()-16);
   ctx.lineTo(bullet.centerX(),bullet.centerY());
   ctx.stroke();

    
    ctx.restore();

  



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
};
