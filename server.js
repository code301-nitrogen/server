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
    console.log(req.body.image_id);
    //changed image_id to id so it works with charlie's table. change to image_id
    //See if user with that username exist
    // 'SELECT * FROM users where name = req.body.user'
    // const userId = await client.query(`SELECT id FROM users WHERE name = ${req.body.user}`);
    //  console.log('this is the user id');
    //  console.log(userId);
    //If not create

    //See if image with that image id exist
    // 'SELECT * FROM images WHERE image_id = req.body.image_id'
    //if not create
    //Using that users id number and image_id number, put in join faves table
    // 'INSERT into favorites (user_id, images_id) VALES ($1, $2)'
    


    client.query(`
    SELECT id FROM users WHERE name = $1`,[req.body.user])
        .then (data => {
            if(data.rows.length > 0) {
                const userId = data.rows[0].id;
                getImages(userId);
            } else {
                client.query(`INSERT INTO users (name) VALUES ($1) RETURNING id`, [req.body.user], (err,data) => {
                    getImages(data.rows[0].id);
                    if (err) console.log(err);
                });
            }
        });
    function getImages (userId) {
        console.log('getImages', userId);
        // client.query(`SELECT id FROM images WHERE url = ${req.body.url}`)
        // .then ()
        res.send('done');
    }



    // client.query(`
    // INSERT INTO images (image_id, rover, camera, url) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING;   
    // `,[
    //         req.body.image_id,
    //         req.body.rover,
    //         req.body.camera,
    //         req.body.url,
            

    //     ])
    //     .then(users => {
    //         client.query(`
    //         INSERT INTO users (name) VALUES ($1) CONFLICT RETURNING id;
    //         `,[
    //                 req.body.user
    //             ]);
    //     })
    //     .then(userId => {
    //          client.query(`
    //          SELECT id FROM users WHERE name = req.body.user
    //          `)
    //       })
    //     .then(data => res.status(204).send('image saved'))
    //     .catch(console.error);
    
    // // res.send('success');
    // .then(userId => {
    //     client.query(`
    //     SELECT id FROM users WHERE name = req.body.user
    //     `)
    //     .then(userId => {
    //        client.query(`
    //        INSERT into favorites (user_id) VALUES ($1);
    //        `,[
    //            userId
    //        ]) 

    //     })
    // })
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