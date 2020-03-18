const axios = require("axios");

// docs for api: https://github.com/ExpDev07/coronavirus-tracker-api

module.exports = {
    // get all confirmed cases of covid 19
    getConfirmedCases: async function(req, res) {
        const casesData = await axios.get("https://coronavirus-tracker-api.herokuapp.com/confirmed");
        // console.log(casesData.data.locations);
        const confirmedCases = await Promise.all(casesData.data.locations.map(async location => {
            // console.log('CODE>', location.country_code);
            if (location.country_code === 'US') {
                const { coordinates } = location;
                const reverseGeocode = await axios.get(
                    'https://maps.googleapis.com/maps/api/geocode/json',
                    {
                        params: {
                            latlng: `${coordinates.lat},${coordinates.long}`,
                            key: process.env.REACT_APP_MAP_KEY
                        },
                    }
                );
                location.geo = reverseGeocode.data;
            }
            return location;
        }));
        await res.json(confirmedCases);
    }
};
