"use strict";

var datetime = require('node-datetime');
var switchAgent = require('./agents/switchAgent.js');

var logger = function (message) {
    let timeStamp = datetime.create().format('Y-m-d H:M:S');
    console.log(`[${timeStamp}] ${message}`);
};

var execute = function () {
    switchAgent.needNotification(function (error, decision) {
        if (error) {
            logger(error);
        } else {
            if (decision) {
                logger('need to notify');
                switchAgent.getNotificationContent(function (error, content) {
                    if (error) {
                        logger(error);
                    } else {
                        let lineOperator = require('./src/lineOperator.js');
                        lineOperator.sendMessage(content, function (error, statusCode) {
                            if (error) {
                                logger(error);
                            } else {
                                logger('message sent with status code ' + statusCode);
                            }
                        })
                    }
                });
            } else {
                logger('no need to notify');
            }
        }
    });
}

setInterval(execute, 1000 * 60);
