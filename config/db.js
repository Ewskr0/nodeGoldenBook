let mysql      = require('mysql')
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ewann',
  password : '24323224',
  database : 'userMessage'
})

connection.connect()

module.exports = connection 
