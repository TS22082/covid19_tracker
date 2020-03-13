const express = require("express");
const router = express.Router();
const axios = require("axios");
// type: GET
// route: api/confirmed
// gets all confirmed cases of covid-19
router.get("/confirmed", (req, res) => {
  axios
    .get("https://coronavirus-tracker-api.herokuapp.com/confirmed")
    .then(confirmedCases => res.json(confirmedCases.data.locations))
    .catch(err => res.send(err));
});

module.exports = router;
