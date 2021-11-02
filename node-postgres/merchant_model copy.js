const Pool = require("pg").Pool;
const pool = new Pool({user: "my_user",
 host: "localhost", database: "postgres",
 password: "root", port: 5432 });

const getMerchants = () => {
    return new Promise(function(resolve, reject){
        pool.query("select * from merchants order by id asc",
        (error, results)=>{
            if(error){
                reject(error);
            }
            console.log(results);
            resolve(results.rows);
        })
    })
};

const createMerchant = (body) => {
    return new Promise(function(resolve, reject){
        const {name, email} = body
        pool.query("insert into merchants (name, email) values ($1, $2) returning *", 
        [name, email], 
        (error, results)=>{
            if(error){
                reject(error);
            }
            resolve(`A new merchant has been added: ${results.rows[0]}`);
        })
    })
}

const deleteMerchant = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Merchant deleted with ID: ${id}`)
      })
    })
  }

  module.exports = {
      getMerchants,
      createMerchant,
      deleteMerchant,
  }
