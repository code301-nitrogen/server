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

app.get('/api/v1/nasa', (req, res) => {
    const rover = req.query.rover;
    const camera = req.query.camera;
    const date = req.query.date;
    
    const nasaUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/';
    console.log(req.query);
    // const test = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-12-15&camera=chemcam&api_key=hJBJ2YBwo2K4VGfoZFoKtxvICroQ4cg4qMb9HpTT`;
    // superagent.get(test)
    // earth_date=${date}&
    superagent.get(`${nasaUrl}${rover}/photos?cearth_date=${date}&amera=${camera}&api_key=${MARS_API_KEY}`)
        .end((err, resp) => {
            console.log(resp.body, 'not working');
            const topPix = resp.body.photos.slice(0,25).map(image => {
                const returnImg = {
                    id: image.id,
                    rover: image.rover.name,
                    camera: image.camera.name,
                    url: image.img_src
                }; 
                console.log(image,'YaY');
                return returnImg;
            });
            console.log(topPix);
            res.send(topPix);
        });
});

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);

});