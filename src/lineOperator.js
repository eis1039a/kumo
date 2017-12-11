"use strict"


module.exports = {
    sendMessage: function (message, callback) {
        const lineConfig = require(__dirname + '/lineConfig.json');
        const NOTIFY_TOKEN = lineConfig.notify_token;

        const axios = require('axios');
        const querystring = require('querystring');

        let config = {
            baseURL: 'https://notify-api.line.me',
            url: '/api/notify',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${NOTIFY_TOKEN}`
            },
            data: querystring.stringify({
                message: message
            })
        };

        axios(config)
        .then(function (response) {
            callback(null, response.status);
        })
        .catch(function (error) {
            console.log(error);
            callback(error, null);
        });
    }
}
