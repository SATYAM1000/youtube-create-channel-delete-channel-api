const mongoose = require('mongoose');

async function connectToMongoDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/youtube_db", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection to MongoDB database is successfull..");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToMongoDB;
