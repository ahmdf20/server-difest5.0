const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'difest_5',
})
db.connect()

const getAllTimeline = (request, response) => {
  db.query(`SELECT * FROM competition_timelines`, (error, result) => {
    if (error) throw console.error(error)
    response.json(result)
  })
}

module.exports = {
  getAllTimeline,
}