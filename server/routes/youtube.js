const express = require('express');
const router = express.Router();
const YoutubeController = require('../controllers/youtube-controller');

router.get('/api/youtube', YoutubeController.get)

module.exports = router