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
mongoose.connect('mongodb://localhost/Mofears', {
  useNewUrlParser: true
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))

app.use('/user', userRoute)
app.use('/itunes', iTunesApi)

app.listen(port, () => console.log('Running on port', port))