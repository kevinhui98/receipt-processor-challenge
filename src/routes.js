const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/process', controller.processReceipt);
router.get('/:id/points', controller.getPoints);

module.exports = router;
