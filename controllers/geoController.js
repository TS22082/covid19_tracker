const querystring = require('querystring');
const axios = require('axios');
const db = require('../config/mysql.js');

module.exports = {
    getGeoJson: async (req, res) => {
        const { country, county, city, state, region } = req.query;
        let table;
        let whereClause;
        if (country) {
            table = 'countries';
            whereClause = `countryCode = '${country}'`;
            if (country === 'US') {
                if (state) {
                    table = 'states';
                    whereClause = `state = '${state}'`;
                    if (county) {
                        table = 'counties';
                        whereClause = `state = '${state}' AND county = '${county}'`;
                    }
                }
            }
            const query = `SELECT json AS geojson FROM ${table} `+
                `INNER JOIN geojson ON fk_geojson = geojson.id `+
                `WHERE ${whereClause}`;
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
