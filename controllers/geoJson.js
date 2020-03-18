const us_regions_geojson = require("../data/gz_2010_us_050_00_5m");

module.exports = {
    getGeoJson: function(req, res) {
        let found = us_regions_geojson.features.find(region => {
            return region.properties.NAME === req.query.county
        });
        res.json(found);
    }
};
