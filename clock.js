var kue = require('kue');
var redis = require('kue/lib/redis');

// Senders
var sendEmail = require('./senders/email');
var sendSms = require('./senders/sms')

// Gets config options for kue based on local/dev/prod Redis instance
var kueOptions = require('./server/kueConfig.js');

// Create connection to queue
var queue = kue.createQueue(kueOptions);

queue.on('job enqueue', function(id, type) {
  console.log('clock.js: Job %s got queued of type %s', id, type);
}).on('job complete', function(id, result) {
  kue.Job.get(id, function(err, job) {
    if (err) return;
    job.remove(function(err) {
      if (err) throw err;
      console.log('clock.js: removed completed job #%d', job.id);
    });
  });
});