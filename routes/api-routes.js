const express = require("express");
const router = express.Router();
const covidTrackingController = require("../controllers/covidTracking");
const newsController = require("../controllers/news");
const geoJsonController = require('../controllers/geoJson');

// type: GET
// route: api/confirmed
// gets all confirmed cases of covid-19
router.route("/confirmed").get(covidTrackingController.getConfirmedCases);

// type: GET
// route: api/news
// get all the top headlines related to covid-19
router.route("/news").get(newsController.getNews);

router.route('/geojson').get(geoJsonController.getGeoJson);

module.exports = router;
