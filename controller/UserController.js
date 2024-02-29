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
      // console.log(result1[0].total)
      const totalItems = await result1[0].total;
      // console.log(totalItems)
      db.query(
        `SELECT * FROM users WHERE role='participant' ORDER BY id ASC LIMIT ? OFFSET ?`, 
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

const getUserByUserID = (request, response) => {
  try {
    const userid = request.query.userid
    db.query("SELECT * FROM users WHERE userid=? LIMIT 1", [userid], (error, result) => {
      if (error) {
        console.error(error)
        response.status(401).send({
          message: `Gagal mencari data`
        })
      }
      response.status(200).json({ data: result[0] })
    })
  } catch (error) {
    console.error(error)
    response.status(500).send({
      message: `Internal Server Error`
    })
  }
}

const comparePassword = (request, response) => {
  // console.log(request.body)
  const { userid, oldPassword } = request.body
  db.query("SELECT * FROM users WHERE userid=? LIMIT 1", [userid], async (error, result) => {
    if (error) {
      console.error(error)
      response.status(401).send({
        message: 'Gagal mencari data'
      })
    }
    const compare = await bycrypt.compare(oldPassword, result[0].password)
    if (compare) {
      response.status(201).send({
        message: `Password sama`
      })
    } else {
      response.status(202).send({
        message: `Password tidak sama`
      })
    }
  })
}

const updatePasswordParticipant = async (request, response) => {
  try {
    const { userid, oldPassword, newPassword } = request.body
    const generate = await bycrypt.hash(newPassword, 10)
    db.query("UPDATE users SET password=? WHERE userid=?", [generate, userid], (error, result) => {
      if (error) {
        console.error(error)
        response.status(401).send({
          message: 'Gagal mengupdate password'
        })
      }

      response.status(201).send({
        message: 'Berhasil mengubah password'
      })
    })
  } catch (error) {
    console.error(error)
    response.status(500).send({
      message: 'Internal Server Error'
    })
  }
}

module.exports = {
  getAllParticipant,
  insertParticipant,
  getUserByUserID,
  comparePassword,
  updatePasswordParticipant
}