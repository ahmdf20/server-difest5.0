const express = require('express')
const cors = require('cors')
const routes = require('./route/route.js')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3030

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/uploads',express.static("uploads"))
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})