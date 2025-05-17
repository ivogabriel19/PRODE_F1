const express = require('express');
const { submitPrediction } = require('../controllers/predictionController');
const router = express.Router();

router.post('/submit', submitPrediction);

module.exports = router;
