var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var wordSchema = new Schema({
    data:  {type: String, required: true},
    deviceId: {type: mongoose.Schema.Types.ObjectId, ref: 'Device'}
});

var Word = mongoose.model('Word', wordSchema);
