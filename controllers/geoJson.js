const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

module.exports = {
    getGeoJson: function(req, res) {
        const geoJsonPath = 'data/world.geo.json/countries';
        let {country, state, county, region} = req.query;
        let geoJson;
        if (country === 'US') country = 'USA';
        if (country === 'USA') {
            if (state) {
                if (county) {
                    const filePath = `${geoJsonPath}/${country}/${state}/${county}.geo.json`;
                    fs.access(filePath, fs.constants.F_OK, (err) => {
                        if (err) {
                            res.status(404).send('Not found').end();
                        } else {
                            let geoJson = JSON.parse(fs.readFileSync(filePath));
                            geoJson.features[0].geometry.coordinates[0][0]
                                .push(geoJson.features[0].geometry.coordinates[0][0][0]);
                            res.json(geoJson);
                        }
                    });
                }
            }
        } else {
            res.status(404).send('Not found').end();
        }
    }
};
