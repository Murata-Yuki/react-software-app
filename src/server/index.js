const express = require('express');
const { connect, Schema, model } = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection (replace 'yourMongoURI' with your MongoDB connection string)
connect('mongodb://localhost:27017/videoDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Define a simple schema for storing video data
const videoSchema = new Schema({
    videoId: Number,
    title: String,
    url: String,
    floor: Number,
    trajectoryData: Array,
});

const Video = model('Video', videoSchema);

// API route to fetch video data
app.get('/api/videos', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.status(500).send("Error fetching videos");
    }
});

// API route to insert video data
app.post('/api/videos', async (req, res) => {
    const { videoId, title, url, floor, trajectoryData } = req.body;

    // Create a new video document using the schema
    const newVideo = new Video({
        videoId,
        title,
        url,
        floor,
        trajectoryData
    });

    try {
        // Save the new video document to MongoDB
        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(500).send("Error inserting video data");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
