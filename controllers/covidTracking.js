const axios = require("axios");

// docs for api: https://github.com/ExpDev07/coronavirus-tracker-api

module.exports = {
  // get all confirmed cases of covid 19
  getConfirmedCases: function(req, res) {
    axios
      .get("https://coronavirus-tracker-api.herokuapp.com/confirmed")
      .then(confirmedCases => {
          confirmedCases.data.locations.map(location => {
              const { coordinates } = location;
              axios
                  .get('https://maps.googleapis.com/maps/api/geocode/json',
                      {
                      latlng: `${coordinates.lat},${coordinates.long}`,
                      key: process.env.REACT_APP_MAP_KEY
                  })
                  .then(response => {
                      console.log()
                  })
                  .catch(err => res.send(err));
          });

          return res.json(confirmedCases.data.locations)
      })
      .catch(err => res.send(err));
  }
};
