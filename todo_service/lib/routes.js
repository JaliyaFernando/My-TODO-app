const express = require('express');
const app = express();
const AuthenticationController = require("./controllers/myTODOController");

app.get('/login', AuthenticationController.getAuthUrl);
app.post('/token', AuthenticationController.getToken);
app.post('/events', AuthenticationController.getEvents);
app.post('/add-new-event', AuthenticationController.addEvent);

module.exports = app;