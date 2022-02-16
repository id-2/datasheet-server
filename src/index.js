import http from 'http'
import path from 'path'
import express from 'express'
import initialize from './initialize'
import middleware from './middleware'
import api from './api'
import dotenv from 'dotenv'
const hbs = require('express-handlebars')


let configJS
try {
  configJS = require('./local.config.js').default
} catch (_) {
  configJS = require('./config.js').default
}

dotenv.config()

let app = express()
app.server = http.createServer(app)
app.engine('.hbs', hbs({
  extname: '.hbs',
  defaultLayout: 'default'
}))
app.set('view engine', '.hbs')

// enable cross origin requests explicitly in development OR if active in prod
const cors = require('cors')
if (process.env.NODE_ENV === 'development') {
  console.log('Enabling CORS in development...')
  app.use(cors())
} else if (configJS.cors.active === true) {
  console.log('Enabling CORS in from config.js in prod...')
  app.use(cors(configJS.cors.corsOptions))
}


const config = process.env

initialize(controller => {
  app.use(
    middleware({
      config,
      controller
    })
  )
  app.use(
    '/api',
    api({
      config,
      controller
    })
  )

  app.use(express.static(path.join(__dirname, 'public')))

  app.server.listen(process.env.PORT || 4040, () => {
    console.log('===========================================')
    console.log(`Server running on port ${app.server.address().port}`)
  })
})

export default app
