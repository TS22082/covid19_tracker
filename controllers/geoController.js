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
            queryParts.push(`country = '${country}'`);
            if (country === 'US') {
                if (state) {
                    table = 'states';
                    queryParts.push(`country = '${state}'`);
                    if (county) {
                        table = 'counties';
                        queryParts.push(`county = '${county}'`);
                    }
                }
            }
            const query = `SELECT geojson FROM ${table} WHERE ${queryParts.join(' AND ')}`;
            console.log(query);
            // db.query(query);
        }
    }
};
