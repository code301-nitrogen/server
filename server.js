require ('dotenv').config();

const bp = require('body-parser');
const express = require('express');
const app = express();
const pg = require('pg');
const fs = require('fs');
const PORT = process.env.PORT;
const cors = require('cors');
const superagent = require('superagent');
const MARS_API_KEY = process.env.MARS_API_KEY;

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();

app.post('/api/v1/save', (req, res) =>{
    const user = req.body.user;
    console.log(user);
    console.log(req.body);
    //changed image_id to id so it works with charlie's table. change to image_id
    client.query(`
    INSERT INTO images (id, rover, camera, url) VALUES ($1, $2, $3, $4);
    `,[
            req.body.image_id,
            req.body.rover,
            req.body.camera,
            req.body.url

        ])
        .then(data => res.status(204).send('image saved'))
        .catch(console.error);
    
    // res.send('success');

});

app.get('/api/v1/nasa', (req, res) => {
    const rover = req.query.rover;
    const camera = req.query.camera;
    const date = req.query.date;

    const nasaUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
    // console.log(req.query);

    superagent.get(`${nasaUrl}${rover}/photos?earth_date=${date}&camera=${camera}&api_key=${MARS_API_KEY}`)
        .end((err, resp) => {
            // console.log(resp.body, 'not working');
            const topPix = resp.body.photos.slice(0,25).map(image => {
                const returnImg = {
                    id: image.id,
                    rover: image.rover.name,
                    camera: image.camera.name,
                    url: image.img_src
                };

                return returnImg;
            });
            res.send(topPix);
        });
});

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);

});