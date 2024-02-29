const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'difest_5',
})
db.connect()

const getAllAttendance = (request, response) => {
  db.query(`SELECT * FROM attendances`, (error, result) => {
    if (error) throw console.error(error)
    response.json(result)
  })
}

const getAttendanceById = (request, response) => {
  const { id } = request.params
  db.query(`SELECT * FROM attendances WHERE id=?`, [id], (error, result) => {
    if (error) throw console.error(error)
    response.json(result[0])
  })
}

module.exports = {
  getAllAttendance,
  getAttendanceById
}