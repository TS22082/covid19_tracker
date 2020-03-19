const axios = require("axios");

// docs for api: https://github.com/ExpDev07/coronavirus-tracker-api

module.exports = {
    // get all confirmed cases of covid 19
    getConfirmedCases: async function(req, res) {
        const casesData = await axios.get("https://coronavirus-tracker-api.herokuapp.com/confirmed");
        const confirmedCases = await Promise.all(casesData.data.locations.map(async location => {
            if (location.country_code === 'US') {
                if (location.province.split(',').length===2) {
                    let [region, state] = location.province.split(',');
                    state = state.trim();
                    let matches = region.match(/^(.+) (County|Parish)$/);
                    if (matches) {
                        region = matches[1];
                    }
                    location.state = state;
                    location.county = region;
                }
                // const { coordinates } = location;
                // const reverseGeocode = await axios.get(
                //     'https://api.opencagedata.com/geocode/v1/json',
                //     {
                //         params: {
                //             q: `${coordinates.lat}+${coordinates.long}`,
                //             key: process.env.OPENCAGE_API_KEY
                //         }
                //     }
                // );
                // location.geo = reverseGeocode.data;
            }
            return location;
        }));
        await res.json(confirmedCases);
    }
};
