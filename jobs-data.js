var mongoose = require("mongoose");
var Promise = require('bluebird');

var Job = mongoose.model('Job');

var findJobs = function(query){
    return Promise.cast(Job.find(query).exec());
}

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);

exports.findJobs = findJobs;

var createJob = Promise.promisify(Job.create, Job);

exports.seedJobs = function() {
    return findJobs({}).then(function(collection) {
        if(collection.length === 0) {
            return Promise.map(jobs, function(job) {
               return createJob(job);    
           });
        }
    });
};

var jobs = [
    {title:'Cook', description:'You make food'},
    {title:'Waiter', description: 'You wait'},
    {title:'Programmer', description: 'You fight dragons!'},
    {title:'Conner', description: 'Youre a joker'},
    ];
