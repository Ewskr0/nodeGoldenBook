let connection = require('../config/db')
let moment = require('moment')
moment.locale('fr')

class Message {

  constructor (row) {
    this.row = row
  }

  get content () {
    return this.row.content
  }

  get date () {
    return moment(this.row.date).fromNow()
  }

  get id () {
    return this.row.id
  }

  static create (content, cb) {
    connection.query('INSERT INTO messages SET content =?, date =?',[content, new Date()],(err, result) => {
      if (err) throw err
      cb(result)
    })
  }

  static all (cb) {
    connection.query('SELECT * FROM messages', (err, rows) => {
      if (err) throw err
      cb(rows.map((row) => new Message(row)))
    })
  }

  static find(id, cb) {
    connection.query('SELECT * FROM messages WHERE id=? LIMIT 1',[id], (err, rows) => {
      if (err) throw err
      cb(new Message(rows[0]))
    })
  }
}

module.exports = Message
