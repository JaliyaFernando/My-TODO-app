'use strict';
const fs = require('fs');
const q = require('q');
const {google} = require('googleapis');

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
exports.listEvents = (auth) => {
    var deferred = q.defer();
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            deferred.reject(err);
        }
        const events = res.data.items;
        if (events.length) {
            deferred.resolve(events);
        } else {
            console.log('No upcoming events found.');
            deferred.resolve('No upcoming events found.');
        }
    });
}