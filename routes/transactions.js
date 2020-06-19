const express = require('express');
const multer = require('multer');
const controller = require('../controllers/transactions');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, ''),
    filename: (req, file, cb) => cb(null, 'transactions.csv')
});
const upload = multer({ storage }).single('transactionsFile');


router.get('/', controller.getAll);
router.post('/', upload, controller.save);
router.delete('/:id', controller.removeById);

module.exports = router;
