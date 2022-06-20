export const canvas = document.getElementById("Canvas");
export const ctx = canvas.getContext("2d");


export default class Objeto{
                
contructor (w,h,x,y,img){
                  this.w=w;
                  this.h=h;
                  this.x=x;
                  this.y=y;
                  this.img=img;
}



                  centerX=()=>{return this.x + this.w/2};
                  centerY=()=>{return this.y + this.h/2};
                  
                  
                 
                  drawSprite=(cor)=>{
                      
                      ctx.fillStyle=cor;
                      ctx.fillRect(this.x, this.y, this.w, this.h);
              
                      };
              
                  animSprite=()=>{
                      ctx.drawImage(this.img,xIndex,0,32,32,this.x,this.y,this.w,this.h); 
                  };
                  collide=(hitX,hitY,hitW,hitH)=>{
                      this.collideBolean=false;
                      this.hitX=hitX;
                      this.hitY=hitY;
                      this.hitW=hitW;
                      this.hitH=hitH;
                      if(this.x<=this.hitX+this.hitW&&this.x+this.w>=this.hitX&&this.y+this.h>=this.hitY&&this.y<=this.hitY+this.hitH)
                      {this.collideBolean=true;}else{this.collideBolean=false}
                  }
                      
                      hudMsg=function(msg){ 
                          ctx.font = "16px Courier New";
                          ctx.fillStyle = "white";
                          ctx.textAlign = "center";
                          ctx.fillText(msg, this.x+16,this.y+42);
                        }
              
              }


