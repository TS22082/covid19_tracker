const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);

const sql = new Sequelize({
    database: 'covid19',
    username: 'root',
    password: 'password',
    dialect: 'mysql'
});

const doInit = async () => {
    // console.log('Initializing DB...');
    // console.log('Creating Schema');
    // const query = (await readFileAsync('schema.sql')).toString('utf-8');
    // console.log(query);
    // try {
    //     await sql.query(query);
    // } catch (err) {
    //     console.log(err);
    //     process.exit(1);
    // }
    console.log('Importing geoJson');
    const geoJsonDir = '../data/world.geo.json/countries';
    fs.readdir(geoJsonDir, function (err, files) {
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }
        files.forEach((file, i) => {
            const filePath = path.join(geoJsonDir, file);
            fs.stat(filePath, function (err, stat) {
                if (err) {
                    console.error("Error stating file.", err);
                    return;
                }
                if (stat.isDirectory()) {
                    console.log(`Skipping ${file} for now...`);
                } else if (stat.isFile()) {
                    console.log(`Reading ${file}...`);
                    fs.readFile(filePath, (err, data) => {
                        if (err) {
                            console.error(`Error reading file: ${file}`);
                            return;
                        } else {
                            const geoJsonOb = JSON.parse(data.toString('utf-8'));
                            const isoAlpha3 = file.split('.')[0];
                            const json = JSON.stringify(geoJsonOb);
                            const query = `INSERT INTO geojson (json) VALUES ('${json}')`;
                            sql.query(query, { type: sql.QueryTypes.INSERT })
                                .then(inserted => {
                                    const query = `UPDATE countries SET fk_geojson = ${inserted[0]} WHERE isoAlpha3 = '${isoAlpha3}'`;
                                    sql.query(query);
                                });
                        }
                    });
                }
            });
        });
    });
};

doInit();

