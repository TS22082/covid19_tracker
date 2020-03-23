const fs = require('fs');
const path = require('path');
const db = require('./../config/mysql');
const readline = require('readline');

const crash = err => (console.log('ERROR>',err), process.exit(1));

const utfString = str => unescape(encodeURIComponent(str));

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
                                                err && crash('ERROR', err);
                                                const countyName = file.split('.')[0].toUpperCase();
                                                const geoJsonOb = JSON.parse(data.toString('utf-8'));
                                                const json = JSON.stringify(geoJsonOb);
                                                const query = `INSERT INTO geojson (json) VALUES (?)`;
                                                console.log(query);
                                                db.query(query,
                                                    json,
                                                    (err, result) => {
                                                    err && crash([err, query]);
                                                    console.log(result);
                                                    const query = 'UPDATE counties AS c ' +
                                                        'INNER JOIN states AS s ON s.id = c.fk_state ' +
                                                        'SET c.fk_geojson = ? ' +
                                                        'WHERE c.name = ? AND s.abbr = ?';
                                                    // console.log(query);
                                                    db.query(query,
                                                        [
                                                            result.insertId,
                                                            utfString(countyName),
                                                            utfString(stateAbbr)
                                                        ],
                                                        (err, result) => {
                                                            err && crash([err, query]);
                                                            console.log(result);
                                                        })

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
                                        const query = 'INSERT INTO geojson (json) VALUES (?)';
                                        db.query(query,
                                            json,
                                            (err, result) => {
                                            err && crash([err, query]);
                                            console.log(result);
                                            const query = 'UPDATE states '+
                                                'SET fk_geojson = ? '+
                                                'WHERE abbr = ?';
                                            db.query(query,
                                                [
                                                    result.insertId,
                                                    utfString(stateAbbr)
                                                ],
                                                (err, result) => {
                                                err && crash([err, query] );
                                                console.log(result);
                                            });
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





