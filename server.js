const cookieSession = require('cookie-session')
const express = require('express')
const app = express()
require('dotenv').config()
const {COOKIE_KEY, MONGODB_URI, PORT} = require('./config/default')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const multer = require('multer')
const os = require('os')
const fs = require('fs').promises
const parse = require('csv-parse/lib/sync')
const upload = multer({dest: os.tmpdir()})
const {
  handleNewAvailability,
  getProviderAvailability,
} = require('./models/availability')

mongoose.connect(
  MONGODB_URI,
  {useNewUrlParser: true, useUnifiedTopology: true},
  () => {
    console.log('mongoose.connect() executed successfully')
  }
)

app.use(
  cookieSession({
    name: 'session',
    keys: [COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
    resave: false,
  })
)

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/availabilityUpload', upload.single('file'), async (req, res) => {
  const fileContent = await fs.readFile(req.file.path)
  const records = parse(fileContent)
  console.log(records)

  try {
    await handleNewAvailability(records)
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(500)
  }
})

app.get('/providerAvailability', async (req, res) => {
  try {
    const providers = await getProviderAvailability()
    res.status(200).json({data: providers})
  } catch (err) {
    res.sendStatus(500)
  }
})

const isProduction = () => {
  return process.env.NODE_ENV === 'production'
}

if (isProduction()) {
  app.use(express.static(path.join(__dirname, 'client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
  })
}

const port = isProduction() ? PORT : 3001
app.listen(port, () => console.log(`Server is running on port ${port}!`))
