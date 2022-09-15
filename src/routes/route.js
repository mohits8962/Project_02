const express = require('express');
const router = express.Router();

// -------------------------|| CONTROLLERS ||--------------------------------------------

const collageController = require('../controllers/collageController')
const internController = require('../controllers/internController')

// -------------------------|| API'S ||--------------------------------------------

router.post('/functionup/colleges', collageController.createCollage)             // CREATE COLLAGE API
router.post('/functionup/interns', internController.createIntern)                // CREATE INTERN API
router.get('/functionup/collegeDetails',collageController.getCollegeDetails)     // GET COLLEGE INTERN LIST API



// --------------------------|| EXPORTING ROUTE TO INDEX.JS ||------------------------------

module.exports = router;