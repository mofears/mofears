const express = require('express');
const router = express.Router();
const YoutubeController = require('../controllers/youtube-controller');

router.post('/', YoutubeController.getData)

module.exports = router