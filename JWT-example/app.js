
// load the dependencies
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

// load the config
const config = require('./config')
const port = process.env.PORT || 3000 

// express configuration
const app = express()

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// print the request log on console
app.use(morgan('dev'))

// set the secret key variable for jwt
app.set('jwt-secret', config.secret)

// index page, just for testing
app.get('/', (req, res) => {
    res.send('Hello JWT')
})
mongoose.Promise = global.Promise;

// configure api router
app.use('/api', require('./routes/api/'))

// Error handling
app.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message
    }
  })
})

// Connect to the mongo db server
mongoose.connect(config.mongodbUri, { useNewUrlParser: true })
.then(() => console.log('Successfully connected to mongodb'))
.catch(e => console.error(e));

// open server
app.listen(port, () => console.log(`Server listening on port ${port}`));
