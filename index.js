const express = require('express');
const app= express();




app.set("view engine","ejs");
app.use(express.static('./public'));

app.get("/",(req,res)=>{

                 res.render("home/index")
})

app.listen(3030,()=>{
                  console.log("rodando")
})