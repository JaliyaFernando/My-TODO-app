'use strict';
const GoogleAuthenticationService = require("../services/googleAuthenticationService");

exports.getAuthUrl =  (request, response) => {
    console.log("getAuthUrl - start");
    GoogleAuthenticationService.createOAuth2Client().then(function (client) {
        GoogleAuthenticationService.getAuthUrl(client).then(function (authUrl) {
            response.status(200).send({AuthUrl: authUrl});
            console.log("getAuthUrl - end");
        }, function (error) {
            response.status(500).send({Error:error});
            console.log("getAuthUrl - end");
        });
    }, function (error) {
        response.status(500).send({Error:error});
        console.log("getAuthUrl - end");
    });
};

exports.getToken =  (request, response) => {
    console.log("getToken - start");
    const code = request.body.code;
    GoogleAuthenticationService.createOAuth2Client().then(function (client) {
        GoogleAuthenticationService.getToken(client,code).then(function (token) {
            response.status(200).send({token: token});
            console.log("getToken - end");
        }, function (error) {
            response.status(500).send({Error:error});
            console.log("getToken - end");
        });
    }, function (error) {
        response.status(500).send({Error:error});
        console.log("getToken - end");
    });
};

exports.getEvents =  (request, response) => {
    console.log("getEvents - start");
    const token = request.body;
    GoogleAuthenticationService.createOAuth2Client().then(function (client) {
        GoogleAuthenticationService.listEvents(client,token).then(function (events) {
            response.status(200).send({events: events});
            console.log("getEvents - end");
        }, function (error) {
            response.status(500).send({Error:error});
            console.log("getEvents - end");
        });
    }, function (error) {
        response.status(500).send({Error:error});
        console.log("getEvents - end");
    });
};

exports.addEvent =  (request, response) => {
    console.log("addEvent - start");
    const token = request.body;
    GoogleAuthenticationService.createOAuth2Client().then(function (client) {
        GoogleAuthenticationService.addEvent(client,token).then(function (events) {
            response.status(200).send({events: events});
            console.log("addEvent - end");
        }, function (error) {
            response.status(500).send({Error:error});
            console.log("addEvent - end");
        });
    }, function (error) {
        response.status(500).send({Error:error});
        console.log("addEvent - end");
    });

};