const express = require("express");
const router = express.Router();
const geoRoutes = require('./geoRoutes');

const covidTrackingController = require("../../controllers/covidTracking");
const newsController = require("../../controllers/news");
const geoJsonController = require('../../controllers/geoJson');

router.use('/geo', geoRoutes);

router.route("/confirmed").get(covidTrackingController.getConfirmedCases);
router.route("/news").get(newsController.getNews);
router.route("/geojson").get(geoJsonController.getGeoJson);

module.exports = router;
