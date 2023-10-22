const express=require('express');
const mongoose=require('mongoose');
const env=require('dotenv');
const shortid=require('shortid');
const connectToMongoDB=require('./connect.js')
const youTubeChannel=require('./schema.js')
env.config();
const PORT=process.env.PORT || 4040
const app=express();
app.use(express.json());


//connect to database---------------------------------------------
connectToMongoDB();


app.post('/channel', async (req, res) => {
    try {
        const channelData = req.body;
        channelData.channelID = shortid.generate();
        const document = new youTubeChannel(channelData);
        await document.save();
        res.status(201).json({ message: "Channel created successfully" });
    }  catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Channel creation failed." });
    }
    
});
app.patch('/channel/:id', async (req, res) => {
    try {
        const url = req.params.id;
        const videoDetails = req.body; // Assuming the request body contains the updated video details
        const videourl=shortid.generate();
        videoDetails.videoURL=videourl;
        const result = await youTubeChannel.findOneAndUpdate(
            { channelID: url },
            { $push: { videos: videoDetails } }, // Use $push to add to an array
            { new: true } // Return the updated document
        );

        if (result) {
            res.status(200).json({ message: "Video uploaded successfully" });
        } else {
            res.status(404).json({ message: "Channel not found" });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Video uploading failed" });
    }
});

app.delete('/channel/:id', async(req,res)=>{
    try {
        const url = req.params.id;
        const result = await youTubeChannel.deleteOne({ channelID: url });
        if (result.deletedCount > 0) { // Check if a document was deleted
            res.status(200).json({ message: "Channel deleted successfully" });
        } else {
            res.status(404).json({ message: "Channel not found" });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Channel deletion failed" });
    }
})

app.delete('/channel/:id/:vid', async (req, res) => {
    try {
        const channelurl = req.params.id;
        const videourl = req.params.vid;

        // Step 1: Find the channel by ID
        const channel = await youTubeChannel.findOne({ channelID: channelurl });

        if (!channel) {
            return res.status(404).json({ message: "Channel not found" });
        }

        // Step 2: Find and remove the video from the channel's videos array
        const videoIndex = channel.videos.findIndex(video => video.videoURL === videourl);

        if (videoIndex === -1) {
            return res.status(404).json({ message: "Video not found in the channel" });
        }

        channel.videos.splice(videoIndex, 1); // Remove the video from the array

        // Step 3: Save the updated channel document
        await channel.save();

        res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Video deletion failed" });
    }
});



app.listen(PORT, ()=>{
    console.log("Server is working on PORT: ", PORT);
} )










