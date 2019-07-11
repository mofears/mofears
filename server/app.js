if (process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}
const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000
const youtubeApi = 

// mongoose.connect('mongodb://localhost/HacktivGit', { useNewUrlParser: true })

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.listen(port, () => console.log('Running on port', port))
