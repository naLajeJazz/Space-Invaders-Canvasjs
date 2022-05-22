const express = require('express');
const app= express();
const port=3030;
app.set("view engine","ejs");
app.use(express.static('./public'));

app.get("/",(req,res)=>{

                 res.render("home/index")
})

app.listen(port,()=>{
                  console.log("Eba!rodando na porta: localhost:"+port)
})