const fs = require('fs');
const path = require('path');
const db = require('./../config/mysql');

const doInit = async () => {
    console.log('Importing geoJson');
    const geoJsonDir = '../data/world.geo.json/countries';
    fs.readdir(geoJsonDir, (err, files) => {
        files.forEach((file, i) => {
            const filePath = path.join(geoJsonDir, file);
            fs.stat(filePath, (err, stat) => {
                if (stat.isDirectory()) {
                    console.log('Traversing US States...');
                    const statesGeoJsonDir = filePath;
                    fs.readdir(statesGeoJsonDir, (err, files) => {
                        files.forEach(file => {
                            const filePath = path.join(statesGeoJsonDir, file);
                            fs.stat(filePath, (err, stat) => {
                                if (stat.isDirectory()) {
                                    console.log(`Traversing Counties for ${file}`);
                                    const stateAbbr = file;
                                    const countiesGeoJsonDir = filePath;
                                    fs.readdir(countiesGeoJsonDir, (err, files) => {
                                        files.forEach(file => {
                                            const filePath = path.join(countiesGeoJsonDir, file);
                                            console.log(`Reading ${file}...`);
                                            fs.readFile(filePath, (err, data) => {
                                                const countyName = file.split('.')[0].toUpperCase();
                                                const geoJsonOb = JSON.parse(data.toString('utf-8'));
                                                const json = JSON.stringify(geoJsonOb);
                                                const query = `INSERT INTO geojson (json) VALUES ('${json}')`;
                                                db.query(query, null, (err, result) => {
                                                    const query = `UPDATE counties ` +
                                                        `SET c.fk_geojson = ${result.insertId} ` +
                                                        `FROM counties AS c ` +
                                                        `INNER JOIN states AS s ON s.id = c.fk_state ` +
                                                        `WHERE c.name = '${countyName}' AND s.name = '${stateAbbr}'`;
                                                    db.query(query);
                                                });
                                            });
                                        });
                                    });
                                } else {
                                    console.log(`Reading ${file}...`);
                                    fs.readFile(filePath, (err, data) => {
                                        const stateAbbr = file.split('.')[0].toUpperCase();
                                        const geoJsonOb = JSON.parse(data.toString('utf-8'));
                                        const json = JSON.stringify(geoJsonOb);
                                        const query = `INSERT INTO geojson (json) VALUES ('${json}')`;
                                        db.query(query, null, (err, result) => {
                                            const query = `UPDATE states ` +
                                                `SET fk_geojson = ${result.insertId} ` +
                                                `WHERE abbr = '${stateAbbr}'`;
                                            db.query(query);
                                        });
                                    });
                                }
                            });
                        });
                    });
                }
                // else if (stat.isFile()) {
                //     console.log(`Reading ${file}...`);
                //     fs.readFile(filePath, (err, data) => {
                //         if (err) {
                //             console.error(`Error reading file: ${file}`);
                //             return;
                //         } else {
                //             const geoJsonOb = JSON.parse(data.toString('utf-8'));
                //             const isoAlpha3 = file.split('.')[0];
                //             const json = JSON.stringify(geoJsonOb);
                //             const query = `INSERT INTO geojson (json) VALUES ('${json}')`;
                //             db.query(query)
                //                 .then(inserted => {
                //                     const query = `UPDATE countries SET fk_geojson = ${inserted[0]} WHERE isoAlpha3 = '${isoAlpha3}'`;
                //                     db.query(query);
                //                 });
                //         }
                //     });
                // }
            });
        });
    });
};


doInit();

