'use strict';
const GoogleAuthenticationService = require("../services/googleAuthenticationService");

exports.redirectToAuthUrl =  (request, response) => {
    console.log("hi")
    GoogleAuthenticationService.createOAuth2Client().then(function (client) {
        GoogleAuthenticationService.getAuthUrl(client).then(function (authUrl) {
            response.status(200).send({AuthUrl: authUrl});
        }, function (error) {
            response.status(500).send({Error:error});
        });
    }, function (error) {
        response.status(500).send({Error:error});
    });
}