
const express = require('express');
const ap= express();
const port=3030;

ap.set("view engine","ejs");
ap.use(express.static('./public'));
ap.get("/",(req,res)=>{
    
    
                 res.render("home/index", {
                    nome:"Space Invader",
                 })
})

ap.listen(port,()=>{
                  console.log("Eba!rodando na porta: localhost:"+port)
})

