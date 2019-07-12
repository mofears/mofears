if (process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000
// const youtubeApi = 
const iTunesApi = require('./routes/itunes')
const userRoute = require('./routes/user')
const auth = require('./middlewares/auth')
mongoose.connect('mongodb://localhost/Mofears', {
  useNewUrlParser: true
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))

app.use('/user', userRoute)

app.use(auth.authentication)

app.use('/itunes', iTunesApi)

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message: 'Internal server error.',
      source: 'app.js',
      error: err
    })
  }
})

app.listen(port, () => console.log('Running on port', port))