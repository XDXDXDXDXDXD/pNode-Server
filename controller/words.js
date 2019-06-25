const mongoose = require('mongoose');

const Word = mongoose.model('Word');
const Device = mongoose.model('Device');

const env = process.env.NODE_ENV || 'dev';
const config = require('../config')[env];
const creds = require('../config')['google'];

const GoogleSpreadsheet = require('google-spreadsheet');

var doc = new GoogleSpreadsheet(creds.sheet_id);
var sheet;

exports.readAll = function(req, res){
    var skip = req.query.skip || 0;
    var limit = req.query.limit || 200;
    console.log(skip + " " + limit);
    Word.find(null,null,{ skip: skip, limit: limit },function(err, words){
        if(err) console.error(err);
        else{
            console.log("Read All Words");
            return res.send(words);
        }
    });
}

exports.getData = function(req, res){
    var response = [];
    Word.find().
    populate('deviceId', 'name location').
    exec(function (err, words) {
        if (err) return handleError(err);

        var mapRes = words.map(obj =>{
            var newObj = {}
            newObj.id = obj.deviceId.name;
            newObj.loc = obj.deviceId.location;
            newObj.d = obj.data;
            return newObj;
        })

        var reduceRes = mapRes.reduce(function (allWords, word) {
            if(word.id in allWords){
                allWords[word.id].words.push(word.d);
            }
            else {
                allWords[word.id] = {"location": word.loc,"words":[word.d]};
            }
            return allWords;
        }, {});

        return res.send(reduceRes);
    });
}

exports.populateFromSheets = function(req, res){
    getSpreadSheet(function(words){
        Word.remove({}, function(){
            for(var i=0; i<words.length; i++){
                var wn = {};
                wn.data = words[i].word;
                wn.name = words[i].device;
                //console.log("w:%s d:%s",wn.data,wn.name);
                create(wn);
            }
        });
        return res.sendStatus(200);
    });
}

function getSpreadSheet(cb){
    var devices = [];
    doc.useServiceAccountAuth(creds, function(err){
        doc.getInfo(function(err, info) {
            console.log('Loaded doc: '+info.title+' by xxndd');
            sheet = info.worksheets[0];

            sheet.getCells({
                  'min-row': 1,
                  'max-row': 1,
                  'min-col': 1,
                  'max-col': sheet.colCount,
                  'return-empty': true
                }, function(err, cells) {
                  if (err) return cb(err);
                    for(var i = 0; i < cells.length; i++){
                        var cell = cells[i]._value;
                        if(cell.length > 0 && cell.substr(0,2) == "0x")
                            devices.push(cell.substr(1,cell.length))
                    }

            });
            sheet.getRows(1, function( err, rows ){
                var wordlist = [];

                    for(var i = 0; i<rows.length; i++){
                            var keys = Object.keys(rows[i]);
                        for(var j = 0; j<keys.length; j++){
                            if(keys[j].substr(0,1) == "x"){
                                var newObj = {}
                                newObj.word = rows[i][keys[j]];
                                newObj.device = "0"+keys[j];
                                wordlist.push(newObj);
                                }
                        }
                    }
                    cb(wordlist)
            });
        });
    });

}

function create(nw){
    Device.findOne({name: nw.name}, {password:0}, function(err, device){
        if(device !== null){
            nw.deviceId = device._id;
            var word = new Word(nw);
            word.save(function(err){});
        }
    });
}
