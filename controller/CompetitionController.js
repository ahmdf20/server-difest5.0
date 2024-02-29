const mysql = require('mysql')
const fs = require('fs')
const clientRedis = require('../redis.config.js')
const jwt = require('jsonwebtoken')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'difest_5',
})
db.connect()

const getAllCompetition = (request, response) => {
  try {
    db.query("SELECT * FROM competitions", (error, result) => {
      if (error) throw console.error(error)
      response.status(201).json(result)
    })
  } catch (error) {
    console.error(error)
    response.status(500).json({message: 'Gagal Menyimpan data'})
  }
}

const handleSubmitCompetition = (request, response) => {
  // console.log(request.body)
  // const { comp_id, group_name } = request.body
  // console.log(request.files.follow_ig_hima[0].filename)
  try {
    const { follow_ig_hima, follow_ig_difest, subscribe_yt, bukti_pembayaran, follow_tiktok } = request.files;
    const { comp_id, group_name } = request.body
    // Save each file to the database with its corresponding name
    const sql = 'INSERT INTO `groups` (comp_id, group_name, subs_photo, follow_photo, purchase_photo, tiktok_photo, follow2_photo) VALUES (?, ?, ?, ?, ?, ?, ?)'
    db.query(sql, [comp_id, group_name, subscribe_yt[0].filename, follow_ig_difest[0].filename, bukti_pembayaran[0].filename, follow_tiktok[0].filename, follow_ig_hima[0].filename], (error, result) => {
        if (error) {
          console.error(error)
          response.status(401).json({ message: 'Gagal menyimpan data' })
          return
        } else {
          // const currentCompId = jwt.sign({  })
          // clientRedis.set()
          response.status(200).json({ message: 'Data berhasil disimpan', insertId: result.insertId });
        }
    })
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  getAllCompetition,
  handleSubmitCompetition,
}