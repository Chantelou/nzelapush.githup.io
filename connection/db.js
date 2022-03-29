const mysql = require('mysql')

const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : "bd_prod_enoce_bio"
  })

module.exports = connect