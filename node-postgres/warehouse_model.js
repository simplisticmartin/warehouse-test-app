const Pool = require("pg").Pool;
const pool = new Pool({user: "my_user",
 host: "localhost", database: "postgres",
 password: "root", port: 5432 });

const getProducts = () => {
    return new Promise(function(resolve, reject){
        pool.query("select * from warehouseTable order by id asc;",
        (error, results)=>{
            if(error){
                reject(error);
            }
            console.log(results);
            resolve(results.rows);
        })
    })
};

const getProductsByDescOrBin = (filter) => {
    console.log(filter);
    return new Promise(function(resolve, reject){
        pool.query(`select * from warehouseTable where bin_location = '${filter}' or description LIKE '%${filter}%' order by id asc;`,
        (error, results)=>{
            if(error){
                reject(error);
            }
            console.log(results);
            resolve(results.rows);
        })
    })
};

const updateStockLvls = (ids) => {
    // update warehouseTable set stock_lvl = stock_lvl-1 where id = ANY(ARRAY${ids}
    ids = ids.split(",");
    console.log(ids);
    console.log(typeof(ids[0]));
    return new Promise(function(resolve, reject) {
        pool.query(`update warehouseTable set stock_lvl = stock_lvl-1 where id in (${ids[0]}, ${ids[1]}, ${ids[2]}, ${ids[3]}, ${ids[4]});`, (error, results) => {
          if (error) {
              console.log("error in update stock level");
            reject(error)
          }
          console.log("stock levels updated");
          resolve("Stock levels updated")
        })
      })
}

  module.exports = {
      getProducts,
      getProductsByDescOrBin,
      updateStockLvls,
  }
