const express = require('express');
const router = express.Router();
const OmdbController = require('../controllers/omdb-controller');

router.get('/get', OmdbController.get)
router.get('/getPopular', OmdbController.getPopular)
router.get('/search', OmdbController.searchMovie)


module.exports = router