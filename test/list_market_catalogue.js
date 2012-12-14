// Betfair account data
var betfair = require("../index.js");
var async = require('async');
var common = require('./common.js');

// Create session to Betfair
var session = betfair.newSession();
common.session = session;
common.loginName = process.env['BF_LOGIN'] || "nobody";
common.password = process.env['BF_PASSWORD'] || "password";
common.applicationKey = process.env['BF_APPLICATION_KEY'] || "invalid";

// list market catalogue
function listMarketCatalogue(data, cb) {
    if(!cb) 
        cb = data;
                
    var filter = { eventTypeIds: [1], marketTypeCodes:['MATCH_ODDS']};
    var what = ['EVENT', 'RUNNER_DESCRIPTION'];
    session.listMarketCatalogue({filter:filter, marketProjection:what, maxResults:60}, function(err,res) {
        console.log("listMarketCatalogue err=%s duration=%s", err, res.duration()/1000);
        console.log("Request:%s\n", JSON.stringify(res.request, null, 2))
        console.log("Response:%s\n", JSON.stringify(res.response, null, 2));
        cb(err,res);
    });
}

async.waterfall([common.login, listMarketCatalogue, common.logout], function(err,res) {
    console.log("Done, err =",err);
    process.exit(0);
});
