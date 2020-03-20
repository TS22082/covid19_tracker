const router = require('express').Router();
const geoController = require('./../../../controllers/geoController');

router.route('/json').get(geoController.getGeoJson);

module.exports = router;
