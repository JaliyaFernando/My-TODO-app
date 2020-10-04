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
            deferred.resolve(oAuth2Client);
        }
    });
    return deferred.promise;
};

exports.getAuthUrl = (oAuth2Client) => {
    var deferred = q.defer();
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.error('Auth URL successfully generated');
    deferred.resolve(authUrl);
    return deferred.promise;
};

exports.getToken = (oAuth2Client,code) => {
    var deferred = q.defer();
    oAuth2Client.getToken(code, (err, token) => {
        if (err){
            console.error('Error retrieving access token', err);
            deferred.reject(err);
        } else{
            console.error('New token successfully generated');
            deferred.resolve(token);
        }
    });
    return deferred.promise;
};

exports.listEvents = (oAuth2Client,token) => {
    var deferred = q.defer();

    oAuth2Client.setCredentials(token);
    const calendar = google.calendar({version: 'v3', auth: oAuth2Client});
    calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 50,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            deferred.reject(err);
        }
        else {
            const events = res.data.items;
            if (events.length) {
                console.log(events.length+" events found");
                deferred.resolve(events);
            } else {
                console.log("No upcoming events found");
                deferred.resolve("No upcoming events found");
            }
        }
    });
    return deferred.promise;
};

exports.addEvent = (oAuth2Client,data) => {
    var event = {
        'summary': data.Summary,
        'location': '',
        'description': data.Description,
        'start': {
            'dateTime': new Date(data.StartDate),
            'timeZone': 'Asia/Colombo',
        },
        'end': {
            'dateTime': new Date(data.EndDate),
            'timeZone': 'Asia/Colombo',
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=1'
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
            ],
        },
    };
    var deferred = q.defer();
    oAuth2Client.setCredentials(data.Token);

    const calendar = google.calendar({version: 'v3', auth: oAuth2Client});
    calendar.events.insert({
        auth: oAuth2Client,
        calendarId: 'primary',
        resource: event,
    }, function(err, event) {
        if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            deferred.reject(err);
        }
        else {
            console.log('New event created successfully');
            deferred.resolve(event);
        }
    });
    return deferred.promise;
};