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