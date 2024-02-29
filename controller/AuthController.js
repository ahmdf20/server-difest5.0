const mysql = require('mysql')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const bycrypt = require('bcrypt')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'difest_5',
})
db.connect()

const login = (request, response) => {
  try {
    const { userID, password } = request.body
    db.query('SELECT * FROM users WHERE userid=? LIMIT 1', [userID], async (error, result) => {
      if (error) {
        console.error(error)
        response.status(500).json({ message: `Internal Server Error` })
      } 
      if (result.length === 0) {
        return response.status(401).json({ message: `ID Peserta tidak ditemukan` })
      }

      const user = result[0]
      const checkPassword = await bycrypt.compare(password, user.password)
      if (checkPassword) {
        // Set Token
        const token = jwt.sign(user.userid, 'Luthor-dev')
        // Return to http
        response.status(201).cookie('user', user, {
          maxAge: 604800,
          httpOnly: true,
          expires: new Date(Date.now() + 604800000)
        })
        .cookie('token', token, {
            maxAge: 604800,
            httpOnly: true,
            expires: new Date(Date.now() + 604800000)
        })
        .send({
          message: `Berhasil login`,
          data: { 
            token: token,
            user,
            expTime: 604800000 + new Date().getTime()
          }
        })
      } else {
        response.status(401).send({
          message: `Password salah!`,
        })
      }
    })
  } catch (error) {
    console.error(error)
    response.status(500).json({ message: `Gagal melakukan authentikasi` })
  }
}

module.exports = {
  login
}