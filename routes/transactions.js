const express = require('express');
const controller = require('../controllers/transactions');

const router = express.Router();

router.get('/all', controller.getAll);
router.post('/save', controller.save);
router.delete('/remove', controller.removeById);

module.exports = router;
