if (process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000

const omdbApi = require('./routes/omdb') 
const errorHandlers = require('./middlewares/error-handlers');
const youtubeApi = require('./routes/youtube');
const iTunesApi = require('./routes/itunes')
const userRoute = require('./routes/user')
const auth = require('./middlewares/auth')

mongoose.connect('mongodb://localhost/Mofears', { useNewUrlParser: true })

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(errorHandlers)

app.use('/user', userRoute)

// app.use(auth.authentication)

app.use('/api/youtube', youtubeApi)
app.use('/itunes', iTunesApi)
app.use("/omdb", omdbApi)

app.listen(port, () => console.log('Running on port', port))
