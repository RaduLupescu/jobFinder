var express = require('express');
var jobModel = require('./models/Job');
var jobsData = require('./jobs-data.js');

var app = express();

app.set('views', __dirname);
app.set('view engine','jade');

app.use(express.static(__dirname + '/Public'));

app.get('/api/jobs', function(req,res){
    jobsData.findJobs().then(function(collection){
        res.send(collection);
    });
});

app.get('*', function(req,res)
{
    res.render('index');
});

//jobsData.connectDB('mongodb://localhost/jobfinder')
jobsData.connectDB('mongodb://rldev:password@ds063779.mongolab.com:63779/jobfinder')
.then(function(){
    console.log('connected to mongodb succesfully!');
    jobsData.seedJobs();
});

app.listen(process.env.PORT, process.env.IP);