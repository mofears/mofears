const express = require('express');
const router = express.Router();
const ItunesController = require('../controllers/itunes-controller');

router.post('/music/search', ItunesController.getMusic)

module.exports = router