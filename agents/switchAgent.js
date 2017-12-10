"use strict";

var fs = require('fs');
var file_path = './agents/switchAgent.dat';

module.exports = {
    getNotificationContent: function (callback) {
        fs.readFile(file_path, function (error, data) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, data.toString());
            }
        });
    },
    needNotification: function (callback) {
        var request = require('request');
        var cheerio = require('cheerio');

        var dest = "http://www.salariedman.com/archives/207";

        this.getNotificationContent(function (error, content) {
            if (error) {
                callback(error, null);
            } else {
                request(dest, function(error, response, body) {
                    if (error) {
                        callback(error, null);
                    } else if (response.statusCode === 200) {
                        var $ = cheerio.load(body);
                        var new_content = $('.titled_box').first().children().nextUntil('hr').text().toString();
                        if (new_content != content) {
                            fs.writeFile(file_path, new_content, function (error) {
                                if (error) {
                                    callback(error, null);
                                } else {
                                    callback(null, true);
                                }
                            });
                        } else {
                            callback(null, false);
                        }
                    } else {
                        console.log("info: unrecognized statusCode");
                        callback(null, false);
                    }
                });
            }
        });
    }
};


