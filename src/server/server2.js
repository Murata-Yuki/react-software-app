const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8080;

// CORS設定
app.use(cors({
    origin: ['http://localhost:3000', 'http://133.2.208.187:3000'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// JSONデータを受け取るためのミドルウェア
app.use(express.json());

// MongoDBに接続（videoDB, trajectoryDB, floorDBの3つの接続）
const videoDBConnection = mongoose.createConnection('mongodb://localhost:27017/videoDBres');
const trajectoryDBConnection = mongoose.createConnection('mongodb://localhost:27017/trajectoryDBres');
const floorDBConnection = mongoose.createConnection('mongodb://localhost:27017/floorDBres');
const floorImageDBConnection = mongoose.createConnection('mongodb://localhost:27017/floorImageDBres')

videoDBConnection.on('connected', () => {
    console.log('Connected to videoDBres');
});

trajectoryDBConnection.on('connected', () => {
    console.log('Connected to trajectoryDBres');
});

floorDBConnection.on('connected', () => {
    console.log('Connected to floorDBres');
});

floorImageDBConnection.on('connected', () => {
    console.log('Connected to floorImageDBres');
})

// Videoのスキーマとモデル
const videoSchema = new mongoose.Schema({
    videoId: Number,
    url: String,
    floor: Number,
});

const Video = videoDBConnection.model('Video', videoSchema);

// Trajectoryのスキーマとモデル
const trajectorySchema = new mongoose.Schema({
    trajectoryData: Array // データポイントのリストを含む
});

const Trajectory = trajectoryDBConnection.model('Trajectory', trajectorySchema);

// Floorのスキーマとモデル
const floorSchema = new mongoose.Schema({
    floorNumber: Array
});

const Floor = floorDBConnection.model('Floor', floorSchema);

const floorImageSchema = new mongoose.Schema({
    floorImageId: Number,
    url: String,
});

const FloorImage = floorImageDBConnection.model('FloorImage', floorImageSchema);

// `/videos` エンドポイント：videoSchema からデータを取得
app.get('/videores', async (req, res) => {
    console.log(`Received request from ${req.headers.origin}`);
    try {
        const videos = await Video.find({});
        res.json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

app.get('/trajectoryres', async (req, res) => {
    console.log(`Received request from ${req.headers.origin}`);
    try {
        const trajectories = await Trajectory.find({});
        res.json(trajectories);
    } catch (error) {
        console.error('Error fetching trajectories:', error);
        res.status(500).json({ error: 'Failed to fetch trajectories' });
    }
});

// `/floor` エンドポイント：floorSchema からデータを取得
app.get('/floorres', async (req, res) => {
    console.log(`Received request from ${req.headers.origin}`);
    try {
        const floor = await Floor.find({});
        res.json(floor);
    } catch (error) {
        console.error('Error fetching floors:', error);
        res.status(500).json({ error: 'Failed to fetch floors' });
    }
});

// `/floorImageDB` エンドポイント：floorImageSchema からデータを取得
app.get('/floorImageDBres', async (req, res) => {
    console.log(`Received request from ${req.headers.origin}`);
    try {
        const floor = await FloorImage.find({});
        res.json(floor);
    } catch (error) {
        console.error('Error fetching floorImages:', error);
        res.status(500).json({ error: 'Failed to fetch floorImages' });
    }
});
// サーバーを起動
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
