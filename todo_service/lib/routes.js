const express = require('express');
const app = express();
const AuthenticationController = require("./controllers/authenticationController");

app.get('/login', AuthenticationController.redirectToAuthUrl);

module.exports = app;