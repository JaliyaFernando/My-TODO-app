'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./lib/configs/config');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./lib/routes');
app.use('/api', routes);

app.listen(config.server.PORT, function(){
    console.log("Server is running on Port",config.server.PORT);
});




