
var GoogleSpreadsheet = require('google-spreadsheet');

var doc = new GoogleSpreadsheet(''); //Enter Google Spreadsheet API key here.
var sheet;
var creds = require('./config.json');
var devices = [];

doc.useServiceAccountAuth(creds, function(err){
    doc.getInfo(function(err, info) {
        console.log('Loaded doc: '+info.title+' by xxndd');
        sheet = info.worksheets[1];

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
                            newObj.device = keys[j];
                            wordlist.push(newObj);
                            }
                    }
                }
                console.log(wordlist)
        });
    });
});
