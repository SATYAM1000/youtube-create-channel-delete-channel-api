const mongoose = require('mongoose');
//const videoSchema=require('./videoschema.js')

const videoSchema = mongoose.Schema({
    "videoTitle": {
        type: String,
        required:true
    },
    "videoURL": {
        type: String,
    }
});

const channelSchema = mongoose.Schema({
    "channelName": {
        type: String,
        required: true
    },
    "channelID": {
        type: String
    },
    "channelDescription": {
        type: String,
        maxlength: 600
    },
    "videos": [videoSchema] // Array of video objects
});

const youTubeChannel=new mongoose.model('youTubeChannel', channelSchema);
module.exports=youTubeChannel;
