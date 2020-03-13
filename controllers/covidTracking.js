const axios = require("axios");

// docs for api: https://github.com/ExpDev07/coronavirus-tracker-api

module.exports = {
  // get all confirmed cases of covid 19
  getConfirmedCases: function(req, res) {
    axios
      .get("https://coronavirus-tracker-api.herokuapp.com/confirmed")
      .then(confirmedCases => res.json(confirmedCases.data.locations))
      .catch(err => res.send(err));
  }
};
