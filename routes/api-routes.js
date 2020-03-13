const express = require("express");
const router = express.Router();
const covidTrackingController = require("../controllers/covidTracking");
const axios = require("axios");

// type: GET
// route: api/confirmed
// gets all confirmed cases of covid-19
router.route("/confirmed").get(covidTrackingController.getConfirmedCases);

module.exports = router;
