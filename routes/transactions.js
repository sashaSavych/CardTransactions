const express = require('express');
const multer = require('multer');
const controller = require('../controllers/transactions');

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, ''),
    filename: (req, file, cb) => cb(null, 'transactions.csv')
});
const upload = multer({ storage }).single('transactionsFile');


router.get('/all', controller.getAll);
router.post('/save', upload, controller.save);
router.delete('/remove/:id', controller.removeById);

module.exports = router;
