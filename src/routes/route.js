const express = require('express');
const router = express.Router();

const collageController = require('../controllers/collageController')
const internController = require('../controllers/internController')


router.post('/functionup/colleges', collageController.createCollage)




module.exports = router;