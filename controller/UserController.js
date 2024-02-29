const mysql = require('mysql')
const fs = require('fs')
const bycrypt = require('bcrypt')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'difest_5',
})
db.connect()

const getAllParticipant = (request, response) => {
  try {
    const currentPage = parseInt(request.query.page) || 1;
    const itemsPerPage = parseInt(request.query.limit) || 10;

    const offset = (currentPage - 1) * itemsPerPage;
    db.query("SELECT COUNT(*) AS total FROM users", async(error, result1) => {
      if (error) {
        console.error(error)
        response.status(401).send({
          statusText: `Gagal meload data`
        })
      }
      const totalItems = await result1.total;
      db.query(
        `SELECT * FROM users ORDER BY id DESC LIMIT ? OFFSET ?`, 
        [itemsPerPage, offset],
        async (error, result2) => {
          if (error) {
            console.error(error)
            response.status(401).send({
              statusText: `Gagal Meload data`
            })
          }
          response.status(201).json({
            data: result2,
            total: totalItems, 
          });
        }
      );
    });
  } catch (error) {
    console.error(error)
  }
}

const insertParticipant = async(request, response) => {
  try {
    // console.log(request.body)
    const { userid, password, name, phone, email, group, role } = request.body
    // console.log(userid, password, name, phone, email, group, role)
    const generatePassword = await bycrypt.hash(password, 10)
    db.query("INSERT INTO users (userid, password, name, phone, email, `group`, role) VALUES (?, ?, ?, ?, ?, ?, ?)", [userid, generatePassword, name, phone, email, group, role], (error, result) => {
      if (error) {
        console.error(error)
        response.status(401).send({
          statusText: `Gagal Menyimpan data`
        })
      } else {
        response.status(201).send({ message: `Berhasil menginputkan data` })
      }
    })
  } catch (error) {
    console.error(error)
    response.status(500).send({ message: 'Internal Server Error' })
  }
}

module.exports = {
  getAllParticipant,
  insertParticipant
}