const express = require('express');
const { getAllCentres, getCentresBySport } = require('../controllers/centreController');
const { addDummyCentres } = require('../controllers/addDummyCentre.js')
const { addCourtAndUpdateCentre } = require('../controllers/addCourtAndUpdateCentre.js')
const authMiddleware = require('../middlewares/authmiddleware.js');
const router = express.Router();

router.get('/', authMiddleware, getAllCentres);
router.get('/:sportsName', authMiddleware, getCentresBySport);
// router.post('/dummy', addDummyCentres)
// router.post('/dummycourts', addCourtAndUpdateCentre)

module.exports = router;