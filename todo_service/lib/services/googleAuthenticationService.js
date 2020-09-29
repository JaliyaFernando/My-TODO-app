'use strict';
const fs = require('fs');
const q = require('q');
const {google} = require('googleapis');

const SCOPES = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/calendar'
];
exports.createOAuth2Client = () => {
    // Load client secrets from a local file.
    var deferred = q.defer();
    fs.readFile(process.cwd()+'/lib/configs/credentials.json', (err, content) => {
        if (err){
            console.log('Error loading client secret file:', err);
            deferred.reject(err);
        }
        else {
            const {client_secret, client_id, redirect_uris} = JSON.parse(content).web;
            const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
            console.log("createOAuth2Client",oAuth2Client);
            deferred.resolve(oAuth2Client);
        }
    });
    return deferred.promise;
};
exports.getAuthUrl = (oAuth2Client) => {
    console.log("getAuthUrl", oAuth2Client);
    var deferred = q.defer();
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log("Auth URL:",authUrl);
    deferred.resolve(authUrl);
    return deferred.promise;
};