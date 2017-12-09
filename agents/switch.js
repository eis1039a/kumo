"use strict";

module.exports = {
    needNotification: function () {
        var request = require('request');
        var cheerio = require('cheerio');



    },
    getNotificationContent: function () {

    }
}

var url = "http://www.salariedman.com/archives/207";

request(url, function(error, response, body) {
    if (error) {
        console.log("Error: " + error);
    }

    console.log("Status code: " + response.statusCode);

    if (response.statusCode === 200) {
        var $ = cheerio.load(body);
        console.log($('.titled_box').first().children().nextUntil('hr').text());
    }
});