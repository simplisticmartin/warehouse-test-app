const express = require("express");
const app = express();
const port = 3002;
const warehouse_model = require('./warehouse_model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get("/", (req, res)=>{
    console.log("app main page")
    warehouse_model.getProducts()
    .then(response =>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error)
    })
});

app.get("/products/:filter", (req, res)=>{
    console.log("app main page")
    warehouse_model.getProductsByDescOrBin(req.params.filter)
    .then(response =>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error)
    })
});

app.put("/purchase/:ids", (req, res)=>{
    console.log("updating on fulfilling order");
    warehouse_model.updateStockLvls(req.params.ids)
    .then(response =>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error)
    })
});


app.listen(port, ()=>{
    console.log("App running on port: " + port)
});