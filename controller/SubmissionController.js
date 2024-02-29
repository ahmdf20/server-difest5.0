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

const getAllSubmission = (request, response) => {
  try {
    const currentPage = parseInt(request.query.page) || 1;
    const itemsPerPage = parseInt(request.query.limit) || 10;

    const offset = (currentPage - 1) * itemsPerPage;
    db.query("SELECT COUNT(*) AS total FROM submissions", async(error, result1) => {
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
        `SELECT s.id, s.karya, s.karya_desc, s.orsinil, u.name FROM submissions s JOIN users u ON s.userid=u.userid ORDER BY id ASC LIMIT ? OFFSET ?`, 
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

const checkKaryaIsSubmitted = (request, response) => {
  try {
    const userid = request.query.userid
    db.query("SELECT * FROM submissions WHERE userid=?", [userid], (error, result) => {
      if (error) {
        console.error(error)
        response.status(401).send({
          message: `Data tidak ditemukan`
        })
      }
      response.status(200).json(result)
    })
  } catch (error) {
    console.error(error)
    response.status(500).send({ message: `Internal Server Error` })
  }
}

const insertSubmission = (request, response) => {
  try {
    const { karya, desc_karya, surat_orsinil } = request.files;
    const { userid } = request.body
    db.query(`INSERT INTO submissions (karya, karya_desc, orsinil, userid) VALUES (?, ?, ?, ?)`, [karya[0].filename, desc_karya[0].filename, surat_orsinil[0].filename, userid], (error, result) => {
      if (error) {
        response.status(401).send({
          message: `Gagal menginputkan karya`
        })
      }
      response.status(200).send({
        message: `Berhasil menginputkan karya!`,
        insertId: result.insertId
      })
    })
  } catch (error) {
    console.error(error)
    response.status(500).send({
      message: `Internal Server Error`
    })
  }
}

module.exports = {
  getAllSubmission,
  checkKaryaIsSubmitted,
  insertSubmission
}