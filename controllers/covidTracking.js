const axios = require("axios");

module.exports = {
  getConfirmedCases: function(req, res) {
    axios
      .get("https://coronavirus-tracker-api.herokuapp.com/confirmed")
      .then(confirmedCases => res.json(confirmedCases.data.locations))
      .catch(err => res.send(err));
  }
};
