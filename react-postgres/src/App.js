import React, {useState, useEffect} from 'react';
import "./App.css";

function App(){
  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState([]);

useEffect(() => {
getProducts();
}, []);

function getProducts()
{
  fetch('http://localhost:3002').then
  (response => {
    return response.text()
  }).then(data => {
    setProducts(JSON.parse(data))
  })
}


function addToCart(product){
  if(product.stock_lvl <= 0)
  {
    alert("product out of stock");
  }else if(cart.length >= 5){
    alert("5 items already in cart");
  }else if(cart.includes(product)){
    alert("product already in cart")
  }else{
    setCart([...cart, product])
    console.log([...cart, product])
  }
}

function fulfillOrder(){
  if(cart.length !== 5){
    alert("Cart must have 5 items to fulfill order");
    return;
  }
  let ids = cart.map((product)=>{
    return product.id;
  })
  fetch(`http://localhost:3002/purchase/${ids}`, {
    method: 'PUT', 
  }).then(response => {
    return response.text();
  }).then(data => {
    getProducts();
  })
  alert("Order fulfilled and stocks decreased");
}

function getProductsByDescOrBin(){
  let filter = prompt("Enter product ID");
  if(filter === ""){
    return;
  }
  fetch(`http://localhost:3002/products/${filter}`).then
  (response => {
    return response.text()
  }).then(data => {
    setProducts(JSON.parse(data))
  })
}

console.log(products);
console.log(typeof(products));
return(
  <div>
    <div className="Cart">
      <h2>Cart:</h2>
      {cart.map((product, index)=>{
        return<div key={index}>{product.product_name}</div>
      })}
      <br/>
      <button onClick={fulfillOrder}>Checkout</button>
    </div>
    <br/>
    <button onClick={getProductsByDescOrBin}>Search by Description or Bin Location</button>
    <br/>
    <h2>Item Catalog:</h2>
    {products ?
    products.map((product, index)=>{
      return (
      <div key={index} className="Item">
        <div>{product.product_name}</div>
        <div>{product.description}</div>
        <div>{"stock: " + product.stock_lvl}</div>
        <div>{product.bin_location}</div>
        <button onClick={()=>{
          addToCart(product);
        }}>Add to Cart</button>
      </div>
      )
    }) : "Loading..."}    

    
  </div>
)



}
export default App;