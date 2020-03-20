const querystring = require('querystring');
const axios = require('axios');
const db = require('../config/mysql.js');

module.exports = {
    getGeoJson: async (req, res) => {
        const { country, county, city, state, region } = req.query;
        let table;
        let queryParts = [];
        if (country) {
            table = 'countries';
            queryParts.push(`countryCode = '${country}'`);
            if (country === 'US') {
                if (state) {
                    table = 'states';
                    queryParts.push(`state = '${state}'`);
                    if (county) {
                        table = 'counties';
                        queryParts.push(`county = '${county}'`);
                    }
                }
            }
            const query = `SELECT json AS geojson FROM ${table} `+
                `INNER JOIN geojson ON fk_geojson = geojson.id `+
                `WHERE ${queryParts.join(' AND ')}`;
            db.execute(query, null, (err, results, fields) => {
                if (err) {
                    console.log('ERROR', err);
                    res.end();
                }
                const geoJson = results[0].geojson
                res.json(geoJson);
                res.end();
            });
        }
    }
};
