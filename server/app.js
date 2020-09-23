/*jshint esversion: 6 */
/*jslint node: true */
'use strict';

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('view'));
app.use('/api', require('./api'));

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 8080;

async function start() {
  app.listen(port, function() {
    console.log(`Listening at http://${host}:${port}`);
  });
}

start();


