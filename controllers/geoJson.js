const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

module.exports = {
    getGeoJson: function(req, res) {
        const geoJsonPath = 'data/world.geo.json/countries';
        let { country, state, county, region } = req.query;
        let geoJson;
        if (country === 'US') country = 'USA';
        if (country === 'USA') {
            if (state) {
                if (county) {
                    const filePath = `${geoJsonPath}/${country}/${state}/${county}.geo.json`;
                    const readStream = fs.createReadStream(filePath, 'utf8');
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    readStream.on('data', chunk => {
                        res.write(chunk);
                    }).on('end', () =>  {
                        res.end();
                    });
                }
            }
        } else {
            res.status(404).send('Not found');
        }
    }
};
