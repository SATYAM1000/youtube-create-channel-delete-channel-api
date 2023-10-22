const mongoose=require('mongoose');

const videoSchema=mongoose.Schema({
    videoTitle:{
        type:String,
        require:true
    },
    videoURL:{
        type:String,
        unique:true
    }
})

const videoModel=mongoose.model('videoModel', videoSchema);
module.exports=videoModel;