let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 480;
canvas.style.backgroundColor='black';



ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 32, 32);