var kue = require('kue');
var redis = require('kue/lib/redis');

// Senders
var sendEmail = require('./senders/email');
var sendSms = require('./senders/sms')

// Gets config options for kue based on local/dev/prod Redis instance
var kueOptions = require('./server/kueConfig.js');
